import { Outlet, useLocation, NavLink } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "motion/react";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-dvh flex flex-col overflow-hidden bg-background">
      {!isHome && (
        <Motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
        >
          <NavLink 
            to="/" 
            className="px-4 py-2 md:px-6 md:py-2 bg-secondary text-primary rounded-full font-bold shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center gap-2 border border-primary/20 text-sm md:text-base"
          >
            ← Home
          </NavLink>
        </Motion.nav>
      )}
      <main className="flex-1 w-full relative perspective-2000">
        <AnimatePresence mode="popLayout" initial={false}>
          <Motion.div
            key={location.pathname}
            initial={isHome 
              ? { opacity: 0 } 
              : { x: "100%", rotateY: -45, opacity: 0, transformOrigin: "right" }
            }
            animate={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ x: "-120%", rotateY: 45, opacity: 0, transformOrigin: "left" }}
            transition={{ 
              duration: isHome ? 0.4 : 0.8, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.4 }
            }}
            className="w-full h-full absolute inset-0 preserve-3d overflow-y-auto"
          >
            <Outlet />
          </Motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
