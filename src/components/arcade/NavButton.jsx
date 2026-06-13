import { NavLink } from "react-router-dom";

export default function NavButton({ to, label, keyLabel, color, shadow, light, onNavigate, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className="flex flex-1 flex-col items-center gap-3 sm:gap-3 md:gap-3 lg:gap-4 select-none no-underline group"
    >
      {({ isActive }) => (
        <>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: isActive ? light : "#b8a88a",
              textShadow: isActive ? `0 0 8px ${light}` : "none",
              transition: "color 0.2s, text-shadow 0.2s",
            }}
            className="text-[8px] tracking-[0.5px] sm:text-[8px] sm:tracking-[0.75px] md:text-[9px] md:tracking-[1px] lg:text-[10px] lg:tracking-[1.2px]"
          >
            {label}
          </span>
          <span
            style={{
              background: `radial-gradient(circle at 35% 35%, ${light}, ${color} 60%, ${shadow})`,
              boxShadow: isActive
                ? `0 2px 0 ${shadow}, 0 0 0 2px ${light}, 0 0 14px ${light}88, 0 6px 14px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)`
                : `0 4px 0 ${shadow}, 0 5px 12px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)`,
              fontFamily: "'Press Start 2P', monospace",
              color: "rgba(255,255,255,0.95)",
              transform: isActive ? "translateY(2px)" : "none",
              transition: "transform 0.1s, box-shadow 0.2s, filter 0.15s",
            }}
            className="group-hover:brightness-125 group-active:translate-y-1
                       rounded-full cursor-pointer flex items-center justify-center
                       w-[44px] h-[44px] text-[9px]
                       sm:w-[52px] sm:h-[52px] sm:text-[10px]
                       md:w-[60px] md:h-[60px] md:text-[11px]
                       lg:w-[68px] lg:h-[68px] lg:text-[13px]"
          >
            {keyLabel}
          </span>
        </>
      )}
    </NavLink>
  );
}