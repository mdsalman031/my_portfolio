import { useEffect, useRef, useState } from "react";
import Section from "../common/Section";
import { RESUME } from "../../data/portfolioData";

function getSkillTier(level) {
  if (level >= 86) return { label: "Elite", color: "#00f5d4", cells: 5 };
  if (level >= 78) return { label: "Battle-Tested", color: "#4cc9f0", cells: 4 };
  if (level >= 70) return { label: "Production-Ready", color: "#f5a623", cells: 3 };
  return { label: "Actively Growing", color: "#f72585", cells: 2 };
}

const CATEGORY_HINTS = {
  Frontend: "UI systems, responsive layouts, interaction polish",
  Backend: "APIs, auth, data flow, integration logic",
  Languages: "Problem solving, implementation speed, clarity",
  Databases: "Schema thinking, query design, reliability",
  Tools: "Workflow, versioning, delivery velocity",
};

function SkillCard({ skill, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setAnimated(true), delay);
      }
    }, { threshold: 0.3 });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const tier = getSkillTier(skill.level);

  return (
    <div
      ref={ref}
      style={{
        marginBottom: "12px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
        padding: "12px",
        transform: animated ? "translateY(0)" : "translateY(6px)",
        opacity: animated ? 1 : 0,
        transition: "all 0.45s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "13px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: tier.color, display: "inline-block", boxShadow: `0 0 8px ${tier.color}` }} />
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            letterSpacing: "1px",
            color: tier.color,
            border: `1px solid ${tier.color}55`,
            background: `${tier.color}10`,
            borderRadius: "999px",
            padding: "3px 8px",
          }}
        >
          {tier.label}
        </span>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
        {[1, 2, 3, 4, 5].map((cell) => (
          <div
            key={cell}
            style={{
              height: "6px",
              flex: 1,
              borderRadius: "6px",
              background: cell <= tier.cells ? tier.color : "rgba(255,255,255,0.08)",
              boxShadow: cell <= tier.cells ? `0 0 8px ${tier.color}88` : "none",
              transition: "all 0.5s ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.4px",
        }}
      >
        {CATEGORY_HINTS[skill.category]}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const categories = [...new Set(RESUME.skills.map((s) => s.category))];

  return (
    <Section id="skills" label="MISSION 02" name="Skills" icon="🛠">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px" }}>
        {categories.map((cat) => (
          <div
            key={cat}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "12px",
                letterSpacing: "3px",
                color: "#00f5d4",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              {cat}
            </h3>
            {RESUME.skills
              .filter((s) => s.category === cat)
              .map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} delay={i * 90} />
              ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
