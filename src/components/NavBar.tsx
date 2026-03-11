import { navLinks } from "../constants";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex justify-between items-center md:p-9 p-5">
      <div className="cursor-pointer -my-20">
        <img
          src="/assets/Logo-removebg-preview.png"
          alt="Bombay Canvas"
          className="h-48 w-auto object-contain"
        />
      </div>

    </nav>
  );
};

export default NavBar;
