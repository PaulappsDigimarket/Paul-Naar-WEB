export type ScreenId = 'inicio' | 'musica' | 'gira' | 'booking';

export type DiscographyCategory =
  | 'Todos'
  | 'Álbumes'
  | 'Sencillos'
  | 'En Vivo'
  | 'Colaboraciones';

export type TourZone = 'Todos' | 'Latinoamérica' | 'Estados Unidos' | 'Europa';

export interface SocialLink {
  id: 'youtube' | 'facebook' | 'instagram' | 'tiktok';
  name: string;
  handle: string;
  url: string;
  description: string;
}

export interface AudioTrack {
  id: string;
  number: string;
  title: string;
  credits: string;
  durationLabel: string;
  durationSec: number;
  bpm: number;
  quality: string;
  genreTag: string;
  coverUrl: string;
  baseFreq: number;
  waveform: number[];
  lyrics?: {
    intro: string;
    verse1: string[];
    chorus: string[];
    verse2: string[];
    outro: string[];
  };
}

export interface ReleaseItem {
  id: string;
  title: string;
  year: string;
  category: Exclude<DiscographyCategory, 'Todos'>;
  format: string;
  meta: string;
  label: string;
  description: string;
  coverUrl: string;
  variant: 'vinyl' | 'spotlight' | 'trombones' | 'percussion' | 'teatro' | 'encore';
}

export interface ConcertDate {
  id: string;
  dateLabel: string;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  zone: Exclude<TourZone, 'Todos'>;
  status: 'Disponible' | 'Últimas Entradas' | 'Agotado' | 'Preventa VIP';
  ctaLabel: 'COMPRAR TICKETS' | 'LISTA DE ESPERA';
  priceUsd: number;
}

