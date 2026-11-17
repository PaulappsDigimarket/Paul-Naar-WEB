import React, { useState } from 'react';
import {
  Play,
  Pause,
  Download,
  Check,
  Disc3,
  FileText,
  Radio,
  Headphones,
  Heart,
  Music,
} from 'lucide-react';
import {
  ARTWORK_URLS,
  CORAZON_TRACKLIST,
  DISCOGRAPHY_CATALOG,
  HOME_TRACKS,
  DiscographyCategory,
  AudioTrack,
} from '../data/paulNaarData';
import { ArtistImage } from './ArtistImage';

interface DiscographyScreenProps {
  currentTrack: AudioTrack;
  isPlaying: boolean;
  onPlayTrack: (track: AudioTrack) => void;
  onOpenLyrics: (track: AudioTrack) => void;
}

const CATEGORIES: DiscographyCategory[] = [
  'Todos',
  'Álbumes',
  'Sencillos',
  'En Vivo',
  'Colaboraciones',
];

export const DiscographyScreen: React.FC<DiscographyScreenProps> = ({
  currentTrack,
  isPlaying,
  onPlayTrack,
  onOpenLyrics,
}) => {
  const [activeCategory, setActiveCategory] = useState<DiscographyCategory>('Todos');
  const [epkDownloaded, setEpkDownloaded] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  const filteredCatalog = DISCOGRAPHY_CATALOG.filter(
    (item) => activeCategory === 'Todos' || item.category === activeCategory
  );

  const showAlbumHighlight =
    activeCategory === 'Todos' || activeCategory === 'Álbumes';

  const handleDownloadEpk = () => {
    const manifest = [
      'PAUL NAAR — EPK & PACK RADIAL PARA DJS (EDICIÓN 2026)',
      'Álbum: CORAZÓN DE RUMBERO (10 Temas · Naar Records)',
      'Contenido del paquete oficial:',
      '- Stems multitrack 96kHz / 24-Bit (Metales, Percusión Afrocubana, Voz Principal)',
      '- Versiones Intro/Outro Extended, Acapellas e Instrumentales WAV para DJs',
      '- Cuñas oficiales de radio (ID de Radio Paul Naar)',
      '- Hojas de crédito oficiales autorizadas por Naar Records',
      '',
      'Contacto Prensa & Radio: management@paulnaarofficial.com',
      'Canal YouTube: https://www.youtube.com/@paulnaar9507',
    ].join('\n');

    const blob = new Blob([manifest], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Paul_Naar_EPK_Pack_Radial_DJs_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
    setEpkDownloaded(true);
    window.setTimeout(() => setEpkDownloaded(false), 3500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Title & Filter Bar */}
      <section className="relative w-full overflow-hidden bg-[#0E0E0E] pb-6 pt-8">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[360px] rounded-full blur-[130px]"
          style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }}
        />
        <div
          className="pointer-events-none absolute top-40 right-[-100px] w-[350px] h-[350px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(255, 202, 69, 0.1)' }}
        />

        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#FFCA45] mb-2">
                <Disc3 className="w-4 h-4" />
                <span className="font-display text-[11px] font-bold uppercase tracking-widest">
                  Catálogo Fonográfico Oficial
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">
                Discografía &amp; <span className="text-[#DC2626]">Lanzamientos</span>
              </h1>
              <p className="text-sm md:text-base text-[#E6BDB8] mt-2 max-w-xl">
                Explora los álbumes, sencillos y colaboraciones de Paul Naar con arreglos de salsa
                dura, salsa romántica y vanguardia de orquesta latina en vivo.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtrar discografía"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#201F1F] rounded-full"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-xs font-semibold uppercase px-4 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#DC2626] text-white'
                      : 'text-[#E6BDB8] hover:text-white hover:bg-[#2A2A2A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Master Release: Corazón de Rumbero */}
      {showAlbumHighlight && (
        <section className="w-full relative z-10 pb-10">
          <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
            <div className="relative rounded-xl overflow-hidden bg-[#1C1B1B] shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
              <div
                className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Album Artwork Column */}
                <div className="lg:col-span-5 relative group overflow-hidden bg-[#0E0E0E] min-h-[420px] lg:min-h-full">
                  <ArtistImage
                    src={ARTWORK_URLS.corazonRumbero}
                    alt="Corazón de Rumbero - Álbum de Estudio de Paul Naar"
                    fallbackVariant="vinyl"
                    isSpinning={isPlaying}
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/20 to-transparent lg:hidden" />

                  <div className="absolute top-4 left-4 bg-[#0E0E0E]/85 backdrop-blur-md px-3 py-1.5 rounded">
                    <span className="font-display text-[11px] font-bold uppercase text-white tracking-wider">
                      Nuevo Lanzamiento 2026
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#0E0E0E]/90 backdrop-blur-md hidden sm:flex items-center justify-between">
                    <div>
                      <div className="font-display text-[11px] font-bold uppercase text-[#FFCA45]">
                        Mastering Hi-Res
                      </div>
                      <div className="text-xs font-semibold text-white">
                        96kHz / 24-bit Studio Master
                      </div>
                    </div>
                    <span className="font-display text-xl font-bold text-[#DC2626]">10 Temas</span>
                  </div>
                </div>

                {/* Album Info & Tracklist Column */}
                <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[#E6BDB8] font-display text-[11px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-[#FFCA45]">Álbum de Estudio</span>
                      <span>•</span>
                      <span>Producción 2026</span>
                      <span>•</span>
                      <span className="text-white">Salsa Brava • Salsa Moderna</span>
                    </div>

                    <h2 className="font-display text-4xl lg:text-6xl font-extrabold uppercase text-white tracking-tighter leading-none">
                      Corazón de <span className="text-[#DC2626]">Rumbero</span>
                    </h2>

                    <p className="text-sm md:text-base text-[#E6BDB8] mt-3 max-w-2xl leading-relaxed">
                      La consagración sonora de Paul Naar: secciones de vientos rugientes, métricas
                      de tambor batá y líricas que retratan el alma del barrio latino contemporáneo
                      sin perder la cadencia elegante del son tradicional.
                    </p>

                    {/* Tracklist Module */}
                    <div className="mt-6 space-y-1.5">
                      {CORAZON_TRACKLIST.map((track) => {
                        const isActive = currentTrack.id === track.id;
                        const isTrkPlaying = isActive && isPlaying;
                        return (
                          <div
                            key={track.id}
                            onClick={() => onPlayTrack(track)}
                            className={`group flex items-center justify-between p-2.5 sm:p-3 rounded transition-colors cursor-pointer ${
                              isActive ? 'bg-[#2A2A2A]' : 'hover:bg-[#2A2A2A]/70'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onPlayTrack(track);
                                }}
                                aria-label={
                                  isTrkPlaying
                                    ? `Pausar ${track.title}`
                                    : `Reproducir ${track.title}`
                                }
                                className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${
                                  isTrkPlaying
                                    ? 'bg-[#DC2626] text-white'
                                    : 'bg-[#353534] group-hover:bg-[#DC2626] text-white'
                                }`}
                              >
                                {isTrkPlaying ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4 ml-0.5" />
                                )}
                              </button>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`font-display text-[11px] font-bold ${
                                      isActive ? 'text-[#DC2626]' : 'text-[#E6BDB8]'
                                    }`}
                                  >
                                    {track.number}
                                  </span>
                                  <span className="text-sm font-semibold text-white truncate">
                                    {track.title}
                                  </span>
                                  {track.genreTag === 'Focus Track' && (
                                    <span className="hidden sm:inline font-display text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E4AE00]/20 text-[#FFCA45] uppercase">
                                      Focus Track
                                    </span>
                                  )}
                                  {track.genreTag === 'Romántica' && (
                                    <span className="hidden sm:inline font-display text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#201F1F] text-[#E6BDB8] uppercase">
                                      Romántica
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-[#E6BDB8] truncate block">
                                  {track.credits}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenLyrics(track);
                                }}
                                title="Ver Letra Oficial"
                                aria-label={`Ver letra de ${track.title}`}
                                className="p-1.5 text-[#E6BDB8] hover:text-[#FFCA45] transition-colors cursor-pointer"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              <span className="font-mono text-xs font-semibold text-[#E6BDB8] tabular-nums">
                                {track.durationLabel}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Direct DSP External Links */}
                  <div className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 bg-[#201F1F] p-4 rounded">
                    <div className="flex items-center gap-2 text-white">
                      <Headphones className="w-4 h-4 text-[#DC2626]" />
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                        Escúchalo en Plataformas:
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { label: 'Spotify', url: 'https://spotify.com' },
                        { label: 'Apple Music', url: 'https://apple.com/music' },
                        { label: 'YouTube Music', url: 'https://www.youtube.com/@paulnaar9507' },
                        { label: 'Deezer', url: 'https://deezer.com' },
                      ].map((dsp) => (
                        <a
                          key={dsp.label}
                          href={dsp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded bg-[#353534] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors"
                        >
                          {dsp.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Highlight Band: Quote & DJ Promo Pack */}
      <section className="w-full bg-[#1C1B1B] py-10 relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
                Frase Clave de la Producción
              </span>
              <blockquote className="font-display text-2xl md:text-4xl font-bold text-white italic leading-tight">
                “La salsa no se piensa, se vive en cada paso, en cada descarga y en la mirada del
                que suda por amor al ritmo.”
              </blockquote>
              <p className="text-sm text-[#E6BDB8] uppercase tracking-wider pt-1">
                — Paul Naar • De la suite lírica de{' '}
                <span className="text-[#FFCA45] font-semibold">Corazón de Rumbero</span>
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#201F1F] p-6 rounded-xl shadow-lg flex flex-col justify-between border border-white/[0.06]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-bold text-[#FFCA45] uppercase tracking-widest">
                    Zona Profesionales
                  </span>
                  <Radio className="w-5 h-5 text-[#DC2626]" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-white mt-2">
                  EPK &amp; Pack Radial para DJs
                </h3>
                <p className="text-xs text-[#E6BDB8] mt-1.5 leading-relaxed">
                  Descarga directa en WAV (sin compresión), acapellas, stems de percusión y hojas
                  de crédito oficiales autorizadas por Naar Records.
                </p>
              </div>
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleDownloadEpk}
                  className="w-full stage-btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {epkDownloaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Promo Pack Descargado
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      EPK &amp; Pack Radial para DJs (ZIP 418 MB)
                    </>
                  )}
                </button>
                <div className="flex items-center justify-between text-[#E6BDB8] font-display text-[10px] font-bold uppercase tracking-wider">
                  <span>Incluye Intro/Outro Extended</span>
                  <span>ID de Radio Paul Naar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discography Grid Section */}
      <section className="w-full py-12 bg-[#0E0E0E]">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-8">
            <div>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45] block mb-1">
                Archivo de Lanzamientos
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-white">
                Discografía <span className="text-[#DC2626]">Completa</span>
              </h2>
            </div>
            <div className="text-xs text-[#E6BDB8]">
              Mostrando <span className="text-white font-semibold">{filteredCatalog.length} producciones</span> destacadas
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCatalog.map((item) => {
              const isSaved = Boolean(savedIds[item.id]);
              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between bg-[#1C1B1B] rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-white/[0.06] hover:border-[#DC2626]/60 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-square bg-[#201F1F]">
                    <ArtistImage
                      src={item.coverUrl}
                      alt={`${item.title} Portada`}
                      fallbackVariant={item.variant}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`font-display text-[10px] font-bold uppercase px-2.5 py-1 rounded tracking-wider ${
                          item.category === 'Sencillos'
                            ? 'bg-[#DC2626] text-white'
                            : item.format === 'EP Especial'
                            ? 'bg-[#E4AE00] text-[#3F2E00]'
                            : item.category === 'En Vivo'
                            ? 'bg-[#D63135] text-white'
                            : 'bg-[#201F1F] text-white'
                        }`}
                      >
                        {item.format}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onPlayTrack(
                          item.id === 'rel-fuego'
                            ? HOME_TRACKS[0]
                            : item.id === 'rel-guaguanco'
                            ? CORAZON_TRACKLIST[4]
                            : CORAZON_TRACKLIST[0]
                        )
                      }
                      aria-label={`Reproducir ${item.title}`}
                      className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[#E6BDB8] font-display text-[11px] font-bold uppercase mb-1">
                        <span>{item.year}</span>
                        <span>{item.meta}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold uppercase text-white group-hover:text-[#DC2626] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#E6BDB8] mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#FFCA45]">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://spotify.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Spotify"
                          className="text-[#E6BDB8] hover:text-[#DC2626] transition-colors"
                        >
                          <Music className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            setSavedIds((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                          }
                          title="Guardar en favoritos"
                          className={`transition-colors cursor-pointer ${
                            isSaved ? 'text-[#DC2626]' : 'text-[#E6BDB8] hover:text-[#DC2626]'
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
