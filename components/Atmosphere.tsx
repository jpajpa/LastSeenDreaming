export type AtmosphereVariant = 'hero' | 'dream' | 'contact' | 'wander';

type AtmosphereProps = {
  variant?: AtmosphereVariant;
};

const HERO_PATH = 'M1446.07126 778.66648C1445.7791 926.242943 1339.74638 1037.85624 1198.92162 1064.61681C1168.96999 1070.78146 1141.25675 1071.5238 1110.67078 1071.42294C894.819471 1071.66097 398.397415 1071.26963 225.233131 1071.43101C59.3496836 1080.44399-99.0105038 981.950748-116.206528 806.605106C-132.242951 667.577661-34.5052124 529.732312 102.654896 500.405832C123.620631 495.447483 146.93789 492.167468 166.9016 487.015464C208.950242 477.260143 234.942259 455.191654 253.253438 415.306996C291.657622 315.038595 352.263909 238.456501 461.484519 209.513295C531.2868 190.999164 608.466886 199.697457 671.986315 233.954045C770.051328 287.39045 771.251332 359.542709 902.088185 321.07818C985.640012 297.19015 1080.65047 316.0109 1144.27091 375.373924C1179.31346 408.16197 1207.07922 448.236248 1242.90562 480.112505C1269.93198 505.198769 1300.96644 525.935887 1330.39281 548.315029C1401.75066 600.492683 1446.63163 688.11709 1446.07126 777.859588V778.66648Z';

const HERO_CLIP_PATH = 'M0.929387 0.581107C0.929228 0.665005 0.871601 0.728457 0.795066 0.743671C0.778788 0.747175 0.763726 0.747597 0.747104 0.747540C0.629793 0.747675 0.359999 0.747453 0.265888 0.747545C0.175734 0.752669 0.089668 0.696675 0.080323 0.596990C0.071607 0.517952 0.124725 0.439586 0.199269 0.422914C0.210663 0.420095 0.223336 0.418231 0.234186 0.415302C0.257038 0.409756 0.271164 0.397210 0.281116 0.374535C0.301988 0.317532 0.334926 0.273995 0.394285 0.257540C0.432221 0.247015 0.474167 0.251960 0.508688 0.271435C0.561984 0.301814 0.562637 0.342833 0.633744 0.320965C0.679152 0.307385 0.730788 0.318085 0.765365 0.351833C0.784409 0.370473 0.799500 0.393255 0.818970 0.411377C0.833659 0.425639 0.850525 0.437428 0.866518 0.450151C0.905299 0.479814 0.929691 0.529629 0.929387 0.580648V0.581107Z';

const USE_VIDEO_HERO = true;

type GradientStop = { offset: string; color: string };

type CloudConfig = {
  id: string;
  gradient: GradientStop[];
  layerOpacities?: [number, number, number];
};

const cloudConfigs: Record<string, CloudConfig> = {
  hero: {
    id: 'hero',
    gradient: [
      { offset: '0%', color: '#1BF005' },
      { offset: '58.4%', color: '#48D3E4' },
    ],
  },
  contact: {
    id: 'contact',
    gradient: [
      { offset: '0%', color: '#1BF005' },
      { offset: '58.4%', color: '#48D3E4' },
    ],
  },
  wander: {
    id: 'wander',
    gradient: [
      { offset: '0%', color: '#00EAFF' },
      { offset: '20%', color: '#6EC4E0' },
      { offset: '55%', color: '#88D6EE' },
      { offset: '100%', color: '#B0E8F6' },
    ],
    layerOpacities: [0.75, 0.45, 0.3],
  },
  dream: {
    id: 'dream',
    gradient: [
      { offset: '0%', color: '#42D0E8' },
      { offset: '35%', color: '#5ED8E0' },
      { offset: '70%', color: '#78E0E8' },
      { offset: '90%', color: '#B8F0F0' },
      { offset: '100%', color: '#E8FAFA' },
    ],
    layerOpacities: [0.7, 0.45, 0.28],
  },
};

function CloudLayers({ config, path, baseTransform }: { config: CloudConfig; path: string; baseTransform: string }) {
  const [o1, o2, o3] = config.layerOpacities ?? [1, 0.6, 0.4];
  return <>
    <defs>
      <linearGradient id={`${config.id}-grad`} x1="100%" y1="0%" x2="12.125%" y2="85.343%">
        {config.gradient.map((stop, i) => <stop key={i} offset={stop.offset} stopColor={stop.color} />)}
      </linearGradient>
    </defs>
    <g className="cloud-layer cloud-layer-1"><path d={path} fill={`url(#${config.id}-grad)`} transform={baseTransform} opacity={o1} /></g>
    <g className="cloud-layer cloud-layer-2"><path d={path} fill={`url(#${config.id}-grad)`} transform={baseTransform} opacity={o2} /></g>
    <g className="cloud-layer cloud-layer-3"><path d={path} fill={`url(#${config.id}-grad)`} transform={baseTransform} opacity={o3} /></g>
  </>;
}

function HeroAtmosphere({ variant }: { variant: 'hero' | 'contact' }) {
  const config = cloudConfigs[variant];
  if (variant === 'contact') {
    return <svg className="atmosphere-art" viewBox="-200 -200 1840 1480" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
      <CloudLayers config={config} path={HERO_PATH} baseTransform="translate(-680 -80)" />
    </svg>;
  }

  if (USE_VIDEO_HERO) {
    return <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="hero-cloud-clip" clipPathUnits="objectBoundingBox">
            <path d={HERO_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>
      <div className="atmosphere-video-cloud">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/atmosphere/hero-reel.mp4"
        />
      </div>
    </>;
  }

  return <svg className="atmosphere-art" viewBox="-200 -200 1840 1759" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
    <CloudLayers config={config} path={HERO_PATH} baseTransform="translate(64 43.5)" />
  </svg>;
}

function DreamAtmosphere() {
  const config = cloudConfigs.dream;
  return <svg className="atmosphere-art" viewBox="-200 -200 1840 1480" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
    <CloudLayers config={config} path={HERO_PATH} baseTransform="rotate(8, 665, 640) translate(40 20)" />
  </svg>;
}

function WanderAtmosphere() {
  const config = cloudConfigs.wander;
  return <svg className="atmosphere-art" viewBox="-200 -200 1840 1480" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
    <CloudLayers config={config} path={HERO_PATH} baseTransform="translate(1330 0) scale(-1, 1)" />
  </svg>;
}

export function Atmosphere({ variant = 'hero' }: AtmosphereProps) {
  let content;
  switch (variant) {
    case 'dream': content = <DreamAtmosphere />; break;
    case 'wander': content = <WanderAtmosphere />; break;
    default: content = <HeroAtmosphere variant={variant as 'hero' | 'contact'} />;
  }
  return <div className={`atmosphere atmosphere--${variant}`} aria-hidden="true">
    {content}
  </div>;
}
