import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  MapPin,
  Ticket,
  Bell,
  CheckCircle2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  ARTWORK_URLS,
  TOUR_CONCERTS,
  TourZone,
  ConcertDate,
  ScreenId,
} from '../data/paulNaarData';
import { ArtistImage } from './ArtistImage';

interface TourScreenProps {
  onOpenTicketModal: (concert: ConcertDate, vipUpgrade?: boolean) => void;
  onNavigateScreen: (screen: ScreenId) => void;
  onOpenRiderModal: () => void;
}

const ZONES: TourZone[] = ['Todos', 'Latinoamérica', 'Estados Unidos', 'Europa'];

export const TourScreen: React.FC<TourScreenProps> = ({
  onOpenTicketModal,
  onNavigateScreen,
  onOpenRiderModal,
}) => {
  const [zone, setZone] = useState<TourZone>('Todos');

  const filteredConcerts = TOUR_CONCERTS.filter(
    (c) => zone === 'Todos' || c.zone === zone
  );

  return (
    <div className="flex flex-col w-full">
      {/* Hero Headline & Tour Statement */}
      <section className="relative w-full overflow-hidden bg-[#0E0E0E] pt-10 pb-12 lg:pb-16">
        <div
          className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[130px]"
          style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)' }}
        />
        <div
          className="pointer-events-none absolute top-40 right-[-10%] w-[450px] h-[450px] rounded-full blur-[140px]"
          style={{ backgroundColor: 'rgba(255, 202, 69, 0.1)' }}
        />

        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFB4AB]">
              Gira Mundial En Curso
            </span>
            <span className="text-white/30">•</span>
            <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
              14 Músicos en Escena • Sonido En Vivo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1
                className="font-display font-extrabold uppercase tracking-tighter text-white leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                TOUR 2026:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB4AB] via-[#DC2626] to-[#FFCA45]">
                  FUEGO Y CLAVE
                </span>
              </h1>
              <p className="text-base md:text-lg text-[#E6BDB8] max-w-2xl leading-relaxed">
                Vive la experiencia de la salsa en vivo con Paul Naar y su orquesta completa.
                Revisa las fechas internacionales, asegura tus entradas y vibra con la pura salsa
                brava.
              </p>
            </div>

            {/* Quick Tour Stats Card */}
            <div className="lg:col-span-4 bg-[#1C1B1B] border border-white/[0.08] rounded-xl p-6 shadow-xl">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="block font-display text-3xl font-bold text-[#FFB4AB] tabular-nums">
                    18
                  </span>
                  <span className="block font-display text-[10px] font-bold uppercase text-[#E6BDB8] mt-1">
                    Ciudades
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-[#FFCA45] tabular-nums">
                    14
                  </span>
                  <span className="block font-display text-[10px] font-bold uppercase text-[#E6BDB8] mt-1">
                    Músicos
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-white tabular-nums">
                    100%
                  </span>
                  <span className="block font-display text-[10px] font-bold uppercase text-[#E6BDB8] mt-1">
                    En Vivo
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#E6BDB8]">
                <span className="font-semibold text-[#FFCA45]">Boletos Oficiales</span>
                <span className="text-[#DC2626] font-semibold">Tributo &amp; Originales</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-[#1C1B1B]/80 backdrop-blur-md p-2 rounded-xl border border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-1.5">
              {ZONES.map((z) => {
                const count =
                  z === 'Todos'
                    ? TOUR_CONCERTS.length
                    : TOUR_CONCERTS.filter((c) => c.zone === z).length;
                return (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZone(z)}
                    className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      zone === z
                        ? 'bg-[#DC2626] text-white'
                        : 'text-[#E6BDB8] hover:text-white hover:bg-[#2A2A2A]'
                    }`}
                  >
                    {z} ({count})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 px-3 text-xs text-[#E6BDB8]">
              <span>Venta Rápida</span>
              <span className="text-[#FFCA45]">VIP Disponible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Dates List */}
      <section className="w-full bg-[#0E0E0E] pb-16">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6 space-y-3">
          {filteredConcerts.map((concert) => {
            const isSoldOut = concert.status === 'Agotado';
            const isUrgent = concert.status === 'Últimas Entradas';
            const isVipPresale = concert.status === 'Preventa VIP';

            return (
              <article
                key={concert.id}
                className={`group rounded-xl p-5 lg:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-white/[0.06] transition-all duration-300 ${
                  isSoldOut
                    ? 'bg-[#1C1B1B]/70 opacity-90'
                    : 'bg-[#1C1B1B] hover:bg-[#201F1F] hover:border-[#DC2626]/50 hover:shadow-[0_12px_36px_-6px_rgba(220,38,38,0.22)]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Big Date Badge */}
                  <div
                    className={`w-24 shrink-0 flex flex-col justify-center items-center py-2.5 px-3 rounded-lg transition-colors ${
                      isSoldOut
                        ? 'bg-[#2A2A2A] text-[#E6BDB8]'
                        : 'bg-[#2A2A2A] group-hover:bg-[#DC2626] text-white'
                    }`}
                  >
                    <span className="font-display text-[11px] font-bold uppercase tracking-widest">
                      {concert.month}
                    </span>
                    <span
                      className={`font-display text-4xl font-extrabold leading-none my-0.5 tabular-nums ${
                        isSoldOut ? 'line-through opacity-60' : ''
                      }`}
                    >
                      {concert.day}
                    </span>
                    <span className="text-xs tracking-wider opacity-90 tabular-nums">
                      {concert.year}
                    </span>
                  </div>

                  {/* Location & Venue Details */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`font-display text-[11px] font-bold uppercase tracking-wider ${
                          isSoldOut
                            ? 'text-[#E6BDB8] line-through'
                            : isUrgent
                            ? 'text-[#DC2626]'
                            : isVipPresale
                            ? 'text-[#FFCA45]'
                            : 'text-emerald-400'
                        }`}
                      >
                        {concert.status}
                      </span>
                      <span className="text-white/25">·</span>
                      <span className="text-xs text-[#E6BDB8] inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FFCA45]" />
                        20:30 Local
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-white group-hover:text-[#FFB4AB] transition-colors">
                      {concert.city}
                    </h2>
                    <p className="text-sm text-[#E6BDB8] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
                      {concert.venue}
                    </p>
                  </div>
                </div>

                {/* Action Area */}
                <div className="flex flex-wrap items-center gap-3">
                  {!isSoldOut && (
                    <button
                      type="button"
                      onClick={() => onOpenTicketModal(concert, true)}
                      className="px-4 py-2.5 rounded-lg bg-[#2A2A2A] text-[#FFCA45] hover:bg-[#FFCA45] hover:text-[#3F2E00] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      VIP Lounge
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenTicketModal(concert, false)}
                    className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition-all ${
                      isSoldOut
                        ? 'bg-[#2A2A2A] hover:bg-[#353534] text-white'
                        : 'stage-btn-primary'
                    }`}
                  >
                    {isSoldOut ? (
                      <>
                        <Bell className="w-4 h-4 text-[#FFCA45]" />
                        Lista de Espera
                      </>
                    ) : (
                      <>
                        <span>Comprar Tickets</span>
                        <Ticket className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* LA EXPERIENCIA EN VIVO (Bento Grid with Hotlinked Portraits) */}
      <section className="w-full bg-[#1C1B1B] py-14">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFB4AB]">
                Detrás del Escenario
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight mt-1">
                LA EXPERIENCIA <span className="text-[#FFCA45]">EN VIVO</span>
              </h2>
            </div>
            <p className="text-sm text-[#E6BDB8] max-w-md">
              Un despliegue orquestal con arreglos de vientos afilados, percusión afrocubana de alta
              precisión y el carisma magnético de Paul Naar en cada escenario.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Big Feature: Backstage Lounge Portrait */}
            <div className="lg:col-span-7 bg-[#201F1F] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between group border border-white/[0.06]">
              <div className="relative h-[360px] sm:h-[420px] overflow-hidden">
                <ArtistImage
                  src={ARTWORK_URLS.backstageLounge}
                  alt="Paul Naar en camerino con iluminación carmesí"
                  fallbackVariant="spotlight"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201F1F] via-[#201F1F]/25 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#0E0E0E]/85 backdrop-blur-md px-3 py-1.5 rounded">
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white">
                    Backstage Lounge
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45] block mb-1">
                    La Esencia del Cantautor
                  </span>
                  <p className="font-display text-xl font-bold text-white">
                    “Cada tarima es un compromiso con el baile, el corazón y el sonido auténtico.”
                  </p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#201F1F]">
                <div className="space-y-1">
                  <span className="font-display text-[11px] font-bold uppercase text-[#FFB4AB] tracking-widest">
                    Sección de Metales
                  </span>
                  <p className="text-xs text-[#E6BDB8] leading-relaxed">
                    3 trompetas, 2 trombones y saxo barítono ejecutados por leyendas de la salsa
                    brava caribeña.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-[11px] font-bold uppercase text-[#FFCA45] tracking-widest">
                    Clave &amp; Ritmo
                  </span>
                  <p className="text-xs text-[#E6BDB8] leading-relaxed">
                    Congas, bongó de piel y timbal afinados a fuego vivo bajo la batuta y rima de
                    Paul Naar.
                  </p>
                </div>
              </div>
            </div>

            {/* Side Stack: Billiard Focus + VIP Soundcheck */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative bg-[#201F1F] rounded-xl overflow-hidden shadow-xl group h-[260px] border border-white/[0.06]">
                <ArtistImage
                  src={ARTWORK_URLS.billiardFocus}
                  alt="Paul Naar concentración y precisión"
                  fallbackVariant="percussion"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201F1F] via-[#201F1F]/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFB4AB]">
                    Precisión y Enfoque
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-0.5">
                    El Son Se Trabaja Golpe a Golpe
                  </h3>
                </div>
              </div>

              {/* VIP Meet & Greet Box */}
              <div className="flex-1 bg-[#2A2A2A] rounded-xl p-6 shadow-xl flex flex-col justify-between border border-[#FFCA45]/25">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded bg-[#FFCA45] text-[#3F2E00] font-display text-[11px] font-bold uppercase tracking-widest">
                      Experiencia VIP Exclusiva
                    </span>
                    <span className="font-display text-xl font-bold text-[#FFCA45] tabular-nums">
                      $180 <span className="text-xs text-[#E6BDB8] font-normal">/ pase</span>
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Pase Soundcheck + Camerinos
                  </h3>
                  <ul className="space-y-2.5 text-xs text-[#E6BDB8]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFCA45] shrink-0" />
                      <span>Acceso anticipado exclusivo a la prueba de sonido de orquesta.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFCA45] shrink-0" />
                      <span>Foto profesional Meet &amp; Greet individual con Paul Naar.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFCA45] shrink-0" />
                      <span>Laminado VIP conmemorativo oficial de la gira 2026.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-white/[0.08]">
                  <span className="font-display text-[10px] font-bold uppercase text-[#E6BDB8]">
                    Cupos limitados por ciudad
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenTicketModal(TOUR_CONCERTS[0], true)}
                    className="px-4 py-2 rounded bg-[#201F1F] text-white hover:text-[#FFCA45] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                  >
                    Reservar VIP <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promoters Callout */}
      <section className="w-full bg-[#0E0E0E] py-14">
        <div className="max-w-[1360px] mx-auto px-4 lg:px-6">
          <div className="bg-gradient-to-r from-[#1C1B1B] via-[#201F1F] to-[#1C1B1B] rounded-xl p-6 lg:p-12 shadow-2xl border border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#DC2626]">
                  Promotores, Teatros y Ferias
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                  ¿Quieres a Paul Naar en tu ciudad o evento privado?
                </h2>
                <p className="text-sm md:text-base text-[#E6BDB8] max-w-xl">
                  Disponibilidad para festivales mundiales, arenas, congresos de salsa y galas
                  privadas. Descarga el rider técnico completo o contacta a nuestro equipo de
                  management directo.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateScreen('booking')}
                  className="w-full stage-btn-primary py-3.5 px-6 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Solicitar Cotización
                </button>
                <button
                  type="button"
                  onClick={onOpenRiderModal}
                  className="w-full py-3 px-6 rounded bg-[#2A2A2A] text-white hover:text-[#FFCA45] text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Descargar Rider Técnico
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
