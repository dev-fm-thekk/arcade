import { useRef, useState } from "react";

export default function Joystick({ onAction }) {
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

  const handleMouseMove = (e) => calculateRotation(e.clientX, e.clientY);
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
          <div
            style={{
              position: "absolute",
              top: -9,
              left: "50%",
              transform: "translateX(-50%)",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #E07755, #8a3e2a)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.7)",
            }}
          />
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7,
          color: "#8a7050",
          letterSpacing: 1,
        }}
      >
        MOVE
      </span>
    </div>
  );
}
