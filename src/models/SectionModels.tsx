import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Shared materials and helpers for consistent aesthetic
const chromeMaterial = new THREE.MeshStandardMaterial({
  color: "#cccccc",
  metalness: 0.95,
  roughness: 0.1,
});

const darkMetalMaterial = new THREE.MeshStandardMaterial({
  color: "#1a1a1a",
  metalness: 0.85,
  roughness: 0.25,
});

const glowingMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#ffffff",
  emissiveIntensity: 1.0,
});

// A soft shadow base for realistic landing
function SoftShadowDisc({ radius = 1.25, opacity = 0.4 }: { radius?: number; opacity?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
      <circleGeometry args={[radius, 64]} />
      <meshBasicMaterial color="#000000" transparent opacity={opacity} />
    </mesh>
  );
}


// ==========================================
// 1. ABOUT ME - Working Developer Model
// ==========================================
// Holographic data particle rising from keyboard
function HoloDataParticle({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = 0.35 + Math.random() * 0.45;
  const startX = 0.05 + Math.random() * 0.2;
  const startZ = -0.15 + Math.random() * 0.3;
  const delay = index * 0.6;
  
  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime() + delay;
      // Float upwards, reset when too high
      const y = -0.12 + ((elapsed * speed) % 0.65);
      meshRef.current.position.y = y;
      meshRef.current.position.x = startX + Math.sin(elapsed * 5) * 0.015;
      meshRef.current.position.z = startZ + Math.cos(elapsed * 4) * 0.015;
      
      // Fade out as it rises
      const opacity = THREE.MathUtils.lerp(0.85, 0, (y + 0.12) / 0.65);
      if (meshRef.current.material) {
        (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[startX, -0.12, startZ]}>
      <boxGeometry args={[0.012, 0.012, 0.012]} />
      <meshBasicMaterial 
        color={index % 3 === 0 ? "#00f0ff" : index % 3 === 1 ? "#ff00f0" : "#ffffff"} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

export function WorkingDeveloperModel() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  
  const mainScreenRef = useRef<THREE.Mesh>(null);
  const leftScreenRef = useRef<THREE.Mesh>(null);
  const rightScreenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Torso idle breathing & sway
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.08 - 0.25;
      groupRef.current.position.y = Math.sin(elapsed * 0.35) * 0.018 - 0.12;
    }
    
    // Head reads code across curved screens
    if (headRef.current) {
      const scanAngle = Math.sin(elapsed * 0.45);
      headRef.current.rotation.y = scanAngle * 0.16; // looking between side screens
      headRef.current.rotation.x = -0.06 + Math.cos(elapsed * 1.2) * 0.025; // nodding/reading lines
    }

    // typing cadence generator: 5s typing, 1.8s thinking
    const typingCycle = elapsed % 6.8;
    let speedMult = 12;
    let activeTyping = true;
    
    if (typingCycle > 5.0) {
      activeTyping = false; // pause to think
    } else if (typingCycle > 2.8) {
      speedMult = 18; // fast typing burst
    }

    if (activeTyping) {
      // Rapid alternate forearm typing rotations
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.22 + Math.sin(elapsed * speedMult) * 0.07;
        leftArmRef.current.rotation.y = -0.08 + Math.cos(elapsed * 6) * 0.03;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -0.22 + Math.cos(elapsed * (speedMult + 1.2)) * 0.07;
        rightArmRef.current.rotation.y = 0.08 + Math.sin(elapsed * 5) * 0.03;
      }
      
      // Fingers rapid alternate tapping
      if (leftHandRef.current) {
        leftHandRef.current.rotation.x = Math.sin(elapsed * 22) * 0.15;
      }
      if (rightHandRef.current) {
        rightHandRef.current.rotation.x = Math.cos(elapsed * 24) * 0.15;
      }
    } else {
      // Idle sway when pausing/thinking
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.08, 0.08);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, -0.12, 0.08);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.08, 0.08);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0.12, 0.08);
      }
      if (leftHandRef.current) leftHandRef.current.rotation.x = THREE.MathUtils.lerp(leftHandRef.current.rotation.x, 0, 0.1);
      if (rightHandRef.current) rightHandRef.current.rotation.x = THREE.MathUtils.lerp(rightHandRef.current.rotation.x, 0, 0.1);
    }

    // Pulsing monitor lights mapping reflections on developer face
    if (mainScreenRef.current) {
      const mat = mainScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.45 + Math.sin(elapsed * 2.8) * 0.12;
    }
    if (leftScreenRef.current) {
      const mat = leftScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.35 + Math.cos(elapsed * 2.2) * 0.1;
    }
    if (rightScreenRef.current) {
      const mat = rightScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.35 + Math.sin(elapsed * 1.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <SoftShadowDisc radius={1.7} opacity={0.55} />

      {/* Point lights reflecting blue/purple aesthetic */}
      <pointLight position={[0.2, 0.3, 0.2]} color="#00f0ff" intensity={0.6} distance={2.5} />
      <pointLight position={[0.2, 0.3, -0.2]} color="#ff00f0" intensity={0.4} distance={2.5} />

      {/* ================= CYBER POD SEAT ================= */}
      <group position={[-0.8, -0.6, 0]}>
        {/* Five spokes wheel base */}
        <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.03, 16]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        {/* Support central cylinder */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.46, 16]} />
          <primitive object={chromeMaterial} attach="material" />
        </mesh>
        
        {/* Curved Pod Bucket Seat Base */}
        <RoundedBox args={[0.54, 0.08, 0.54]} radius={0.04} smoothness={4} position={[0, 0.1, 0]}>
          <meshStandardMaterial color="#0f0f12" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        
        {/* Neon blue rim glow for chair base */}
        <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.015, 8, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Tall Cyber Backrest panel */}
        <RoundedBox args={[0.06, 0.65, 0.42]} radius={0.03} smoothness={4} position={[-0.25, 0.46, 0]} rotation={[0, 0, -0.06]}>
          <meshStandardMaterial color="#0b0b0d" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        
        {/* Cyber Headrest pillow */}
        <RoundedBox args={[0.05, 0.16, 0.28]} radius={0.02} smoothness={4} position={[-0.28, 0.8, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </RoundedBox>

        {/* Purple neon accent bar on backrest spine */}
        <mesh position={[-0.29, 0.46, 0]}>
          <boxGeometry args={[0.01, 0.5, 0.025]} />
          <meshBasicMaterial color="#ff00f0" />
        </mesh>
      </group>

      {/* ================= MINIMALIST METALLIC DESK ================= */}
      <group position={[0.25, -0.4, 0]}>
        {/* Sleek carbon-fiber desktop */}
        <RoundedBox args={[1.5, 0.05, 1.15]} radius={0.015} smoothness={4} position={[0, -0.22, 0]}>
          <meshStandardMaterial color="#0a0a0c" metalness={0.9} roughness={0.12} />
        </RoundedBox>
        
        {/* Integrated glowing circuit trail on desk surface */}
        <mesh position={[0, -0.192, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.005]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, -0.192, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.005]} />
          <meshBasicMaterial color="#ff00f0" />
        </mesh>

        {/* Sleek metal framework desk legs */}
        <mesh position={[-0.65, -0.62, 0]}>
          <boxGeometry args={[0.03, 0.76, 0.95]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0.65, -0.62, 0]}>
          <boxGeometry args={[0.03, 0.76, 0.95]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
      </group>

      {/* ================= CYBERPUNK MANNEQUIN ================= */}
      <group position={[-0.8, -0.3, 0]}>
        {/* Segmented Torso */}
        <mesh position={[0, 0.1, 0]}>
          <capsuleGeometry args={[0.15, 0.3, 16, 32]} />
          <meshStandardMaterial color="#fafafa" metalness={0.3} roughness={0.08} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Glowing Spine vertebrae details */}
        {[-0.05, 0.05, 0.15, 0.25].map((y, i) => (
          <mesh key={i} position={[-0.14, y, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#ff00f0" />
          </mesh>
        ))}

        {/* Neck */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Mannequin Head (Polished aesthetic) */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          <mesh>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial color="#fafafa" metalness={0.2} roughness={0.08} />
          </mesh>
          
          {/* Cyber Sleek Glowing Visor */}
          <group position={[0.08, 0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
            {/* Visor Bar Glass */}
            <mesh>
              <boxGeometry args={[0.2, 0.038, 0.08]} />
              <meshStandardMaterial 
                color="#00f0ff" 
                emissive="#00f0ff" 
                emissiveIntensity={1.5} 
                transparent 
                opacity={0.9} 
              />
            </mesh>
            {/* Side connectors */}
            <mesh position={[-0.1, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.02, 12]} />
              <primitive object={chromeMaterial} attach="material" />
            </mesh>
            <mesh position={[0.1, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.02, 12]} />
              <primitive object={chromeMaterial} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Left Arm Assembly */}
        <group ref={leftArmRef} position={[0, 0.22, -0.16]}>
          <mesh><sphereGeometry args={[0.045, 16, 16]} /><primitive object={chromeMaterial} attach="material" /></mesh>
          <mesh position={[0.12, -0.1, 0.01]} rotation={[0, 0, -0.75]}>
            <capsuleGeometry args={[0.032, 0.18, 8, 16]} />
            <meshStandardMaterial color="#262626" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0.24, -0.18, 0.06]} rotation={[1.1, 0.25, -0.22]}>
            <capsuleGeometry args={[0.028, 0.18, 8, 16]} />
            <meshStandardMaterial color="#fafafa" metalness={0.2} roughness={0.08} />
          </mesh>
          {/* Hand joint */}
          <group ref={leftHandRef} position={[0.24, -0.27, 0.14]}>
            <mesh><sphereGeometry args={[0.025, 8, 8]} /><primitive object={chromeMaterial} attach="material" /></mesh>
            {/* Typing finger capsules representative */}
            <mesh position={[0.03, -0.01, 0]} rotation={[0, 0.3, 0.5]}>
              <capsuleGeometry args={[0.008, 0.03, 4, 8]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          </group>
        </group>

        {/* Right Arm Assembly */}
        <group ref={rightArmRef} position={[0, 0.22, 0.16]}>
          <mesh><sphereGeometry args={[0.045, 16, 16]} /><primitive object={chromeMaterial} attach="material" /></mesh>
          <mesh position={[0.12, -0.1, -0.01]} rotation={[0, 0, -0.75]}>
            <capsuleGeometry args={[0.032, 0.18, 8, 16]} />
            <meshStandardMaterial color="#262626" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0.24, -0.18, -0.06]} rotation={[1.1, -0.25, 0.22]}>
            <capsuleGeometry args={[0.028, 0.18, 8, 16]} />
            <meshStandardMaterial color="#fafafa" metalness={0.2} roughness={0.08} />
          </mesh>
          {/* Hand joint */}
          <group ref={rightHandRef} position={[0.24, -0.27, -0.14]}>
            <mesh><sphereGeometry args={[0.025, 8, 8]} /><primitive object={chromeMaterial} attach="material" /></mesh>
            <mesh position={[0.03, -0.01, 0]} rotation={[0, -0.3, 0.5]}>
              <capsuleGeometry args={[0.008, 0.03, 4, 8]} />
              <meshBasicMaterial color="#ff00f0" />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================= CURVED TRIPLE HOLOGRAM SCREENS ================= */}
      {/* 1. CENTER SCREEN */}
      <group position={[0.3, 0.2, 0.05]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Screen glass */}
        <mesh ref={mainScreenRef}>
          <boxGeometry args={[0.82, 0.56, 0.012]} />
          <meshPhysicalMaterial 
            color="#050811" 
            transmission={0.92} 
            transparent 
            opacity={0.12} 
            roughness={0.05} 
            ior={1.4}
            thickness={0.02}
            emissive="#00f0ff"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Left/Right glowing frame borders */}
        <mesh position={[-0.41, 0, 0]}>
          <boxGeometry args={[0.005, 0.56, 0.015]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.41, 0, 0]}>
          <boxGeometry args={[0.005, 0.56, 0.015]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* HTML display overlay inside screen */}
        <Html
          transform
          distanceFactor={0.54}
          position={[0, 0, 0.01]}
          className="w-[480px] h-[330px] bg-black/60 border border-cyan-500/20 p-6 text-white font-mono select-none rounded overflow-hidden backdrop-blur-sm"
        >
          <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2 mb-3 text-[10px] text-cyan-400 font-bold">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800 animate-pulse"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            </div>
            <div>neural-core.sh</div>
            <div className="text-cyan-300 font-extrabold animate-pulse">ONLINE</div>
          </div>
          
          <div className="text-[12px] leading-relaxed text-neutral-300 font-semibold space-y-1">
            <div className="text-neutral-500">// BUNDLING WEBGL RUNTIME</div>
            <div>const engine = new WebGL2();</div>
            <div>engine.loadMannequin(RiggedModel);</div>
            <div className="text-cyan-400 font-black">init.compile() --verbose</div>
            <div className="text-[11px] text-neutral-400 mt-2 space-y-0.5">
              <div>&gt; Vertex shaders loaded OK</div>
              <div>&gt; Fragment shaders initialized</div>
              <div className="text-pink-400">&gt; Status: 100% READY_TO_RUN</div>
            </div>
          </div>
        </Html>
      </group>

      {/* 2. LEFT SCREEN (Tilted toward mannequin) */}
      <group position={[0.22, 0.2, -0.38]} rotation={[0, -Math.PI / 2 + 0.42, 0]}>
        <mesh ref={leftScreenRef}>
          <boxGeometry args={[0.56, 0.48, 0.01]} />
          <meshPhysicalMaterial 
            color="#0b0511" 
            transmission={0.92} 
            transparent 
            opacity={0.12} 
            roughness={0.05}
            emissive="#ff00f0"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[-0.28, 0, 0]}><boxGeometry args={[0.005, 0.48, 0.012]} /><meshBasicMaterial color="#ff00f0" /></mesh>
        <mesh position={[0.28, 0, 0]}><boxGeometry args={[0.005, 0.48, 0.012]} /><meshBasicMaterial color="#ff00f0" /></mesh>
        
        {/* Glowing bars depicting network stats / charts */}
        {[-0.14, -0.06, 0.02, 0.1].map((x, i) => {
          const barHeight = 0.15 + (i % 2 === 0 ? 0.18 : 0.08);
          return (
            <mesh key={i} position={[x, -0.1 + barHeight/2, 0.01]}>
              <planeGeometry args={[0.03, barHeight]} />
              <meshBasicMaterial color="#ff00f0" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>

      {/* 3. RIGHT SCREEN (Tilted toward mannequin) */}
      <group position={[0.22, 0.2, 0.48]} rotation={[0, -Math.PI / 2 - 0.42, 0]}>
        <mesh ref={rightScreenRef}>
          <boxGeometry args={[0.56, 0.48, 0.01]} />
          <meshPhysicalMaterial 
            color="#050811" 
            transmission={0.92} 
            transparent 
            opacity={0.12} 
            roughness={0.05}
            emissive="#00f0ff"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[-0.28, 0, 0]}><boxGeometry args={[0.005, 0.48, 0.012]} /><meshBasicMaterial color="#00f0ff" /></mesh>
        <mesh position={[0.28, 0, 0]}><boxGeometry args={[0.005, 0.48, 0.012]} /><meshBasicMaterial color="#00f0ff" /></mesh>

        {/* Matrix binary code lines block */}
        {[-0.16, -0.08, 0, 0.08, 0.16].map((y, i) => (
          <mesh key={i} position={[0, y, 0.01]}>
            <boxGeometry args={[0.34, 0.012, 0.002]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* ================= HOLOGRAPHIC KEYBOARD ================= */}
      <group position={[0.05, -0.5, 0]}>
        {/* Keypad floating plate */}
        <mesh position={[0, 0.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 0.015, 0.46]} />
          <meshPhysicalMaterial 
            color="#00f0ff" 
            transmission={0.95} 
            transparent 
            opacity={0.15} 
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Neon contour line around keyboard */}
        <mesh position={[0, 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.006, 4, 4]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        
        {/* Keys glowing blocks representation */}
        {[-0.18, -0.09, 0, 0.09, 0.18].map((z, idx) => (
          <mesh key={idx} position={[0, 0.11, z]}>
            <boxGeometry args={[0.1, 0.01, 0.04]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#00f0ff" : "#ff00f0"} transparent opacity={0.65} />
          </mesh>
        ))}
      </group>

      {/* Floating 3D holographic code binary particle lines */}
      {[...Array(6)].map((_, i) => (
        <HoloDataParticle key={i} index={i} />
      ))}
    </group>
  );
}


// ==========================================
// 2. SKILLS - 3D Gear Mechanism Model
// ==========================================
interface GearProps {
  radius: number;
  teeth: number;
  color: string;
  metalness?: number;
  roughness?: number;
}

function GearMesh({ radius, teeth, color, metalness = 0.9, roughness = 0.2 }: GearProps) {
  // Memoize geometry layout so it doesn't recalculate
  const toothWidth = (Math.PI * 2 * radius) / teeth * 0.48;
  const toothHeight = 0.09;
  
  return (
    <group>
      {/* Central main core cylinder */}
      <mesh>
        <cylinderGeometry args={[radius - 0.02, radius - 0.02, 0.16, 48]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>

      {/* Central shaft ring hole */}
      <mesh>
        <cylinderGeometry args={[radius * 0.25, radius * 0.25, 0.18, 24]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Decorative inner spoke circle holes */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const dist = radius * 0.58;
        return (
          <mesh key={i} position={[Math.cos(angle) * dist, 0, Math.sin(angle) * dist]}>
            <cylinderGeometry args={[radius * 0.15, radius * 0.15, 0.2, 16]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
        );
      })}

      {/* Gear Teeth perimeter placement */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} 
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[toothHeight, 0.16, toothWidth]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </mesh>
        );
      })}
    </group>
  );
}

export function GearSkillsModel() {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const gear3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.12;
      groupRef.current.rotation.x = Math.cos(elapsed * 0.15) * 0.08;
    }
    
    // Smooth interlocking mechanical rotation
    // Gear1 (large): clockwise
    if (gear1Ref.current) gear1Ref.current.rotation.y = elapsed * 0.25;
    
    // Gear2 (medium) meshes with Gear1: counter-clockwise, speed ratio is inverse of radius/teeth
    // Gear1 teeth = 20, Gear2 teeth = 14 => speed2 = speed1 * (20 / 14)
    if (gear2Ref.current) gear2Ref.current.rotation.y = -elapsed * 0.25 * (20 / 14);

    // Gear3 (small) meshes with Gear2: clockwise, speed ratio
    // Gear2 teeth = 14, Gear3 teeth = 8 => speed3 = speed2 * (14 / 8)
    if (gear3Ref.current) gear3Ref.current.rotation.y = elapsed * 0.25 * (20 / 8);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <SoftShadowDisc radius={1.8} opacity={0.4} />

      {/* Large Central Gear */}
      <group ref={gear1Ref} position={[-0.45, 0.2, 0]}>
        <GearMesh radius={0.8} teeth={20} color="#e0e0e0" />
      </group>

      {/* Medium Interlocking Gear */}
      <group ref={gear2Ref} position={[0.65, -0.15, 0.1]}>
        <GearMesh radius={0.56} teeth={14} color="#888888" />
      </group>

      {/* Small Gear meshes with medium gear */}
      <group ref={gear3Ref} position={[0.25, -0.85, -0.15]}>
        <GearMesh radius={0.32} teeth={8} color="#cccccc" />
      </group>

      {/* Background connection framework plate/bars */}
      <group position={[0, -0.2, -0.12]}>
        {/* Support rods connecting gear hubs */}
        <mesh position={[0.1, 0.025, 0]} rotation={[0, 0, -Math.PI / 10]}>
          <boxGeometry args={[1.2, 0.08, 0.04]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0.45, -0.5, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[0.9, 0.08, 0.04]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        {/* Decorative rivets */}
        <mesh position={[-0.45, 0.4, 0]}><sphereGeometry args={[0.06, 8, 8]} /><primitive object={chromeMaterial} attach="material" /></mesh>
        <mesh position={[0.65, 0.05, 0]}><sphereGeometry args={[0.06, 8, 8]} /><primitive object={chromeMaterial} attach="material" /></mesh>
        <mesh position={[0.25, -0.65, 0]}><sphereGeometry args={[0.06, 8, 8]} /><primitive object={chromeMaterial} attach="material" /></mesh>
      </group>
    </group>
  );
}


