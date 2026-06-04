import { motion as Motion } from "motion/react"
import { NavLink } from "react-router-dom"
import ScrambleText from "../components/ScrambleText"

export default function Home() {
    const rects = [
        { color: "#E07755", className: "inset-[0%]" },
        { color: "#192F1A", className: "inset-[1.5%] md:inset-[2%]" },
        { color: "#561E27", className: "inset-[3%] md:inset-[4%]" },
        { color: "#D8F08A", className: "inset-[4.5%] md:inset-[6%]" },
        { color: "#F8FFD8", className: "inset-[6%] md:inset-[8%]" }, // Primary Cream
    ]

    const navLinks = [
        { to: "/about", label: "About", color: "#E07755" },
        { to: "/explore", label: "Explore", color: "#192F1A" },
        { to: "/projects", label: "Projects", color: "#561E27" },
    ]

    return (
        <div className="relative w-full h-dvh overflow-hidden flex items-center justify-center bg-[#E07755]">
            {/* Concentric Rectangles that stay */}
            {rects.map((rect, i) => (
                <Motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className={`absolute shadow-xl md:shadow-2xl ${rect.className}`}
                    style={{ 
                        backgroundColor: rect.color,
                        zIndex: i
                    }}
                />
            ))}

            {/* Content Overlay */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="relative z-10 flex flex-col items-center gap-6 md:gap-12 px-6 text-center"
            >
                <div className="space-y-2">
                    <h1 className="font-base-neue-trial text-6xl md:text-9xl lg:text-[12rem] text-[#192F1A] leading-none tracking-tighter">
                        <ScrambleText text="ARCADE" />
                    </h1>
                </div>

                <div className="max-w-2xl space-y-4 md:space-y-6">
                    <p className="text-lg md:text-3xl text-[#192F1A] font-bold leading-tight">
                        A platform where learning meets gaming.
                    </p>
                    <p className="text-sm md:text-lg text-[#561E27] font-medium opacity-90">
                        Learn tech by playing games. It's free and open-source.
                    </p>
                    
                    {/* Integrated Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4 md:pt-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className="px-5 py-2 md:px-6 md:py-3 rounded-xl font-bold text-primary transition-all hover:scale-110 hover:shadow-lg active:scale-95 text-sm md:text-base"
                                style={{ backgroundColor: link.color }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="pt-4 md:pt-8">
                        <p className="text-[9px] md:text-xs text-[#192F1A] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black opacity-70">
                            Developed by Tinkerhub SCTCE
                        </p>
                    </div>
                </div>
            </Motion.div>
        </div>
    )
}
