import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TECH_NODES = [
  { name: 'React', color: '#61dafb', orbitRadius: 3.2, speed: 0.3, offset: 0 },
  { name: 'TypeScript', color: '#3178c6', orbitRadius: 3.5, speed: 0.25, offset: Math.PI * 0.25 },
  { name: 'Redis', color: '#dc382d', orbitRadius: 3.8, speed: 0.35, offset: Math.PI * 0.5 },
  { name: 'PostgreSQL', color: '#336791', orbitRadius: 4.0, speed: 0.2, offset: Math.PI * 0.75 },
  { name: 'MongoDB', color: '#47a248', orbitRadius: 3.3, speed: 0.28, offset: Math.PI },
  { name: 'AWS', color: '#ff9900', orbitRadius: 3.6, speed: 0.32, offset: Math.PI * 1.25 },
  { name: 'Docker', color: '#2496ed', orbitRadius: 4.2, speed: 0.22, offset: Math.PI * 1.5 },
  { name: 'Node.js', color: '#68a063', orbitRadius: 3.9, speed: 0.27, offset: Math.PI * 1.75 },
];

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.1;
      wireframeRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group>
      {/* Inner glowing sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      {/* Outer wireframe shell */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      {/* Core glow */}
      <pointLight color="#06b6d4" intensity={2} distance={8} decay={2} />
    </group>
  );
}

function TechNode({
  name,
  color,
  orbitRadius,
  speed,
  offset,
}: {
  name: string;
  color: string;
  orbitRadius: number;
  speed: number;
  offset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = reducedMotion ? offset : state.clock.getElapsedTime() * speed + offset;
    groupRef.current.position.x = Math.cos(t) * orbitRadius;
    groupRef.current.position.z = Math.sin(t) * orbitRadius;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh scale={hovered ? 1.4 : 1}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={hovered ? 0.9 : 0.7}
          />
        </mesh>
        {/* Label */}
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.18}
          color={hovered ? color : '#a0a0af'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.woff"
          fillOpacity={hovered ? 1 : 0.7}
        >
          {name}
        </Text>
        {/* Glow on hover */}
        {hovered && <pointLight color={color} intensity={1.5} distance={3} decay={2} />}
      </Float>
    </group>
  );
}

function OrbitRings() {
  return (
    <group>
      {[3.2, 3.6, 4.0].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.1, 0, i * 0.2]}>
          <ringGeometry args={[radius - 0.005, radius + 0.005, 64]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#06b6d4"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) return;
    const { pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3 + 1, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 60 : 150;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#e0f0ff" />

      {/* Core */}
      <CoreSphere />

      {/* Orbit rings */}
      <OrbitRings />

      {/* Tech Nodes */}
      {TECH_NODES.map((node) => (
        <TechNode key={node.name} {...node} />
      ))}

      {/* Particles */}
      <Particles count={particleCount} />

      {/* Camera Rig */}
      <CameraRig />
    </>
  );
}
