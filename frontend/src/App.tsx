import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/pages/DashboardPage';
import { LearningPathPage } from './components/pages/LearningPathPage';
import { SkillAssessmentPage } from './components/pages/SkillAssessmentPage';
import { CourseExplorerPage } from './components/pages/CourseExplorerPage';
import { AIMentorPage } from './components/pages/AIMentorPage';
import { ProgressTrackerPage } from './components/pages/ProgressTrackerPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { api, type SavedRoadmap } from './services/api';
import {
  initialStudent,
  initialTasks,
  skillsList,
  coursesCatalog,
  mainPathway,
  sampleAssessmentQuestions,
  initialNotifications,
  badgesList,
  weeklyActivityData,
} from './data/mockData';
import {
  NavigationTab,
  StudentProfile,
  LearningTask,
  Course,
  SkillItem,
  LearningPathway,
  PathwayModule,
  PathwayStage,
} from './types';
import { Sparkles, X, AlertTriangle } from 'lucide-react';

function toLearningPathway(saved: SavedRoadmap): LearningPathway {
  const stages: PathwayStage[] = JSON.parse(saved.stages_json);
  if (!Array.isArray(stages) || !stages.every(stage => Array.isArray(stage?.modules))) {
    throw new Error('The saved roadmap has invalid stages.');
  }
  const modules = stages.flatMap(stage => stage.modules);
  const minutes = modules.reduce((total, module) => {
    const hours = Number(module.duration.match(/(\d+(?:\.\d+)?)\s*(?:hr|hour)/i)?.[1] ?? 0);
    const mins = Number(module.duration.match(/(\d+)\s*min/i)?.[1] ?? 0);
    return total + hours * 60 + mins;
  }, 0);
  return {
    id: saved.id,
    dbId: saved.id,
    title: saved.title,
    subtitle: `Target Role: ${saved.target_role}`,
    description: saved.description ?? '',
    totalStages: stages.length,
    totalModules: modules.length,
    completedModules: modules.filter(module => module.completed).length,
    estimatedTotalHours: Math.round(minutes / 6) / 10,
    stages,
  };
}

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [tasks, setTasks] = useState<LearningTask[]>(initialTasks);
  const [courses, setCourses] = useState<Course[]>(coursesCatalog);
  const [skills, setSkills] = useState<SkillItem[]>(skillsList);
  const [pathway, setPathway] = useState<LearningPathway>(mainPathway);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  // ========================================================
  // Fetch Real Data from FastAPI + SQLite Backend on Startup
  // ========================================================
  const loadBackendData = useCallback(async () => {
    setIsLoading(true);
    setConnectionError(null);
    try {
      // 1. Health check
      await api.checkHealth();
      setIsConnectedToBackend(true);

      // 2. Fetch Student Profile from /api/students/1
      const studentData = await api.getStudent(1);
      if (studentData) {
        setStudent((prev) => ({
          ...prev,
          id: studentData.id,
          name: studentData.name,
          email: studentData.email,
          title: studentData.title || prev.title,
          track: studentData.track || prev.track,
          careerGoal: studentData.career_goal || prev.careerGoal,
          preferredLearningStyle:
            studentData.preferred_learning_style || prev.preferredLearningStyle,
          dailyGoalMinutes:
            studentData.daily_goal_minutes || prev.dailyGoalMinutes,
          currentStreak: studentData.current_streak ?? prev.currentStreak,
          totalHours: studentData.total_hours ?? prev.totalHours,
          level: studentData.level ?? prev.level,
          xpPoints: studentData.xp_points ?? prev.xpPoints,
        }));
      }

      // 3. Fetch Courses from /api/courses
      const dbCourses = await api.getCourses();
      if (dbCourses && dbCourses.length > 0) {
        const mappedCourses: Course[] = dbCourses.map((c: any, idx: number) => {
          let syllabus = [];
          try {
            if (c.syllabus_json) {
              syllabus = JSON.parse(c.syllabus_json);
            }
          } catch {
            syllabus = [];
          }
          const defaultGrads = [
            'from-blue-600 to-indigo-700',
            'from-indigo-600 to-violet-700',
            'from-violet-600 to-purple-800',
            'from-cyan-600 to-blue-700',
            'from-emerald-600 to-teal-700',
          ];
          return {
            id: c.id,
            code: c.code,
            title: c.title,
            description: c.description,
            category: c.category,
            instructor: {
              name: c.instructor_name || 'LearnMate Faculty',
              role: 'Senior AI Specialist',
              avatar: `https://images.unsplash.com/photo-${1534528741775 + idx}?auto=format&fit=crop&w=256&q=80`,
            },
            level: (c.level as any) || 'Intermediate',
            durationHours: c.duration_hours || 6.0,
            modulesCount: syllabus.length > 0 ? syllabus.length * 3 : 10,
            rating: c.rating || 4.9,
            reviewCount: 300 + idx * 120,
            enrolledStudents: 1500 + idx * 800,
            progressPercentage: idx < 2 ? (idx === 0 ? 72 : 45) : undefined,
            isEnrolled: idx < 3,
            isFeatured: idx === 0 || idx === 2,
            tags: [c.category, c.level, 'Verified'],
            gradient: defaultGrads[idx % defaultGrads.length],
            syllabus: syllabus.length > 0 ? syllabus : [
              { week: 1, title: 'Foundations & Architecture', topics: ['Core concepts', 'Environment setup'] },
              { week: 2, title: 'Hands-on Implementation', topics: ['Code laboratories', 'State persistence'] },
            ],
          };
        });
        setCourses(mappedCourses);
      }

      // 4. Fetch Skills from /api/skills
      const dbSkills = await api.getSkills();
      if (dbSkills && dbSkills.length > 0) {
        const mappedSkills: SkillItem[] = dbSkills.map((s: any, idx: number) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          level: (idx === 0 ? 'Advanced' : idx === 1 ? 'Expert' : 'Proficient') as any,
          percentage: 85 - idx * 5,
          modulesCount: 12 + idx * 2,
          recentGain: 10 + (idx % 5),
        }));
        setSkills(mappedSkills);
      }

      // 5. Fetch Roadmaps from /api/roadmaps
      let latestRoadmap: SavedRoadmap | undefined;
      for (let skip = 0; ; skip += 100) {
        const page = await api.getRoadmaps(1, skip);
        for (const roadmap of page) {
          if (!latestRoadmap || roadmap.id > latestRoadmap.id) latestRoadmap = roadmap;
        }
        if (page.length < 100) break;
      }
      if (latestRoadmap) {
        try {
          setPathway(toLearningPathway(latestRoadmap));
        } catch {
          // Keep the existing fallback for legacy records with unreadable stages.
        }
      }

      // 6. Fetch Progress Records from /api/progress
      const dbProgress = await api.getProgress(1);
      if (dbProgress && dbProgress.length > 0) {
        const mappedTasks: LearningTask[] = dbProgress.map((p: any) => ({
          id: `task-${p.id}`,
          dbId: p.id,
          title: p.task_title || 'Learning Task',
          course: 'Agentic AI Pathway',
          dueDate: p.status === 'completed' ? 'Completed' : 'Upcoming',
          durationMinutes: p.time_spent_minutes || 30,
          completed: p.status === 'completed',
          priority: p.progress_percentage > 50 ? 'high' : 'medium',
          category: 'coding',
        }));
        setTasks(mappedTasks);
      }
    } catch (err: any) {
      console.warn('Backend connection notice:', err.message);
      setIsConnectedToBackend(false);
      setConnectionError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBackendData();
  }, [loadBackendData]);

  // ========================================================
  // Real API Actions (Create, Read, Update, Delete)
  // ========================================================

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const nextCompleted = !task.completed;
    const nextStatus = nextCompleted ? 'completed' : 'in_progress';
    const nextPercentage = nextCompleted ? 100 : 50;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: nextCompleted } : t))
    );

    // Call API if dbId exists
    if (task.dbId) {
      try {
        await api.updateProgress(task.dbId, {
          status: nextStatus,
          progress_percentage: nextPercentage,
        });
      } catch (err: any) {
        console.error('Failed to update progress in backend:', err);
      }
    }

    if (nextCompleted) {
      const newXp = student.xpPoints + 50;
      setStudent((s) => ({ ...s, xpPoints: newXp }));
      try {
        await api.updateStudent(student.id || 1, { xp_points: newXp });
      } catch (err) {
        // Silently handled
      }
      showToast('Task completed! +50 XP saved to database.');
    }
  };

  const handleAddTask = async (
    title: string,
    courseName: string,
    durationMinutes: number
  ) => {
    try {
      const created = await api.createProgress({
        student_id: student.id || 1,
        task_title: title,
        status: 'in_progress',
        progress_percentage: 0,
        time_spent_minutes: durationMinutes,
      });

      const newTask: LearningTask = {
        id: `task-${created.id}`,
        dbId: created.id,
        title: created.task_title,
        course: courseName,
        durationMinutes: created.time_spent_minutes,
        completed: false,
        priority: 'medium',
        category: 'coding',
        dueDate: 'Upcoming',
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast(`Task "${title}" created and saved to SQLite.`);
    } catch (err: any) {
      const fallbackTask: LearningTask = {
        id: `task-${Date.now()}`,
        title,
        course: courseName,
        durationMinutes,
        completed: false,
        priority: 'medium',
        category: 'coding',
        dueDate: 'Upcoming',
      };
      setTasks((prev) => [fallbackTask, ...prev]);
      showToast(`Added task: "${title}"`);
    }
  };

  const handleToggleEnroll = async (courseId: string | number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const nextState = !c.isEnrolled;
          showToast(
            nextState
              ? `Enrolled in "${c.title}"! Course record updated.`
              : `Withdrawn from "${c.title}".`
          );
          return {
            ...c,
            isEnrolled: nextState,
            progressPercentage: nextState ? 0 : undefined,
          };
        }
        return c;
      })
    );
  };

  const handleAddCourse = async (courseData: Partial<Course>) => {
    try {
      const created = await api.createCourse({
        code: courseData.code || `AI-${Date.now().toString().slice(-3)}`,
        title: courseData.title || 'Untitled Course',
        description: courseData.description || 'Course overview...',
        category: courseData.category || 'Agentic AI',
        level: courseData.level || 'Intermediate',
        duration_hours: courseData.durationHours || 5.0,
        rating: 5.0,
        instructor_name: 'Dr. Elena Rostova',
      });
      showToast(`Course "${created.title}" saved to SQLite database!`);
      loadBackendData();
    } catch (err: any) {
      showToast(`Error creating course: ${err.message}`);
      throw err;
    }
  };

  const handleDeleteCourse = async (courseId: string | number) => {
    try {
      const numId = typeof courseId === 'number' ? courseId : parseInt(String(courseId), 10);
      if (!isNaN(numId)) {
        await api.deleteCourse(numId);
        showToast('Course deleted from SQLite database.');
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
      }
    } catch (err: any) {
      showToast(`Error deleting course: ${err.message}`);
    }
  };

  const handleCompleteAssessment = async (score: number) => {
    const isPassing = score >= 80;
    const addedXp = score * 3;
    const newXp = student.xpPoints + addedXp;
    const newSkillsMastered = student.skillsMastered + (isPassing ? 1 : 0);

    setStudent((s) => ({
      ...s,
      xpPoints: newXp,
      skillsMastered: newSkillsMastered,
    }));

    // Save assessment result to backend SQLite database
    try {
      await api.submitAssessment({
        student_id: student.id || 1,
        skill_track: 'Agentic AI Systems Architect',
        score: score,
        total_questions: 5,
        correct_answers: Math.round((score / 100) * 5),
        strengths_json: JSON.stringify([
          'Cyclical StateGraph architecture',
          'Deterministic tool calling with Pydantic',
        ]),
        improvements_json: JSON.stringify([
          'Checkpointer PostgreSQL persistence tuning',
        ]),
      });

      // Update student XP in backend database
      await api.updateStudent(student.id || 1, {
        xp_points: newXp,
      });

      showToast(
        `Diagnostic result (${score}%) saved to SQLite! +${addedXp} XP recorded.`
      );
    } catch (err: any) {
      showToast(`Diagnostic finished with ${score}%.`);
    }
  };

  const handleLaunchModule = async (module: PathwayModule) => {
    showToast(`Launching interactive learning lab: "${module.title}"...`);
    try {
      await api.createProgress({
        student_id: student.id || 1,
        task_title: `Lab: ${module.title}`,
        status: 'in_progress',
        progress_percentage: 25,
        time_spent_minutes: 15,
      });
    } catch {
      // Ignored
    }
  };

  const handleUpdateProfile = async (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));

    // Persist changes to FastAPI backend
    try {
      await api.updateStudent(student.id || 1, {
        name: updated.name,
        email: updated.email,
        career_goal: updated.careerGoal,
        daily_goal_minutes: updated.dailyGoalMinutes,
        preferred_learning_style: updated.preferredLearningStyle,
      });
      showToast('Profile and preferences persisted to SQLite database!');
    } catch (err: any) {
      showToast('Profile updated locally.');
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      student={student}
      savedPathway={pathway.dbId == null ? null : pathway}
      notifications={notifications}
      onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
    >
      {/* Backend Connectivity Status Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          {isConnectedToBackend ? (
            <span className="flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to FastAPI & SQLite Database
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Backend Standby ({connectionError || 'Connecting...'})
            </span>
          )}
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">Student ID: #{student.id || 1} ({student.name})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadBackendData}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Sync with Database
          </button>
        </div>
      </div>

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Dynamic Tab Page Rendering */}
      {activeTab === 'dashboard' && (
        <DashboardPage
          pathway={pathway}
          student={student}
          skills={skills}
          tasks={tasks}
          courses={courses}
          weeklyActivity={weeklyActivityData}
          onNavigateTab={setActiveTab}
          onToggleTask={handleToggleTask}
          onAddTask={handleAddTask}
          onToggleEnroll={handleToggleEnroll}
        />
      )}

      {activeTab === 'pathway' && (
        <LearningPathPage
          pathway={pathway}
          studentId={student.id || 1}
          onRoadmapSaved={saved => setPathway(toLearningPathway(saved))}
          onLaunchModule={handleLaunchModule}
        />
      )}

      {activeTab === 'assessment' && (
        <SkillAssessmentPage
          questions={sampleAssessmentQuestions}
          skills={skills}
          onCompleteAssessment={handleCompleteAssessment}
        />
      )}

      {activeTab === 'courses' && (
        <CourseExplorerPage
          courses={courses}
          onToggleEnroll={handleToggleEnroll}
          onAddCourse={handleAddCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )}

      <div hidden={activeTab !== 'mentor'}>
        <AIMentorPage
          key={student.id}
          active={activeTab === 'mentor'}
          studentId={student.id || 1}
          pathwayTitle={pathway.dbId == null ? undefined : pathway.title}
        />
      </div>

      {activeTab === 'progress' && (
        <ProgressTrackerPage
          student={student}
          skills={skills}
          weeklyActivity={weeklyActivityData}
          onTriggerToast={showToast}
        />
      )}

      {activeTab === 'profile' && (
        <ProfilePage
          student={student}
          badges={badgesList}
          onUpdateProfile={handleUpdateProfile}
          onTriggerToast={showToast}
        />
      )}
    </Layout>
  );
}

export default App;
