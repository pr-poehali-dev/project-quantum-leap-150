interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-sm uppercase tracking-wide font-bold">
          <span style={{ color: "#e53e3e" }}>Arctic</span><span className="text-white">-Go</span>
        </div>
        <nav className="flex gap-8">
          <a
            href="#tours"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm"
          >
            Туры
          </a>
          <a
            href="#contact"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm"
          >
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
}