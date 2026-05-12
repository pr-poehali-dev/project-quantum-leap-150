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
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/741a384e-7334-4a38-b0e5-a037d7365f18/files/0de8b2a0-851b-4ffe-a76f-947d8ac2198f.jpg"
          alt="Кольский полуостров — тундра и северное сияние"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          КОЛЬСКИЙ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Авторские экскурсии и многодневные туры по дикой природе Кольского полуострова
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