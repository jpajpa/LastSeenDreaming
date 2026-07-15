export type AtmosphereVariant = 'hero' | 'dream' | 'contact';

type AtmosphereProps = {
  variant?: AtmosphereVariant;
};

const HERO_PATH = 'M1446.07126 778.66648C1445.7791 926.242943 1339.74638 1037.85624 1198.92162 1064.61681C1168.96999 1070.78146 1141.25675 1071.5238 1110.67078 1071.42294C894.819471 1071.66097 398.397415 1071.26963 225.233131 1071.43101C59.3496836 1080.44399-99.0105038 981.950748-116.206528 806.605106C-132.242951 667.577661-34.5052124 529.732312 102.654896 500.405832C123.620631 495.447483 146.93789 492.167468 166.9016 487.015464C208.950242 477.260143 234.942259 455.191654 253.253438 415.306996C291.657622 315.038595 352.263909 238.456501 461.484519 209.513295C531.2868 190.999164 608.466886 199.697457 671.986315 233.954045C770.051328 287.39045 771.251332 359.542709 902.088185 321.07818C985.640012 297.19015 1080.65047 316.0109 1144.27091 375.373924C1179.31346 408.16197 1207.07922 448.236248 1242.90562 480.112505C1269.93198 505.198769 1300.96644 525.935887 1330.39281 548.315029C1401.75066 600.492683 1446.63163 688.11709 1446.07126 777.859588V778.66648Z';

const DREAM_PATH = 'M620 80C560 40 480 55 430 110C390 70 320 85 295 145C250 120 195 155 190 220C140 215 105 265 120 325C80 340 65 400 100 450C75 480 85 540 135 565C120 610 150 665 210 675C215 720 260 755 320 745C350 785 410 795 460 770C500 810 570 805 610 765C660 790 720 770 745 720C790 740 840 710 845 660C890 655 915 605 895 555C930 530 935 475 905 435C935 400 925 345 885 315C900 270 875 215 830 200C830 150 795 105 745 100C725 55 670 35 620 55Z';

function CloudLayers({ id, path, baseTransform }: { id: string; path: string; baseTransform: string }) {
  return <>
    <defs>
      <linearGradient id={`${id}-grad`} x1="100%" y1="0%" x2="12.125%" y2="85.343%">
        <stop offset="0%" stopColor="#1BF005" />
        <stop offset="58.4%" stopColor="#48D3E4" />
      </linearGradient>
    </defs>
    <g className="cloud-layer cloud-layer-1"><path d={path} fill={`url(#${id}-grad)`} transform={baseTransform} /></g>
    <g className="cloud-layer cloud-layer-2"><path d={path} fill={`url(#${id}-grad)`} transform={baseTransform} opacity=".6" /></g>
    <g className="cloud-layer cloud-layer-3"><path d={path} fill={`url(#${id}-grad)`} transform={baseTransform} opacity=".4" /></g>
  </>;
}

function HeroAtmosphere({ variant }: { variant: 'hero' | 'contact' }) {
  if (variant === 'contact') {
    return <svg className="atmosphere-art" viewBox="-200 -200 1840 1480" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
      <CloudLayers id={variant} path={HERO_PATH} baseTransform="translate(-680 -80)" />
    </svg>;
  }

  return <svg className="atmosphere-art" viewBox="-200 -200 1840 1759" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
    <CloudLayers id={variant} path={HERO_PATH} baseTransform="translate(64 43.5)" />
  </svg>;
}

function DreamAtmosphere() {
  return <svg className="atmosphere-art" viewBox="-50 -50 1150 950" overflow="visible" preserveAspectRatio="xMidYMid meet" focusable="false">
    <CloudLayers id="dream" path={DREAM_PATH} baseTransform="translate(50 30)" />
  </svg>;
}

export function Atmosphere({ variant = 'hero' }: AtmosphereProps) {
  return <div className={`atmosphere atmosphere--${variant}`} aria-hidden="true">
    {variant === 'dream' ? <DreamAtmosphere /> : <HeroAtmosphere variant={variant} />}
  </div>;
}
