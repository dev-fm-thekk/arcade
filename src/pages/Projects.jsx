export default function Projects() {
    return (
        <div className="w-full min-h-screen bg-[#F8FFD8] pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col items-center px-6">
            <h1 className="text-5xl md:text-8xl font-base-neue-trial text-[#192F1A] mb-12 md:mb-16 text-center">
                Projects
            </h1>
            <div className="max-w-4xl w-full space-y-4 md:space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-5 md:p-8 bg-surface border border-border rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                        <div className="space-y-1">
                            <h3 className="text-xl md:text-2xl font-bold text-secondary">
                                {i === 1 ? 'React' : i === 2 ? 'Vite' : 'Tailwind'} Project
                            </h3>
                            <p className="text-sm md:text-base text-text-muted max-w-lg">
                                A collaborative effort to improve {i === 1 ? 'React' : i === 2 ? 'Vite' : 'Tailwind'} tooling for the community.
                            </p>
                        </div>
                        <button className="w-full md:w-auto px-6 py-3 bg-accent text-accent-foreground rounded-xl font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap shadow-md">
                            View Repo
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
