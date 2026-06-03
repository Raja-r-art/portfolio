import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

interface ThreeCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
}

export default function ThreeCanvas({ 
  children, 
  cameraPosition = [0, 0, 4.5], 
  enableControls = true 
}: ThreeCanvasProps) {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative z-10 select-none">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          {/* Studio Lights System */}
          <ambientLight intensity={0.7} />
          
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1.2} 
            color="#ffffff" 
          />
          
          <pointLight 
            position={[-5, 5, -5]} 
            intensity={0.8} 
            color="#8f8f8f" 
          />
          
          <pointLight 
            position={[5, -5, 5]} 
            intensity={0.8} 
            color="#d6d6d6" 
          />
          
          <pointLight 
            position={[0, 5, 0]} 
            intensity={1.5} 
            color="#ffffff" 
          />

          {children}

          {enableControls && (
            <OrbitControls 
              enableZoom={false} 
              maxPolarAngle={Math.PI / 1.8} 
              minPolarAngle={Math.PI / 2.5} 
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
