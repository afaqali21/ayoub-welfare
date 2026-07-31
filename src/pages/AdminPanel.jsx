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

function ProjectCard({ project, onClick, onMarkComplete }) {
  const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.pending;
  return (
    <div onClick={() => onClick(project)} style={{
      border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, cursor: "pointer",
      background: "#fff", transition: "box-shadow .15s, transform .15s",
      boxShadow: "0 1px 4px rgba(0,0,0,.06)", position: "relative"
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.06)"; e.currentTarget.style.transform = ""; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827", paddingRight: 100 }}>{project.type}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p style={{ margin: "0 0 10px", fontSize: 13, color: "#6b7280" }}>📍 {project.location}</p>
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{project.description}</p>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: 10, paddingBottom: project.status !== "completed" ? 35 : 0 }}>
        <div>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>Ref: {project.id}</span>
          <br />
          <span style={{ fontSize: 11, color: "#6b7280" }}>Donor: {project.donorName} ({project.donorEmail})</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>£{project.amount.toLocaleString()}</span>
      </div>

      {project.status !== "completed" && (
        <button onClick={(e) => { e.stopPropagation(); onMarkComplete(project.id); }} style={{
          position: "absolute", bottom: 14, right: 16,
          padding: "6px 14px", fontSize: 12, fontWeight: 600,
          background: "#f0fdf4", color: "#16a34a", border: "1px solid #86efac",
          borderRadius: 6, cursor: "pointer",
        }}>Mark Complete ✅</button>
      )}
    </div>
  );
}

