import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import NavButton from "../components/arcade/NavButton";
import {
  CABINET_STYLES,
  NAV_LINKS,
  STATUS_MESSAGES,
} from "../components/arcade/cabinetStyles";

const VolumeIcon = ({ muted }) => (
  <svg
    className="w-4 h-4 text-amber-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    {muted ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    )}
  </svg>
);

function routeLabel(pathname) {
  const match = NAV_LINKS.find((link) =>
    link.end ? pathname === link.to : pathname.startsWith(link.to),
  );
  return match?.label ?? "ARCADE";
}

export default function ArcadeLayout() {
  const location = useLocation();
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(1337);
  const [hiScore] = useState(9999);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set a default volume
      if (soundMuted || !isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [soundMuted, isPlaying]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay prevented on first interaction:", error);
        });
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying]);

  const playBeep = (freq = 440, duration = 0.1, type = "square") => {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio blocked
    }
  };



  const playClickSound = () => playBeep(600, 0.05, "triangle");

  const playCoinSound = () => {
    playBeep(987.77, 0.08, "sine");
    setTimeout(() => playBeep(1318.51, 0.22, "sine"), 80);
  };

  const handleNavigate = () => {
    playClickSound();
    setScore((s) => s + 50);
  };

  const insertCoin = () => {
    playCoinSound();
    setCoins((c) => c + 1);
    setScore((s) => s + 500);
  };

  const activeRoute = routeLabel(location.pathname);

  return (
    <>
      <style>{CABINET_STYLES}</style>
      <audio ref={audioRef} loop src="/supermario.mp3" />

      <div className="relative h-dvh w-full overflow-hidden flex flex-col select-none">
        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              90deg,
              #F0F5D0 0%, #F0F5D0 14.28%,
              #CFE882 14.28%, #CFE882 28.56%,
              #254025 28.56%, #254025 42.84%,
              #D5DDB8 42.84%, #D5DDB8 57.12%,
              #D86D4D 57.12%, #D86D4D 71.4%,
              #501A23 71.4%, #501A23 85.68%,
              #CFE882 85.68%, #CFE882 100%
            )`,
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 h-full w-full flex flex-col">
          {/* Utility bar */}
          <div className="w-full shrink-0 bg-stone-900 border-x-4 border-t-4 border-[#2e2010] px-4 py-2 flex justify-between items-center text-[8px] text-[#8a7050] font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${scanlinesActive ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              />
              <span style={{ fontSize: 'clamp(6px, 1.5vw, 8px)', letterSpacing: 'clamp(1px, 0.2vw, 2px)' }}>SCANLINES</span>
              <button
                type="button"
                onClick={() => setScanlinesActive(!scanlinesActive)}
                className="bg-stone-800 hover:bg-stone-700 text-[6px] text-stone-300 px-1.5 py-0.5 rounded ml-1"
              >
                TOGGLE
              </button>
            </div>
            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => setSoundMuted(!soundMuted)}
                className="bg-stone-800 p-1 rounded border border-[#2e2010]"
              >
                <VolumeIcon muted={soundMuted} />
              </button>
              <span style={{ fontSize: 'clamp(6px, 1.5vw, 8px)', letterSpacing: 'clamp(1px, 0.2vw, 2px)' }}>NOW PLAYING: {activeRoute}</span>
            </div>
          </div>

          {/* Marquee */}
          <div
            className="w-full shrink-0"
            style={{
              background: "#1a1208",
              border: "4px solid #2e2010",
              borderBottom: "none",
              padding: "10px 0",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background:
                  "linear-gradient(90deg, #E07755, #192F1A, #561E27, #E07755)",
              }}
            />
            <p
              className="text-center m-0"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(8px, 2vw, 11px)',
                color: "#E07755",
                letterSpacing: 'clamp(1px, 0.5vw, 3px)',
                textShadow: "0 0 10px #E07755aa",
              }}
            >
              ★ ARCADE ★ LEARN BY PLAYING ★
            </p>
          </div>

          {/* Cabinet body */}
          <div
            className="w-full flex-1 flex flex-col min-h-0"
            style={{
              background: "#1a1208",
              border: "5px solid #2e2010",
              borderTop: "none",
              borderBottom: "none",
              padding: "0 clamp(12px, 2vw, 24px)",
              boxShadow:
                "inset 4px 0 8px rgba(0,0,0,0.5), inset -4px 0 8px rgba(0,0,0,0.5)",
            }}
          >
            {/* CRT screen */}
            <div
              className="flex-1 flex flex-col min-h-0"
              style={{
                background: "#0f0a04",
                borderRadius: 18,
                padding: 12,
                margin: "10px 0",
                border: "3px solid #221708",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.95)",
              }}
            >
              <div
                className="cab-screen flex-1 min-h-0"
                style={{
                  background: "#0a0d04",
                  borderRadius: 14,
                  padding: "clamp(14px, 2vw, 24px)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {scanlinesActive && <div className="cab-scanlines" />}
                <div className="cab-vignette" />

                {/* Score bar */}
                <div
                  className="w-full flex justify-between z-20 shrink-0"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(7px, 1.8vw, 8px)',
                      color: "#4ade80",
                      letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                      textShadow: "0 0 6px #4ade8066",
                    }}
                  >
                    1UP: {String(score).padStart(5, "0")}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(7px, 1.8vw, 8px)',
                      color: "#E07755",
                      letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
                      textShadow: "0 0 6px #E0775566",
                    }}
                  >
                    {activeRoute}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(7px, 1.8vw, 8px)',
                      color: "#4ade80",
                      letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                      textShadow: "0 0 6px #4ade8066",
                    }}
                  >
                    HI: {String(hiScore).padStart(5, "0")}
                  </span>
                </div>

                {/* Page content viewport */}
                <div className="w-full flex-1 z-20 overflow-y-auto min-h-0 pr-1 arcade-screen-content flex flex-col">
                  <AnimatePresence mode="wait" initial={false}>
                    <Motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="w-full flex-1 flex flex-col min-h-0"
                    >
                      <Outlet />
                    </Motion.div>
                  </AnimatePresence>
                </div>

                {/* Status line */}
                <p
                  className="cab-blink z-20 shrink-0 text-center"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 'clamp(8px, 1.8vw, 9px)',
                    color: "#E07755",
                    letterSpacing: 'clamp(1px, 0.4vw, 2px)',
                    textShadow: "0 0 8px #E07755",
                    margin: 0,
                  }}
                >
                  {STATUS_MESSAGES[msgIndex]}
                </p>
              </div>
            </div>

            {/* Control panel */}
            <div
              className="shrink-0"
              style={{
                background: "#130e06",
                borderRadius: 12,
                padding: "clamp(16px, 3vw, 28px) clamp(20px, 4vw, 48px)",
                margin: "0 -4px",
                border: "2px solid #221708",
              }}
            >
              <p
                className="text-center mb-6"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(7px, 1.8vw, 8px)',
                  color: "#8a7050",
                  letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
                }}
              >
                SELECT PAGE — PRESS A BUTTON
              </p>

              <div
                className="flex items-end justify-center flex-wrap"
                style={{ gap: "clamp(16px, 4vw, 40px)", marginBottom: 20 }}
              >
                {NAV_LINKS.map((link) => (
                  <NavButton
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    label={link.label}
                    keyLabel={link.key}
                    color={link.color}
                    shadow={link.shadow}
                    light={link.light}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>

              {/* Coin slot row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 32,
                }}
              >
                <button
                  type="button"
                  onClick={insertCoin}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 14px",
                  }}
                  className="active:scale-95 transition-all duration-75"
                >
                  <div
                    style={{
                      width: 'clamp(30px, 8vw, 44px)',
                      height: 'clamp(3px, 1vw, 5px)',
                      borderRadius: 3,
                      border: "1px solid #2e2010",
                      background:
                        "repeating-linear-gradient(90deg, #0f0a04 0, #0f0a04 3px, #1a1208 3px, #1a1208 6px)",
                      boxShadow: "inset 0 2px 3px rgba(0,0,0,0.9)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 'clamp(6px, 1.6vw, 7px)',
                      color: "#8a7050",
                      letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
                    }}
                  >
                    {coins > 0 ? `COINS: ${coins}` : "INSERT COIN"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Cabinet base */}
          <div
            className="w-full shrink-0"
            style={{
              background: "#1a1208",
              border: "4px solid #2e2010",
              borderTop: "2px solid #221708",
              padding: "8px clamp(16px, 3vw, 24px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(6px, 1.6vw, 7px)',
                color: "#3a2a10",
                letterSpacing: 'clamp(1px, 0.4vw, 2px)',
              }}
            >
              TINKERHUB SCTCE
            </span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(6px, 1.6vw, 7px)',
                color: "#561E27",
                textShadow: '0 0 clamp(3px, 0.8vw, 6px) #561E27',
              }}
            >
              ★ {coins} CREDITS
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
