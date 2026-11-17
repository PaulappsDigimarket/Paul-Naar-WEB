import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { ARTWORK_URLS, ScreenId } from '../data/paulNaarData';
import { YouTubeIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

interface TopNavProps {
  activeScreen: ScreenId;
  activeAnchor: string | null;
  onSelectNav: (screen: ScreenId, anchor?: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeScreen,
  activeAnchor,
  onSelectNav,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: Array<{
    id: string;
    label: string;
    screen: ScreenId;
    anchor?: string;
  }> = [
    { id: 'inicio', label: 'Inicio', screen: 'inicio' },
    { id: 'musica', label: 'Música & Lanzamientos', screen: 'musica' },
    { id: 'biografia', label: 'Biografía', screen: 'inicio', anchor: 'biografia' },
    { id: 'gira', label: 'Gira / Conciertos', screen: 'gira' },
    { id: 'videos', label: 'Videos', screen: 'inicio', anchor: 'videos' },
    { id: 'booking', label: 'Booking & Contacto', screen: 'booking' },
  ];

  const isItemActive = (item: (typeof navLinks)[number]) => {
    if (item.anchor) return activeScreen === 'inicio' && activeAnchor === item.anchor;
    if (item.id === 'inicio') return activeScreen === 'inicio' && !activeAnchor;
    return activeScreen === item.screen;
  };

  const handleClick = (item: (typeof navLinks)[number]) => {
    setMobileOpen(false);
    onSelectNav(item.screen, item.anchor);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
      style={{
        backgroundColor: 'rgba(14, 14, 14, 0.9)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo: PAUL NAAR + Cantautor */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onSelectNav('inicio');
          }}
          className="flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="font-display text-2xl font-extrabold tracking-tighter uppercase text-white group-hover:text-[#DC2626] transition-colors">
            Paul<span className="text-[#DC2626] ml-1">Naar</span>
          </span>
          <span className="hidden xl:inline-block font-display text-[11px] font-bold uppercase text-[#FFCA45] tracking-widest pl-2">
            Cantautor
          </span>
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Navegación Principal"
          className="hidden lg:flex items-center gap-4 text-[12px] font-semibold uppercase tracking-wider text-[#E6BDB8]"
        >
          {navLinks.map((item) => {
            const active = isItemActive(item);
            return (
              <a
                key={item.id}
                href={`#${item.anchor ?? item.screen}`}
                data-active={active ? 'true' : 'false'}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item);
                }}
                className={`py-1.5 px-2.5 rounded-[4px] transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-white bg-[#2A2A2A]'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Zone: Social Icons + Red CTA + Artist Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-[#E6BDB8]">
            <a
              href="https://www.youtube.com/@paulnaar9507"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube oficial de Paul Naar"
              className="p-2 hover:text-[#DC2626] hover:bg-[#2A2A2A] rounded transition-all"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100075986866922"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook oficial de Paul Naar"
              className="p-2 hover:text-[#DC2626] hover:bg-[#2A2A2A] rounded transition-all"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/paulnaar2026/reels/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial de Paul Naar"
              className="p-2 hover:text-[#DC2626] hover:bg-[#2A2A2A] rounded transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@paulnaar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok oficial de Paul Naar"
              className="p-2 hover:text-[#DC2626] hover:bg-[#2A2A2A] rounded transition-all"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          </div>

          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('booking');
            }}
            className="stage-btn-primary px-3.5 lg:px-4 py-2.5 text-[11px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0"
          >
            Contrataciones / Booking
          </a>

          <img
            src={ARTWORK_URLS.profileAvatar}
            alt="Paul Naar Perfil"
            referrerPolicy="no-referrer"
            className="hidden md:block w-8 h-8 rounded-full object-cover ring-1 ring-[#FFCA45]/50 shrink-0"
          />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 text-[#E6BDB8] hover:text-white border border-white/10 rounded-[4px] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#131313] px-5 py-4 space-y-2">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.anchor ?? item.screen}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
              }}
              className={`block py-2.5 text-sm font-medium border-b border-white/[0.06] last:border-b-0 ${
                isItemActive(item) ? 'text-[#DC2626] font-semibold' : 'text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
