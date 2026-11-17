import React, { useState } from 'react';
import { StageArtwork } from './StageArtwork';

interface ArtistImageProps {
  src: string;
  alt: string;
  fallbackVariant: 'hero' | 'spotlight' | 'trombones' | 'percussion' | 'teatro' | 'vinyl' | 'encore';
  isSpinning?: boolean;
  className?: string;
}

export const ArtistImage: React.FC<ArtistImageProps> = ({
  src,
  alt,
  fallbackVariant,
  isSpinning = false,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return <StageArtwork variant={fallbackVariant} isSpinning={isSpinning} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
