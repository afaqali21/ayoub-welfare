import { useState, useEffect } from "react";
import { ApiService } from "../lib/api-service";

const STATUS_CONFIG = {
  pending: { label: "Planned", color: "#f59e0b", bg: "#fef3c7", icon: "🕐" },
  in_progress: { label: "In Progress", color: "#3b82f6", bg: "#dbeafe", icon: "🔨" },
  completed: { label: "Completed", color: "#16a34a", bg: "#dcfce7", icon: "✅" },
};

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600,
      color: cfg.color, background: cfg.bg,
    }}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);
  if (!images || !images.length) return null;
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8, marginTop: 12 }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => setLightbox(img)}
            style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", border: "1px solid #e5e7eb", position: "relative" }}>
            <img src={img.url} alt={img.caption} style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "4px 6px", fontSize: 11, color: "#6b7280", background: "#f9fafb" }}>{img.caption}</div>
          </div>
        ))}
      </div>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth: "90vw", maxHeight: "75vh", borderRadius: 8, objectFit: "contain" }} />
          <p style={{ color: "#fff", marginTop: 12, fontSize: 14 }}>{lightbox.caption}</p>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: 20, right: 24, background: "none", border: "none",
            color: "#fff", fontSize: 28, cursor: "pointer",
          }}>✕</button>
        </div>
      )}
    </>
  );
}

function Timeline({ updates }) {
  if (!updates) return null;
  return (
    <div style={{ position: "relative", paddingLeft: 28, marginTop: 20 }}>
      <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "#e5e7eb" }} />
      {updates.map((u, i) => (
        <div key={u.id} style={{ position: "relative", marginBottom: 28 }}>
          <div style={{
            position: "absolute", left: -24, top: 3, width: 14, height: 14,
            borderRadius: "50%", background: i === updates.length - 1 ? "#16a34a" : "#3b82f6",
            border: "2px solid #fff", boxShadow: "0 0 0 2px #e5e7eb",
          }} />
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{u.title}</span>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{formatDate(u.date)}</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{u.body}</p>
            <ImageGrid images={u.images || []} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectDetail({ project, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 6, background: "none",
        border: "none", color: "#16a34a", fontSize: 14, cursor: "pointer", fontWeight: 600, padding: 0, marginBottom: 20,
      }}>← Search Another Project</button>

      {/* Header */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>Project Reference</p>
            <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 18, color: "#111827" }}>{project.id}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#111827" }}>{project.type}</h2>
        <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: 14 }}>📍 {project.location} &nbsp;•&nbsp; Started {formatDate(project.startDate)}</p>
        <p style={{ margin: 0, color: "#374151", lineHeight: 1.65, fontSize: 14 }}>{project.description}</p>

        {project.status === "completed" && (
          <div style={{
            marginTop: 16, padding: "14px 18px", background: "#f0fdf4",
            border: "1.5px solid #86efac", borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 28 }}>🎉</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: "#15803d", fontSize: 15 }}>Your Project is Complete!</p>
              <p style={{ margin: 0, fontSize: 13, color: "#166534" }}>Thank you for your generous donation. This project has been successfully completed and is now serving the community.</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Donated", value: `£${project.amount}` },
          { label: "Updates", value: project.updates ? project.updates.length : 0 },
          { label: "Photos", value: project.updates ? project.updates.reduce((a, u) => a + (u.images ? u.images.length : 0), 0) : 0 },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
            <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#16a34a" }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#111827" }}>Project Timeline</h3>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>Progress updates from our ground team</p>
        <Timeline updates={project.updates || []} />
      </div>
    </div>
  );
}

export default function DonorProjectTracker() {
  const [selected, setSelected] = useState(null);
  const [lookupId, setLookupId] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for ID in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam) {
      setLookupId(idParam);
      handleLookup(idParam);
    }
  }, []);

  async function handleLookup(idToUse = null) {
    setLookupError("");
    setSelected(null);
    setLoading(true);

    const idValue = (typeof idToUse === "string" ? idToUse : lookupId || "").trim();

    if (!idValue) {
      setLookupError("Please enter a valid project reference ID.");
      setLoading(false);
      return;
    }

    try {
      const project = await ApiService.getProject(idValue);
      // Ensure updates array exists
      project.updates = project.updates || [];
      setSelected(project);
    } catch (error) {
      setLookupError("No project found. Check your donation confirmation email for the correct reference.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "0 0 60px" }}>
      {/* Top Bar */}
      <div style={{ background: "#16a34a", color: "#fff", padding: "18px 24px", boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -.3 }}>🌿 Ayoub Welfare CIC</h1>
            <p style={{ margin: 0, fontSize: 13, opacity: .85 }}>Project Tracker — Your donation, your impact</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "30px auto", padding: "0 16px" }}>
        {loading && <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>Loading project details...</p>}

        {!selected && !loading && (
          <div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Track Your Project</h2>
              <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: 14 }}>Enter the reference number from your donation confirmation email.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14 }}
                  placeholder="e.g. AWC-2026-06-123"
                  value={lookupId} onChange={e => setLookupId(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLookup()} />
                <button onClick={() => handleLookup()} style={{
                  padding: "10px 20px", background: "#16a34a", color: "#fff",
                  border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}>Track</button>
              </div>
              {lookupError && <p style={{ margin: "10px 0 0", fontSize: 13, color: "#dc2626" }}>⚠️ {lookupError}</p>}
            </div>
          </div>
        )}

        {selected && !loading && (
          <>
            <ProjectDetail
              project={selected}
              onBack={() => setSelected(null)}
            />
            {/* Refresh button */}
            <button
              onClick={() => {
                if (selected) {
                  // Re-fetch the project data
                  ApiService.getProject(selected.id)
                    .then(p => {
                      p.updates = p.updates || [];
                      setSelected(p);
                    })
                    .catch(err => console.error('Refresh failed', err));
                }
              }}
              style={{
                marginTop: 12,
                padding: '6px 12px',
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >Refresh</button>
          </>
        )}
      </div>
    </div>
  );
}
