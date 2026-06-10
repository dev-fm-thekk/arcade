import { NavLink } from "react-router-dom";

export default function NavButton({ to, label, keyLabel, color, shadow, light, onNavigate, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className="flex flex-col items-center gap-2 select-none no-underline group"
    >
      {({ isActive }) => (
        <>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              color: isActive ? light : "#b8a88a",
              letterSpacing: 1,
              textShadow: isActive ? `0 0 8px ${light}` : "none",
              transition: "color 0.2s, text-shadow 0.2s",
            }}
          >
            {label}
          </span>
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${light}, ${color} 60%, ${shadow})`,
              boxShadow: isActive
                ? `0 4px 0 ${shadow}, 0 0 0 3px ${light}, 0 0 18px ${light}88, 0 10px 20px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)`
                : `0 6px 0 ${shadow}, 0 8px 16px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)`,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.95)",
              transform: isActive ? "translateY(2px)" : "none",
              transition: "transform 0.1s, box-shadow 0.2s, filter 0.15s",
            }}
            className="group-hover:brightness-125 group-active:translate-y-1"
          >
            {keyLabel}
          </span>
        </>
      )}
    </NavLink>
  );
}
