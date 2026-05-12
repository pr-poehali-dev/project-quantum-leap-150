interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-[28px] uppercase tracking-wide font-bold">
          <span className="text-white">Arctic</span><span style={{ color: "#e53e3e" }}>-Go</span>
        </div>
        <nav className="flex gap-16">
          <a
            href="#tours"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-base font-bold tracking-[0.4em]"
          >
            Туры
          </a>
          <a
            href="#contact"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-base font-bold tracking-[0.4em]"
          >
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
}