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
    <div className="flex flex-row md:flex-col items-center md:justify-center gap-4 md:gap-5 p-3 sm:p-5 bg-[#E07755]/5 border border-[#E07755]/15 rounded-2xl w-full">
      <div
        className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center border-[3px] shrink-0"
        style={{
          backgroundColor: `#E0775522`,
          borderColor: "#E07755",
          boxShadow: `0 0 20px #E0775544`,
        }}
      >
        <span
          className="text-[16px] sm:text-[28px] font-bold"
          style={{ color: "#E07755" }}
        >
          {initials}
        </span>
      </div>
      <div className="flex flex-col items-start md:items-center text-left md:text-center">
        <span className="uppercase text-[#E07755] mb-1 tracking-[2px] sm:tracking-[3px] text-[7px] sm:text-[9px]">
          Made By
        </span>
        <h3
          className="font-bold text-[#f3f4f6] mb-0.5 text-[12px] sm:text-[16px]"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
        >
          {name}
        </h3>
        <span className="text-[#E07755] font-bold tracking-[1px] sm:tracking-[2px] text-[6px] sm:text-[8px]">
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
        <h1 className="text-xl mb-4" style={{ color: "#E07755" }}>
          GAME NOT FOUND
        </h1>
        <Link
          to="/explore"
          className="px-4 py-2 bg-[#E07755] text-[#0a0d04] rounded hover:opacity-80 transition-opacity"
          style={{ fontSize: "10px", fontWeight: "bold" }}
        >
          BACK TO EXPLORE
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-fit md:h-full flex flex-col md:flex-row gap-8 md:gap-8 pb-10 pt-1">
      {/* Info Column - Left */}
      <div className="w-full md:flex-1 flex flex-col justify-between gap-6">
        <section className="flex flex-col gap-4">
          <h1
            className="text-[#E07755] uppercase leading-tight shrink-0"
            style={{
              fontSize: "clamp(18px, 4vw, 30px)",
              textShadow: "0 0 15px #E0775566",
            }}
          >
            {game.name}
          </h1>
          <p
            className="text-[#8a7a60] leading-relaxed shrink-0"
            style={{ fontSize: "clamp(8px, 1.2vw, 10px)" }}
          >
            {game.description}
          </p>

          {/* Creator Profile */}
          <div className="py-2">
            <DeveloperProfile />
          </div>
        </section>

        <button
          className="w-full h-14 sm:h-16 bg-[#E07755] text-[#0a0d04] rounded-lg font-bold hover:brightness-110 active:translate-y-[2px] active:shadow-none transition-all shrink-0 mt-4"
          style={{ fontSize: "16px sm:18px", boxShadow: "0 4px 0 #8a3e2a" }}
        >
          PLAY NOW
        </button>
      </div>

      {/* Stats Column - Right */}
      <div className="w-full md:flex-1 flex flex-col justify-between gap-6 border-t md:border-t-0 md:border-l border-[#E07755]/10 pt-10 md:pt-0 md:pl-8">
        <div className="w-full flex flex-col justify-center items-center bg-[#E07755]/5 border border-[#E07755]/20 rounded-2xl p-8 text-center min-h-[160px] md:flex-1">
          <span
            className="text-[#8a7a60] uppercase mb-2 tracking-[2px]"
            style={{ fontSize: "8px" }}
          >
            High Score
          </span>
          <h2
            className="text-[#4ade80]"
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              textShadow: "0 0 12px #4ade8066",
            }}
          >
            {game.highScore}
          </h2>
        </div>

        <div className="flex gap-3 h-14 sm:h-16 shrink-0 mt-6 md:mt-0">
          <Link
            to={`/game/${id}/leaderboard`}
            className="w-14 sm:w-16 h-full bg-[#E07755]/10 border border-[#E07755]/30 
             rounded-lg flex items-center justify-center 
             hover:bg-[#E07755]/20 transition-colors"
          >
            <img
              src="/leaderboard.png"
              alt="lb"
              className="w-6 h-6 sm:w-7 sm:h-7 brightness-0 invert opacity-60"
            />
          </Link>
          <div className="flex-1 bg-[#E07755]/10 border border-[#E07755]/30 rounded-lg flex justify-between items-center px-4">
            <button className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
              <img
                src="/arrow-back.png"
                alt="b"
                className="w-4 h-4 brightness-0 invert"
              />
            </button>
            <Link
              to="/explore"
              className="text-[#E07755] font-bold text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px]"
            >
              EXPLORE
            </Link>
            <button className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
              <img
                src="/arrow-forward.png"
                alt="f"
                className="w-4 h-4 brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
