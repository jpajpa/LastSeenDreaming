'use client';

import { Image as DreiImage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Project } from '@/lib/projects';

function Cards({ projects }: { projects: Project[] }) {
  const router = useRouter();
  return <>{projects.map((project, index) => <group key={project.slug} position={[(index - 1) * 2.55, index === 1 ? .15 : -.05, 0]}>
    <DreiImage url={project.cover.src} transparent scale={[2.12, 1.48]} radius={.11} onClick={() => router.push(`/projects/${project.slug}`)} />
  </group>)}</>;
}

export function ShowcaseScene({ projects }: { projects: Project[] }) {
  return <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]} aria-label="Interactive project showcase">
    <color attach="background" args={['#fafafa']} />
    <ambientLight intensity={1.2} />
    <Suspense fallback={null}><Cards projects={projects} /></Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.35} rotateSpeed={.32} />
  </Canvas>;
}
