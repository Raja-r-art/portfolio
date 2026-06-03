import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

export default function WorkstationModel() {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Group>(null);
  const screenGlowRef = useRef<THREE.Mesh>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const { x, y } = state.pointer;
    
    // Smoothly tilt monitor toward cursor
    if (monitorRef.current) {
      monitorRef.current.rotation.y = THREE.MathUtils.lerp(monitorRef.current.rotation.y, x * 0.25, 0.08);
      monitorRef.current.rotation.x = THREE.MathUtils.lerp(monitorRef.current.rotation.x, -y * 0.15, 0.08);
    }

    // Monitor screen glow pulse
    if (screenGlowRef.current) {
      const material = screenGlowRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.15 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Ambient Lighting inside model coordinate system for extra highlight */}
      <pointLight position={[0, 0, 1.5]} color="#ffffff" intensity={0.5} distance={5} />
      <pointLight position={[-1.5, 0.5, 0.5]} color="#888888" intensity={0.4} distance={3} />
      <pointLight position={[1.5, -0.5, 0.5]} color="#555555" intensity={0.3} distance={3} />

      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.08}>
        <group 
          ref={monitorRef}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        >
          {/* ================= MONITOR STAND ================= */}
          {/* Circular/Heavy Base plate */}
          <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.38, 0.03, 32]} />
            <meshStandardMaterial 
              color="#0d0d0d" 
              metalness={0.9} 
              roughness={0.15} 
            />
          </mesh>
          
          {/* Base Inner Ring Ring accent */}
          <mesh position={[0, -0.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.01, 32]} />
            <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Lower Stand Neck joint */}
          <mesh position={[0, -0.75, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.2, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Curved stand column (Procedural using multiple boxes/cylinders) */}
          <mesh position={[0, -0.3, -0.15]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[0.09, 0.8, 0.09]} />
            <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Upper Hinge Connector */}
          <mesh position={[0, 0.1, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.12, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.95} roughness={0.1} />
          </mesh>
          
          <mesh position={[0, 0.1, -0.24]}>
            <boxGeometry args={[0.15, 0.15, 0.08]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* ================= MONITOR CASING (BACK PANEL) ================= */}
          {/* Curved Main Back Panel */}
          <mesh position={[0, 0.1, -0.1]}>
            <boxGeometry args={[2.08, 1.18, 0.15]} />
            <meshStandardMaterial 
              color="#0d0d0d" 
              metalness={0.85} 
              roughness={0.25} 
            />
          </mesh>

          {/* Center Back Bump for electronics and VESA mount */}
          <mesh position={[0, 0.1, -0.2]}>
            <boxGeometry args={[0.7, 0.7, 0.1]} />
            <meshStandardMaterial color="#141414" metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Ventilation grilles (parallel thin slots) */}
          {[-0.2, -0.1, 0, 0.1, 0.2].map((y, i) => (
            <mesh key={i} position={[0, 0.1 + y, -0.25]}>
              <boxGeometry args={[0.5, 0.015, 0.01]} />
              <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.5} />
            </mesh>
          ))}

          {/* Port cutouts at the bottom back */}
          <mesh position={[-0.15, -0.2, -0.23]}>
            <boxGeometry args={[0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0.15, -0.2, -0.23]}>
            <boxGeometry args={[0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* ================= MONITOR FRONT BEZEL ================= */}
          {/* Top Bezel */}
          <mesh position={[0, 0.69, -0.01]}>
            <boxGeometry args={[2.14, 0.03, 0.04]} />
            <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Bottom Bezel */}
          <mesh position={[0, -0.49, -0.01]}>
            <boxGeometry args={[2.14, 0.05, 0.04]} />
            <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Left Bezel */}
          <mesh position={[-1.06, 0.1, -0.01]}>
            <boxGeometry args={[0.03, 1.21, 0.04]} />
            <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Right Bezel */}
          <mesh position={[1.06, 0.1, -0.01]}>
            <boxGeometry args={[0.03, 1.21, 0.04]} />
            <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Bezel inner chamfers for premium look */}
          <mesh position={[0, 0.1, -0.02]}>
            <boxGeometry args={[2.12, 1.19, 0.01]} />
            <meshStandardMaterial color="#050505" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Status Power LED (Subtle light on bottom right corner of bezel) */}
          <mesh position={[0.98, -0.49, 0.015]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Logo badge in center bottom bezel */}
          <mesh position={[0, -0.49, 0.015]}>
            <boxGeometry args={[0.06, 0.015, 0.005]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* ================= MONITOR SCREEN ================= */}
          {/* The Screen Mesh with emissive material */}
          <mesh ref={screenGlowRef} position={[0, 0.1, 0]}>
            <planeGeometry args={[2.08, 1.14]} />
            <meshStandardMaterial 
              color="#020202"
              emissive="#222222"
              emissiveIntensity={0.15}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>

          {/* Screen Glass overlay (realistic reflection) */}
          <mesh position={[0, 0.1, 0.005]}>
            <planeGeometry args={[2.08, 1.14]} />
            <meshPhysicalMaterial 
              color="#000000"
              roughness={0.05}
              metalness={0.95}
              transmission={0.4}
              ior={1.5}
              thickness={0.01}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* HTML Coding Screen Display content */}
          <Html
            transform
            distanceFactor={1.14}
            position={[0, 0.1, 0.008]}
            className="w-[1920px] h-[1050px] bg-black rounded p-16 overflow-hidden flex flex-col font-mono text-white select-none border-2 border-white/10"
            style={{
              boxShadow: isHovered ? "0 0 80px rgba(255, 255, 255, 0.1)" : "none",
              transition: "box-shadow 0.5s ease"
            }}
          >
            {/* Header top bar inside monitor screen */}
            <div className="flex items-center justify-between border-b border-neutral-900 pb-5 mb-10 text-2xl text-neutral-500">
              <div className="flex gap-3">
                <span className="w-4 h-4 rounded-full bg-neutral-800"></span>
                <span className="w-4 h-4 rounded-full bg-neutral-600"></span>
                <span className="w-4 h-4 rounded-full bg-white"></span>
              </div>
              <div className="text-xl tracking-[0.45em] uppercase font-bold text-neutral-400">system.display.node</div>
              <div className="text-white font-bold px-3 py-1 bg-white/5 rounded text-lg border border-white/10">STABLE</div>
            </div>
            
            {/* Main Title content inside screen */}
            <div className="flex-1 flex flex-col items-center justify-center text-center overflow-hidden">
              <p className="text-6xl text-neutral-400 font-display font-semibold mb-8">// IDENTITY MATRIX</p>
              
              <div className="text-5xl text-neutral-300 font-display font-medium tracking-wide mb-6">
                Hi, I'm
              </div>
              
              <h1 className="text-[200px] leading-none font-display font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Rajas
              </h1>
              
              <p className="mt-12 text-6xl text-neutral-200 font-mono font-medium">
                3D Web Enthusiast<span className="animate-pulse text-white font-light">|</span>
              </p>
              
              <div className="mt-16 h-2.5 w-2/3 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
            </div>

            {/* Futuristic system info footer */}
            <div className="flex justify-between items-end border-t border-neutral-900 pt-6 text-xl text-neutral-500">
              <div>HOST: RAJAS_WORKSPACE</div>
              <div className="flex gap-6">
                <span>FPS: 60.00</span>
                <span>CORE: CL-26</span>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* Floating particles around the monitor for realistic context */}
      {[...Array(12)].map((_, i) => (
        <AmbientParticle key={i} index={i} />
      ))}
    </group>
  );
}

const AmbientParticle = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseAngle = (index / 12) * Math.PI * 2;
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() + index * 1.5;
      meshRef.current.position.x = Math.cos(t * 0.15 + baseAngle) * (2.2 + Math.sin(t * 0.1) * 0.3);
      meshRef.current.position.y = Math.sin(t * 0.2) * 1.2 + 0.3;
      meshRef.current.position.z = Math.sin(t * 0.15 + baseAngle) * (2.2 + Math.cos(t * 0.1) * 0.3);
      meshRef.current.scale.setScalar(0.4 + Math.sin(t) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.022, 8, 8]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? "#ffffff" : "#888888"}
        emissive={index % 2 === 0 ? "#ffffff" : "#888888"}
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};
