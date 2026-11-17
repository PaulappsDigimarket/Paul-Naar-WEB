import React, { useState, useEffect } from 'react';
import { X, Check, ArrowUpRight, Ticket, Sparkles, Download } from 'lucide-react';
import { ARTWORK_URLS, AudioTrack, ConcertDate, RIDER_SPECS } from '../data/paulNaarData';
import { ArtistImage } from './ArtistImage';

interface TicketModalProps {
  concert: ConcertDate | null;
  vipMode: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  concert,
  vipMode,
  onClose,
}) => {
  const [tier, setTier] = useState<'general' | 'vip'>(vipMode ? 'vip' : 'general');
  const [quantity, setQuantity] = useState(2);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  useEffect(() => {
    setTier(vipMode ? 'vip' : 'general');
    setQuantity(2);
    setEmail('');
    setError(null);
    setConfirmed(null);
  }, [concert, vipMode]);

  useEffect(() => {
    if (!concert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [concert, onClose]);

  if (!concert) return null;

  const isWaitlist = concert.status === 'Agotado' && !vipMode;
  const unitPrice = tier === 'vip' ? 180 : concert.priceUsd;
  const total = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (isWaitlist) {
      setConfirmed(
        `Te has unido a la lista de espera para: ${concert.city} - ${concert.venue}. Recibirás una alerta en caso de habilitarse nuevas localidades.`
      );
    } else {
      setConfirmed(
        `Reserva confirmada: ${quantity}× ${
          tier === 'vip' ? 'Pase Soundcheck + Camerinos ($180 USD)' : 'Entrada General / Platea'
        } para ${concert.city} · Total $${total} USD.`
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Entradas para ${concert.city}`}
      className="fixed inset-0 z-50 bg-[#0E0E0E]/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#1C1B1B] border border-white/15 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
              Tour 2026: Fuego y Clave · {concert.dateLabel}
            </p>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              {concert.city} — {concert.venue}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-2 text-[#E6BDB8] hover:text-white border border-white/10 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-6 space-y-4">
            <div className="p-4 bg-[#131313] border border-[#DC2626]/50 rounded-lg">
              <div className="flex items-center gap-2 text-[#FFCA45] font-display text-xs font-bold uppercase tracking-wider">
                <Check className="w-4 h-4" />
                Confirmación Oficial
              </div>
              <p className="text-sm text-white mt-2 leading-relaxed">{confirmed}</p>
              <p className="text-xs text-[#E6BDB8] mt-2">Enviado a: {email}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full stage-btn-primary py-3 text-xs font-bold uppercase tracking-[0.06em] cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
            {!isWaitlist && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTier('general')}
                  className={`p-3.5 text-left rounded-lg border cursor-pointer transition-colors ${
                    tier === 'general'
                      ? 'bg-[#DC2626]/15 border-[#DC2626]'
                      : 'bg-[#131313] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Ticket className="w-4 h-4 text-[#DC2626]" />
                    <span className="font-mono text-sm font-bold text-white tabular-nums">
                      ${concert.priceUsd}
                    </span>
                  </div>
                  <p className="font-display text-sm font-bold text-white mt-2">
                    Entrada General
                  </p>
                  <p className="text-xs text-[#E6BDB8]">Pista / Platea</p>
                </button>

                <button
                  type="button"
                  onClick={() => setTier('vip')}
                  className={`p-3.5 text-left rounded-lg border cursor-pointer transition-colors ${
                    tier === 'vip'
                      ? 'bg-[#FFCA45]/15 border-[#FFCA45]'
                      : 'bg-[#131313] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sparkles className="w-4 h-4 text-[#FFCA45]" />
                    <span className="font-mono text-sm font-bold text-[#FFCA45] tabular-nums">
                      $180
                    </span>
                  </div>
                  <p className="font-display text-sm font-bold text-white mt-2">
                    VIP Backstage
                  </p>
                  <p className="text-xs text-[#E6BDB8]">Soundcheck + Camerinos</p>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              {!isWaitlist && (
                <div>
                  <span className="block text-xs font-medium text-[#E6BDB8] mb-1.5">
                    Cantidad
                  </span>
                  <div className="flex items-center justify-between bg-[#131313] border border-white/15 rounded px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 text-white hover:bg-[#2A2A2A] rounded cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-mono text-sm font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(8, q + 1))}
                      className="w-7 h-7 text-white hover:bg-[#2A2A2A] rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className={isWaitlist ? 'sm:col-span-3' : 'sm:col-span-2'}>
                <label htmlFor="tk-email" className="block text-xs font-medium text-[#E6BDB8] mb-1.5">
                  Correo electrónico *
                </label>
                <input
                  id="tk-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-3.5 py-2 text-sm text-white bg-[#131313] border border-white/15 rounded focus:border-[#DC2626] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#FFB4AB]">
                {error}
              </p>
            )}

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#E6BDB8]">
                  {isWaitlist ? 'Estado: Agotado' : 'Total Estimado'}
                </p>
                {!isWaitlist && (
                  <p className="font-display text-2xl font-bold text-white tabular-nums">
                    ${total} USD
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="stage-btn-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.06em] cursor-pointer"
              >
                {isWaitlist ? 'UNIRME A LISTA DE ESPERA' : 'CONFIRMAR BOLETOS'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const LyricsModal: React.FC<{
  track: AudioTrack | null;
  onClose: () => void;
}> = ({ track, onClose }) => {
  useEffect(() => {
    if (!track) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [track, onClose]);

  if (!track || !track.lyrics) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Letra Oficial — ${track.title}`}
      className="fixed inset-0 z-50 bg-[#0E0E0E]/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1B1B] max-w-lg w-full rounded-xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col border border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <span className="font-display text-[11px] font-bold uppercase text-[#FFCA45] tracking-widest">
              Letra Oficial
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-white mt-0.5">
              {track.title}
            </h3>
            <p className="text-xs text-[#E6BDB8] mt-0.5">
              Compositor: Paul Naar • Derechos Reservados
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar letra"
            className="p-1.5 rounded text-[#E6BDB8] hover:text-white hover:bg-[#201F1F] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto pr-1 py-4 space-y-4 text-sm md:text-[15px] text-white leading-relaxed flex-1">
          <p className="text-[#E6BDB8] italic">{track.lyrics.intro}</p>
          <p>
            {track.lyrics.verse1.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <div className="p-3.5 rounded bg-[#201F1F] text-[#FFCA45] font-semibold">
            [Coro]
            <br />
            {track.lyrics.chorus.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <p>
            {track.lyrics.verse2.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          {track.lyrics.outro.map((line, i) => (
            <p key={i} className={i === 0 ? 'text-[#E6BDB8] italic' : ''}>
              {line}
            </p>
          ))}
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#201F1F] hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase px-4 py-2 rounded transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Videoclip Oficial 4K — Paul Naar"
      className="fixed inset-0 z-50 bg-[#0E0E0E]/92 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#1C1B1B] border border-white/15 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFCA45]">
              Videoclip Oficial 4K · @paulnaar9507
            </p>
            <h3 className="font-display text-xl font-bold text-white mt-0.5">
              Fuego en la Clave — En Vivo con 14 Músicos
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar video"
            className="p-2 text-[#E6BDB8] hover:text-white border border-white/10 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="aspect-[16/9] relative">
          <ArtistImage
            src={ARTWORK_URLS.bellasArtes}
            alt="Paul Naar En Vivo 4K"
            fallbackVariant="encore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0E0E0E]/65 flex flex-col items-center justify-center p-6 text-center">
            <p className="font-display text-2xl md:text-3xl font-extrabold text-white max-w-lg">
              Mira los videoclips completos en el canal oficial de YouTube
            </p>
            <p className="text-sm text-[#E6BDB8] mt-2">
              @paulnaar9507 · Sesiones 4K, ensayos de metales y conciertos completos
            </p>
            <a
              href="https://www.youtube.com/@paulnaar9507"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 stage-btn-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.06em] inline-flex items-center gap-2"
            >
              ABRIR EN YOUTUBE OFICIAL
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RiderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const content = [
      'PAUL NAAR — RIDER TÉCNICO OFICIAL (14 MÚSICOS)',
      ...RIDER_SPECS.map((s, i) => `${i + 1}. ${s}`),
      'Contacto: management@paulnaarofficial.com | +1 (786) 555-NAAR',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Paul_Naar_Rider_Tecnico_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Rider Técnico Oficial de Paul Naar"
      className="fixed inset-0 z-50 bg-[#0E0E0E]/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#1C1B1B] border border-white/15 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-white uppercase">
            Ficha Técnica &amp; Rider Oficial
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar rider"
            className="p-2 text-[#E6BDB8] hover:text-white border border-white/10 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ul className="p-6 divide-y divide-white/[0.06]">
          {RIDER_SPECS.map((spec) => (
            <li key={spec} className="py-3 text-sm text-white">
              {spec}
            </li>
          ))}
        </ul>

        <div className="px-6 py-4 bg-[#131313] border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-[#E6BDB8]">management@paulnaarofficial.com</span>
          <button
            type="button"
            onClick={handleDownload}
            className="stage-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            STAGE PLOT &amp; INPUT LIST (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
