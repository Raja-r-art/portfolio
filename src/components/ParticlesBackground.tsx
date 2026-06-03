import { ParticlesProvider } from "@tsparticles/react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const initParticles = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0 pointer-events-none"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
            },
            modes: {
              push: {
                quantity: 2,
              },
              grab: {
                distance: 140,
                links: {
                  opacity: 0.12,
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#d6d6d6", "#8f8f8f", "#ffffff"],
            },
            links: {
              color: "#8f8f8f",
              distance: 150,
              enable: true,
              opacity: 0.05,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                width: 1920,
                height: 1080,
              },
              value: 60,
            },
            opacity: {
              value: { min: 0.1, max: 0.35 },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
