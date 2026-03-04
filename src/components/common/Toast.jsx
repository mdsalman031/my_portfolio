export default function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "80px"})`,
        opacity: visible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        background: "rgba(5,5,15,0.97)",
        border: "1px solid rgba(0,245,212,0.4)",
        borderRadius: "12px",
        padding: "14px 24px",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "13px",
        color: "#00f5d4",
        zIndex: 2000,
        boxShadow: "0 0 40px rgba(0,245,212,0.2)",
        whiteSpace: "nowrap",
      }}
    >
      {message}
    </div>
  );
}
