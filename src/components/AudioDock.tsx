import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AudioTrack } from '../data/paulNaarData';

interface AudioDockProps {
  track: AudioTrack;
  isPlaying: boolean;
  currentTime: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onToggleMute: () => void;
}

function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export const AudioDock: React.FC<AudioDockProps> = ({
  track,
  isPlaying,
  currentTime,
  isMuted,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onToggleMute,
}) => {
  const progressRatio =
    track.durationSec > 0 ? Math.min(1, currentTime / track.durationSec) : 0;

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * track.durationSec);
  };

  return (
    <div
      role="region"
      aria-label="Reproductor Maestro Paul Naar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.1] shadow-[0_-8px_32px_rgba(0,0,0,0.75)]"
      style={{
        backgroundColor: 'rgba(32, 31, 31, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-4 lg:px-6 h-16 md:h-[74px] flex items-center justify-between gap-4">
        {/* Track Thumbnail + Info */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={track.coverUrl}
            alt={track.title}
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded object-cover shrink-0 border border-white/10"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Tema anterior"
              className="hidden sm:flex p-1.5 text-[#E6BDB8] hover:text-white transition-colors cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pausar reproducción' : 'Iniciar reproducción'}
              className="w-10 h-10 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white flex items-center justify-center shrink-0 stage-glow-crimson cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Tema siguiente"
              className="hidden sm:flex p-1.5 text-[#E6BDB8] hover:text-white transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{track.title}</p>
            <p className="text-xs text-[#FFCA45] truncate">Paul Naar • {track.credits}</p>
          </div>
        </div>

        {/* Center Waveform */}
        <div className="hidden md:flex flex-1 max-w-md items-center gap-3">
          <span className="font-mono text-[11px] text-[#E6BDB8] tabular-nums w-11 text-right shrink-0">
            {formatTime(currentTime)}
          </span>

          <div
            role="slider"
            tabIndex={0}
            aria-label="Progreso de reproducción"
            aria-valuemin={0}
            aria-valuemax={track.durationSec}
            aria-valuenow={Math.floor(currentTime)}
            onClick={handleWaveformClick}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') onSeek(Math.min(track.durationSec, currentTime + 10));
              if (e.key === 'ArrowLeft') onSeek(Math.max(0, currentTime - 10));
            }}
            className="flex-1 h-9 flex items-center cursor-pointer"
          >
            <svg
              viewBox={`0 0 ${track.waveform.length * 6} 36`}
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {track.waveform.map((amp, idx) => {
                const barRatio = idx / track.waveform.length;
                const isPlayed = barRatio <= progressRatio;
                const barH = Math.max(4, (amp / 100) * 30);
                const y = (36 - barH) / 2;
                return (
                  <rect
                    key={idx}
                    x={idx * 6}
                    y={y}
                    width="3.5"
                    height={barH}
                    rx="1.5"
                    fill={isPlayed ? '#DC2626' : 'rgba(230, 189, 184, 0.25)'}
                  />
                );
              })}
            </svg>
          </div>

          <span className="font-mono text-[11px] text-[#E6BDB8] tabular-nums w-11 shrink-0">
            {track.durationLabel}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="md:hidden font-mono text-[11px] text-[#E6BDB8] tabular-nums">
            {formatTime(currentTime)} / {track.durationLabel}
          </span>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            className="p-2 text-[#E6BDB8] hover:text-white border border-white/10 rounded cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#FFB4AB]" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#353534] hover:bg-[#DC2626] text-white rounded transition-colors whitespace-nowrap"
          >
            Abrir en App
          </a>
        </div>
      </div>
    </div>
  );
};
