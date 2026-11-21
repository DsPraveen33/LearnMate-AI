export type NavigationTab = 
  | 'dashboard'
  | 'pathway'
  | 'assessment'
  | 'courses'
  | 'mentor'
  | 'progress'
  | 'profile';

export interface StudentProfile {
  id?: number;
  name: string;
  title: string;
  email: string;
  avatar: string;
  track: string;
  currentStreak: number;
  longestStreak: number;
  streakFrozen: boolean;
  totalHours: number;
  completedCourses: number;
  skillsMastered: number;
  pathwayCompletion: number;
  level: number;
  xpPoints: number;
  xpToNextLevel: number;
  dailyGoalMinutes: number;
  weeklyGoalHours: number;
  preferredLearningStyle: string;
  careerGoal: string;
}

export interface LearningTask {
  id: string;
  dbId?: number;
  title: string;
  course: string;
  dueDate: string;
  durationMinutes: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'quiz' | 'reading' | 'coding' | 'project';
}

export interface SkillItem {
  id: string | number;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Proficient' | 'Advanced' | 'Expert';
  percentage: number;
  modulesCount: number;
  recentGain: number;
}

export interface Course {
  id: string | number;
  code?: string;
  title: string;
  description: string;
  category: 'Agentic AI' | 'Machine Learning' | 'System Design' | 'Cloud & MLOps' | 'Prompt Engineering' | 'Python AI' | string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  modulesCount: number;
  rating: number;
  reviewCount: number;
  enrolledStudents: number;
  progressPercentage?: number;
  isEnrolled: boolean;
  isFeatured?: boolean;
  tags: string[];
  gradient: string;
  syllabus: {
    week: number;
    title: string;
    topics: string[];
  }[];
}

export interface PathwayModule {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'lab' | 'quiz' | 'project';
  completed: boolean;
  inProgress?: boolean;
  locked?: boolean;
  description: string;
}

export interface PathwayStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'in_progress' | 'locked';
  completionPercentage: number;
  estimatedWeeks: number;
  modules: PathwayModule[];
}

export interface LearningPathway {
  id: string | number;
  dbId?: number;
  title: string;
  subtitle: string;
  description: string;
  totalStages: number;
  totalModules: number;
  completedModules: number;
  estimatedTotalHours: number;
  stages: PathwayStage[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  skill: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AssessmentHistoryItem {
  id: number;
  skillTrack: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  strengths: string[];
  improvements: string[];
  takenAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  codeSnippet?: string;
  actions?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'streak' | 'assignment' | 'achievement' | 'recommendation';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: 'streak' | 'speed' | 'mastery' | 'contribution';
}
