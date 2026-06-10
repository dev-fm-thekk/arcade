import { Link } from "react-router-dom";
import ScrambleText from "../components/ScrambleText";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full flex-1 min-h-full py-8">
      <h1
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(32px, 9vw, 72px)",
          color: "#E07755",
          lineHeight: 1.2,
          textShadow: "0 0 20px #E07755aa",
          margin: "0 0 20px 0",
        }}
      >
        <ScrambleText text="ARCADE" />
      </h1>
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(12px, 3vw, 20px)",
          color: "#4ade80",
          letterSpacing: 3,
          textShadow: "0 0 10px #4ade8066",
          margin: "8px 0 24px 0",
        }}
      >
        LEARN. PLAY. BUILD.
      </p>

      <div
        style={{
          width: "60%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #E0775566, transparent)",
          margin: "12px 0 24px 0",
        }}
      />

      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(10px, 2.5vw, 16px)",
          color: "#c8d880",
          lineHeight: 2.2,
          margin: "12px 0 32px 0",
          textShadow: "0 0 8px #c8d88066",
        }}
      >
        A PLATFORM WHERE LEARNING
        <br />
        MEETS GAMING
      </p>

      <Link
        to="/explore"
        className="bg-[#E07755] hover:bg-[#ff8f66] text-[#1a1208] font-bold px-8 py-4 rounded active:translate-y-0.5 transition-all no-underline"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(10px, 2.5vw, 16px)",
          boxShadow: "0 4px 0 #8a3e2a",
        }}
      >
        START GAME
      </Link>
    </div>
  );
}
