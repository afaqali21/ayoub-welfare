// API service for backend communication

// In production, always use same-origin /api — never localhost (common Vercel misconfig).
function resolveApiBase(): string {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (import.meta.env.PROD) {
    if (!envUrl || envUrl.includes('localhost')) return '/api';
    return envUrl;
  }
  return envUrl || '/api';
}

const API_BASE = resolveApiBase();

async function apiFetch(input: string, init?: RequestInit) {
  try {
    return await fetch(input, init);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Cannot reach the server. Start the backend with "npm run dev:all" or run "npm start" in the backend folder.'
      );
    }
    throw error;
  }
}

export class ApiService {
  // ─── Auth ───
  static async loginAdmin(username: string, password: string) {
    const response = await apiFetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  }

  // ─── Projects ───
  static async createProject(data: {
    donorName: string;
    donorEmail: string;
    type: string;
    location?: string;
    amount: number;
    currency?: string;
    description?: string;
  }) {
    const response = await apiFetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create project');
    }
    return response.json();
  }

  static async getAllProjects(token?: string) {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await apiFetch(`${API_BASE}/projects`, { headers });
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  static async getProject(id: string) {
    const response = await apiFetch(`${API_BASE}/projects/${id}`);
    if (!response.ok) throw new Error('Project not found');
    return response.json();
  }

  static async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiFetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Image upload failed');
    }
    const json = await response.json();
    // Ensure the returned URL is absolute for the frontend
    const fullUrl = json.url.startsWith('http') ? json.url : `${API_BASE}${json.url}`;
    return { url: fullUrl };
  }

  static async addUpdate(projectId: string, data: { title: string; body: string; imageUrl?: string; imageCaption?: string; }, token: string) {
    const response = await apiFetch(`${API_BASE}/projects/${projectId}/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add update');
    }
    return response.json();
  }

  static async updateProjectStatus(
    projectId: string,
    status: 'pending' | 'in_progress' | 'completed',
    token: string
  ) {
    const response = await apiFetch(`${API_BASE}/projects/${projectId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update status');
    }
    return response.json();
  }

  static async deleteProject(projectId: string, token: string) {
    const response = await apiFetch(`${API_BASE}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete project');
    }
    return response.json();
  }

  static async activateProject(projectId: string, token: string) {
    const response = await apiFetch(`${API_BASE}/projects/${projectId}/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to activate project');
    }
    return response.json();
  }

  // ─── Helpers ───
  static getToken() {
    return localStorage.getItem('adminToken');
  }

  static setToken(token: string) {
    localStorage.setItem('adminToken', token);
  }

  static clearToken() {
    localStorage.removeItem('adminToken');
  }

  static isAdmin() {
    return !!this.getToken();
  }
}
