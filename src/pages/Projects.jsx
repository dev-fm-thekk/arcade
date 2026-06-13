export default function Projects() {
  const projects = [
    { name: "EMULATOR-BOY", tag: "RUST", desc: "Gameboy color emulation suite configured inside Web Assembly.", color: "#f59e0b" },
    { name: "CHIP-8 SHELL", tag: "WEBGL", desc: "Visual assembler tools loaded directly inside web views.", color: "#22d3ee" },
    { name: "ARCADE HUB", tag: "REACT", desc: "Peer-learning platform with retro arcade navigation.", color: "#4ade80" },
  ];

  return (
    <div className="w-full text-left" style={{ fontFamily: "'Press Start 2P', monospace"}}>
      <h1
        className="mb-4 pb-2 border-b-2 border-[#e06070]"
        style={{ color: "#e06070", fontSize: "clamp(14px, 3vw, 20px)", textShadow: "0 0 8px #ff4466" }}
      >
        SQUAD EXPERIMENTS
      </h1>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className="border p-3 rounded"
            style={{ borderColor: "#2e2010", background: "rgba(0,0,0,0.25)" }}
          >
            <div className="flex justify-between items-center mb-1" style={{ color: project.color, fontSize: "clamp(9px, 2vw, 11px)" }}>
              <span>{String(i + 1).padStart(2, "0")}. {project.name}</span>
              <span>{project.tag}</span>
            </div>
            <p style={{ color: "#8a7a60", fontSize: "clamp(7px, 1.5vw, 9px)", lineHeight: 1.7 }}>
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
