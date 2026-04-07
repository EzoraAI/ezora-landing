import { useState } from "react";

const roles = [
  {
    id: "individual",
    label: "I need an AI expert",
    description: "Find and book sessions with verified AI professionals.",
    dotColor: "#7C3AED",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    btnBg: "#7C3AED",
    btnText: "#fff",
    heading: "Create your account",
    subtext: "Free to join. Only pay when you book a session.",
    showName: true,
  },
  {
    id: "business",
    label: "I run a business",
    description: "Hire AI talent for projects, strategy, and automation.",
    dotColor: "#00C9A7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    ),
    btnBg: "#0B1224",
    btnText: "#fff",
    heading: "Create your business account",
    subtext: "Access top AI talent. Scale with confidence.",
    showName: true,
  },
  {
    id: "expert",
    label: "I'm an AI expert",
    description: "Monetize your skills with coaching, consulting, and more.",
    dotColor: "#F5A623",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    ),
    btnBg: "#F5A623",
    btnText: "#0B1224",
    heading: "Join as a Founding Expert",
    subtext: "Free to join. Set your own rates. Start earning.",
    showName: false,
  },
];

export default function GetStartedPreview() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = roles.find((r) => r.id === selectedId);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFBFC", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, height: 360, background: "linear-gradient(to bottom, #E8EDF5, transparent)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 26, fontWeight: 700, color: "#0B1224", letterSpacing: "-0.3px", textDecoration: "none" }}>
            <img src="https://ezora.ai/icon-512-dark.png" alt="EzoraAI" style={{ width: 36, height: 36 }} />
            <span>ezora<span style={{ color: "#00C9A7" }}>.ai</span></span>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: selectedId ? "2rem" : "2.6rem", color: "#0B1224", lineHeight: 1.15, marginBottom: 12, transition: "font-size 0.4s" }}>
            {selected ? selected.heading : "How will you use ezora.ai?"}
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "1.1rem" }}>
            {selected ? selected.subtext : "Choose your path to get started."}
          </p>
        </div>

        {/* Role Cards */}
        <div style={{ display: "grid", gridTemplateColumns: selectedId ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: selectedId ? 24 : 40, transition: "all 0.5s" }}>
          {roles.map((role) => {
            const isSelected = selectedId === role.id;
            const isHidden = selectedId && !isSelected;

            return (
              <button
                key={role.id}
                onClick={() => !selectedId && setSelectedId(role.id)}
                style={{
                  background: "#fff",
                  border: isHidden ? "0" : "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: isHidden ? 0 : 32,
                  cursor: selectedId ? "default" : "pointer",
                  textAlign: "center",
                  opacity: isHidden ? 0 : 1,
                  transform: isHidden ? "scale(0.95)" : "scale(1)",
                  height: isHidden ? 0 : "auto",
                  overflow: isHidden ? "hidden" : "visible",
                  transition: "all 0.5s ease",
                  boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                  display: "flex",
                  flexDirection: isSelected ? "row" : "column",
                  alignItems: "center",
                  gap: isSelected ? 16 : 0,
                }}
                onMouseEnter={(e) => {
                  if (!selectedId) {
                    e.currentTarget.style.borderColor = "rgba(100,116,139,0.4)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedId) {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {/* Icon with accent dot */}
                <div style={{ position: "relative", marginBottom: isSelected ? 0 : 16, flexShrink: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {role.icon}
                  </div>
                  <div style={{ position: "absolute", top: -4, right: -4, width: 12, height: 12, borderRadius: "50%", background: role.dotColor, border: "2px solid #fff" }} />
                </div>

                <div style={{ textAlign: isSelected ? "left" : "center" }}>
                  <h3 style={{ color: "#0B1224", fontWeight: 600, fontSize: 16, marginBottom: 6, lineHeight: 1.3 }}>
                    {role.label}
                  </h3>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                    {role.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Signup Form */}
        <div style={{
          maxHeight: selectedId ? 800 : 0,
          opacity: selectedId ? 1 : 0,
          transform: selectedId ? "translateY(0)" : "translateY(16px)",
          overflow: "hidden",
          transition: "all 0.5s ease",
        }}>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {selected?.showName && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#64748b", marginBottom: 6 }}>Your name</label>
                <input style={{ width: "100%", padding: "12px 16px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0B1224", outline: "none", fontFamily: "inherit" }} placeholder="How should experts address you?" />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#64748b", marginBottom: 6 }}>Email</label>
              <input style={{ width: "100%", padding: "12px 16px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0B1224", outline: "none", fontFamily: "inherit" }} placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#64748b", marginBottom: 6 }}>Password</label>
              <input type="password" style={{ width: "100%", padding: "12px 16px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0B1224", outline: "none", fontFamily: "inherit" }} placeholder="At least 8 characters" />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#64748b", marginBottom: 6 }}>Confirm password</label>
              <input type="password" style={{ width: "100%", padding: "12px 16px", background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, color: "#0B1224", outline: "none", fontFamily: "inherit" }} placeholder="Confirm your password" />
            </div>
            <button style={{
              width: "100%", padding: 16, border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              background: selected?.btnBg || "#0B1224",
              color: selected?.btnText || "#fff",
            }}>
              Create account
            </button>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 12 }}>
                Already have an account? <a href="#" style={{ color: "#00C9A7", textDecoration: "none" }}>Sign in</a>
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 12, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Choose a different role
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#64748b", fontSize: 12, marginTop: 20 }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Sign in link before selection */}
        {!selectedId && (
          <p style={{ textAlign: "center", color: "#94A3B8", fontSize: 14 }}>
            Already have an account? <a href="#" style={{ color: "#00C9A7", textDecoration: "none" }}>Sign in</a>
          </p>
        )}
      </div>
    </div>
  );
}
