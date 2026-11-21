import type { PathwayModule } from '../types';

export interface RoadmapSavePayload {
  student_id: number;
  title: string;
  target_role: string;
  description: string | null;
  status: string | null;
  stages_json: string;
  completion_percentage: number | null;
}

export interface SavedRoadmap extends RoadmapSavePayload {
  id: number;
}

export interface RoadmapDraft {
  save_payload: RoadmapSavePayload;
  milestones: {
    sequence: number;
    title: string;
    description: string;
    estimated_weeks: number;
    skills: string[];
    modules: {
      title: string;
      description: string;
      duration_minutes: number;
      type: PathwayModule['type'];
    }[];
  }[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      let errorDetail = `HTTP ${res.status} ${res.statusText}`;
      try {
        const errorJson = await res.json();
        if (errorJson.detail) {
          errorDetail = typeof errorJson.detail === 'string'
            ? errorJson.detail
            : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Ignored
      }
      throw new ApiError(errorDetail, res.status);
    }
    if (res.status === 204) {
      return null as T;
    }
    return await res.json();
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      `Cannot connect to backend server at ${API_BASE_URL}. Ensure FastAPI is running.`,
      0
    );
  }
}

export const api = {
  // System Health
  async checkHealth(): Promise<{ status: string; database?: string }> {
    return request('/health');
  },

  // Student Profile
  async getStudent(id: number = 1): Promise<any> {
    return request(`/api/students/${id}`);
  },

  async updateStudent(id: number = 1, data: any): Promise<any> {
    return request(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Skills
  async getSkills(category?: string): Promise<any[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/api/skills${query}`);
  },

  // Courses
  async getCourses(category?: string, level?: string): Promise<any[]> {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (level && level !== 'All') params.append('level', level);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/api/courses${query}`);
  },

  async getCourse(id: number): Promise<any> {
    return request(`/api/courses/${id}`);
  },

  async createCourse(data: {
    code: string;
    title: string;
    description: string;
    category: string;
    level?: string;
    duration_hours?: number;
    rating?: number;
    instructor_name?: string;
    syllabus_json?: string;
    is_published?: boolean;
  }): Promise<any> {
    return request('/api/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async deleteCourse(id: number): Promise<void> {
    return request(`/api/courses/${id}`, {
      method: 'DELETE',
    });
  },

  // Roadmaps
  async getRoadmaps(studentId: number = 1, skip = 0): Promise<SavedRoadmap[]> {
    return request(`/api/roadmaps?student_id=${studentId}&skip=${skip}&limit=100`);
  },

  async generateRoadmap(data: {
    student_id: number;
    learning_goal: string;
    skills: string[];
  }): Promise<RoadmapDraft> {
    return request('/api/roadmaps/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async saveRoadmap(data: RoadmapSavePayload): Promise<SavedRoadmap> {
    return request('/api/roadmaps', { method: 'POST', body: JSON.stringify(data) });
  },

  async updateRoadmap(id: number, data: any): Promise<any> {
    return request(`/api/roadmaps/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async sendMentorMessage(data: {
    student_id: number;
    message: string;
    history: { role: 'user' | 'assistant'; content: string }[];
  }): Promise<{ reply: string }> {
    return request('/api/mentor/chat', { method: 'POST', body: JSON.stringify(data) });
  },

  // Assessments
  async getAssessments(studentId: number = 1): Promise<any[]> {
    return request(`/api/assessments?student_id=${studentId}`);
  },

  async submitAssessment(data: {
    student_id: number;
    skill_track: string;
    score: number;
    total_questions: number;
    correct_answers: number;
    strengths_json?: string;
    improvements_json?: string;
    answers_json?: string;
  }): Promise<any> {
    return request('/api/assessments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Progress / Tasks
  async getProgress(studentId: number = 1, courseId?: number): Promise<any[]> {
    const query = courseId
      ? `?student_id=${studentId}&course_id=${courseId}`
      : `?student_id=${studentId}`;
    return request(`/api/progress${query}`);
  },

  async createProgress(data: {
    student_id: number;
    course_id?: number | null;
    task_id?: string;
    task_title: string;
    status: string;
    progress_percentage?: number;
    time_spent_minutes?: number;
  }): Promise<any> {
    return request('/api/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateProgress(id: number, data: any): Promise<any> {
    return request(`/api/progress/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteProgress(id: number): Promise<void> {
    return request(`/api/progress/${id}`, {
      method: 'DELETE',
    });
  },
};
