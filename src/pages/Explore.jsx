import { Link } from "react-router-dom";
import games from "../data/games.json";

export default function Explore() {
  return (
    <div className="w-full text-left" style={{ fontFamily: "'Press Start 2P', monospace"}}>
      <h1
        className="mb-4 pb-2 border-b-2 border-[#4ade80]"
        style={{ color: "#4ade80", fontSize: "clamp(14px, 3vw, 20px)" }}
      >
        CHOOSE QUEST
      </h1>

      <div className="grid grid-cols-1 gap-3">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/game/${game.id}`}
            className="border-2 p-3 rounded-lg transition-colors no-underline hover:border-[#E07755]"
            style={{
              background: "rgba(0,0,0,0.25)",
              borderColor: "#2e2010",
            }}
          >
            <div className="flex justify-between items-center gap-2 mb-1">
              <h2 style={{ color: "#4ade80", fontSize: "clamp(9px, 2vw, 11px)" }}>{game.name}</h2>
              <span style={{ color: "#E07755", fontSize: "clamp(7px, 1.5vw, 8px)" }}>PLAY →</span>
            </div>
            <p
              className="line-clamp-2"
              style={{ color: "#8a7a60", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: 1.7 }}
            >
              {game.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
