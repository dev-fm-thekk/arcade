import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/explore", label: "Explore" },
  { to: "/projects", label: "Projects" },
];

export default function Navbar() {
  return (
    <nav className="mx-auto mt-4 rounded-3xl border px-8 py-4 md:text-lg md:w-xl sticky">
      <ul className="flex items-center justify-center gap-8">
        {navLinks.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `rounded-3xl px-4 py-2 transition-all ease-in-out delay-100 ${
                  isActive
                    ? "border border-secondary bg-secondary text-primary"
                    : "text-secondary hover:opacity-70"
                }`
              }
            >
              {item.label}
            </NavLink>
        </li>
      ))}
      </ul>
    </nav>
  );
}