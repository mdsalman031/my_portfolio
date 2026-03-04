import { LEVEL_TITLES, XP_PER_LEVEL } from "../../data/portfolioData";
import { getLevel, getLevelProgress } from "../../utils/gameUtils";

export default function XPBar({ xp }) {
  const level = getLevel(xp);
  const progress = getLevelProgress(xp);
  const title = LEVEL_TITLES[level - 1];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(5,5,15,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,245,212,0.15)",
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        fontFamily: "'Share Tech Mono', monospace",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #00f5d4, #7209b7)",
          borderRadius: "6px",
          padding: "4px 10px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#000",
          whiteSpace: "nowrap",
          letterSpacing: "1px",
        }}
      >
        LVL {level}
      </div>

      <span style={{ color: "#00f5d4", fontSize: "11px", whiteSpace: "nowrap", opacity: 0.8 }}>{title}</span>

      <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #00f5d4, #7209b7)",
            borderRadius: "3px",
            transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 10px #00f5d4",
          }}
        />
      </div>

      <span style={{ color: "#fff", fontSize: "11px", whiteSpace: "nowrap", opacity: 0.6 }}>
        {xp % XP_PER_LEVEL} / {XP_PER_LEVEL} XP
      </span>

      <span style={{ color: "#f72585", fontSize: "11px", whiteSpace: "nowrap" }}>✦ {xp} TOTAL</span>
    </div>
  );
}
