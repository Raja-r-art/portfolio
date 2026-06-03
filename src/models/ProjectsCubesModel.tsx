import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { Project, projectsData } from "../constants/portfolioData";

export default function ProjectsCubesModel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <group position={[0, 0, 0]}>
      {projectsData.map((project: Project, idx: number) => {
        // Arrange project cubes in a nice grid layout
        const posX = (idx % 2) * 2.2 - 1.1;
        const posY = Math.floor(idx / 2) * -1.8 + 0.9;
        const posZ = (idx % 2 === 0 ? 0.2 : -0.2);

        return (
          <ProjectCube 
            key={project.id}
            project={project}
            index={idx}
            position={[posX, posY, posZ]}
            isHovered={hoveredIndex === idx}
            onHover={() => setHoveredIndex(idx)}
            onLeave={() => setHoveredIndex(null)}
          />
        );
      })}
    </group>
  );
}

interface ProjectCubeProps {
  project: Project;
  index: number;
  position: [number, number, number];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCube({
  project,
  index,
  position,
  isHovered,
  onHover,
  onLeave
}: ProjectCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isHovered) {
        // Smoothly rotate faster and align on hover
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.clock.getElapsedTime() * 1.5, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.sin(state.clock.getElapsedTime()) * 0.3, 0.1);
      } else {
        // Slow constant idle rotation
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2 + index;
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.15;
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onLeave();
          }}
          scale={isHovered ? 1.25 : 1}
        >
          {/* Outer Glass Cube */}
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshPhysicalMaterial 
            color={project.color}
            transmission={0.8}
            roughness={0.15}
            metalness={0.1}
            ior={1.5}
            thickness={0.5}
            specularIntensity={1.0}
            clearcoat={1.0}
            transparent
            opacity={0.4}
          />
          
          {/* Inner Glowing Core */}
          <mesh scale={0.5}>
            <octahedronGeometry args={[0.6]} />
            <meshStandardMaterial 
              color={project.color}
              emissive={project.color}
              emissiveIntensity={isHovered ? 2.5 : 0.6}
            />
          </mesh>

          {/* Glowing wireframe container */}
          <mesh scale={1.02}>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshBasicMaterial 
              color={project.color} 
              wireframe 
              transparent 
              opacity={isHovered ? 0.8 : 0.15} 
            />
          </mesh>

          {/* Project visual tag */}
          <Html
            position={[0, -0.65, 0]}
            center
            style={{
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              opacity: isHovered ? 1 : 0.6,
              transform: `scale(${isHovered ? 1.05 : 0.9})`,
              pointerEvents: 'none'
            }}
          >
            <div className="bg-[#0b0c20]/90 border border-slate-700/40 rounded-md py-1 px-3 whitespace-nowrap text-center shadow-lg font-mono">
              <span className="text-[10px] font-bold" style={{ color: project.color }}>
                {project.title.split(' - ')[0]}
              </span>
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  );
}
