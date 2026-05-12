import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ backgroundColor: "#7a6a5a" }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        <img
          src="https://cdn.poehali.dev/projects/741a384e-7334-4a38-b0e5-a037d7365f18/bucket/map-no-bg.png"
          alt="Карта Кольского полуострова"
          className="object-contain"
          style={{
            width: "84%",
            height: "84%",
            opacity: 0.18,
            filter: "sepia(1) brightness(0.4) contrast(1.6) saturate(2) hue-rotate(-20deg)",
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          КОЛЬСКИЙ ПОЛУОСТРОВ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Северное сияние над тундрой, дикие реки и древние сопки — откройте край, где природа говорит в полную силу
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#tours"
            className="bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors duration-300"
          >
            Выбрать тур
          </a>
          <a
            href="#contact"
            className="border border-white text-white px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors duration-300"
          >
            Записаться
          </a>
        </div>
      </div>
    </div>
  );
}