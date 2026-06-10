import { useState, useEffect } from "react";
import { motion as Motion } from "motion/react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
    { to: "/about",    label: "ABOUT",    key: "A", color: "#E07755", shadow: "#8a3e2a", light: "#f0a080" },
    { to: "/explore",  label: "EXPLORE",  key: "B", color: "#192F1A", shadow: "#0a1509", light: "#2a5c2c" },
    { to: "/projects", label: "PROJECTS", key: "C", color: "#561E27", shadow: "#2a0d12", light: "#8a3040" },
];

function NavButton({ to, label, keyLabel, color, shadow, light, active }) {
    return (
        <NavLink
            to={to}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}
        >
            <span style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7,
                color: active ? light : "#8a7a60",
                letterSpacing: 1,
                transition: "color 0.2s",
            }}>
                {label}
            </span>
            <button
                style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 35%, ${light}, ${color} 60%, ${shadow})`,
                    boxShadow: `0 6px 0 ${shadow}, 0 8px 16px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)`,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.9)",
                }}
            >
                {keyLabel}
            </button>
        </NavLink>
    );
}

export default function MachineLayout({ children, activeNav }) {
    const cabinetStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.85} 94%{opacity:1} 96%{opacity:.9} }
        @keyframes crt-on { 0%{transform:scaleY(0.01);opacity:.8} 30%{transform:scaleY(0.01)} 65%{transform:scaleY(1)} 100%{transform:scaleY(1);opacity:1} }
        .cab-screen { animation: crt-on 0.7s ease-out forwards, flicker 9s infinite 2s; }
        .cab-scanlines {
            pointer-events:none; position:absolute; inset:0;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 3px, rgba(0, 0, 255, 0.03) 4px);
            border-radius: 20px; z-index:10;
        }
        .cab-vignette {
            pointer-events:none; position:absolute; inset:0; border-radius:20px;
            box-shadow: inset 0 0 60px rgba(0,0,0,0.65); z-index:12;
        }
    `;

    return (
        <>
            <style>{cabinetStyles}</style>
            <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-4xl flex flex-col items-center"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
                {/* CRT screen bezel */}
                <div style={{
                    width: "100%",
                    background: "#0f0a04",
                    borderRadius: 24,
                    padding: 20,
                    border: "6px solid #221708",
                    boxShadow: "inset 0 0 50px rgba(0,0,0,0.95), 0 20px 40px rgba(0,0,0,0.5)",
                }}>
                    <div
                        className="cab-screen relative"
                        style={{
                            background: "#0a0d04",
                            borderRadius: 20,
                            padding: "40px",
                            minHeight: "500px", // Increased height
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                        }}
                    >
                        <div className="cab-scanlines" />
                        <div className="cab-vignette" />
                        <div className="relative z-10 flex-grow flex flex-col justify-center">
                            {children}
                        </div>
                    </div>
                </div>

                {/* Control panel */}
                <div style={{
                    width: "90%",
                    background: "#130e06",
                    borderRadius: "0 0 24px 24px",
                    padding: "24px",
                    border: "4px solid #221708",
                    borderTop: "none",
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "-10px"
                }}>
                    {NAV_LINKS.map(link => (
                        <NavButton
                            key={link.to}
                            {...link}
                            active={activeNav === link.label}
                        />
                    ))}
                </div>
            </Motion.div>
        </>
    );
}
