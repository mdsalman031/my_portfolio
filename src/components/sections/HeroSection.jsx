import { useEffect, useState } from "react";
import { RESUME } from "../../data/portfolioData";

export default function HeroSection({ onBegin }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,245,212,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,212,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle, rgba(114,9,183,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          bottom: "10%",
          right: "10%",
          background: "radial-gradient(circle, rgba(0,245,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(0,245,212,0.08)",
            border: "1px solid rgba(0,245,212,0.3)",
            borderRadius: "20px",
            padding: "6px 16px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            color: "#00f5d4",
            letterSpacing: "2px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#00f5d4",
              boxShadow: "0 0 8px #00f5d4",
              animation: "pulse 2s infinite",
            }}
          />
          AVAILABLE FOR HIRE
        </span>
      </div>

      <h1
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: "16px",
          background: "linear-gradient(135deg, #fff 0%, #00f5d4 50%, #7209b7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
        }}
      >
        MD SALMAN
      </h1>

      <h2
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
          color: "#f72585",
          letterSpacing: "4px",
          marginBottom: "20px",
          fontWeight: 400,
          textTransform: "uppercase",
        }}
      >
        Full-Stack Developer &amp; CS Student
      </h2>

      <p
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "48px",
          letterSpacing: "1px",
        }}
      >
        // {RESUME.tagline}
      </p>

      <div
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s",
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "48px",
        }}
      >
        {[
          { label: "LeetCode", value: "270+" },
          { label: "Projects", value: "3+" },
          { label: "Certifications", value: "3+" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#00f5d4",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "2px",
                marginTop: "4px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={onBegin}
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "13px",
            letterSpacing: "2px",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #00f5d4, #7209b7)",
            border: "none",
            borderRadius: "8px",
            color: "#000",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 0 30px rgba(0,245,212,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
          }}
        >
          ▶ BEGIN MISSION
        </button>

        <a
          href="#contact"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "13px",
            letterSpacing: "2px",
            padding: "14px 32px",
            background: "transparent",
            border: "1px solid rgba(0,245,212,0.4)",
            borderRadius: "8px",
            color: "#00f5d4",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,245,212,0.08)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "none";
          }}
        >
          CONTACT
        </a>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "32px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "bounce 2s infinite",
        }}
      >
        SCROLL TO EARN XP
        <span style={{ fontSize: "20px" }}>↓</span>
      </div>
    </section>
  );
}
