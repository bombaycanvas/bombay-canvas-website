import { Link, useLocation } from "react-router-dom";

const internalLinks = [
  { label: "Upcoming Series", href: "/upcoming-series" },
  { label: "Case Studies", href: "/case-studies" },
];

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex justify-between items-center md:px-9 px-5 py-4">
      <Link to="/" className="cursor-pointer -my-20">
        <img
          src="/assets/Logo-removebg-preview.png"
          alt="Bombay Canvas"
          className="h-48 w-auto object-contain"
        />
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {internalLinks.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className={`font-paragraph text-[0.95rem] font-semibold uppercase tracking-widest transition-colors ${
                pathname === link.href
                  ? "text-brand"
                  : "text-white hover:text-brand"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://www.thecanvashq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-paragraph text-[0.95rem] font-semibold uppercase tracking-widest text-white hover:text-brand transition-colors"
          >
            Canvas HQ
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
