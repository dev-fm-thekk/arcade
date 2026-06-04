export default function Explore() {
    return (
        <div className="w-full min-h-screen bg-[#F8FFD8] pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col items-center px-6">
            <h1 className="text-5xl md:text-8xl font-base-neue-trial text-[#192F1A] mb-12 md:mb-16">
                Explore
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-video bg-surface border border-border rounded-2xl flex items-center justify-center text-text-muted font-bold transition-transform hover:scale-[1.02]">
                        Game {i}
                    </div>
                ))}
            </div>
        </div>
    )
}
