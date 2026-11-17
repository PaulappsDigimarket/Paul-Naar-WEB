import React, { useState } from 'react';
import { Play, Pause, ArrowUpRight, Check, Download, Calendar, MapPin, Music2 } from 'lucide-react';
import {
  ARTIST_PROFILE,
  ARTWORK_URLS,
  CAREER_METRICS,
  HOME_TRACKS,
  OFFICIAL_SOCIALS,
  TOUR_CONCERTS,
  AudioTrack,
  ScreenId,
  ConcertDate,
} from '../data/paulNaarData';
import { ArtistImage } from './ArtistImage';
import { YouTubeIcon, FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface HomeScreenProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  currentTime: number;
  onPlayTrack: (track: AudioTrack) => void;
  onSeek: (sec: number) => void;
  onNavigateScreen: (screen: ScreenId) => void;
  onOpenTicketModal: (concert: ConcertDate) => void;
  onOpenVideoModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentTrack,
  isPlaying,
  currentTime,
  onPlayTrack,
  onSeek,
  onNavigateScreen,
  onOpenTicketModal,
  onOpenVideoModal,
}) => {
  const [circleEmail, setCircleEmail] = useState('');
  const [circleError, setCircleError] = useState<string | null>(null);
  const [circleJoined, setCircleJoined] = useState(false);

  const featuredSingle = HOME_TRACKS[0];
  const additionalTracks = HOME_TRACKS.slice(1);
  const isFeaturedActive = currentTrack.id === featuredSingle.id;
  const isFeaturedPlaying = isFeaturedActive && isPlaying;
  const quickShows = TOUR_CONCERTS.filter((c) =>
    ['Miami', 'Cali', 'San Juan', 'Madrid'].some((city) => c.city.includes(city))
  );

  const progressRatio = isFeaturedActive
    ? Math.min(1, currentTime / featuredSingle.durationSec)
    : 0.28;

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (!isFeaturedActive) {
      onPlayTrack(featuredSingle);
    }
    onSeek(ratio * featuredSingle.durationSec);
  };

  const handleCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCircleError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(circleEmail.trim())) {
      setCircleError('Ingresa un correo electrónico válido para recibir la descarga.');
      return;
    }
    setCircleJoined(true);
    setCircleEmail('');
  };

  const handleDownloadAcousticCali = () => {
    const content = [
      'PAUL NAAR — SHOW ACÚSTICO EN CALI (EDICIÓN CÍRCULO BRAVO)',
      'Formato: Sesión Acústica Exclusiva · Salsa & Bolero',
      'Tracklist:',
      '01. Fuego en la Clave (Versión Acústica)',
      '02. Herencia de Barrio (Unplugged Cali)',
      '03. Esa Mirada en la Barra (Voz y Tres Cubano)',
      '',
      'Canales oficiales: https://www.youtube.com/@paulnaar9507',
      'Management: management@paulnaarofficial.com',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Paul_Naar_Show_Acustico_Cali_Pase.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSocialIcon = (id: string) => {
    switch (id) {
      case 'youtube':
        return <YouTubeIcon className="w-5 h-5 text-[#DC2626]" />;
      case 'facebook':
        return <FacebookIcon className="w-5 h-5 text-white" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5 text-[#FFCA45]" />;
      case 'tiktok':
        return <TikTokIcon className="w-5 h-5 text-[#FFB4AB]" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[360px] pointer-events-none rounded-full blur-[130px]"
          style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }}
        />
        <div
          className="absolute top-36 right-[-80px] w-[350px] h-[350px] pointer-events-none rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(255, 202, 69, 0.1)' }}
        />

        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* Left 7 cols */}
            <div className="lg:col-span-7 bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 sm:p-10 flex flex-col justify-between shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
              <div>
                <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                  {ARTIST_PROFILE.badge}
                </p>

                <h1
                  className="font-display font-extrabold text-white mt-4 uppercase"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)',
                    lineHeight: 1.04,
                    letterSpacing: '-0.025em',
                    textWrap: 'balance',
                  }}
                >
                  EL RITMO Y LA PASIÓN DE LA{' '}
                  <span className="text-[#DC2626]">SALSA MODERNA</span>
                </h1>

                <p className="text-[#E6BDB8] text-base md:text-lg leading-relaxed mt-5 max-w-[62ch]">
                  {ARTIST_PROFILE.manifesto}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onPlayTrack(featuredSingle)}
                  className="stage-btn-primary px-6 py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center gap-2.5 cursor-pointer"
                >
                  {isFeaturedPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  ESCUCHAR ÚLTIMO SENCILLO
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateScreen('gira')}
                  className="stage-btn-outline px-6 py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.06em] cursor-pointer"
                >
                  VER FECHAS DE CONCIERTOS
                </button>
              </div>
            </div>

            {/* Right 5 cols: Real Artist Portrait + Floating Player for Fuego en la Clave */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-[#1C1B1B] border border-white/[0.08] min-h-[400px] shadow-[0_16px_48px_rgba(0,0,0,0.6)] group">
              <ArtistImage
                src={ARTWORK_URLS.redHoodPortrait}
                alt="Paul Naar — Cantautor de Salsa Moderna"
                fallbackVariant="hero"
                isSpinning={isPlaying}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />

              {/* Floating Single Player */}
              <div className="absolute inset-x-4 bottom-4 bg-[#0E0E0E]/90 backdrop-blur-md border border-white/15 rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={ARTWORK_URLS.fuegoClave}
                    alt="Fuego en la Clave"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded object-cover shrink-0 border border-white/15"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-[10px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                      Sencillo Destacado · {featuredSingle.bpm} BPM
                    </p>
                    <p className="font-display text-lg font-bold text-white truncate">
                      {featuredSingle.title}
                    </p>
                    <p className="text-xs text-[#E6BDB8] truncate">{featuredSingle.quality}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onPlayTrack(featuredSingle)}
                  aria-label={isFeaturedPlaying ? 'Pausar Fuego en la Clave' : 'Reproducir Fuego en la Clave'}
                  className="w-12 h-12 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white flex items-center justify-center shrink-0 stage-glow-crimson cursor-pointer"
                >
                  {isFeaturedPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 2. CONTADOR DE MÉTRICAS */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 bg-[#1C1B1B] border border-white/[0.08] rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
            {CAREER_METRICS.map((metric, idx) => (
              <div key={metric.label} className="p-5 md:p-6">
                <p
                  className={`font-display text-2xl md:text-3xl font-extrabold tabular-nums ${
                    idx === 0 ? 'text-[#DC2626]' : idx === 1 ? 'text-[#FFCA45]' : 'text-white'
                  }`}
                >
                  {metric.value}
                </p>
                <p className="text-xs md:text-sm text-[#E6BDB8] mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN SENCILLO DESTACADO */}
      <section className="py-12 md:py-16 border-t border-white/[0.06] bg-[#131313]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                Sencillo Destacado &amp; Reproductor Maestro
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2 uppercase">
                MÚSICA CON <span className="text-[#DC2626]">CALLE &amp; CORAZÓN</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateScreen('musica')}
              className="text-xs font-bold uppercase tracking-[0.08em] text-[#FFCA45] hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
            >
              Explorar Discografía Completa
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Waveform Player for Fuego en la Clave */}
            <div className="lg:col-span-7 bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 md:p-8 stage-card-glow flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={ARTWORK_URLS.fuegoClave}
                      alt="Fuego en la Clave"
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                        {featuredSingle.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#E6BDB8] mt-1">
                        Salsa Brava Original • BPM {featuredSingle.bpm} • {featuredSingle.quality}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlayTrack(featuredSingle)}
                    className="w-12 h-12 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white flex items-center justify-center shrink-0 stage-glow-crimson cursor-pointer"
                    aria-label={isFeaturedPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isFeaturedPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Red Soundwave Visualizer */}
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Onda sonora de Fuego en la Clave"
                  aria-valuemin={0}
                  aria-valuemax={featuredSingle.durationSec}
                  aria-valuenow={Math.floor(progressRatio * featuredSingle.durationSec)}
                  onClick={handleWaveformClick}
                  className="mt-7 h-16 flex items-center cursor-pointer bg-[#0E0E0E] border border-white/[0.06] rounded-lg px-3"
                >
                  <svg
                    viewBox={`0 0 ${featuredSingle.waveform.length * 8} 48`}
                    preserveAspectRatio="none"
                    className="w-full h-11"
                  >
                    {featuredSingle.waveform.map((amp, i) => {
                      const ratio = i / featuredSingle.waveform.length;
                      const active = ratio <= progressRatio;
                      const h = Math.max(6, (amp / 100) * 42);
                      const y = (48 - h) / 2;
                      return (
                        <rect
                          key={i}
                          x={i * 8}
                          y={y}
                          width="4.5"
                          height={h}
                          rx="1.5"
                          fill={active ? '#DC2626' : 'rgba(255,255,255,0.22)'}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#E6BDB8] tabular-nums">
                  Duración: {featuredSingle.durationLabel} · Clave 2-3
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#353534] text-white rounded hover:bg-[#DC2626] transition-colors"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://music.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#353534] text-white rounded hover:bg-[#DC2626] transition-colors"
                  >
                    Apple Music
                  </a>
                  <a
                    href="https://www.youtube.com/@paulnaar9507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold bg-[#353534] text-white rounded hover:bg-[#DC2626] transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Tracks List */}
            <div className="lg:col-span-5 bg-[#1C1B1B] border border-white/[0.08] rounded-xl divide-y divide-white/[0.06]">
              <div className="px-6 py-4">
                <p className="font-display text-xs font-bold tracking-[0.12em] uppercase text-[#FFCA45]">
                  Temas Adicionales · Escucha Directa
                </p>
              </div>
              {additionalTracks.map((trk) => {
                const isTrkPlaying = currentTrack.id === trk.id && isPlaying;
                return (
                  <div
                    key={trk.id}
                    className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#2A2A2A]/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        type="button"
                        onClick={() => onPlayTrack(trk)}
                        aria-label={isTrkPlaying ? `Pausar ${trk.title}` : `Reproducir ${trk.title}`}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                          isTrkPlaying
                            ? 'bg-[#DC2626] text-white'
                            : 'bg-[#353534] text-white hover:bg-[#DC2626]'
                        }`}
                      >
                        {isTrkPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p className="font-display text-base font-bold text-white truncate">
                          {trk.number}. {trk.title}
                        </p>
                        <p className="text-xs text-[#E6BDB8] truncate">{trk.credits}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-white tabular-nums shrink-0">
                      {trk.durationLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BIOGRAFÍA, INFLUENCIAS, GIRA RÁPIDA & VIDEO 4K */}
      <section id="biografia" className="py-12 md:py-16 border-t border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                  Biografía &amp; Esencia Sonora
                </p>
                <blockquote className="font-display text-xl md:text-2xl font-bold text-white italic leading-snug mt-3">
                  {ARTIST_PROFILE.quote}
                </blockquote>
                <p className="text-xs text-[#FFCA45] font-semibold mt-2 uppercase tracking-wider">
                  — Paul Naar
                </p>

                <p className="text-sm md:text-base text-[#E6BDB8] leading-relaxed mt-5">
                  {ARTIST_PROFILE.discipline}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-start gap-3">
                <Music2 className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">
                    Orquesta en Vivo
                  </p>
                  <p className="text-sm text-[#E6BDB8] mt-1">{ARTIST_PROFILE.orchestraDetail}</p>
                </div>
              </div>
            </div>

            {/* Influences + Pool Hall Portrait */}
            <div className="lg:col-span-5 bg-[#1C1B1B] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col justify-between">
              <div className="relative h-48 overflow-hidden">
                <ArtistImage
                  src={ARTWORK_URLS.poolHallPortrait}
                  alt="Paul Naar — Precisión y Pasión"
                  fallbackVariant="teatro"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-[#1C1B1B]/30 to-transparent" />
                <div className="absolute bottom-3 left-6">
                  <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                    Linaje &amp; Influencias
                  </p>
                  <h3 className="font-display text-xl font-bold text-white">
                    Raíz Clásica Neoyorquina
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-3 flex-1 flex flex-col justify-between">
                <div className="divide-y divide-white/[0.06]">
                  {ARTIST_PROFILE.influences.map((inf, idx) => (
                    <div key={inf} className="py-2.5 flex items-center justify-between">
                      <span className="font-display text-base font-bold text-white">{inf}</span>
                      <span className="font-mono text-xs text-[#FFCA45] tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateScreen('booking')}
                  className="mt-4 stage-btn-outline w-full py-2.5 text-xs font-bold uppercase tracking-[0.06em] cursor-pointer"
                >
                  Ver Rider Técnico de 14 Músicos
                </button>
              </div>
            </div>
          </div>

          {/* Quick Tour Shows + 4K Video Clip Thumbnail */}
          <div id="videos" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 md:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div>
                    <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                      Gira Rápida · Tour 2026
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      Próximos Shows
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateScreen('gira')}
                    className="text-xs font-bold uppercase tracking-[0.06em] text-[#DC2626] hover:text-white cursor-pointer"
                  >
                    Ver Todas (6) →
                  </button>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {quickShows.map((show) => (
                    <div
                      key={show.id}
                      className="py-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-[#FFCA45] font-semibold">
                          {show.dateLabel}
                        </p>
                        <p className="font-display text-base font-bold text-white truncate">
                          {show.city}
                        </p>
                        <p className="text-xs text-[#E6BDB8] truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#DC2626] shrink-0" />
                          {show.venue}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenTicketModal(show)}
                        className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] rounded-[4px] shrink-0 cursor-pointer ${
                          show.status === 'Agotado'
                            ? 'border border-white/20 text-[#E6BDB8] hover:text-white'
                            : 'stage-btn-primary'
                        }`}
                      >
                        {show.ctaLabel}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail de Videoclip en 4K con imagen real En Vivo Bellas Artes */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#1C1B1B] min-h-[340px] group stage-card-glow">
              <ArtistImage
                src={ARTWORK_URLS.bellasArtes}
                alt="Videoclip Oficial 4K — Fuego en la Clave"
                fallbackVariant="encore"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(14,14,14,0.25) 0%, rgba(14,14,14,0.92) 100%)',
                }}
              />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <span className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                  Videoclip Oficial 4K · YouTube @paulnaar9507
                </span>

                <div className="flex items-center justify-center my-auto">
                  <button
                    type="button"
                    onClick={onOpenVideoModal}
                    aria-label="Reproducir videoclip oficial 4K de Paul Naar"
                    className="w-16 h-16 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white flex items-center justify-center stage-glow-crimson transition-transform group-hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-7 h-7 ml-1" />
                  </button>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Fuego en la Clave (En Vivo 4K)
                    </h3>
                    <p className="text-xs text-[#E6BDB8] mt-1">
                      Orquesta completa de 14 músicos · Dirección cinematográfica en tarima
                    </p>
                  </div>
                  <a
                    href="https://www.youtube.com/@paulnaar9507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stage-btn-outline px-3.5 py-2 text-xs font-bold uppercase tracking-[0.05em] inline-flex items-center gap-1.5"
                  >
                    Canal YouTube
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN COMUNIDAD & REDES + CÍRCULO BRAVO */}
      <section className="py-12 md:py-16 border-t border-white/[0.06] bg-[#131313]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 space-y-8">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
              Canales Oficiales Conectados
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2 uppercase">
              Comunidad &amp; Redes Sociales
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICIAL_SOCIALS.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1C1B1B] border border-white/[0.08] hover:border-[#DC2626] rounded-xl p-5 transition-all stage-card-glow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {renderSocialIcon(social.id)}
                    <ArrowUpRight className="w-4 h-4 text-[#E6BDB8] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mt-4">
                    {social.name}
                  </h3>
                  <p className="font-mono text-xs text-[#FFCA45] mt-0.5">{social.handle}</p>
                  <p className="text-xs text-[#E6BDB8] leading-relaxed mt-3">
                    {social.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Suscripción Círculo Bravo */}
          <div className="bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 md:p-8 stage-card-glow grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                Descarga Exclusiva para Suscriptores
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mt-1.5 uppercase">
                ÚNETE AL CÍRCULO BRAVO DE PAUL NAAR
              </h3>
              <p className="text-sm text-[#E6BDB8] mt-2">
                Recibe acceso inmediato a la descarga exclusiva del show acústico grabado en
                Cali, además de preventas VIP de la gira.
              </p>
            </div>

            <div className="lg:col-span-5">
              {circleJoined ? (
                <div className="p-4 bg-[#131313] border border-[#DC2626]/50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <Check className="w-4 h-4 text-[#FFCA45] shrink-0" />
                    <span>¡Bienvenido al Círculo Bravo!</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadAcousticCali}
                    className="stage-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar Show Cali
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCircleSubmit} noValidate className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={circleEmail}
                      onChange={(e) => setCircleEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      aria-label="Correo electrónico para Círculo Bravo"
                      className="flex-1 px-4 py-3 text-sm text-white bg-[#201F1F] border border-white/15 rounded focus:border-[#DC2626] focus:outline-none placeholder:text-[#E6BDB8]/60"
                    />
                    <button
                      type="submit"
                      className="stage-btn-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.06em] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      RECIBIR SHOW EN CALI
                    </button>
                  </div>
                  {circleError && (
                    <p role="alert" className="text-xs text-[#FFB4AB]">
                      {circleError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* 6. BANNER CTA */}
          <div className="bg-[#0E0E0E] border border-[#DC2626]/40 rounded-xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 stage-card-glow">
            <div>
              <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
                Temporada Internacional 2026 / 2027
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-1.5 uppercase">
                LLEVA EL SONIDO DE PAUL NAAR A TU CIUDAD
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateScreen('booking')}
              className="stage-btn-primary px-7 py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.06em] inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              IR A BOOKING OFICIAL
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
