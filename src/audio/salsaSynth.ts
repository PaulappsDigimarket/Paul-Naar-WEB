// Real-time Web Audio API Salsa Groove Synthesizer
// Synthesizes a rhythmic clave, conga pulse, baby bass tumbao, and brass chord stabs
// so every track in the player produces authentic, responsive live audio.

class SalsaGrooveEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private step = 0;
  private isPlaying = false;
  private bpm = 184;
  private baseFreq = 174.61;
  private volume = 0.65;
  private muted = false;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.muted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setTrackParams(bpm: number, baseFreq: number) {
    this.bpm = bpm;
    this.baseFreq = baseFreq;
    if (this.isPlaying) {
      this.stopLoop();
      this.startLoop();
    }
  }

  public setVolume(vol: number, muted: boolean) {
    this.volume = vol;
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : vol, this.ctx.currentTime, 0.03);
    }
  }

  public start(bpm: number, baseFreq: number) {
    this.bpm = bpm;
    this.baseFreq = baseFreq;
    this.ensureContext();
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.step = 0;
      this.startLoop();
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopLoop();
  }

  private stopLoop() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private startLoop() {
    // 16-step bar at eighth-note resolution
    const stepMs = Math.max(95, (60 / this.bpm / 2) * 1000);
    this.triggerStep();
    this.timerId = window.setInterval(() => {
      if (this.isPlaying) {
        this.triggerStep();
      }
    }, stepMs);
  }

  private triggerStep() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const s = this.step % 16;

    // 2-3 Son Clave pattern on 16 eighth-note steps (two 4-beat bars)
    // Bar 1 (2-side): hits on 2, 4 (indices 2, 4) -> Bar 2 (3-side): hits on 8, 11, 14
    const claveHits = [2, 4, 8, 11, 14];
    if (claveHits.includes(s)) {
      this.playClave(now);
    }

    // Conga / Cowbell pulse
    if (s % 2 === 0) {
      this.playConga(now, s % 4 === 0 ? 155 : 210, s % 4 === 0 ? 0.14 : 0.09);
    }

    // Anticipated salsa baby bass tumbao (beats 2.5, 4, 6.5, 8)
    if (s === 3 || s === 6 || s === 11 || s === 14) {
      const bassNote = s === 3 || s === 11 ? this.baseFreq * 0.75 : this.baseFreq * 0.5;
      this.playBass(now, bassNote);
    }

    // Warm brass stab on downbeat & syncopated montuno accent
    if (s === 0 || s === 10) {
      this.playBrassChord(now, this.baseFreq, s === 0 ? 0.11 : 0.075);
    }

    this.step = (this.step + 1) % 16;
  }

  private playClave(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2450, time);
    osc.frequency.exponentialRampToValueAtTime(1650, time + 0.035);
    gain.gain.setValueAtTime(0.16, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playConga(time: number, freq: number, amp: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.4, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.06);
    gain.gain.setValueAtTime(amp, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playBass(time: number, freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + 0.22);
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.26);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.28);
  }

  private playBrassChord(time: number, rootFreq: number, amp: number) {
    if (!this.ctx || !this.masterGain) return;
    // Minor 7th brass voicing: root, minor 3rd, 5th
    const ratios = [1, 1.189, 1.498];
    ratios.forEach((ratio) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(rootFreq * ratio, time);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, time);
      filter.frequency.linearRampToValueAtTime(1900, time + 0.04);
      filter.frequency.exponentialRampToValueAtTime(650, time + 0.25);
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(amp / ratios.length, time + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time);
      osc.stop(time + 0.3);
    });
  }
}

export const salsaSynth = new SalsaGrooveEngine();
