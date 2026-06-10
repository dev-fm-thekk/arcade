import React, { useState, useEffect, useRef } from "react";

// Lucide SVG Icons constructed manually to avoid external package import errors
const HeartIcon = () => (
  <svg className="w-4 h-4 text-rose-500 inline mr-1 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const VolumeIcon = ({ muted }) => (
  <svg className="w-4 h-4 text-amber-500 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    {muted ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    )}
  </svg>
);

// Custom self-contained text scrambler
function ScrambleText({ text }) {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+~}{[]:;?><";

  useEffect(() => {
    let iteration = 0;
    let interval = null;
    
    interval = setInterval(() => {
      setDisplay(prev => 
        text.split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

// Interactive Joystick Component (with touch alternatives)
function Joystick({ onAction }) {
  const baseRef = useRef(null);
  const [angle, setAngle] = useState(90);
  const [tilted, setTilted] = useState(false);

  const calculateRotation = (clientX, clientY) => {
    if (!baseRef.current) return;
    const r = baseRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const calcAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    setAngle(calcAngle);
    setTilted(true);
    
    if (onAction) {
      if (dx < -15) onAction("LEFT");
      else if (dx > 15) onAction("RIGHT");
      else if (dy < -15) onAction("UP");
      else if (dy > 15) onAction("DOWN");
    }
  };

  const handleMouseMove = (e) => {
    calculateRotation(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      calculateRotation(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleRelease = () => {
    setTilted(false);
    setAngle(90);
  };

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <div
        ref={baseRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleRelease}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleRelease}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-crosshair touch-none"
        style={{
          background: "#1a1208",
          border: "3px solid #2e2010",
          boxShadow: "inset 0 4px 10px rgba(0,0,0,0.9)",
        }}
      >
        <div
          style={{
            width: 12,
            height: 38,
            background: "linear-gradient(to right, #5a4020, #9a7040, #5a4020)",
            borderRadius: 4,
            transformOrigin: "bottom center",
            transform: `rotate(${angle}deg) translateY(${tilted ? "-4px" : "0"})`,
            transition: "transform 0.08s",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute",
            top: -9,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #E07755, #8a3e2a)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.7)",
          }} />
        </div>
      </div>
      <span style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 6,
        color: "#5a4020",
        letterSpacing: 1,
      }}>MOVE</span>
    </div>
  );
}

// Nav Button mapping to specific paths
function NavButton({ label, keyLabel, color, shadow, light, active, onClick }) {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
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
        onClick={onClick}
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
        onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.25)"}
        onMouseLeave={e => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
        onMouseDown={e => e.currentTarget.style.transform = "translateY(4px)"}
        onMouseUp={e => e.currentTarget.style.transform = ""}
      >
        {keyLabel}
      </button>
    </div>
  );
}

export default function App() {
  // Custom router state bound to browser paths
  const [currentPath, setCurrentPath] = useState(window.location.pathname || "/");
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(1337);
  const [hiScore, setHiScore] = useState(9999);
  const [scanlinesActive, setScanlinesActive] = useState(true);
  const [soundMuted, setSoundMuted] = useState(false);
  const [unlockedQuests, setUnlockedQuests] = useState([]);
  const [cabinetTilt, setCabinetTilt] = useState({ x: 0, y: 0 });

  // Listen to browser forward/backward navigation triggers
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Standard safe path transitioner
  const navigateTo = (path) => {
    playClickSound();
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    setScore(s => s + 50);
  };

  // Synthesizing Retro SFX using Web Audio API
  const playBeep = (freq = 440, duration = 0.1, type = "square") => {
    if (soundMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio engine block fallback
    }
  };

  const playCoinSound = () => {
    playBeep(987.77, 0.08, "sine");
    setTimeout(() => playBeep(1318.51, 0.22, "sine"), 80);
  };

  const playClickSound = () => {
    playBeep(600, 0.05, "triangle");
  };

  const playSuccessSound = () => {
    playBeep(523.25, 0.1, "square");
    setTimeout(() => playBeep(659.25, 0.1, "square"), 100);
    setTimeout(() => playBeep(783.99, 0.1, "square"), 200);
    setTimeout(() => playBeep(1046.50, 0.3, "square"), 300);
  };

  const handleJoystickAction = (dir) => {
    if (dir === "LEFT" || dir === "UP") {
      setCabinetTilt({ x: -1.2, y: -0.4 });
    } else if (dir === "RIGHT" || dir === "DOWN") {
      setCabinetTilt({ x: 1.2, y: 0.4 });
    }
    setTimeout(() => setCabinetTilt({ x: 0, y: 0 }), 120);
  };

  const insertCoin = () => {
    playCoinSound();
    setCoins(c => c + 1);
    setScore(s => s + 500);
    if (score + 500 > hiScore) setHiScore(score + 500);
  };

  // Automated subtext notifications
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = ["INSERT COIN", "PRESS START", "PLAYER ONE", "FREE 2 PLAY"];

  useEffect(() => {
    const t = setInterval(() => setMsgIndex(i => (i + 1) % messages.length), 3000);
    return () => clearInterval(t);
  }, []);

  const cabinetStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    @keyframes flicker {
        0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.85} 94%{opacity:1} 96%{opacity:.9}
    }
    @keyframes scanmove {
        0%{top:-60px} 100%{top:110%}
    }
    @keyframes marquee {
        0%{transform:translateX(100%)} 100%{transform:translateX(-160%)}
    }
    @keyframes blink {
        0%,100%{opacity:1} 50%{opacity:0}
    }
    @keyframes crt-on {
        0%{transform:scaleY(0.01);opacity:.8}
        30%{transform:scaleY(0.01)}
        65%{transform:scaleY(1)}
        100%{transform:scaleY(1);opacity:1}
    }

    .cab-screen { animation: crt-on 0.7s ease-out forwards, flicker 9s infinite 2s; }
    .cab-scanlines {
        pointer-events:none;
        position:absolute;inset:0;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 3px,
            rgba(0, 0, 255, 0.03) 4px
        );
        border-radius: 14px;
        z-index:10;
    }
    .cab-sweep {
        pointer-events:none;
        position:absolute;left:0;right:0;height:56px;
        background:linear-gradient(transparent,rgba(255,255,255,0.03),transparent);
        animation:scanmove 4s linear infinite;
        z-index:11;
    }
    .cab-vignette {
        pointer-events:none;
        position:absolute;inset:0;
        border-radius:14px;
        box-shadow: inset 0 0 60px rgba(0,0,0,0.65);
        z-index:12;
    }
    .cab-blink { animation: blink 1s step-end infinite; }
    .cab-marquee { display:inline-block; animation: marquee 18s linear infinite; white-space:nowrap; }
    .speaker-dot {
        width:6px;height:6px;border-radius:50%;
        background:#2a1e10;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
    }
  `;

  return (
    <>
      <style>{cabinetStyles}</style>

      {/* Main Viewport Container with fluid scaling properties */}
      <div className="w-full min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 overflow-hidden select-none">
        
        {/* Adaptive scaler container to shrink/grow design gracefully for desktop and mobile pages */}
        <div 
          className="w-11/12 flex flex-col items-center origin-center transition-all duration-300 border"
          style={{
            transform: `perspective(1000px) rotateY(${cabinetTilt.x}deg) rotateX(${cabinetTilt.y}deg) scale(1.1)`,
          }}
        >
          
          {/* Top Panel Bar containing scanline & audio utilities */}
          <div className="w-[85%] bg-stone-900 border-x-4 border-t-4 border-[#2e2010] px-4 py-2 flex justify-between items-center rounded-t-xl text-[8px] text-[#8a7050] font-mono mb-[-1px]">
            <div className="flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${scanlinesActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span>SCANLINES</span>
              <button 
                onClick={() => setScanlinesActive(!scanlinesActive)}
                className="bg-stone-800 hover:bg-stone-700 text-[6px] text-stone-300 px-1 py-0.5 rounded ml-1"
              >
                TOGGLE
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSoundMuted(!soundMuted)}
                className="bg-stone-800 p-1 rounded border border-[#2e2010]"
              >
                <VolumeIcon muted={soundMuted} />
              </button>
              <span>V-ROUTE</span>
            </div>
          </div>

          {/* Marquee Top Panel - Perfectly Matches Original Proportions */}
          <div style={{
              width: "87%",
              background: "#1a1208",
              border: "4px solid #2e2010",
              borderBottom: "none",
              borderRadius: "22px 22px 0 0",
              padding: "10px 0",
              overflow: "hidden",
              position: "relative",
              alignSelf: "center",
          }}>
              <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, #E07755, #192F1A, #561E27, #E07755)",
              }} />
              <div style={{ overflow: "hidden" }}>
                  <span className="cab-marquee" style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 10,
                      color: "#E07755",
                      letterSpacing: 3,
                      textShadow: "0 0 10px #E07755aa",
                  }}>
                      ★ &nbsp; ARCADE &nbsp; ★ &nbsp; LEARN BY PLAYING &nbsp; ★ &nbsp; FREE & OPEN SOURCE &nbsp; ★ &nbsp; TINKERHUB SCTCE &nbsp; ★ &nbsp;
                  </span>
              </div>
          </div>

          {/* Cabinet Body - Matches Original Specifications */}
          <div style={{
              width: "91%",
              background: "#1a1208",
              border: "5px solid #2e2010",
              borderTop: "none",
              borderBottom: "none",
              padding: "0 20px",
              boxShadow: "inset 4px 0 8px rgba(0,0,0,0.5), inset -4px 0 8px rgba(0,0,0,0.5)",
              alignSelf: "center",
          }}>

              {/* CRT Screen Bezel */}
              <div style={{
                  background: "#0f0a04",
                  borderRadius: 18,
                  padding: 12,
                  margin: "14px 0",
                  border: "3px solid #221708",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.95)",
              }}>
                  <div
                      className="cab-screen"
                      style={{
                          height: 400,
                          background: "#0a0d04",
                          borderRadius: 14,
                          padding: "24px 20px",
                          position: "relative",
                          overflow: "hidden",
                          minHeight: 330,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 14,
                      }}
                  >
                      {scanlinesActive && <div className="cab-scanlines" />}
                      <div className="cab-sweep" />
                      <div className="cab-vignette" />

                      {/* Score Bar */}
                      <div className="w-full flex justify-between z-10" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                          <span style={{ fontSize: 7, color: "#4ade80", letterSpacing: 2, textShadow: "0 0 6px #4ade8066" }}>1UP: {String(score).padStart(5, '0')}</span>
                          <span style={{ fontSize: 7, color: "#4ade80", letterSpacing: 2, textShadow: "0 0 6px #4ade8066" }}>HI: {String(hiScore).padStart(5, '0')}</span>
                      </div>

                      {/* Screen Dynamic Interior Viewport Area */}
                      <div className="w-full flex-1 flex flex-col justify-center items-center z-10 overflow-y-auto max-h-[210px] pr-1">

                        {/* ROUTE 1: Home page (Path "/") */}
                        {currentPath === "/" && (
                          <div className="flex flex-col items-center text-center">
                            <h1
                                style={{
                                    fontFamily: "'Press Start 2P', monospace",
                                    fontSize: "30px",
                                    color: "#E07755",
                                    lineHeight: 1.2,
                                    textShadow: "0 0 14px #E07755aa",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                <ScrambleText text="ARCADE" />
                            </h1>
                            <p style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: "8px",
                                color: "#4ade80",
                                letterSpacing: 2,
                                textShadow: "0 0 8px #4ade8066",
                                margin: "4px 0 10px 0",
                            }}>
                                LEARN. PLAY. BUILD.
                            </p>

                            <div style={{
                                width: "70%", height: 1,
                                background: "linear-gradient(90deg, transparent, #E0775544, transparent)",
                                margin: "6px 0"
                            }} />

                            <p style={{
                                fontFamily: "'Press Start 2P', monospace",
                                fontSize: "7px",
                                color: "#c8d880",
                                lineHeight: 2,
                                margin: "6px 0",
                                textShadow: "0 0 6px #c8d88066",
                            }}>
                                A PLATFORM WHERE LEARNING<br />MEETS GAMING
                            </p>

                            <button 
                              onClick={() => navigateTo("/explore")}
                              className="mt-3 bg-[#E07755] hover:bg-[#ff8f66] text-[#1a1208] text-[7px] font-bold px-3 py-1.5 rounded active:translate-y-0.5 transition-all"
                              style={{ fontFamily: "'Press Start 2P', monospace", boxShadow: "0 3px 0 #8a3e2a" }}
                            >
                              START GAME
                            </button>
                          </div>
                        )}

                        {/* ROUTE 2: About page (Path "/about") */}
                        {currentPath === "/about" && (
                          <div className="w-full text-left font-mono" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "#f3f4f6" }}>
                            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5 mb-2">
                              <span className="text-[#E07755] text-[8px]">ABOUT THE HUB</span>
                              <button onClick={() => navigateTo("/")} className="text-[6px] text-stone-500 hover:text-white">BACK</button>
                            </div>
                            
                            <p className="leading-relaxed mb-3 text-stone-300">
                              We are <strong className="text-[#4ade80]">TinkerHub SCTCE</strong>! An interactive tech group fostering practical learning.
                            </p>

                            <div className="bg-stone-950/40 p-2 rounded border border-stone-900/60 mb-2">
                              <div className="text-[#4ade80] text-[6.5px] mb-1">SYSTEM CONFIG:</div>
                              <div className="grid grid-cols-2 gap-1 text-[6px] text-stone-400">
                                <div>• TYPE: PEER-LEARN</div>
                                <div>• SOURCE: PUBLIC</div>
                                <div>• SESSIONS: WEEKLY</div>
                                <div>• CHASSIS: V_ROUTER</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-[6.5px] text-amber-300">
                              <span>★ DIRECTIVE:</span>
                              <span className="animate-pulse">BUILD WITHOUT BORDERS</span>
                            </div>
                          </div>
                        )}

                        {/* ROUTE 3: Explore page (Path "/explore") */}
                        {currentPath === "/explore" && (
                          <div className="w-full text-left" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5 mb-2 text-[7px]">
                              <span className="text-emerald-400">CHOOSE QUEST</span>
                              <span className="text-[6px] text-stone-500">COINS: {coins}</span>
                            </div>

                            <div className="grid grid-cols-1 gap-1.5 text-[6.5px]">
                              {[
                                { id: "git", name: "1. GIT BRANCHING", points: 200, diff: "EASY" },
                                { id: "sol", name: "2. SMART CONTRACTS", points: 400, diff: "HARD" },
                                { id: "web", name: "3. WEB COMPONENT LAB", points: 300, diff: "MED" }
                              ].map(q => {
                                const isDone = unlockedQuests.includes(q.id);
                                return (
                                  <div 
                                    key={q.id}
                                    onClick={() => {
                                      if (isDone) return;
                                      if (coins < 1) {
                                        playBeep(220, 0.25, "sawtooth");
                                        return;
                                      }
                                      playSuccessSound();
                                      setCoins(c => c - 1);
                                      setUnlockedQuests([...unlockedQuests, q.id]);
                                      setScore(s => s + q.points);
                                    }}
                                    className={`border p-1.5 rounded cursor-pointer transition-all flex justify-between items-center ${
                                      isDone ? "border-stone-800 text-stone-600 bg-stone-950/20" : "border-emerald-950 hover:bg-emerald-950/10 text-stone-300"
                                    }`}
                                  >
                                    <span>{q.name}</span>
                                    <span className={isDone ? "text-stone-700" : "text-emerald-400"}>
                                      {isDone ? "[DONE]" : `[+${q.points}XP]`}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {coins === 0 && (
                              <p className="text-[5.5px] text-rose-400 text-center animate-pulse mt-2">
                                * NO COINS LEFT! INSERT CREDIT BELOW *
                              </p>
                            )}
                          </div>
                        )}

                        {/* ROUTE 4: Projects page (Path "/projects") */}
                        {currentPath === "/projects" && (
                          <div className="w-full text-left" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6.5px" }}>
                            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5 mb-2 text-[7px]">
                              <span className="text-[#561E27] font-bold" style={{ textShadow: "0 0 5px #ff4466" }}>SQUAD EXPERIMENTS</span>
                              <button onClick={() => navigateTo("/")} className="text-[5.5px] text-stone-500">BACK</button>
                            </div>

                            <div className="space-y-2">
                              <div className="border border-stone-900 bg-stone-950/20 p-1.5 rounded">
                                <div className="text-amber-500 flex justify-between font-bold">
                                  <span>01. EMULATOR-BOY</span>
                                  <span>RUST</span>
                                </div>
                                <p className="text-[5.5px] text-stone-400 mt-1 leading-relaxed">
                                  Gameboy color emulation suite configured inside Web Assembly.
                                </p>
                              </div>

                              <div className="border border-stone-900 bg-stone-950/20 p-1.5 rounded">
                                <div className="text-cyan-400 flex justify-between font-bold">
                                  <span>02. CHIP-8 SHELL</span>
                                  <span>WEBGL</span>
                                </div>
                                <p className="text-[5.5px] text-stone-400 mt-1 leading-relaxed">
                                  Visual assembler tools loaded directly inside web views.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Bottom CRT Status line */}
                      <p className="cab-blink z-10" style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: 8,
                          color: "#E07755",
                          letterSpacing: 2,
                          textShadow: "0 0 8px #E07755",
                          margin: 0,
                      }}>
                          {messages[msgIndex]}
                      </p>
                  </div>
              </div>

              {/* Control Panel Block */}
              <div style={{
                  background: "#130e06",
                  borderRadius: 12,
                  padding: "18px 14px 22px",
                  margin: "0 -4px",
                  border: "2px solid #221708",
              }}>
                  {/* Joystick + Buttons Row */}
                  <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 16,
                  }}>
                      <Joystick onAction={handleJoystickAction} />
                      <div style={{ width: 1, height: 72, background: "#2e2010" }} />

                      <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
                          <NavButton 
                            label="ABOUT" 
                            keyLabel="A" 
                            color="#E07755" 
                            shadow="#8a3e2a" 
                            light="#f0a080" 
                            active={currentPath === "/about"}
                            onClick={() => navigateTo("/about")}
                          />
                          <NavButton 
                            label="EXPLORE" 
                            keyLabel="B" 
                            color="#192F1A" 
                            shadow="#0a1509" 
                            light="#2a5c2c" 
                            active={currentPath === "/explore"}
                            onClick={() => navigateTo("/explore")}
                          />
                          <NavButton 
                            label="PROJECTS" 
                            keyLabel="C" 
                            color="#561E27" 
                            shadow="#2a0d12" 
                            light="#8a3040" 
                            active={currentPath === "/projects"}
                            onClick={() => navigateTo("/projects")}
                          />
                      </div>
                  </div>

                  {/* Coin Input & Speakers Row */}
                  <div style={{ display: "flex", alignItems: "center", justifySpace: "between", justifyContent: "space-between" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 6px)", gap: 4 }}>
                          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="speaker-dot" />)}
                      </div>

                      {/* Interactive Quarter Entry button */}
                      <button
                          onClick={insertCoin}
                          style={{
                              background: "none", border: "none", cursor: "pointer",
                              display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "6px 14px",
                          }}
                          className="active:scale-95 transition-all duration-75"
                      >
                          <div style={{
                              width: 44, height: 5, borderRadius: 3,
                              border: "1px solid #2e2010",
                              background: "repeating-linear-gradient(90deg, #0f0a04 0, #0f0a04 3px, #1a1208 3px, #1a1208 6px)",
                              boxShadow: "inset 0 2px 3px rgba(0,0,0,0.9)",
                          }} />
                          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#5a4020", letterSpacing: 1 }}>
                              {coins > 0 ? `COINS: ${coins}` : "INSERT COIN"}
                          </span>
                      </button>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 6px)", gap: 4 }}>
                          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="speaker-dot" />)}
                      </div>
                  </div>
              </div>
          </div>

          {/* Cabinet Bottom Base panel */}
          <div style={{
              width: "86%",
              background: "#1a1208",
              border: "4px solid #2e2010",
              borderTop: "2px solid #221708",
              borderRadius: "0 0 10px 10px",
              padding: "8px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
          }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#3a2a10", letterSpacing: 2 }}>
                  TINKERHUB SCTCE
              </span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#561E27", textShadow: "0 0 6px #561E27" }}>
                  ★ {coins} CREDITS
              </span>
          </div>

          {/* Cabinet feet */}
          <div style={{ display: "flex", justifyContent: "space-between", width: "64%", marginTop: 3 }}>
              {[0, 1].map(i => (
                  <div key={i} style={{
                      width: 36, height: 10,
                      background: "#0f0a04",
                      border: "2px solid #221708",
                      borderRadius: "0 0 5px 5px",
                  }} />
              ))}
          </div>

        </div>

        {/* Continuous Peer Learning credits info */}
        <div className="mt-4 text-center text-stone-600 text-[8px] max-w-sm tracking-wider font-mono">
          <p>BUILT WITH <HeartIcon /> FOR CONTINUOUS PEER LEARNING</p>
        </div>

      </div>
    </>
  );
}