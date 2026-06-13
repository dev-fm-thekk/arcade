import { useParams } from "react-router-dom";
import games from "../data/games.json";

export const Profile = ({
  name = "ARJUN R.",
  role = "FULL STACK DEVELOPER",
  highScore = 12450,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="flex flex-row md:flex-col items-center gap-5 p-5 
                    bg-[#E07755]/5 border border-[#E07755]/15 rounded-2xl w-full"
    >
      {/* Avatar */}
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center 
                   border-[2px] shrink-0"
        style={{
          backgroundColor: "#E0775522",
          borderColor: "#E07755",
          boxShadow: "0 0 18px #E0775540",
        }}
      >
        <span className="text-[20px] sm:text-[26px] font-black text-[#E07755]">
          {initials}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col items-start md:items-center text-left md:text-center">
        {/* Name */}
        <h3 className="font-bold text-white text-[16px] sm:text-[20px] leading-tight">
          {name}
        </h3>

        {/* High Score */}
        <div className="mt-3 flex flex-col items-center leading-none">
          <span
            className="font-black text-white text-[clamp(28px,4vw,42px)]"
            style={{ textShadow: "0 0 15px #E0775560" }}
          >
            {highScore}
          </span>
        </div>
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
    <div className="flex flex-col md:flex-row w-full h-full justify-center">
      <div className="w-1/2 flex flex-col h-full justify-between px-6 py-8">
        {/* TOP: Game title */}
        <h1
          className="text-[#E07755] uppercase font-black leading-none
               text-[clamp(40px,8vw,90px)]"
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
      <div className="w-1/2 flex flex-col items-center px-6 py-6">
        {/* Title */}
        <h1 className="w-full md:w-56 text-center text-[clamp(28px,6vw,48px)] font-black tracking-wide mb-6">
          LEADERBOARD
        </h1>

        {/* List */}
        <ul className="w-full flex flex-col gap-3">
          {leaderboard.map((player, index) => (
            <li
              key={index}
              className="flex items-center justify-between w-full 
                   bg-[#E07755]/10 border border-[#E07755]/15 
                   px-4 py-3 rounded-lg
                   text-[clamp(14px,2vw,20px)]
                   text-white hover:bg-[#E07755]/15 transition-all"
            >
              {/* Rank */}
              <span className="text-[#E07755] font-bold w-10">{index + 1}</span>

              {/* Name */}
              <span className="flex-1 text-center font-medium">{player}</span>

              {/* Spacer for symmetry */}
              <span className="w-10"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
