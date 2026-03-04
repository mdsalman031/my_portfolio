import Section from "../common/Section";
import { RESUME } from "../../data/portfolioData";

export default function AboutSection() {
  return (
    <Section id="about" label="MISSION 01" name="About" icon="👤">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,245,212,0.12)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00f5d4, #7209b7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              marginBottom: "20px",
              boxShadow: "0 0 30px rgba(0,245,212,0.3)",
            }}
          >
            👨‍💻
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              fontSize: "15px",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Computer Science student at CBIT Hyderabad with a passion for building impactful full-stack applications. I bridge AI
            and web development, turning complex ideas into clean, performant products.
          </p>
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Location", value: "Hyderabad, India" },
              { label: "Email", value: RESUME.email },
              { label: "GitHub", value: RESUME.github },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "12px", fontFamily: "'Share Tech Mono', monospace", fontSize: "12px" }}>
                <span style={{ color: "#00f5d4", minWidth: "80px" }}>{item.label}:</span>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "14px",
              letterSpacing: "2px",
              color: "#00f5d4",
              marginBottom: "8px",
            }}
          >
            📚 EDUCATION LOG
          </h3>
          {RESUME.education.map((edu) => (
            <div
              key={edu.degree}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid #00f5d4",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "13px",
                  color: "#fff",
                  marginBottom: "4px",
                  fontWeight: 700,
                }}
              >
                {edu.degree}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
                {edu.institution}
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "#f72585" }}>{edu.period}</span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "11px",
                    color: "#ffd700",
                    background: "rgba(255,215,0,0.08)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  GPA: {edu.gpa}
                </span>
              </div>
            </div>
          ))}

          <div>
            <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px", letterSpacing: "2px", color: "#7209b7", marginBottom: "12px" }}>
              COURSEWORK
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {RESUME.courses.map((c) => (
                <span
                  key={c}
                  style={{
                    background: "rgba(114,9,183,0.12)",
                    border: "1px solid rgba(114,9,183,0.3)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