export const ARTWORK_URLS = {
  profileAvatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrBCVZnmDrxxahMCudKW2Aux9-M_VpGwKu_sei3HmPEPniheMJQ1fAecJvbQ7nltUCfwX7s6pLeOKqmOrp6dYeE3raJx3jpGb92a6LSXFHu3X5uTDF6ujBe2jS1A5ubZWa06Y5NdVvN6M2b2NpNtEPjUu3McdqFm9dTDHFhWL3R2KwUgIaDrQVCrSXZFYY-RK-rl7aLipxmwUUE3gm7YDorqzdjU1xEU64W6VafLDP7OP2c5Ar_M9bxxx3-B',
  corazonRumbero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuADmddjazV-TBz9ek64qxH4unLVzV0tYptD581WtSb8PWRAYhscp5KWYfbOmcTdGGAqE5hhtLl7i39S-9ilABAneDMrN3NbIYWEqMzdycqj_2pTDZZR0qIrwES5i9fh_66wHrWHtVRXJQA-p6WHDWvidrXCK2c0r3NbOq_YyYLwAC-byO_1yr6vw-pd9TAwLAvek1KukcI5iwd0MuArPvlX_4agYmJz0XhdAYfixueEBhx27UpWmZn70w',
  fuegoClave:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ0BWK4KFRArpZpD1u8WnpE1YIJ1aIfSMS0JkZoktjphJiiS2RdrXS9qgsOR426v9fcL7klyez_5ZDvl8xlAhXxoVpntETWD_G9MR7EFyJZi3gMRic2sp2DfJ__tNQhrtOpoa1Ep-Ycd--t6oRP2TK9Fm8NPSaxLZ0B7D6KF11u4UKu59mzWQVsepC-yCN6LjhG7d6k-sb9iwUDGI8xngxsG9kXjzqdcx3O7L9AC0B4l23biZVuBWQbg',
  nochesTimba:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDwI-0EZgtF-KRUYWrIqylZ45al1a6_xClYbjlf0tunBIrPrBRddFoRlVGXEUdlw0xwmS7P3yyzY5_lOJEx2KNZxtiuS8NY-oHHpF6GCC3a6sMU8vCkGk-IPXSPZ7EzTnYXy8CwXfPd16vrXl-o7tButFt8X90BEMfDQnV0PGLz3DtyITtSDE5KdQmW2s2hzNovhQh_XvlGlWj-H2FFHF57z7p2npC6bqAJSugRijIl',
  pasionTropical:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCXMkJ3ctILJbNmcTDcYEgFtzcdtWuWqsCU9DGGym6Uqev1R5RGoaY0ax-NyhMLXo1_JrVzQj42KWW2Ue83emxtIs_EYQ3VkG1rld-z8pi1k0J_KiHQEh2YVoJpxh4XyybQpWdgcVQDjFzVSVkaXZkREAvwSIFJfMjo5DTspqm_WhDhUzPY3HiNMcB8A5v9oNsuGwANdj5-80x6bJeAHqSCPzv7ptBexAOdY_RxdrDx',
  bellasArtes:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmImC7mxLbV7dHxogiPjgkWY4U4jQfI1xHDGHPyEbUfB8TgdbAQYupFZTebonwM4AgXwapsH-9uDd0ZWEtOOT6_BBKjQKGAX-BU8LHa55jNGke9XCJRV5E8bfl_tFkHdUTN-IxD1iHvzyBqylwFwd0WTk7-Sfdy0RF8JXgC5BA7ZT0jx0qAGMlHMlROWrh18UzAQfEm6AI1litTuhxNgZqGAg0KTtiF6pQT4HxZ4EE',
  redHoodPortrait:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBAxRiuDVBmreoGaBJNhaH7faxyQ-g5VLhacwmdFeEQaFlLKrNY0aaTNf4jn1yKwhjjLBkplV_csyN_GeQnpQn-Zu-1l4oip-FRjbuLINM-6-83mqaWlzHvbePeCx0ohBuQKmwOXF7MmXN1luGisKZIaCdyLg8zyZefrU28wes-htXp9rhO-cW1EPv_5zILiqCOLudPr98ugRBJ-UsXKbLcIkT9Ovs84tRyQE745n0P',
  poolHallPortrait:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuApA4CSIRn7V4vJ60TempSdUdZ5yeqPxeH1oeoMDn6T1unLpdClz89yRy8nHvR7nTyjiSp2LXPOHBNqT6JuVsLlcHS7yBSJooDmsXhYyFP7AqmHBxgdmLcIUmbGQBwFChjqBqFxqmyU9rdOCW8srXVXPre27giKVrYsAS8_5pO-Xk6kHAEy9frCSXIxAaci0slUaVN3K5x9QmM7S5isOZ3PmUqCpbgFHhQqjaiZAJyo',
  backstageLounge:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAg-_VmKNaiqVfYIYQMn4TNqp2GkcvLWXl4FRKSEOoCm-0UDYXR1Nzi3IuzBmf4JG1aHaKD3nYVFWNXpfu15oySDB9je3NB2EpZdnQsF02i8ydXzHpPcKdU4ooQJGklhpv_46byh9IshwrrLaz8e9jjWVowJcuwdkztx0F36nKb6yaOp54WT0k8itekAGZbreTr2DonugAqC8N1k3A8IzbI3AYI05Z5F6iEp2WLbmamwpz2xpQSn0X6AQ',
  billiardFocus:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCT2vvppAGYOOyQLZJR3RWMjuG8Y7oVvJKO7KLLIzfg-a8QjQrCmCs5pygVWL4qgrEKvJW-Zh_SyoiaiHPCuEQ-QV_Gruw6dFIJJuqzlv1NltTTKWDsu2arwh7uZKWvav-VcF7QzAf3-zkpYJ9XdkF0BdeBnxlf-j-qWARDKjaouoxAo6b0vy0054pjiG6pzx3u-pUL1FvRK0a0mKxM3DTFWVvaDHstmTKRt4_8H5s0GbqPHhi_y8EAXw',
};

export const ARTIST_PROFILE = {
  name: 'Paul Naar',
  subtitle: 'CANTAUTOR',
  discipline:
    'Cantautor, voz y compositor líder de Latin Salsa / Salsa Moderna, Salsa Brava contemporánea, Son y Bolero.',
  badge: 'CANTAUTOR, VOZ & ESENCIA LATINA • TOUR OFICIAL 2026',
  heroTitle: 'EL RITMO Y LA PASIÓN DE LA SALSA MODERNA',
  manifesto:
    'El ritmo y la pasión de la salsa moderna. La fuerza del trombón, la cadencia del tambor y la poesía de la esquina. Paul Naar fusiona el golpe de la salsa clásica neoyorquina con el sonido contemporáneo del barrio global.',
  quote:
    '“La salsa no se piensa, se vive en cada paso, en cada descarga y en la mirada del que suda por amor al ritmo.”',
  orchestraDetail:
    '14 músicos en escena — Sección de metales: 3 trompetas, 2 trombones, saxo barítono; percusión afrocubana a fuego: congas, bongó y timbal.',
  influences: ['Héctor Lavoe', 'Cheo Feliciano', 'Frankie Ruiz'],
  bookingEmail: 'management@paulnaarofficial.com',
  bookingPhone: '+1 (786) 555-NAAR',
};