function ProjectDetail({ project, onBack, onAddUpdate, onStatusChange, onDelete, onUnauthorized }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: "", body: "", file: null, imageCaption: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete project ${project.id}? This will also delete all updates and photos associated with it.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const token = ApiService.getToken();
      await ApiService.deleteProject(project.id, token);
      onDelete(project.id);
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project: " + (error.message || "Server error"));
      if (error.message && error.message.toLowerCase().includes("unauthorized")) {
        onUnauthorized?.();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleSubmitUpdate() {
    if (!newUpdate.title || !newUpdate.body) return;
    
    setIsSubmitting(true);
    setUpdateError("");

      try {
        let imageUrl = '';
        if (newUpdate.file) {
          const uploadRes = await ApiService.uploadImage(newUpdate.file);
          imageUrl = uploadRes.url;
        }
        const token = ApiService.getToken();
        const update = await ApiService.addUpdate(
          project.id,
          {
            title: newUpdate.title,
            body: newUpdate.body,
            imageUrl,
            imageCaption: newUpdate.imageCaption,
          },
          token
        );
        onAddUpdate(project.id, update);
        setNewUpdate({ title: "", body: "", file: null, imageCaption: "" });
        setShowUpdateForm(false);
      } catch (error) {
        setUpdateError(error.message || "Failed to add update");
        if (error.message && error.message.toLowerCase().includes("unauthorized")) {
          onUnauthorized?.();
        }
      } finally {
        setIsSubmitting(false);
      }
  }

  async function handleUpdateStatus(newStatus) {
    setIsStatusLoading(true);
    try {
      const token = ApiService.getToken();
      // Update the project status only
      await ApiService.updateProjectStatus(project.id, newStatus, token);
      onStatusChange(project.id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status: " + (error.message || "Server error"));
      if (error.message && error.message.toLowerCase().includes("unauthorized")) {
        onUnauthorized?.();
      }
    } finally {
      setIsStatusLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  // Removed unused image state for status updates

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button onClick={onBack} style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "none",
          border: "none", color: "#16a34a", fontSize: 14, cursor: "pointer", fontWeight: 600, padding: 0,
        }}>← Back to Admin Dashboard</button>
        <button onClick={handleDelete} disabled={isDeleting} style={{
          display: "inline-flex", alignItems: "center", gap: 6, background: "none",
          border: "none", color: "#dc2626", fontSize: 14, cursor: "pointer", fontWeight: 600, padding: 0,
          opacity: isDeleting ? 0.5 : 1
        }}>
          🗑️ {isDeleting ? "Deleting..." : "Delete Project"}
        </button>
      </div>

      {/* Header Card */}
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
        <p style={{ margin: "0 0 8px", color: "#374151", lineHeight: 1.65, fontSize: 14 }}>{project.description}</p>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
          <strong>Donor:</strong> {project.donorName} &nbsp;|&nbsp; <strong>Email:</strong> {project.donorEmail}
        </p>

        {project.status === "completed" && (
          <div style={{
            marginTop: 16, padding: "14px 18px", background: "#f0fdf4",
            border: "1.5px solid #86efac", borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 28 }}>🎉</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: "#15803d", fontSize: 15 }}>Project is Marked Complete!</p>
              <p style={{ margin: 0, fontSize: 13, color: "#166534" }}>The donor has been notified via email that their project is complete.</p>
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
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>Timeline of status updates</p>
        <Timeline updates={project.updates || []} />
      </div>

      {/* Admin: Add Update Form */}
      <div style={{ background: "#fff", border: "1px dashed #d1d5db", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showUpdateForm ? 16 : 0 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#374151" }}>➕ Add Progress Update</h3>
          <button onClick={() => setShowUpdateForm(!showUpdateForm)} style={{
            padding: "7px 16px", background: showUpdateForm ? "#f3f4f6" : "#16a34a",
            color: showUpdateForm ? "#374151" : "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>{showUpdateForm ? "Cancel" : "Add Update"}</button>
        </div>
        {showUpdateForm && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {updateError && (
              <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, color: "#991b1b", fontSize: 13 }}>
                ❌ {updateError}
              </div>
            )}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Update Title *</label>
              <input style={inputStyle} placeholder="e.g. Construction Phase Complete"
                value={newUpdate.title} onChange={e => setNewUpdate(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Details *</label>
              <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder="Describe the progress made..."
                value={newUpdate.body} onChange={e => setNewUpdate(p => ({ ...p, body: e.target.value }))} />
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Photo (optional)</label>
            <input type="file" accept="image/*" style={inputStyle} onChange={e => setNewUpdate(p => ({ ...p, file: e.target.files[0] }))} />
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginTop: 8, marginBottom: 4 }}>Image Caption</label>
            <input style={inputStyle} placeholder="e.g. Photo of completed work" value={newUpdate.imageCaption} onChange={e => setNewUpdate(p => ({ ...p, imageCaption: e.target.value }))} />
            <button onClick={handleSubmitUpdate} disabled={isSubmitting} style={{
              padding: "10px 20px", background: "#16a34a", color: "#fff",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start",
              opacity: isSubmitting ? 0.6 : 1,
            }}>{isSubmitting ? "Posting..." : "Post Update"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // Check login on tab load / mount
  useEffect(() => {
    const token = ApiService.getToken();
    if (token) {
      setIsAdmin(true);
      fetchProjects(token);
    } else {
      setIsAdmin(false);
    }
  }, []);

  async function fetchProjects(token) {
    setLoading(true);
    try {
      const allProjects = await ApiService.getAllProjects(token);
      setProjects(allProjects);
    } catch (err) {
      console.error("Failed to load projects:", err);
      if (err.message && err.message.toLowerCase().includes("unauthorized")) {
        ApiService.clearToken();
        setIsAdmin(false);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAdminLogin() {
    setAdminError("");
    setLoading(true);

    try {
      const data = await ApiService.loginAdmin(adminUsername, adminPassword);
      ApiService.setToken(data.token);
      setIsAdmin(true);
      setAdminUsername("");
      setAdminPassword("");
      fetchProjects(data.token);
    } catch (error) {
      setAdminError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function handleAdminLogout() {
    ApiService.clearToken();
    setIsAdmin(false);
    setSelected(null);
    setAdminUsername("");
    setAdminPassword("");
    setProjects([]);
  }

  function handleAddUpdate(projectId, update) {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, updates: [...(p.updates || []), update] } : p
    ));
    setSelected(prev => prev ? { ...prev, updates: [...(prev.updates || []), update] } : prev);
  }

  function handleStatusChange(projectId, newStatus) {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
    setSelected(prev => prev ? { ...prev, status: newStatus } : prev);
  }

  async function handleMarkComplete(projectId) {
    try {
      const token = ApiService.getToken();
      await ApiService.updateProjectStatus(projectId, "completed", token);
      handleStatusChange(projectId, "completed");
    } catch (error) {
      console.error("Failed to mark project as complete:", error);
      alert("Error: " + (error.message || "Failed to update status on server"));
      if (error.message && error.message.toLowerCase().includes("unauthorized")) {
        handleAdminLogout();
      }
    }
  }

  function handleDeleteProject(projectId) {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setSelected(null);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "0 0 60px" }}>
      {/* Top Bar */}
      <div style={{ background: "#111827", color: "#fff", padding: "18px 24px", boxShadow: "0 2px 8px rgba(0,0,0,.15)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -.3 }}>🌿 Ayoub Welfare Admin Portal</h1>
            <p style={{ margin: 0, fontSize: 13, opacity: .85 }}>Manage projects and updates</p>
          </div>
          {isAdmin && (
            <button onClick={handleAdminLogout} style={{
              background: "#b91c1c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700
            }}>Logout</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "30px auto", padding: "0 16px" }}>
        {!isAdmin ? (
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>Admin Login</h2>
            <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: 14 }}>Enter credentials to manage projects</p>
            
            {adminError && (
              <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, marginBottom: 16, color: "#991b1b", fontSize: 13 }}>
                ❌ {adminError}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Username</label>
                <input 
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  placeholder="admin"
                  value={adminUsername}
                  onChange={e => setAdminUsername(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Password</label>
                <input 
                  type="password"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
                />
              </div>
              <button 
                onClick={handleAdminLogin}
                disabled={loading}
                style={{
                  padding: "10px 20px", background: "#16a34a", color: "#fff",
                  border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: 12, color: "#9ca3af" }}></p>
          </div>
        ) : (
          <>
            {!selected ? (
              <>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700 }}>Admin Dashboard</h2>
                  <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Click any project to post updates, upload photos, or change status.</p>
                </div>

                {loading && <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>Loading projects...</p>}
                
                {!loading && projects.length === 0 && (
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 40, textAlign: "center" }}>
                    <p style={{ margin: 0, fontSize: 15, color: "#6b7280" }}>No donation projects registered yet.</p>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {projects.map(p => (
                    <ProjectCard key={p.id} project={p} onClick={setSelected} onMarkComplete={handleMarkComplete} />
                  ))}
                </div>
              </>
            ) : (
              <ProjectDetail
                project={selected}
                onBack={() => setSelected(null)}
                onAddUpdate={handleAddUpdate}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteProject}
                onUnauthorized={handleAdminLogout}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
