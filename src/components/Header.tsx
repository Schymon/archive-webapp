interface HeaderProps {}

export const Header = ({ }: HeaderProps) => {
  return (
    <header className="relative z-10 bg-gray-200 p-6">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 text-center tracking-tighter">
        Schysch's Archiv
      </h1>
    </header>
  );
};
