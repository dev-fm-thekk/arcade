const Section = ({ title, children, color = "#192F1A" }) => (
  <div className="mb-16 flex flex-col items-center">
    <h2 className="font-bold mb-6 uppercase text-center" style={{ color, fontSize: "clamp(16px, 3.5vw, 20px)", letterSpacing: "2px" }}>
      {title}
    </h2>
    <div className="leading-relaxed text-center max-w-2xl" style={{ fontSize: "clamp(12px, 2.2vw, 15px)", color: "#c8d880" }}>
      {children}
    </div>
  </div>
);

const CoreAvatar = ({ name, role, color = "#E07755" }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div className="flex flex-col items-center text-center gap-4 group">
      <div 
        className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-transform group-hover:scale-105"
        style={{ 
          backgroundColor: `${color}22`, 
          borderColor: color,
          boxShadow: `0 0 20px ${color}33`
        }}
      >
        <span style={{ color, fontSize: '24px', fontWeight: 'bold' }}>{initials}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-bold whitespace-nowrap" style={{ color: "#f3f4f6", fontSize: '13px' }}>{name}</span>
        <span style={{ color: "#8a7a60", fontSize: '11px' }}>{role}</span>
      </div>
    </div>
  );
};

const ContributorAvatar = ({ name, color = "#4ade80" }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div 
      title={name}
      className="w-11 h-11 rounded-md flex items-center justify-center border transition-all hover:border-[#4ade80] hover:scale-110 cursor-help"
      style={{ 
        backgroundColor: "#1a1a1a", 
        borderColor: "#2e2010"
      }}
    >
      <span style={{ color: "#4ade80", fontSize: '13px', fontWeight: 'bold', opacity: 0.8 }}>{initials}</span>
    </div>
  );
};

export default function About() {
  const coreTeam = [
    { name: "Alex Rivera", role: "Lead Dev", color: "#E07755" },
    { name: "Sarah Chen", role: "UI/UX", color: "#4ade80" },
    { name: "Marcus Koh", role: "Hardware", color: "#561E27" },
  ];

  const contributors = [
    { name: "Elena Belova" },
    { name: "Jordan Smith" },
    { name: "A. Kumar" },
    { name: "Li Wei" },
    { name: "J. Doe" },
    { name: "S. Miller" },
    { name: "B. Wilson" },
    { name: "K. Gupta" },
  ];

  return (
    <div className="text-center w-full pr-2 pb-20 flex flex-col items-center">
      <h1
        className="mb-12 pb-4 border-b-2 border-[#E07755] sticky top-0 bg-[#0a0d04] z-10 w-full text-center"
        style={{ color: "#E07755", fontSize: "clamp(24px, 5vw, 32px)" }}
      >
        ABOUT US
      </h1>

      <Section title="MISSION" color="#E07755">
        <p>Arcade makes technical education as engaging as gaming. Our platform bridges the gap between learning and play, creating an immersive environment for the next generation of builders.</p>
      </Section>

      <Section title="CORE TEAM" color="#E07755">
        <div className="flex flex-row flex-wrap gap-12 justify-center items-start">
          {coreTeam.map((member, i) => (
            <CoreAvatar key={i} {...member} />
          ))}
        </div>
      </Section>

      <Section title="CONTRIBUTORS" color="#4ade80">
        <div className="flex flex-wrap gap-4 justify-center">
          {contributors.map((member, i) => (
            <ContributorAvatar key={i} {...member} />
          ))}
        </div>
      </Section>

      <Section title="TINKERHUB SCTCE" color="#4ade80">
        <p>Student branch dedicated to free, accessible learning. Fostering a community where students can experiment, build, and grow together through peer-to-peer mentorship and hands-on projects.</p>
      </Section>
    </div>
  );
}
