import { useParams, Link } from "react-router-dom";
import games from "../data/games.json";

export const DeveloperProfile = ({
  name = "ARJUN R.",
  role = "FULL STACK DEVELOPER",
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="flex flex-row md:flex-col items-center md:justify-center gap-[clamp(10px,2vw,20px)] p-[clamp(8px,2vw,20px)] bg-[#E07755]/5 border border-[#E07755]/15 rounded-2xl w-full">
      <div
        className="flex items-center justify-center border-[3px] shrink-0
                   w-[clamp(40px,10vw,80px)] h-[clamp(40px,10vw,80px)] rounded-full"
        style={{
          backgroundColor: `#E0775522`,
          borderColor: "#E07755",
          boxShadow: `0 0 20px #E0775544`,
        }}
      >
        <span
          className="font-bold text-[#E07755] text-[clamp(16px,4vw,28px)]"
        >
          {initials}
        </span>
      </div>
      <div className="flex flex-col items-start md:items-center text-left md:text-center">
        <span className="uppercase text-[#E07755] mb-1 tracking-[clamp(1px,0.5vw,3px)] text-[clamp(7px,1.8vw,9px)]">
          Made By
        </span>
        <h3
          className="font-bold text-[#f3f4f6] mb-0.5 text-[clamp(12px,2.5vw,16px)]"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
        >
          {name}
        </h3>
        <span className="text-[#E07755] font-bold tracking-[clamp(1px,0.5vw,2px)] text-[clamp(6px,1.5vw,8px)]">
          {role}
        </span>
      </div>
    </div>
  );
};

export default function GameLayout() {
  const { id } = useParams();
  const game = games.find((g) => g.id.toString() === id);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-xl mb-4 text-[#E07755]">
          GAME NOT FOUND
        </h1>
        <Link
          to="/explore"
          className="px-4 py-2 bg-[#E07755] text-[#0a0d04] rounded hover:opacity-80 transition-opacity text-[10px] font-bold"
        >
          BACK TO EXPLORE
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-fit md:h-full flex flex-col md:flex-row gap-[clamp(16px,4vw,32px)] pb-[clamp(20px,5vw,40px)] pt-[clamp(4px,1vw,8px)]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
      {/* Info Column - Left */}
      <div className="w-full md:flex-1 flex flex-col justify-between gap-[clamp(12px,3vw,24px)]">
        <section className="flex flex-col gap-4">
          <h1
            className="text-[#E07755] uppercase leading-tight shrink-0 text-[clamp(18px,4vw,30px)]"
            style={{
              textShadow: "0 0 15px #E0775566",
            }}
          >
            {game.name}
          </h1>
          <p
            className="text-[#8a7a60] leading-relaxed shrink-0 text-[clamp(8px,1.2vw,10px)]"
          >
            {game.description}
          </p>

          {/* Creator Profile */}
          <div className="py-2">
            <DeveloperProfile />
          </div>
        </section>

        <button
          className="w-full h-[clamp(40px,10vw,64px)] bg-[#E07755] text-[#0a0d04] rounded-lg font-bold hover:brightness-110 active:translate-y-[2px] transition-all shrink-0 mt-[clamp(10px,2vw,16px)] text-[clamp(14px,3.5vw,18px)]"
          style={{ boxShadow: "0 4px 0 #8a3e2a" }}
        >
          PLAY NOW
        </button>
      </div>

      {/* Stats Column - Right */}
      <div className="w-full md:flex-1 flex flex-col justify-between gap-[clamp(12px,3vw,24px)] border-t md:border-t-0 md:border-l border-[#E07755]/10 pt-[clamp(20px,5vw,40px)] md:pt-0 md:pl-[clamp(16px,4vw,32px)]">
        <div className="w-full flex flex-col justify-center items-center bg-[#E07755]/5 border border-[#E07755]/20 rounded-2xl p-[clamp(16px,4vw,32px)] text-center min-h-[clamp(120px,25vh,160px)] md:flex-1">
          <span
            className="text-[#8a7a60] uppercase mb-2 tracking-[2px] text-[clamp(7px,1.5vw,8px)]"
          >
            High Score
          </span>
          <h2
            className="text-[#4ade80] text-[clamp(28px,5vw,44px)]"
            style={{
              textShadow: "0 0 12px #4ade8066",
            }}
          >
            {game.highScore}
          </h2>
        </div>

        <div className="flex gap-[clamp(8px,2vw,12px)] h-[clamp(40px,10vw,64px)] shrink-0 mt-[clamp(12px,3vw,24px)] md:mt-0">
          <Link
            to={`/game/${id}/leaderboard`}
            className="w-[clamp(40px,10vw,64px)] h-full bg-[#E07755]/10 border border-[#E07755]/30 
             rounded-lg flex items-center justify-center 
             hover:bg-[#E07755]/20 transition-colors"
          >
            <img
              src="/leaderboard.png"
              alt="lb"
              className="w-[clamp(20px,5vw,28px)] h-[clamp(20px,5vw,28px)] brightness-0 invert opacity-60"
            />
          </Link>
          <div className="flex-1 bg-[#E07755]/10 border border-[#E07755]/30 rounded-lg flex justify-between items-center px-4">
            <button className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
              <img
                src="/arrow-back.png"
                alt="b"
                className="w-[clamp(12px,3vw,16px)] h-[clamp(12px,3vw,16px)] brightness-0 invert"
              />
            </button>
            <Link
              to="/explore"
              className="text-[#E07755] font-bold text-[clamp(8px,2vw,10px)] tracking-[clamp(1px,0.5vw,3px)]"
            >
              EXPLORE
            </Link>
            <button className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
              <img
                src="/arrow-forward.png"
                alt="f"
                className="w-[clamp(12px,3vw,16px)] h-[clamp(12px,3vw,16px)] brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