export const CAREER_METRICS = [
  { value: '+25', label: 'Años de trayectoria' },
  { value: '+100', label: 'Conciertos en vivo' },
  { value: '+500K', label: 'Streams globales' },
  { value: '4', label: 'Redes Conectadas' },
];

export const OFFICIAL_SOCIALS: SocialLink[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@paulnaar9507',
    url: 'https://www.youtube.com/@paulnaar9507',
    description: 'Videoclips oficiales en 4K, sesiones en vivo y descargas desde el estudio.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Paul Naar Oficial',
    url: 'https://www.facebook.com/profile.php?id=100075986866922',
    description: 'Comunidad oficial, transmisiones de ensayos y anuncios de boletería.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@paulnaar2026',
    url: 'https://www.instagram.com/paulnaar2026/reels/',
    description: 'Reels de tarima, pruebas de sonido y detrás de cámaras del Tour 2026.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@paulnaar',
    url: 'https://www.tiktok.com/@paulnaar',
    description: 'Clips de percusión afrocubana, pasos bravos y fragmentos inéditos.',
  },
];

export const HOME_TRACKS: AudioTrack[] = [
  {
    id: 'fuego-en-la-clave',
    number: '00',
    title: 'Fuego en la Clave',
    credits: 'Salsa Brava Original • Paul Naar',
    durationLabel: '04:18',
    durationSec: 258,
    bpm: 104,
    quality: 'Master 24-Bit / 96kHz',
    genreTag: 'Sencillo Destacado',
    coverUrl: ARTWORK_URLS.fuegoClave,
    baseFreq: 174.61,
    waveform: [
      26, 48, 38, 76, 90, 50, 68, 96, 62, 42, 80, 92, 64, 46, 86, 98,
      72, 54, 70, 88, 94, 48, 62, 86, 78, 52, 95, 72, 44, 66, 88, 58,
      50, 78, 90, 64, 38, 74, 92, 56, 46, 70, 82, 48, 60, 44, 32, 24,
    ],
  },
  {
    id: 'son-del-solar',
    number: '01',
    title: 'Son del Solar',
    credits: 'Paul Naar & Sección de Metales',
    durationLabel: '4:12',
    durationSec: 252,
    bpm: 108,
    quality: 'Master 24-Bit / 96kHz',
    genreTag: 'Salsa Brava',
    coverUrl: ARTWORK_URLS.corazonRumbero,
    baseFreq: 146.83,
    waveform: [
      20, 40, 62, 54, 80, 88, 42, 58, 90, 74, 46, 70, 94, 82, 50, 62,
      86, 78, 54, 92, 68, 40, 76, 84, 60, 48, 72, 96, 66, 44, 58, 80,
      88, 56, 70, 86, 50, 64, 76, 54, 42, 62, 74, 48, 36, 30, 22, 18,
    ],
  },
  {
    id: 'campana-y-bongo',
    number: '02',
    title: 'Campana y Bongó',
    credits: 'Paul Naar • Percusión Afrocubana',
    durationLabel: '3:58',
    durationSec: 238,
    bpm: 112,
    quality: 'Master 24-Bit / 96kHz',
    genreTag: 'Descarga',
    coverUrl: ARTWORK_URLS.nochesTimba,
    baseFreq: 196.0,
    waveform: [
      34, 60, 78, 88, 66, 84, 94, 62, 74, 90, 82, 68, 86, 96, 80, 64,
      84, 92, 74, 80, 88, 66, 76, 94, 86, 70, 82, 90, 76, 62, 74, 88,
      80, 68, 84, 88, 64, 74, 80, 68, 58, 70, 78, 64, 50, 42, 34, 26,
    ],
  },
  {
    id: 'herencia-de-barrio',
    number: '03',
    title: 'Herencia de Barrio',
    credits: 'Paul Naar • Salsa Moderna',
    durationLabel: '4:30',
    durationSec: 270,
    bpm: 102,
    quality: 'Master 24-Bit / 96kHz',
    genreTag: 'Salsa Moderna',
    coverUrl: ARTWORK_URLS.pasionTropical,
    baseFreq: 130.81,
    waveform: [
      22, 36, 52, 68, 74, 58, 44, 64, 82, 76, 52, 70, 88, 72, 48, 66,
      84, 78, 56, 74, 90, 68, 46, 68, 80, 62, 50, 72, 86, 64, 44, 60,
      78, 70, 52, 66, 74, 56, 42, 58, 68, 50, 38, 46, 36, 28, 22, 16,
    ],
  },
];

