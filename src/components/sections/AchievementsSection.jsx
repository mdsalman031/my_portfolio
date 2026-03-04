import { useState } from "react";
import Section from "../common/Section";
import { RARITY_COLORS, RESUME } from "../../data/portfolioData";

function AchievementBadge({ achievement, unlocked }) {
  const [hovered, setHovered] = useState(false);
  const col = RARITY_COLORS[achievement.rarity];
  const colorRgb = col === "#ffd700" ? "255,215,0" : col === "#f5a623" ? "245,166,35" : "76,201,240";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${colorRgb},0.08)` : "rgba(255,255,255,0.02)",
        border: `2px solid ${hovered ? `${col}80` : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        padding: "24px 20px",
        textAlign: "center",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-4px) scale(1.03)" : "none",
        boxShadow: hovered ? `0 16px 40px ${col}25` : "none",
        filter: unlocked ? "none" : "grayscale(1) opacity(0.35)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          marginBottom: "12px",
          display: "block",
          filter: `drop-shadow(0 0 12px ${col})`,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        {achievement.icon}
      </div>
      <span
        style={{
          display: "inline-block",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          color: col,
          letterSpacing: "2px",
          background: `${col}15`,
          padding: "2px 8px",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      >
        {achievement.rarity.toUpperCase()}
      </span>
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "13px",
          color: "#fff",
          fontWeight: 600,
          marginBottom: "4px",
          lineHeight: 1.3,
        }}
      >
        {achievement.title}
      </p>
      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{achievement.year}</p>
    </div>
  );
}

export default function AchievementsSection({ unlockedMissions }) {
  return (
    <Section id="achievements" label="MISSION 04" name="Achievements" icon="🏆">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
        {RESUME.achievements.map((a) => (
          <AchievementBadge key={a.id} achievement={a} unlocked={unlockedMissions.has("achievements")} />
        ))}
      </div>
    </Section>
  );
}
