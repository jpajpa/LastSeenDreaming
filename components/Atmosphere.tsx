export type AtmosphereVariant = 'hero' | 'dream' | 'contact' | 'wander';

type AtmosphereProps = {
  variant?: AtmosphereVariant;
};

const HERO_PATH = 'M1446.07126 778.66648C1445.7791 926.242943 1339.74638 1037.85624 1198.92162 1064.61681C1168.96999 1070.78146 1141.25675 1071.5238 1110.67078 1071.42294C894.819471 1071.66097 398.397415 1071.26963 225.233131 1071.43101C59.3496836 1080.44399-99.0105038 981.950748-116.206528 806.605106C-132.242951 667.577661-34.5052124 529.732312 102.654896 500.405832C123.620631 495.447483 146.93789 492.167468 166.9016 487.015464C208.950242 477.260143 234.942259 455.191654 253.253438 415.306996C291.657622 315.038595 352.263909 238.456501 461.484519 209.513295C531.2868 190.999164 608.466886 199.697457 671.986315 233.954045C770.051328 287.39045 771.251332 359.542709 902.088185 321.07818C985.640012 297.19015 1080.65047 316.0109 1144.27091 375.373924C1179.31346 408.16197 1207.07922 448.236248 1242.90562 480.112505C1269.93198 505.198769 1300.96644 525.935887 1330.39281 548.315029C1401.75066 600.492683 1446.63163 688.11709 1446.07126 777.859588V778.66648Z';

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