export const CORAZON_TRACKLIST: AudioTrack[] = [
  {
    id: 'corazon-de-rumbero',
    number: '01',
    title: 'Corazón de Rumbero',
    credits: 'Arreglos: Paul Naar & Los Bravos del Solar',
    durationLabel: '4:38',
    durationSec: 278,
    bpm: 106,
    quality: '96kHz / 24-bit Studio Master',
    genreTag: 'Focus Track',
    coverUrl: ARTWORK_URLS.corazonRumbero,
    baseFreq: 164.81,
    waveform: [
      30, 54, 46, 82, 94, 58, 72, 96, 66, 48, 84, 92, 70, 52, 88, 98,
      76, 60, 74, 90, 94, 52, 66, 88, 82, 56, 96, 74, 48, 70, 90, 62,
      54, 80, 92, 68, 42, 78, 94, 60, 50, 72, 84, 52, 62, 48, 36, 26,
    ],
    lyrics: {
      intro: '[Introducción de Trombones y Campana]',
      verse1: [
        'Oye mi compás que viene por la acera,',
        'traigo la descarga que te pone a temblar.',
        'No me hables de pena, no me des barrera,',
        'que cuando truena el cuero yo salgo a cantar.',
      ],
      chorus: [
        'Corazón de rumbero que nunca se rinde,',
        'lleva fuego en la vena y sabor en la piel.',
        'La salsa es el templo donde el dolor se extingue,',
        '¡sube los metales y déjalo correr!',
      ],
      verse2: [
        'Dicen que la noche tiene su misterio,',
        'yo tengo el candado y tengo la verdad.',
        'Vengo de la esquina, del son callejero,',
        'donde la palabra tiene dignidad.',
      ],
      outro: [
        '[Solo de Timbal • Descarga Rítmica]',
        '¡Abre camino que llegó Naar con la orquesta viva! ¡La clave nunca duerme!',
      ],
    },
  },
  {
    id: 'tumbao-de-medianoche',
    number: '02',
    title: 'Tumbao de Medianoche',
    credits: 'Piano solo: Danilo Morales',
    durationLabel: '5:12',
    durationSec: 312,
    bpm: 100,
    quality: '96kHz / 24-bit Studio Master',
    genreTag: 'Salsa Brava',
    coverUrl: ARTWORK_URLS.corazonRumbero,
    baseFreq: 146.83,
    waveform: [
      18, 34, 50, 64, 72, 54, 42, 60, 78, 84, 62, 48, 70, 86, 74, 52,
      68, 88, 76, 54, 72, 90, 66, 48, 64, 82, 70, 50, 66, 84, 72, 54,
      62, 78, 66, 48, 56, 70, 58, 44, 52, 62, 48, 38, 30, 24, 18, 14,
    ],
    lyrics: {
      intro: '[Montuno de Piano & Baby Bass]',
      verse1: [
        'Cuando el reloj marca las doce en el bulevar,',
        'suena el teclado fino que invita a bailar.',
        'Sombra y neón sobre el asfalto mojado,',
        'el tumbao de medianoche ya está desatado.',
      ],
      chorus: [
        '¡Tumbao de medianoche para el bailador!',
        'Que no pare el piano, que siga el sabor.',
      ],
      verse2: [
        'Manos que vuelan sobre el marfil encendido,',
        'cadencia eterna del barrio querido.',
      ],
      outro: ['[Solo de Piano: Danilo Morales]'],
    },
  },
  {
    id: 'esa-mirada-en-la-barra',
    number: '03',
    title: 'Esa Mirada en la Barra',
    credits: 'Composición de Paul Naar',
    durationLabel: '4:05',
    durationSec: 245,
    bpm: 94,
    quality: '96kHz / 24-bit Studio Master',
    genreTag: 'Romántica',
    coverUrl: ARTWORK_URLS.pasionTropical,
    baseFreq: 138.59,
    waveform: [
      16, 28, 38, 52, 46, 60, 68, 50, 42, 56, 70, 78, 62, 48, 66, 80,
      72, 54, 46, 62, 76, 68, 50, 58, 70, 82, 64, 52, 60, 72, 56, 44,
      50, 62, 68, 54, 42, 48, 56, 46, 38, 42, 34, 28, 24, 20, 16, 14,
    ],
    lyrics: {
      intro: '[Trombón con sordina y Bolero-Son]',
      verse1: [
        'Entre luces rojas y copas de cristal,',
        'cruzaste la pista con paso magistral.',
        'Bastó un segundo para entender la señal,',
        'que esta salsa lenta sería inmortal.',
      ],
      chorus: [
        'Esa mirada en la barra me robó la calma,',
        'puso un bolero nuevo dentro de mi alma.',
      ],
      verse2: [
        'Si me das la mano antes del último son,',
        'te canto al oído con todo el corazón.',
      ],
      outro: ['[Cierre melódico de metales]'],
    },
  },
  {
    id: 'repique-y-clave',
    number: '04',
    title: 'Repique y Clave',
    credits: "Percusión: Manny 'Candela' Ramos",
    durationLabel: '4:45',
    durationSec: 285,
    bpm: 114,
    quality: '96kHz / 24-bit Studio Master',
    genreTag: 'Percusión',
    coverUrl: ARTWORK_URLS.nochesTimba,
    baseFreq: 196.0,
    waveform: [
      44, 70, 86, 94, 76, 90, 98, 66, 80, 96, 88, 72, 92, 98, 84, 68,
      90, 96, 78, 86, 94, 70, 80, 98, 90, 74, 88, 96, 82, 66, 78, 92,
      86, 72, 90, 94, 68, 80, 86, 74, 64, 76, 84, 70, 56, 48, 40, 32,
    ],
    lyrics: {
      intro: '[Duelo de Conga, Bongó y Timbal]',
      verse1: [
        'Sube la mano, marca la clave al compás,',
        'que en esta descarga nadie se queda atrás.',
        'Madera y cuero hablando el mismo lenguaje,',
        'ritmo afrocubano de puro coraje.',
      ],
      chorus: [
        '¡Repique y clave! Que suene el tambor,',
        'esta es la fuerza del barrio y su honor.',
      ],
      verse2: [
        'Manny en el cuero prendiendo el salón,',
        'tres trompetas abren paso al pregón.',
      ],
      outro: ['[Moña final de metales]'],
    },
  },
  {
    id: 'mi-barrio-canta-y-no-llora',
    number: '05',
    title: 'Mi Barrio Canta y No Llora',
    credits: 'Feat. Orquesta Guaguancó 70',
    durationLabel: '5:29',
    durationSec: 329,
    bpm: 105,
    quality: '96kHz / 24-bit Studio Master',
    genreTag: 'Colaboración',
    coverUrl: ARTWORK_URLS.bellasArtes,
    baseFreq: 174.61,
    waveform: [
      28, 50, 64, 78, 86, 56, 70, 92, 74, 50, 76, 90, 68, 48, 82, 94,
      78, 58, 72, 88, 84, 52, 66, 86, 76, 54, 90, 72, 46, 68, 84, 60,
      52, 74, 86, 62, 40, 70, 82, 56, 48, 64, 76, 50, 42, 34, 26, 20,
    ],
    lyrics: {
      intro: '[Coro de Esquina & Metales Guaguancó 70]',
      verse1: [
        'Aunque el camino tenga cuestas empinadas,',
        'en cada balcón nacen canciones sagradas.',
        'La gente de mi tierra transforma el dolor,',
        'en un guaguancó lleno de fe y valor.',
      ],
      chorus: [
        '¡Mi barrio canta y no llora!',
        'Con la clave encendida desde el alba hasta la aurora.',
      ],
      verse2: [
        'Unidos en tarima con Guaguancó 70,',
        'esta es la salsa que el mundo entero siente.',
      ],
      outro: ['[Pregón colectivo en vivo]'],
    },
  },
];

