import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { WelcomeBanner } from '../dashboard/WelcomeBanner';
import { StatCard } from '../dashboard/StatCard';
import { ActivityChart } from '../dashboard/ActivityChart';
import { SkillProgress } from '../dashboard/SkillProgress';
import { TaskList } from '../dashboard/TaskList';
import { CourseCard } from '../dashboard/CourseCard';
import { Modal } from '../common/Modal';
import {
  StudentProfile,
  Course,
  SkillItem,
  LearningTask,
  LearningPathway,
  NavigationTab,
} from '../../types';

interface DashboardPageProps {
  student: StudentProfile;
  pathway: LearningPathway;
  skills: SkillItem[];
  tasks: LearningTask[];
  courses: Course[];
  weeklyActivity: { day: string; hours: number; completedModules: number }[];
  onNavigateTab: (tab: NavigationTab) => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, course: string, duration: number) => void;
  onToggleEnroll: (courseId: string | number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  student,
  pathway,
  skills,
  tasks,
  courses,
  weeklyActivity,
  onNavigateTab,
  onToggleTask,
  onAddTask,
  onToggleEnroll,
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const activeStage = pathway.stages.find(stage => stage.status === 'in_progress');
  const nextModule = activeStage?.modules.find(module => !module.completed && !module.locked);
  const completion = pathway.totalModules
    ? Math.round(100 * pathway.completedModules / pathway.totalModules)
    : 0;
  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const recommendedCourses = courses.filter((c) => !c.isEnrolled || c.isFeatured);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome Banner */}
      <WelcomeBanner
        student={student}
        savedPathway={pathway.dbId == null ? null : { title: pathway.title, completion, nextModule: nextModule?.title }}
        onResumeLearning={() => onNavigateTab('pathway')}
        onOpenAssessment={() => onNavigateTab('assessment')}
      />

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Pathways"
          value={enrolledCourses.length}
          subtitle="4 courses currently in progress"
          trend={{ value: '+1 this month', isPositive: true }}
          icon={BookOpen}
          colorScheme="blue"
        />
        <StatCard
          title="Study Time Logged"
          value={`${student.totalHours} hrs`}
          subtitle="Total interactive learning time"
          trend={{ value: '+14% vs last week', isPositive: true }}
          icon={Clock}
          colorScheme="indigo"
        />
        <StatCard
          title="Skills Mastered"
          value={student.skillsMastered}
          subtitle="16 verified by diagnostic labs"
          trend={{ value: '+3 newly added', isPositive: true }}
          icon={Award}
          colorScheme="violet"
        />
        <StatCard
          title="Pathway Completion"
          value={`${completion}%`}
          subtitle={pathway.title}
          icon={TrendingUp}
          colorScheme="emerald"
        />
      </div>

      {/* 3. Main Split Grid (Activity Chart + Skills & Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Activity Chart & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityChart data={weeklyActivity} />
          <TaskList
            tasks={tasks}
            onToggleTask={onToggleTask}
            onAddTask={onAddTask}
          />
        </div>

        {/* Right Column (1 span): Skills matrix & Next Up Spotlight */}
        <div className="space-y-6">
          <SkillProgress
            skills={skills}
            onViewAllSkills={() => onNavigateTab('assessment')}
          />

          {/* Spotlight Card: Next Learning Module */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-white" />
            </div>

            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Next In Pathway</span>
            </div>

            <h4 className="text-lg font-bold text-white leading-snug">
              {nextModule?.title ?? pathway.title}
            </h4>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              {nextModule?.description ?? pathway.description}
            </p>

            <div className="mt-4 flex items-center justify-between text-xs text-indigo-200">
              <span>{nextModule ? `Estimated: ${nextModule.duration}` : pathway.subtitle}</span>
              <span className="bg-indigo-800/80 px-2.5 py-1 rounded-lg text-white font-medium border border-indigo-700/60">
                {activeStage ? `Stage ${activeStage.stageNumber}` : `${pathway.totalStages} stages`}
              </span>
            </div>

            <button
              onClick={() => onNavigateTab('pathway')}
              className="mt-5 w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Open Learning Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Recommended Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900">Recommended Courses for Alex</h3>
            <p className="text-xs text-slate-500">
              Curated by LearnMate AI based on your diagnostic results and learning speed
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('courses')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All 24 Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.slice(0, 3).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={(c) => setSelectedCourse(c)}
              onToggleEnroll={onToggleEnroll}
            />
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={selectedCourse.title}
          subtitle={`Taught by ${selectedCourse.instructor.name} (${selectedCourse.instructor.role})`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <div>
                <span className="text-[11px] text-slate-400 block">Level</span>
                <span className="text-xs font-bold text-slate-800">{selectedCourse.level}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Duration</span>
                <span className="text-xs font-bold text-slate-800">{selectedCourse.durationHours} Hours</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Student Rating</span>
                <span className="text-xs font-bold text-amber-600">★ {selectedCourse.rating} ({selectedCourse.reviewCount})</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Course Syllabus & Learning Outcomes
              </h4>
              <div className="space-y-2">
                {selectedCourse.syllabus.map((s) => (
                  <div key={s.week} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                    <span className="font-bold text-indigo-700 block">Week {s.week}: {s.title}</span>
                    <ul className="mt-1 list-disc list-inside text-slate-600 space-y-0.5">
                      {s.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onToggleEnroll(selectedCourse.id);
                  setSelectedCourse(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-xs"
              >
                {selectedCourse.isEnrolled ? 'Open Course Player' : 'Enroll Free in Course'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
