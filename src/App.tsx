import { useState, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import {
  ARTIST_PROFILE,
  CORAZON_TRACKLIST,
  HOME_TRACKS,
  AudioTrack,
  ConcertDate,
  ScreenId,
} from './data/paulNaarData';
import { salsaSynth } from './audio/salsaSynth';
import { TopNav } from './components/TopNav';
import { HomeScreen } from './components/HomeScreen';
import { DiscographyScreen } from './components/DiscographyScreen';
import { TourScreen } from './components/TourScreen';
import { BookingScreen } from './components/BookingScreen';
import { AudioDock } from './components/AudioDock';
import {
  TicketModal,
  LyricsModal,
  VideoModal,
  RiderModal,
} from './components/PaulNaarModals';

const ALL_TRACKS: AudioTrack[] = [...HOME_TRACKS, ...CORAZON_TRACKLIST];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('inicio');
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  // Audio player state
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals state
  const [ticketConcert, setTicketConcert] = useState<ConcertDate | null>(null);
  const [ticketVipMode, setTicketVipMode] = useState<boolean>(false);
  const [lyricsTrack, setLyricsTrack] = useState<AudioTrack | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [riderModalOpen, setRiderModalOpen] = useState<boolean>(false);

  // Footer Club de la Salsa newsletter state
  const [clubEmail, setClubEmail] = useState('');
  const [clubJoined, setClubJoined] = useState(false);

  const currentTrack = ALL_TRACKS[trackIndex] ?? ALL_TRACKS[0];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentTime((prev) => {
        if (prev + 1 >= currentTrack.durationSec) {
          const nextIdx = (trackIndex + 1) % ALL_TRACKS.length;
          const nextTrk = ALL_TRACKS[nextIdx];
          setTrackIndex(nextIdx);
          salsaSynth.setTrackParams(nextTrk.bpm, nextTrk.baseFreq);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlaying, trackIndex, currentTrack.durationSec]);

  useEffect(() => {
    return () => {
      salsaSynth.pause();
    };
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      salsaSynth.pause();
      setIsPlaying(false);
    } else {
      salsaSynth.start(currentTrack.bpm, currentTrack.baseFreq);
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack.bpm, currentTrack.baseFreq]);

  const handlePlayTrack = useCallback(
    (track: AudioTrack) => {
      const idx = ALL_TRACKS.findIndex((t) => t.id === track.id);
      if (idx === -1) return;

      if (idx === trackIndex) {
        handleTogglePlay();
      } else {
        setTrackIndex(idx);
        setCurrentTime(0);
        salsaSynth.start(track.bpm, track.baseFreq);
        setIsPlaying(true);
      }
    },
    [trackIndex, handleTogglePlay]
  );

  const handlePrev = useCallback(() => {
    const prevIdx = (trackIndex - 1 + ALL_TRACKS.length) % ALL_TRACKS.length;
    const prevTrk = ALL_TRACKS[prevIdx];
    setTrackIndex(prevIdx);
    setCurrentTime(0);
    if (isPlaying) {
      salsaSynth.setTrackParams(prevTrk.bpm, prevTrk.baseFreq);
    }
  }, [trackIndex, isPlaying]);

  const handleNext = useCallback(() => {
    const nextIdx = (trackIndex + 1) % ALL_TRACKS.length;
    const nextTrk = ALL_TRACKS[nextIdx];
    setTrackIndex(nextIdx);
    setCurrentTime(0);
    if (isPlaying) {
      salsaSynth.setTrackParams(nextTrk.bpm, nextTrk.baseFreq);
    }
  }, [trackIndex, isPlaying]);

  const handleSeek = useCallback((seconds: number) => {
    setCurrentTime(Math.max(0, seconds));
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      salsaSynth.setVolume(0.65, next);
      return next;
    });
  }, []);

  const handleSelectNav = (screen: ScreenId, anchor?: string) => {
    setActiveScreen(screen);
    setActiveAnchor(anchor ?? null);

    if (anchor) {
      window.setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenTicketModal = (concert: ConcertDate, vipUpgrade = false) => {
    setTicketConcert(concert);
    setTicketVipMode(vipUpgrade);
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clubEmail.trim())) {
      setClubJoined(true);
      setClubEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#E5E2E1] flex flex-col">
      <TopNav
        activeScreen={activeScreen}
        activeAnchor={activeAnchor}
        onSelectNav={handleSelectNav}
      />

      {/* Screen Switcher Bar */}
      <div className="bg-[#131313] border-b border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {(
              [
                { id: 'inicio', label: '01 · Inicio' },
                { id: 'musica', label: '02 · Música & Lanzamientos' },
                { id: 'gira', label: '03 · Tour 2026: Fuego y Clave' },
                { id: 'booking', label: '04 · Booking & Contrataciones' },
              ] as Array<{ id: ScreenId; label: string }>
            ).map((scr) => (
              <button
                key={scr.id}
                type="button"
                onClick={() => handleSelectNav(scr.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeScreen === scr.id
                    ? 'bg-[#DC2626] text-white'
                    : 'text-[#E6BDB8] hover:text-white hover:bg-[#1C1B1B]'
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>

          <span className="hidden lg:inline font-mono text-[11px] text-[#E6BDB8] shrink-0">
            {ARTIST_PROFILE.bookingEmail} · {ARTIST_PROFILE.bookingPhone}
          </span>
        </div>
      </div>

      <main className="flex-1">
        {activeScreen === 'inicio' && (
          <HomeScreen
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            onPlayTrack={handlePlayTrack}
            onSeek={handleSeek}
            onNavigateScreen={(s) => handleSelectNav(s)}
            onOpenTicketModal={(c) => handleOpenTicketModal(c, false)}
            onOpenVideoModal={() => setVideoModalOpen(true)}
          />
        )}

        {activeScreen === 'musica' && (
          <DiscographyScreen
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayTrack={handlePlayTrack}
            onOpenLyrics={(track) => setLyricsTrack(track)}
          />
        )}

        {activeScreen === 'gira' && (
          <TourScreen
            onOpenTicketModal={handleOpenTicketModal}
            onNavigateScreen={(s) => handleSelectNav(s)}
            onOpenRiderModal={() => setRiderModalOpen(true)}
          />
        )}

        {activeScreen === 'booking' && <BookingScreen />}
      </main>

      {/* 4-Column Footer: El Club de la Salsa */}
      <footer className="w-full bg-[#1C1B1B] text-[#E5E2E1] mt-10 pb-24 border-t border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/[0.06]">
            <div className="lg:col-span-4 space-y-3">
              <div className="font-display text-2xl font-bold tracking-tight uppercase text-white">
                Paul<span className="text-[#DC2626] ml-1">Naar</span>
              </div>
              <p className="text-xs text-[#E6BDB8] max-w-sm leading-relaxed">
                Voz líder, compositor y exponente de la salsa brava contemporánea. Energía escénica
                arrolladora y sonido de orquesta en vivo.
              </p>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45] block">
                Salsa Dura • Son • Bolero
              </span>
            </div>

            <div className="lg:col-span-2 space-y-2.5">
              <div className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
                Navegación
              </div>
              <ul className="space-y-1.5 text-xs text-[#E6BDB8]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('inicio')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('musica')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Música &amp; Lanzamientos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('inicio', 'biografia')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Biografía Oficial
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('gira')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Gira y Fechas
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('inicio', 'videos')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Videos en Vivo
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectNav('booking')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Rider &amp; Contrataciones
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-2.5">
              <div className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
                Comunidad
              </div>
              <ul className="space-y-1.5 text-xs text-[#E6BDB8]">
                <li>
                  <a
                    href="https://www.youtube.com/@paulnaar9507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    YouTube (@paulnaar9507)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/paulnaar2026/reels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram (@paulnaar2026)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100075986866922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook Oficial
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@paulnaar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    TikTok (@paulnaar)
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setRiderModalOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Prensa y Media Kit
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
                El Club de la Salsa
              </div>
              <p className="text-xs text-[#E6BDB8] leading-relaxed">
                Recibe accesos exclusivos de preventa, pases de camerino, lanzamientos anticipados y
                material inédito de Paul Naar.
              </p>
              {clubJoined ? (
                <p className="text-xs text-[#FFCA45] font-semibold inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> ¡Suscrito al Club de la Salsa!
                </p>
              ) : (
                <form onSubmit={handleClubSubmit} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={clubEmail}
                      onChange={(e) => setClubEmail(e.target.value)}
                      placeholder="Ingresa tu correo electrónico"
                      className="flex-1 bg-[#201F1F] text-xs text-white placeholder:text-[#E6BDB8]/60 px-3.5 py-2.5 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                    />
                    <button
                      type="submit"
                      className="stage-btn-primary text-xs font-bold uppercase tracking-wider px-4 py-2.5 shrink-0 cursor-pointer"
                    >
                      Unirse
                    </button>
                  </div>
                  <span className="font-display text-[10px] font-bold text-[#E6BDB8] block">
                    Respetamos tu privacidad. Solo salsa pura.
                  </span>
                </form>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E6BDB8]">
            <div>© 2026 Paul Naar. Todos los derechos reservados.</div>
            <div className="flex items-center gap-4 font-display text-[10px] font-bold uppercase">
              <button
                type="button"
                onClick={() => handleSelectNav('booking')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Management
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setRiderModalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Rider Técnico
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AudioDock
        track={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        isMuted={isMuted}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrev}
        onNext={handleNext}
        onSeek={handleSeek}
        onToggleMute={handleToggleMute}
      />

      <TicketModal
        concert={ticketConcert}
        vipMode={ticketVipMode}
        onClose={() => setTicketConcert(null)}
      />

      <LyricsModal
        track={lyricsTrack}
        onClose={() => setLyricsTrack(null)}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <RiderModal
        isOpen={riderModalOpen}
        onClose={() => setRiderModalOpen(false)}
      />
    </div>
  );
}
