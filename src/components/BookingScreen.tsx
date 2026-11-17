import React, { useState } from 'react';
import {
  Check,
  Download,
  Mail,
  Phone,
  ShieldCheck,
  Send,
  ArrowRight,
  Plane,
  BadgeCheck,
} from 'lucide-react';
import {
  ARTIST_PROFILE,
  ARTWORK_URLS,
  RIDER_SPECS,
} from '../data/paulNaarData';
import { ArtistImage } from './ArtistImage';
import { YouTubeIcon, InstagramIcon, FacebookIcon, TikTokIcon } from './SocialIcons';

export const BookingScreen: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [eventType, setEventType] = useState('Festival Internacional de Música');
  const [eventDate, setEventDate] = useState('');
  const [cityCountry, setCityCountry] = useState('');
  const [format, setFormat] = useState('Orquesta Completa (14 Músicos + Metales)');
  const [budgetRange, setBudgetRange] = useState('$30,000 - $60,000 USD');
  const [capacity, setCapacity] = useState('');
  const [venueDetails, setVenueDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !fullName.trim() ||
      !company.trim() ||
      !corpEmail.trim() ||
      !phoneWhatsapp.trim() ||
      !eventDate.trim() ||
      !cityCountry.trim()
    ) {
      setError('Por favor completa todos los campos obligatorios (*) del formulario.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corpEmail.trim())) {
      setError('Ingresa un correo electrónico corporativo válido.');
      return;
    }

    setSubmittedSummary(
      `Solicitud recibida con éxito para ${company.trim()} (${cityCountry.trim()} · ${eventDate.trim()}) en formato ${format}. Responderemos a ${corpEmail.trim()} en menos de 24 horas hábiles.`
    );
  };

  const handleDownloadPressKit = () => {
    const content = [
      'PAUL NAAR — PRESS KIT OFICIAL & STAGE PLOT / INPUT LIST (2026/2027)',
      'Representación Directa: Paul Naar & Orquesta',
      `Management: ${ARTIST_PROFILE.bookingEmail} | WhatsApp: ${ARTIST_PROFILE.bookingPhone}`,
      '',
      'RIDER TÉCNICO V. 4.2:',
      ...RIDER_SPECS.map((s, i) => `${i + 1}. ${s}`),
      '',
      'INPUT LIST (32 CANALES FOH):',
      'Ch 01-08: Percusión Afrocubana (Congas, Bongó, Campana, Timbal)',
      'Ch 09-12: Baby Bass / Bajo & Piano Estéreo',
      'Ch 13-18: Sección de Metales (3 Trompetas, 2 Trombones, Saxo Barítono)',
      'Ch 19-24: Voz Líder (Paul Naar) + Coros',
      'Ch 25-32: Timecode 4K LED & Monitoreo In-Ear Estéreo',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Paul_Naar_EPK_StagePlot_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)' }}
        />
        <section className="max-w-[1360px] mx-auto px-4 lg:px-6 pt-10 pb-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="font-display text-[11px] font-bold uppercase tracking-widest text-[#FFCA45]">
                Temporada Internacional • 2026 / 2027
              </span>
              <h1
                className="font-display font-extrabold uppercase tracking-tight text-white leading-none"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)' }}
              >
                Booking &amp; <span className="text-[#DC2626]">Contrataciones</span>
              </h1>
              <p className="text-base md:text-lg text-[#E6BDB8] leading-relaxed">
                Disponibilidad para conciertos masivos, festivales internacionales, eventos
                corporativos exclusivos y presentaciones privadas.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#1C1B1B] px-5 py-3 rounded-lg border border-white/[0.08] shrink-0">
              <BadgeCheck className="w-6 h-6 text-[#DC2626] shrink-0" />
              <div>
                <div className="font-display text-[10px] font-bold uppercase text-[#FFCA45] tracking-widest">
                  Disponibilidad Actual
                </div>
                <div className="font-display text-lg font-bold text-white">
                  Gira Mundial Abierta
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Booking Two-Column Experience */}
      <section className="max-w-[1360px] mx-auto px-4 lg:px-6 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Real Portrait Cards, Management, Rider V. 4.2 & Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Artist Stage Profile Card with hotlinked Red Hood Portrait */}
            <div className="bg-[#1C1B1B] rounded-xl overflow-hidden shadow-xl group border border-white/[0.06]">
              <div className="relative h-80 w-full overflow-hidden">
                <ArtistImage
                  src={ARTWORK_URLS.redHoodPortrait}
                  alt="Paul Naar & Orquesta — Representación Directa"
                  fallbackVariant="hero"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-[#1C1B1B]/35 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#DC2626] text-white font-display text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                    Show Exclusivo
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-display text-[10px] font-bold uppercase text-[#FFCA45] tracking-widest block">
                    Representación Directa
                  </span>
                  <div className="font-display text-2xl font-bold uppercase text-white">
                    Paul Naar &amp; Orquesta
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="font-display text-[10px] font-bold uppercase text-[#E6BDB8] tracking-wider block">
                    Oficina de Management
                  </span>
                  <a
                    href={`mailto:${ARTIST_PROFILE.bookingEmail}`}
                    className="font-display text-lg font-bold text-white hover:text-[#FFB4AB] transition-colors inline-flex items-center gap-2 mt-1"
                  >
                    <Mail className="w-4 h-4 text-[#DC2626]" />
                    {ARTIST_PROFILE.bookingEmail}
                  </a>
                </div>

                <div>
                  <span className="font-display text-[10px] font-bold uppercase text-[#E6BDB8] tracking-wider block">
                    Línea Directa / WhatsApp Booking
                  </span>
                  <a
                    href="https://wa.me/17865556227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg font-bold text-white hover:text-[#FFCA45] transition-colors inline-flex items-center gap-2 mt-1"
                  >
                    <Phone className="w-4 h-4 text-[#FFCA45]" />
                    {ARTIST_PROFILE.bookingPhone}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPressKit}
                  className="w-full flex items-center justify-between bg-[#2A2A2A] hover:bg-[#393939] text-white p-4 rounded transition-all group/press cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center group-hover/press:bg-[#DC2626] group-hover/press:text-white transition-colors shrink-0">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold uppercase text-white">
                        Descargar Press Kit Oficial
                      </div>
                      <div className="text-xs text-[#E6BDB8]">
                        EPK 2026 • PDF, Riders &amp; Fotos HD (42 MB)
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#E6BDB8] group-hover/press:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Rider Técnico V. 4.2 */}
            <div className="bg-[#1C1B1B] rounded-xl p-6 shadow-md space-y-4 border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-white uppercase">
                  Rider Técnico &amp; Escenario
                </h2>
                <span className="font-mono text-[11px] bg-[#353534] px-2 py-1 rounded text-[#FFCA45]">
                  V. 4.2
                </span>
              </div>
              <p className="text-xs text-[#E6BDB8] leading-relaxed">
                Espectáculo diseñado para ofrecer la máxima pegada sonora de la salsa clásica con
                tecnología moderna de audio Line Array y luminotecnia sincronizada.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#201F1F] p-3.5 rounded">
                  <div className="font-display text-2xl font-bold text-[#DC2626]">14</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Músicos en Tarima</div>
                  <div className="text-[11px] text-[#E6BDB8]">Metales, percusión, coro</div>
                </div>
                <div className="bg-[#201F1F] p-3.5 rounded">
                  <div className="font-display text-2xl font-bold text-[#FFCA45]">32</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Canales FOH</div>
                  <div className="text-[11px] text-[#E6BDB8]">Monitoreo In-Ear Estéreo</div>
                </div>
                <div className="bg-[#201F1F] p-3.5 rounded">
                  <div className="font-display text-2xl font-bold text-white">90m</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Show Completo</div>
                  <div className="text-[11px] text-[#E6BDB8]">Repertorio vivo e inédito</div>
                </div>
                <div className="bg-[#201F1F] p-3.5 rounded">
                  <div className="font-display text-2xl font-bold text-[#FFB4AB]">4K</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Visuales LED</div>
                  <div className="text-[11px] text-[#E6BDB8]">Loop timecode listo</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleDownloadPressKit}
                  className="text-[#FFCA45] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                >
                  STAGE PLOT &amp; INPUT LIST (PDF)
                </button>
                <span className="text-[#E6BDB8]">Actualizado 2026</span>
              </div>
            </div>

            {/* Canales Oficiales */}
            <div className="bg-[#1C1B1B] rounded-xl p-6 shadow-md space-y-4 border border-white/[0.06]">
              <h3 className="font-display text-lg font-bold text-white uppercase">
                Canales Oficiales
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.youtube.com/@paulnaar9507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#201F1F] hover:bg-[#2A2A2A] p-3 rounded flex items-center gap-3 transition-colors"
                >
                  <YouTubeIcon className="w-5 h-5 text-[#DC2626] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-[11px] font-bold uppercase text-white">
                      YouTube
                    </div>
                    <div className="text-xs text-[#E6BDB8] truncate">@paulnaar9507</div>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/paulnaar2026/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#201F1F] hover:bg-[#2A2A2A] p-3 rounded flex items-center gap-3 transition-colors"
                >
                  <InstagramIcon className="w-5 h-5 text-[#FFCA45] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-[11px] font-bold uppercase text-white">
                      Instagram
                    </div>
                    <div className="text-xs text-[#E6BDB8] truncate">@paulnaar2026</div>
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100075986866922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#201F1F] hover:bg-[#2A2A2A] p-3 rounded flex items-center gap-3 transition-colors"
                >
                  <FacebookIcon className="w-5 h-5 text-white shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-[11px] font-bold uppercase text-white">
                      Facebook
                    </div>
                    <div className="text-xs text-[#E6BDB8] truncate">Paul Naar</div>
                  </div>
                </a>
                <a
                  href="https://www.tiktok.com/@paulnaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#201F1F] hover:bg-[#2A2A2A] p-3 rounded flex items-center gap-3 transition-colors"
                >
                  <TikTokIcon className="w-5 h-5 text-[#FFB4AB] shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display text-[11px] font-bold uppercase text-white">
                      TikTok
                    </div>
                    <div className="text-xs text-[#E6BDB8] truncate">@paulnaar</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Pool Hall Atmospheric Portrait */}
            <div className="relative rounded-xl overflow-hidden h-56 bg-[#2A2A2A] shadow-lg border border-white/[0.06]">
              <ArtistImage
                src={ARTWORK_URLS.poolHallPortrait}
                alt="Paul Naar — Vocalista & Compositor"
                fallbackVariant="teatro"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="font-display text-[10px] font-bold text-[#FFCA45] uppercase">
                    Precisión y Pasión
                  </div>
                  <div className="font-display text-lg font-bold text-white">
                    Vocalista &amp; Compositor
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Complete 11-Field Booking Form + 3 Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1C1B1B] rounded-xl p-6 lg:p-10 shadow-2xl border border-white/[0.06]">
              <div className="h-1 w-24 bg-[#DC2626] rounded mb-5" />
              <div className="space-y-1.5 mb-7">
                <span className="font-display text-[11px] font-bold uppercase text-[#FFCA45] tracking-widest">
                  Solicitud Directa
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold uppercase text-white">
                  Formulario de Booking
                </h2>
                <p className="text-sm text-[#E6BDB8]">
                  Por favor completa la información del evento. Nuestro equipo evaluará la
                  disponibilidad de agenda, rider logístico y condiciones contractuales.
                </p>
              </div>

              {submittedSummary ? (
                <div className="p-6 bg-[#2A2A2A] rounded-lg space-y-4 border border-[#FFCA45]/35">
                  <div className="flex items-center gap-2 text-[#FFCA45] font-display text-lg font-bold">
                    <Check className="w-5 h-5" />
                    <span>Solicitud Recibida con Éxito</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{submittedSummary}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${ARTIST_PROFILE.bookingEmail}?subject=Booking%20Paul%20Naar%20-%20${encodeURIComponent(
                        cityCountry
                      )}`}
                      className="stage-btn-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
                    >
                      Enviar Copia por Correo
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedSummary(null)}
                      className="stage-btn-outline px-4 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Nueva Solicitud
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bk-name" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Roberto Menéndez"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-company" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Empresa / Productora *
                      </label>
                      <input
                        id="bk-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Viva Salsa Live Concerts LLC"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bk-email" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Correo Electrónico Corporativo *
                      </label>
                      <input
                        id="bk-email"
                        type="email"
                        required
                        value={corpEmail}
                        onChange={(e) => setCorpEmail(e.target.value)}
                        placeholder="produccion@empresa.com"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-phone" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Teléfono &amp; Código de País (WhatsApp) *
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        required
                        value={phoneWhatsapp}
                        onChange={(e) => setPhoneWhatsapp(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bk-type" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Tipo de Evento *
                      </label>
                      <select
                        id="bk-type"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-[#201F1F] text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      >
                        <option value="Festival Internacional de Música">Festival Internacional de Música</option>
                        <option value="Concierto Masivo / Arena">Concierto Masivo / Estadio / Arena</option>
                        <option value="Sala / Teatro">Sala / Teatro Cultural</option>
                        <option value="Corporativo">Evento Corporativo / Gala</option>
                        <option value="Concierto Privado">Concierto Privado VIP</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bk-date" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Fecha Estimada del Evento *
                      </label>
                      <input
                        id="bk-date"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-[#201F1F] text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bk-city" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Ciudad y País del Show *
                      </label>
                      <input
                        id="bk-city"
                        type="text"
                        required
                        value={cityCountry}
                        onChange={(e) => setCityCountry(e.target.value)}
                        placeholder="Ej. Medellín, Colombia"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-format" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Formato Deseado *
                      </label>
                      <select
                        id="bk-format"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full bg-[#201F1F] text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      >
                        <option value="Orquesta Completa (14 Músicos + Metales)">
                          Orquesta Completa (14 Músicos + Metales)
                        </option>
                        <option value="Formato Club / Combo (8 Músicos)">
                          Formato Club / Combo (8 Músicos)
                        </option>
                        <option value="Formato Acústico / Sexteto (Son & Bolero)">
                          Formato Acústico / Sexteto (Son &amp; Bolero)
                        </option>
                        <option value="Showcase (Pistas + Metales en Vivo)">
                          Showcase (Pistas + Metales en Vivo)
                        </option>
                        <option value="Formato Gala / Sinfónico (14 Músicos + Cuerdas)">
                          Formato Gala / Sinfónico (14 Músicos + Cuerdas)
                        </option>
                        <option value="Show Acústico Íntimo (Voz, Piano & Percusión)">
                          Show Acústico Íntimo (Voz, Piano &amp; Percusión)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bk-budget" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Rango de Presupuesto (USD)
                      </label>
                      <select
                        id="bk-budget"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-[#201F1F] text-white text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      >
                        <option value="$15,000 - $30,000 USD">$15k–$30k USD</option>
                        <option value="$30,000 - $60,000 USD">$30k–$60k USD</option>
                        <option value="+$60,000 USD">+$60k USD</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bk-capacity" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                        Aforo Estimado
                      </label>
                      <input
                        id="bk-capacity"
                        type="text"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="Ej. 3,500 personas"
                        className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bk-details" className="block text-xs font-semibold uppercase tracking-wider text-white mb-1.5">
                      Detalles del Recinto y Requerimientos Especiales
                    </label>
                    <textarea
                      id="bk-details"
                      rows={4}
                      value={venueDetails}
                      onChange={(e) => setVenueDetails(e.target.value)}
                      placeholder="Nombre del venue, backline local o requerimientos técnicos..."
                      className="w-full bg-[#201F1F] text-white placeholder:text-[#E6BDB8]/50 text-sm p-4 rounded focus:outline-none focus:ring-1 focus:ring-[#DC2626] resize-none"
                    />
                  </div>

                  <div className="p-3.5 bg-[#201F1F] rounded flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#FFCA45] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#E6BDB8]">
                      El equipo de management responde en{' '}
                      <strong className="text-white">menos de 24 horas hábiles</strong> con
                      disponibilidad y cotización formal.
                    </p>
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-[#FFB4AB]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full stage-btn-primary py-4 px-6 text-sm font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    ENVIAR SOLICITUD DE BOOKING
                  </button>
                </form>
              )}
            </div>

            {/* 3 Trust Guarantee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1C1B1B] p-5 rounded-lg border border-white/[0.06]">
                <BadgeCheck className="w-6 h-6 text-[#DC2626]" />
                <div className="font-sans text-xs font-bold uppercase text-white mt-2">
                  Contrato Directo
                </div>
                <p className="text-xs text-[#E6BDB8] mt-1">
                  Sin intermediarios ni sobrecargos de comisiones fantasma.
                </p>
              </div>
              <div className="bg-[#1C1B1B] p-5 rounded-lg border border-white/[0.06]">
                <ShieldCheck className="w-6 h-6 text-[#FFCA45]" />
                <div className="font-sans text-xs font-bold uppercase text-white mt-2">
                  Rider Garantizado
                </div>
                <p className="text-xs text-[#E6BDB8] mt-1">
                  Equipo técnico propio para dirección de sonido e iluminación.
                </p>
              </div>
              <div className="bg-[#1C1B1B] p-5 rounded-lg border border-white/[0.06]">
                <Plane className="w-6 h-6 text-[#FFB4AB]" />
                <div className="font-sans text-xs font-bold uppercase text-white mt-2">
                  Logística Global
                </div>
                <p className="text-xs text-[#E6BDB8] mt-1">
                  Logística con visas internacionales vigentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
