import { Outlet, useLocation, NavLink } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "motion/react";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-dvh flex flex-col overflow-hidden bg-background">
      {!isHome && (
        <Motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <Motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut"
            }}
            className="w-full h-full absolute inset-0 overflow-y-auto"
          >
            <Outlet />
          </Motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
