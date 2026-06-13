import { useParams } from "react-router-dom";
import games from "../data/games.json";

export const Profile = ({ name = "ARJUN R.", highScore = 12450 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="
        w-80
        md:w-160
        md:h-80
        p-6
        flex flex-col
        items-center
        justify-center
        gap-4

        bg-[#E07755]/5
        border border-[#E07755]/15
        rounded-3xl
      "
    >
      {/* Avatar */}
      <div
        className="
          flex items-center justify-center
          rounded-full
          border-2

          w-20 h-20
          sm:w-24 sm:h-24
          md:w-32 md:h-32
        "
        style={{
          backgroundColor: "#E0775522",
          borderColor: "#E07755",
          boxShadow: "0 0 25px #E0775544",
        }}
      >
        <span className="font-black text-[#E07755] text-3xl sm:text-4xl md:text-5xl">
          {initials}
        </span>
      </div>

      {/* Name */}
      <h3
        className="
          text-white
          font-bold
          text-center
          text-xl
        "
      >
        {name}
      </h3>

      {/* High Score */}
      <div className="flex flex-col md:flex-row justify-center gap-3 items-center border border-amber-600 px-2 py-3 rounded-xl w-50 md:w-100">
        <span
          className="
            uppercase
            text-[#E07755]/80
            md:text-md
            text-sm
            text-center
          "
        >
          High Score
        </span>

        <span
          className="
            font-black
            text-white
            leading-none
            text-md
            md:text-xl
            text-center
          "
          style={{
            textShadow: "0 0 15px #E0775560",
          }}
        >
          {highScore.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default function LeaderboardLayout() {
  const { id } = useParams();
  const game = games.find((g) => g.id.toString() === id);
  let leaderboard = [
    "Akshay M Nair",
    "Abhiram A R",
    "Abhirag S Nair",
    "Gowtham",
    "Sreenanthan",
    "Kevin L",
  ];
  return (
    <div
      className="flex flex-col md:flex-row w-full h-full"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      <div className="w-full md:w-1/2 flex flex-col flex-1 justify-between items-center px-4 sm:px-6 py-5 sm:py-8">
        {/* TOP: Game title */}
        <h1
          className="text-[#E07755] uppercase font-black leading-none
              text-lg sm:text-xl md:text-2xl text-center lg:text-left mb-4"
          style={{
            textShadow: "0 0 20px #E0775588",
          }}
        >
          {game.name}
        </h1>

        {/* MIDDLE: Profile */}
        <div className="flex-1 flex items-center justify-center">
          <Profile />
        </div>
      </div>
      <div className="w-full flex-1 md:w-1/2 flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6">
        {/* Title */}
        <h1 className="w-full max-w-xs text-center text-lg sm:text-xl md:text-2xl font-black tracking-wide mb-4">
          LEADERBOARD
        </h1>

        {/* List */}
        <ul className="w-full flex flex-col gap-2">
          {leaderboard.map((player, index) => (
            <li
              key={index}
              className="
                bg-[#E07755]/10
                border border-[#E07755]/15
                rounded-lg
                px-3 sm:px-4
                py-3
                text-sm sm:text-base md:text-lg
                text-white
                hover:bg-[#E07755]/15
                transition-all"
            >
              <div className="flex items-center w-full">
                <span className="text-[#E07755] font-bold w-8 flex-shrink-0">
                  {index + 1}
                </span>

                <span className="font-medium break-words">{player}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
