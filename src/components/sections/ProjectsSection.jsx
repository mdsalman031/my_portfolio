import { useState } from "react";
import Section from "../common/Section";
import { RESUME } from "../../data/portfolioData";

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  const colorRgb =
    project.color === "#00f5d4" ? "0,245,212" : project.color === "#f72585" ? "247,37,133" : "114,9,183";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${colorRgb},0.06)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${project.color}60` : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        padding: "28px",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 60px ${project.color}20` : "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            color: project.color,
            letterSpacing: "2px",
            background: `${project.color}15`,
            padding: "3px 10px",
            borderRadius: "4px",
          }}
        >
          PROJECT_{String(index + 1).padStart(2, "0")}
        </span>
        {project.highlight && (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              color: "#ffd700",
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.2)",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            🏆 {project.highlight}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
        {project.name}
      </h3>
      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: project.color, marginBottom: "14px", letterSpacing: "1px" }}>
        {project.subtitle}
      </p>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              padding: "3px 8px",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "12px",
          color: project.color,
          textDecoration: "none",
          letterSpacing: "1px",
          transition: "gap 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = "10px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = "6px";
        }}
      >
        VIEW REPO →
      </a>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <Section id="projects" label="MISSION 03" name="Projects" icon="🚀">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {RESUME.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
