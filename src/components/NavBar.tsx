import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex justify-between items-center md:p-9 p-5">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer text-white">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-brand-mid rounded-full" />
        </div>
        Bombay Canvas
      </div>

      <div className="hidden md:flex items-center gap-8 font-bold text-sm text-white">
        {navLinks.map((link) => (
          <a key={link} href="#" className="hover:opacity-60 transition-opacity">
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