export const DISCOGRAPHY_CATALOG: ReleaseItem[] = [
  {
    id: 'rel-fuego',
    title: 'Fuego en la Clave',
    year: '2025',
    category: 'Sencillos',
    format: 'Sencillo',
    meta: '1 Tema • 4:18',
    label: 'Naar Records',
    description:
      'Potente tema de timba y trombones al estilo clásico neoyorquino con base cubana.',
    coverUrl: ARTWORK_URLS.fuegoClave,
    variant: 'spotlight',
  },
  {
    id: 'rel-timba',
    title: 'Noches de Timba',
    year: '2024',
    category: 'Álbumes',
    format: 'EP Especial',
    meta: '5 Temas • 23 min',
    label: 'Latin Sound Lab',
    description:
      'Fusión audaz de mambo moderno y timba callejera grabada con metales en directo en San Juan.',
    coverUrl: ARTWORK_URLS.nochesTimba,
    variant: 'percussion',
  },
  {
    id: 'rel-pasion',
    title: 'Pasión Tropical',
    year: '2023',
    category: 'Álbumes',
    format: 'Álbum',
    meta: '8 Temas • 37 min',
    label: 'Fania Legacy Dist.',
    description:
      'El disco que definió el estilo vocal de Paul Naar con boleros son y salsa para el bailador.',
    coverUrl: ARTWORK_URLS.pasionTropical,
    variant: 'vinyl',
  },
  {
    id: 'rel-bellas-artes',
    title: 'En Vivo: Bellas Artes',
    year: '2022',
    category: 'En Vivo',
    format: 'En Vivo (Live)',
    meta: '12 Temas • 62 min',
    label: 'Live Masters',
    description:
      'Concierto sinfónico completo con orquesta de 18 músicos en sala llena de aplausos.',
    coverUrl: ARTWORK_URLS.bellasArtes,
    variant: 'teatro',
  },
  {
    id: 'rel-guaguanco',
    title: 'Mi Barrio Canta y No Llora',
    year: '2026',
    category: 'Colaboraciones',
    format: 'Colaboración',
    meta: 'Feat. Guaguancó 70 • 5:29',
    label: 'Naar Records',
    description:
      'Encuentro intergeneracional junto a la legendaria Orquesta Guaguancó 70.',
    coverUrl: ARTWORK_URLS.corazonRumbero,
    variant: 'trombones',
  },
];

