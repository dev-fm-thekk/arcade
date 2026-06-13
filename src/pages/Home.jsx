import { Link } from "react-router-dom";
import ScrambleText from "../components/ScrambleText";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full flex-1 py-4 md:py-8">
      <h1
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "0 0 20px #E07755aa",
        }}
        className="text-[clamp(32px,9vw,72px)] text-[#E07755] leading-[1.2] my-0 mb-5"
      >
        <ScrambleText text="ARCADE" />
      </h1>
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "0 0 10px #4ade8066",
        }}
        className="text-[clamp(12px,3vw,20px)] text-[#4ade80] tracking-[3px] mt-[8px] mb-[24px]"
      >
        LEARN. PLAY. BUILD.
      </p>

      <div
        style={{
          background: "linear-gradient(90deg, transparent, #E0775566, transparent)",
        }}
        className="w-[60%] h-[2px] mt-[12px] mb-[24px]"
      />

      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "0 0 8px #c8d88066",
        }}
        className="text-[clamp(10px,2.5vw,16px)] text-[#c8d880] leading-[2.2] mt-[12px] mb-[32px]"
      >
        A PLATFORM WHERE LEARNING
        <br />
        MEETS GAMING
      </p>

      <Link
        to="/explore"
        className="bg-[#E07755] hover:bg-[#ff8f66] text-[#1a1208] font-bold px-8 py-4 rounded active:translate-y-0.5 transition-all no-underline text-[clamp(10px,2.5vw,16px)]"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          boxShadow: "0 4px 0 #8a3e2a",
        }}
      >
        START GAME
      </Link>
    </div>
  );
}