// ==========================================
// 3. CODING PROFILES - 3D Human Brain Model
// ==========================================
export function BrainModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Memoize synapse network node locations
  const synapses = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 0.35 + Math.random() * 0.32;
      return new THREE.Vector3(
        rad * Math.sin(phi) * Math.cos(theta),
        rad * Math.sin(phi) * Math.sin(theta) * 0.76, // flattened vertically
        rad * Math.cos(phi)
      );
    });
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle brain sway and rotation
      groupRef.current.rotation.y = elapsed * 0.18;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.08;
      
      // Pulse scale representing cognitive processing
      const scale = 1.0 + Math.sin(elapsed * 1.5) * 0.03;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <SoftShadowDisc radius={1.3} opacity={0.4} />

      {/* ================= LEFT HEMISPHERE ================= */}
      <group position={[-0.045, 0, 0]}>
        {/* Frontal Lobe */}
        <mesh position={[-0.2, 0.1, 0.15]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Parietal Lobe */}
        <mesh position={[-0.15, 0.22, -0.1]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Occipital Lobe */}
        <mesh position={[-0.15, 0.05, -0.32]}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshStandardMaterial color="#a0a0a0" roughness={0.35} metalness={0.1} />
        </mesh>
        {/* Temporal Lobe */}
        <mesh position={[-0.32, -0.08, 0.02]}>
          <sphereGeometry args={[0.23, 24, 24]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.35} metalness={0.1} />
        </mesh>
        
        {/* Cerebral Cortex Wrinkles (Gyri represent overlapping spheres) */}
        {Array.from({ length: 18 }).map((_, idx) => {
          const phi = (idx / 18) * Math.PI;
          const theta = idx * 1.1;
          const rx = 0.28 * Math.sin(phi) * Math.cos(theta) - 0.16;
          const ry = 0.28 * Math.sin(phi) * Math.sin(theta) * 0.8 + 0.08;
          const rz = 0.28 * Math.cos(phi) - 0.08;
          return (
            <mesh key={idx} position={[rx, ry, rz]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshStandardMaterial color="#dcdcdc" roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* ================= RIGHT HEMISPHERE ================= */}
      <group position={[0.045, 0, 0]}>
        {/* Frontal Lobe */}
        <mesh position={[0.2, 0.1, 0.15]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Parietal Lobe */}
        <mesh position={[0.15, 0.22, -0.1]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Occipital Lobe */}
        <mesh position={[0.15, 0.05, -0.32]}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <meshStandardMaterial color="#a0a0a0" roughness={0.35} metalness={0.1} />
        </mesh>
        {/* Temporal Lobe */}
        <mesh position={[0.32, -0.08, 0.02]}>
          <sphereGeometry args={[0.23, 24, 24]} />
          <meshStandardMaterial color="#d0d0d0" roughness={0.35} metalness={0.1} />
        </mesh>

        {/* Cerebral Cortex Wrinkles */}
        {Array.from({ length: 18 }).map((_, idx) => {
          const phi = (idx / 18) * Math.PI;
          const theta = idx * 1.1;
          const rx = 0.28 * Math.sin(phi) * Math.cos(theta) + 0.16;
          const ry = 0.28 * Math.sin(phi) * Math.sin(theta) * 0.8 + 0.08;
          const rz = 0.28 * Math.cos(phi) - 0.08;
          return (
            <mesh key={idx} position={[rx, ry, rz]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshStandardMaterial color="#dcdcdc" roughness={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* Cerebellum at back bottom */}
      <group position={[0, -0.22, -0.3]}>
        <mesh position={[-0.14, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#888888" roughness={0.5} />
        </mesh>
        <mesh position={[0.14, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#888888" roughness={0.5} />
        </mesh>
        {/* Horizontal parallel lines mapping cerebellum folds */}
        {[-0.06, 0, 0.06].map((y, i) => (
          <mesh key={i} position={[0, y, 0.08]}>
            <boxGeometry args={[0.34, 0.015, 0.08]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
      </group>

      {/* Brain Stem extending downward */}
      <mesh position={[0, -0.42, -0.1]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#555555" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Glowing Inner Core Mesh */}
      <mesh position={[0, 0.06, -0.06]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      {/* Glowing active synapses (Floating neural sparks) */}
      {synapses.map((pos, idx) => (
        <group key={idx}>
          <mesh position={pos}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <primitive object={glowingMaterial} attach="material" />
          </mesh>
          {/* Subtle connecting lines */}
          {idx < synapses.length - 1 && (
            <mesh 
              position={[ (pos.x + synapses[idx+1].x)/2, (pos.y + synapses[idx+1].y)/2, (pos.z + synapses[idx+1].z)/2 ]}
              rotation={[0, 0, Math.atan2(synapses[idx+1].y - pos.y, synapses[idx+1].x - pos.x)]}
            >
              <boxGeometry args={[0.15, 0.003, 0.003]} />
              <meshBasicMaterial color="#aaaaaa" transparent opacity={0.12} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}


// ==========================================
// 4. RESUME / CV - Realistic Resume Paper Model
// ==========================================
export function ResumePaperModel() {
  const pageRef = useRef<THREE.Group>(null);
  const badge1Ref = useRef<THREE.Mesh>(null);
  const badge2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (pageRef.current) {
      // Paper floating and tilting
      pageRef.current.rotation.y = Math.sin(elapsed * 0.4) * 0.2;
      pageRef.current.position.y = Math.sin(elapsed * 0.8) * 0.08;
    }
    
    // Float badges independently
    if (badge1Ref.current) {
      badge1Ref.current.rotation.x = elapsed * 0.4;
      badge1Ref.current.rotation.y = elapsed * 0.6;
      badge1Ref.current.position.y = 0.5 + Math.sin(elapsed * 1.5) * 0.08;
    }
    if (badge2Ref.current) {
      badge2Ref.current.rotation.x = elapsed * 0.5;
      badge2Ref.current.rotation.z = -elapsed * 0.3;
      badge2Ref.current.position.y = -0.4 + Math.cos(elapsed * 1.3) * 0.08;
    }
  });

  return (
    <group ref={pageRef}>
      <SoftShadowDisc radius={1.4} opacity={0.45} />

      <Float speed={1.5} floatIntensity={0.05} rotationIntensity={0.06}>
        <group>
          {/* Main Paper Sheet (thick/beveled edge via RoundedBox) */}
          <RoundedBox args={[1.08, 1.54, 0.03]} radius={0.02} smoothness={4}>
            <meshPhysicalMaterial 
              color="#fdfdfa" 
              roughness={0.9} 
              metalness={0.0} 
              clearcoat={0.1}
            />
          </RoundedBox>

          {/* Paper backing plate for shadow depth */}
          <mesh position={[0.02, -0.02, -0.02]}>
            <planeGeometry args={[1.08, 1.54]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.25} />
          </mesh>

          {/* Profile Picture box frame */}
          <mesh position={[0.36, 0.55, 0.022]}>
            <planeGeometry args={[0.22, 0.22]} />
            <meshStandardMaterial color="#e0e0e0" roughness={0.7} />
          </mesh>
          <mesh position={[0.36, 0.55, 0.024]} rotation={[0, 0, -0.2]}>
            <planeGeometry args={[0.18, 0.18]} />
            <meshStandardMaterial color="#888888" roughness={0.8} />
          </mesh>

          {/* Simulated text layout lines (using box meshes for structure) */}
          {/* Title line */}
          <mesh position={[-0.18, 0.62, 0.02]}>
            <boxGeometry args={[0.5, 0.035, 0.005]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          {/* Subtitle tag */}
          <mesh position={[-0.24, 0.53, 0.02]}>
            <boxGeometry args={[0.38, 0.015, 0.005]} />
            <meshStandardMaterial color="#888888" roughness={0.8} />
          </mesh>

          {/* Body Divider */}
          <mesh position={[0, 0.38, 0.02]}>
            <boxGeometry args={[0.92, 0.008, 0.005]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>

          {/* Body Lines representing experience blocks */}
          {Array.from({ length: 8 }).map((_, i) => {
            const posY = 0.26 - i * 0.09;
            const width = i % 3 === 0 ? 0.82 : i % 3 === 1 ? 0.68 : 0.55;
            const xOffset = -0.46 + width/2;
            return (
              <group key={i} position={[xOffset, posY, 0.02]}>
                <mesh>
                  <boxGeometry args={[width, 0.016, 0.004]} />
                  <meshStandardMaterial color={i % 3 === 0 ? "#333333" : "#777777"} roughness={0.8} />
                </mesh>
                {/* Simulated list dot bullet */}
                <mesh position={[-width/2 - 0.04, 0, 0]}>
                  <sphereGeometry args={[0.008, 6, 6]} />
                  <meshBasicMaterial color="#333333" />
                </mesh>
              </group>
            );
          })}

          {/* Real A4 Bottom ear fold representation */}
          <group position={[0.54, -0.77, 0.015]} rotation={[0, 0, -Math.PI / 4]}>
            <mesh>
              <planeGeometry args={[0.1, 0.1]} />
              <meshPhysicalMaterial 
                color="#e5e5dd" 
                roughness={0.9} 
                side={THREE.DoubleSide} 
              />
            </mesh>
            <mesh position={[-0.01, -0.01, -0.01]}>
              <planeGeometry args={[0.1, 0.1]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.15} />
            </mesh>
          </group>

          {/* HTML dynamic text overlays for maximum crisp detailing */}
          <Html
            transform
            distanceFactor={0.88}
            position={[0, -0.02, 0.028]}
            className="w-[340px] h-[480px] text-black select-none font-sans p-6"
          >
            <div className="text-[26px] font-display font-black text-neutral-900 leading-none">RAJAS</div>
            <div className="text-[9px] font-mono tracking-[0.35em] text-neutral-500 font-bold mt-1.5 mb-6">CURRICULUM VITAE</div>
            <div className="space-y-4 text-[10px] leading-relaxed text-neutral-700 font-medium">
              <div>
                <p className="font-extrabold text-[11px] text-neutral-900">// RECENT ENGAGEMENT</p>
                <p className="font-bold text-neutral-800">3D Web Developer | Creative Tech</p>
                <p className="text-neutral-500">Established immersive interfaces and robust full-stack deployment scripts.</p>
              </div>
              <div>
                <p className="font-extrabold text-[11px] text-neutral-900">// EXPERIENCE STACK</p>
                <p>Designed GPU pipelines, integrated low-latency Node/Express servers, and verified Docker clusters.</p>
              </div>
              <div className="pt-2 text-[9px] font-mono text-neutral-500 flex justify-between border-t border-neutral-200">
                <span>REVISION: v4.16</span>
                <span>STATUS: AVAILABLE</span>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* Floating 3D Badge 1: Glowing Octahedron */}
      <mesh ref={badge1Ref} position={[-0.88, 0.5, 0.2]}>
        <octahedronGeometry args={[0.09]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating 3D Badge 2: Glowing Cube */}
      <mesh ref={badge2Ref} position={[0.88, -0.4, 0.2]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}


// ==========================================
// 5. SOCIAL - Connected Peoples Model
// ==========================================
function TinyPersonNode({ position, color = "#888888" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      {/* Head */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 0.20, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Torso / Chest */}
      <mesh position={[0, 0.06, 0]}>
        <capsuleGeometry args={[0.07, 0.18, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.1, 0.08, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.016, 0.14, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.1, 0.08, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.016, 0.14, 4, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Stand mount bottom */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </mesh>
    </group>
  );
}

export function ConnectedPeopleModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation representing the global connectivity network
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
  });

  // Circular node arrangement coordinate layout for 6 people
  const peoplePos = useMemo(() => {
    const coords: [number, number, number][] = [];
    const count = 6;
    const rad = 0.88;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      coords.push([
        rad * Math.cos(angle),
        -0.2 + Math.sin(i * 1.5) * 0.05, // minor height variance
        rad * Math.sin(angle)
      ]);
    }
    return coords;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.12, 0]}>
      <SoftShadowDisc radius={1.6} opacity={0.5} />

      {/* Base Platform Ring Casing */}
      <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.15, 0.06, 32]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.95} roughness={0.15} />
      </mesh>
      
      {/* Concentric Glowing network grid rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.385, 0]}>
        <ringGeometry args={[0.4, 0.9, 32]} />
        <meshBasicMaterial color="#777777" transparent opacity={0.12} wireframe />
      </mesh>

      {/* Central Server hub connector */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
      </mesh>
      
      {/* Radial grid connections lines */}
      <mesh position={[0, -0.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.87, 0.89, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>

      {/* Render connected people */}
      {peoplePos.map((pos, i) => (
        <TinyPersonNode key={i} position={pos} color={i % 2 === 0 ? "#ffffff" : "#888888"} />
      ))}

      {/* Render connection links (radial spokes to center hub + perimeter mesh lines) */}
      {peoplePos.map((pos, i) => {
        const length = Math.sqrt(pos[0] ** 2 + pos[2] ** 2);
        const angle = Math.atan2(pos[2], pos[0]);
        
        return (
          <group key={i}>
            {/* Center radial link */}
            <mesh 
              position={[pos[0] / 2, -0.35, pos[2] / 2]} 
              rotation={[0, -angle + Math.PI / 2, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.008, 0.008, length, 8]} />
              <meshBasicMaterial color="#888888" transparent opacity={0.3} />
            </mesh>

            {/* Perimeter link to next person */}
            {i < peoplePos.length && (
              <mesh 
                position={[
                  (pos[0] + peoplePos[(i+1)%peoplePos.length][0])/2,
                  -0.35,
                  (pos[2] + peoplePos[(i+1)%peoplePos.length][2])/2
                ]}
                rotation={[
                  0,
                  -Math.atan2(peoplePos[(i+1)%peoplePos.length][2] - pos[2], peoplePos[(i+1)%peoplePos.length][0] - pos[0]) + Math.PI/2,
                  Math.PI/2
                ]}
              >
                <cylinderGeometry args={[0.012, 0.012, 0.9, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
