import React, { useState } from 'react';
import { ARTWORK_URLS } from '../data/paulNaarData';

interface StageArtworkProps {
  variant: 'hero' | 'spotlight' | 'trombones' | 'percussion' | 'teatro' | 'vinyl' | 'encore';
  imageUrl?: string;
  alt?: string;
  isSpinning?: boolean;
  className?: string;
}

export const StageArtwork: React.FC<StageArtworkProps> = ({
  variant,
  imageUrl,
  alt = 'Paul Naar — Cantautor & Salsa Moderna',
  isSpinning = false,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const resolvedUrl =
    imageUrl ??
    (variant === 'hero'
      ? ARTWORK_URLS.redHoodPortrait
      : variant === 'vinyl'
      ? ARTWORK_URLS.corazonRumbero
      : variant === 'percussion'
      ? ARTWORK_URLS.nochesTimba
      : variant === 'teatro'
      ? ARTWORK_URLS.bellasArtes
      : ARTWORK_URLS.pasionTropical);

  if (variant === 'hero') {
    return (
      <div
        className={`relative w-full h-full min-h-[380px] overflow-hidden bg-[#131313] border border-[#27272A] rounded-2xl stage-card-glow ${className}`}
      >
        {/* Fallback atmospheric backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 65% 25%, rgba(220, 38, 38, 0.35) 0%, rgba(19, 19, 19, 0.96) 76%)',
          }}
        />
        {!imgFailed && (
          <img
            src={resolvedUrl}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ${
              isSpinning ? 'scale-[1.03]' : 'hover:scale-105'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#131313] ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 55% 30%, rgba(220, 38, 38, 0.35) 0%, #0E0E0E 100%)',
        }}
      />
      {!imgFailed && (
        <img
          src={resolvedUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};
