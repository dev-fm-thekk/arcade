import { motion as Motion } from "motion/react"

const Section = ({ title, children, delay = 0, color = "#192F1A" }) => (
  <Motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="w-full max-w-4xl mb-12 md:mb-16 px-4 md:px-0"
  >
    <h2 className="text-3xl md:text-5xl font-base-neue-trial mb-4 md:mb-6" style={{ color }}>
      {title}
    </h2>
    <div className="text-base md:text-xl text-text leading-relaxed space-y-3 md:space-y-4">
      {children}
    </div>
  </Motion.section>
)

export default function About() {
  const team = [
    { role: "Campus Lead", name: "Kevin L", color: "#E07755" },
    { role: "Learning Coordinator", name: "Keshav", color: "#192F1A" },
    { role: "Women in Tech", name: "Bhargavi", color: "#561E27" },
    { role: "Outreach", name: "Sreenanthan", color: "#D8F08A" },
  ]

  const contributors = [
    "Abhiram A R", "Abhiram A P", "Pranav PP", "Sreenanthan", "..."
  ]

  return (
    <div className="w-full min-h-screen bg-[#F8FFD8] pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col items-center">
      {/* Hero Section */}
      <Motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24 px-6"
      >
        <h1 className="text-5xl md:text-9xl font-base-neue-trial text-[#192F1A] mb-4">
          ABOUT
        </h1>
        <p className="text-lg md:text-2xl text-[#561E27] font-bold max-w-2xl mx-auto">
          Where learning meets gaming.
        </p>
      </Motion.div>

      {/* About Us */}
      <Section title="About Us" delay={0.2} color="#E07755">
        <p>
          Arcade is a passion project born out of the idea that technical education 
          should be as engaging as playing your favorite video game.
        </p>
        <p>
          We combine interactive simulations with core CS concepts to create a 
          learning environment that sticks.
        </p>
      </Section>

      {/* Tinkerhub SCTCE */}
      <Section title="Tinkerhub SCTCE" delay={0.3} color="#192F1A">
        <p>
          Tinkerhub is a non-profit organisation. 
          We are the student branch of Tinkerhub at SCTCE. 
          We believe learning should be free and accessible to everyone. 
        </p>
        <p>
          We also believe learning should be fun—so hence, Arcade.
        </p>
      </Section>

      {/* Our Team */}
      <Section title="Our Team" delay={0.4} color="#561E27">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <Motion.div 
              key={member.role}
              whileHover={{ scale: 1.02 }}
              className="p-5 md:p-6 rounded-3xl flex flex-row items-center gap-4 md:gap-6 shadow-sm border border-black/5"
              style={{ backgroundColor: member.color, color: i === 3 ? "#192F1A" : "#F8FFD8" }}
            >
              {/* Profile Pic Placeholder */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-black/10 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
                <svg className="w-10 h-10 md:w-12 md:h-12 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] md:text-sm uppercase tracking-widest font-black opacity-80 mb-1 truncate">
                  {member.role}
                </span>
                <span className="text-xl md:text-3xl font-bold leading-tight">
                  {member.name}
                </span>
              </div>
            </Motion.div>
          ))}
        </div>
      </Section>

      {/* Contributors */}
      <Section title="Contributors" delay={0.5} color="#D8F08A">
        <div className="flex flex-wrap gap-4">
          {contributors.map((name) => (
            <div 
              key={name}
              className="flex items-center gap-2 pl-1 pr-4 py-1 bg-white/50 border border-black/10 rounded-full text-sm md:text-base font-medium text-[#192F1A]"
            >
              {/* Avatar Placeholder */}
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center overflow-hidden">
                <svg className="w-5 h-5 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
