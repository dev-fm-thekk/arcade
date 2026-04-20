export default function LeaderBoardElement ({ name, score, color }) {
  return (
    <div 
      className="w-full max-w-[700px] bg-[#F8FFD7] opacity-80 rounded-[20px] px-10 py-5 flex justify-between items-center mb-4 transition-all"
    >
      <h2 
        style={{ color: `#${color}` }} 
        className="text-[clamp(1.5rem,4vw,3.5rem)] font-base-neue-trial uppercase leading-none m-0"
      >
        {name}
      </h2>

      <span 
        style={{ color: `#${color}` }} 
        className="text-[clamp(1.5rem,4vw,3.5rem)] font-base-neue-trial leading-none m-0"
      >
        {score}
      </span>
    </div>
  );
};