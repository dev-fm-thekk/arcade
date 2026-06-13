export const CABINET_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  @keyframes flicker {
    0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.85} 94%{opacity:1} 96%{opacity:.9}
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
  .cab-vignette {
    pointer-events:none;
    position:absolute;inset:0;
    border-radius:14px;
    box-shadow: inset 0 0 60px rgba(0,0,0,0.65);
    z-index:12;
  }
  .cab-blink { animation: blink 1s step-end infinite; }
  .speaker-dot {
    width:6px;height:6px;border-radius:50%;
    background:#2a1e10;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.8);
  }
  .arcade-screen-content::-webkit-scrollbar {
    display: none;
  }
  .arcade-screen-content {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

export const NAV_LINKS = [
  { to: "/", label: "HOME", key: "★", color: "#3d5a35", shadow: "#1a2e18", light: "#7cba6a", end: true },
  { to: "/about", label: "ABOUT", key: "A", color: "#E07755", shadow: "#8a3e2a", light: "#f0a080" },
  { to: "/explore", label: "EXPLORE", key: "B", color: "#192F1A", shadow: "#0a1509", light: "#4ade80" },
  { to: "/projects", label: "PROJECTS", key: "C", color: "#561E27", shadow: "#2a0d12", light: "#e06070" },
];

export const STATUS_MESSAGES = ["INSERT COIN", "PRESS START", "PLAYER ONE", "FREE 2 PLAY"];
