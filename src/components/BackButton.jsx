export default function BackButton({ bg, name }) {
    return (
        <button style={{ backgroundColor: `#${bg}` }} className="w-full max-w-[180px] min-h-[5px] gap-1 h-[clamp(40px,10vw,100px)] rounded-xl flex justify-center items-center hover:scale-[1.02] transition-transform">
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-[clamp(1.2rem,3vw,1.8rem)] h-[clamp(1.2rem,3vw,1.8rem)] flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-2"
            >
                <path 
                    d="M15 18L9 12L15 6" 
                    stroke="#F8FFD7" 
                    strokeWidth="4.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="text-[#F8FFD7] text-[clamp(1rem,5vw,2.5rem)] font-base-neue-trial m-0 leading-none"> {name}</p>
        </button>
    )
}