export const TOUR_CONCERTS: ConcertDate[] = [
  {
    id: 'mia-15oct',
    dateLabel: '15 OCT 2026',
    day: '15',
    month: 'OCT',
    year: '2026',
    city: 'Miami, Florida',
    venue: 'James L. Knight Center',
    zone: 'Estados Unidos',
    status: 'Últimas Entradas',
    ctaLabel: 'COMPRAR TICKETS',
    priceUsd: 78,
  },
  {
    id: 'cal-24oct',
    dateLabel: '24 OCT 2026',
    day: '24',
    month: 'OCT',
    year: '2026',
    city: 'Cali, Colombia',
    venue: 'Arena Cañaveralejo',
    zone: 'Latinoamérica',
    status: 'Disponible',
    ctaLabel: 'COMPRAR TICKETS',
    priceUsd: 55,
  },
  {
    id: 'sju-07nov',
    dateLabel: '07 NOV 2026',
    day: '07',
    month: 'NOV',
    year: '2026',
    city: 'San Juan, Puerto Rico',
    venue: 'Coca-Cola Music Hall',
    zone: 'Latinoamérica',
    status: 'Agotado',
    ctaLabel: 'LISTA DE ESPERA',
    priceUsd: 68,
  },
  {
    id: 'sdq-18nov',
    dateLabel: '18 NOV 2026',
    day: '18',
    month: 'NOV',
    year: '2026',
    city: 'Santo Domingo, Rep. Dominicana',
    venue: 'Teatro Nacional Eduardo Brito',
    zone: 'Latinoamérica',
    status: 'Disponible',
    ctaLabel: 'COMPRAR TICKETS',
    priceUsd: 62,
  },
  {
    id: 'mad-05dic',
    dateLabel: '05 DIC 2026',
    day: '05',
    month: 'DIC',
    year: '2026',
    city: 'Madrid, España',
    venue: 'WiZink Center',
    zone: 'Europa',
    status: 'Disponible',
    ctaLabel: 'COMPRAR TICKETS',
    priceUsd: 70,
  },
  {
    id: 'cdmx-12dic',
    dateLabel: '12 DIC 2026',
    day: '12',
    month: 'DIC',
    year: '2026',
    city: 'Ciudad de México, México',
    venue: 'Pepsi Center WTC',
    zone: 'Latinoamérica',
    status: 'Preventa VIP',
    ctaLabel: 'COMPRAR TICKETS',
    priceUsd: 64,
  },
];

export const RIDER_SPECS = [
  '14 Músicos en tarima (Metales, percusión afrocubana, coros y piano)',
  '32 Canales FOH con monitoreo In-Ear individual estéreo',
  '90 minutos de show continuado (repertorio vivo e inédito)',
  'Soporte visual: Loop de visuales sincronizados en 4K timecode',
];

export const BOOKING_GUARANTEES = [
  'Contrato directo sin intermediarios',
  'Rider de sonido propio',
  'Logística con visas internacionales vigentes',
];
