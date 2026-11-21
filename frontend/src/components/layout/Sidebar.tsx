import React from 'react';
import {
  LayoutDashboard,
  Route,
  Award,
  Compass,
  Bot,
  BarChart3,
  User,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { LearningPathway, NavigationTab, StudentProfile } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  student: StudentProfile;
  savedPathway: LearningPathway | null;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  student,
  savedPathway,
  isMobileOpen,
  onCloseMobile,
}) => {
  const activeStage = savedPathway?.stages.find(stage => stage.status === 'in_progress');
  const progress = savedPathway?.totalModules
    ? Math.round((savedPathway.completedModules / savedPathway.totalModules) * 100)
    : 0;
  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      tab: 'dashboard',
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      tab: 'pathway',
      label: 'My Learning Path',
      icon: <Route className="w-5 h-5" />,
      badge: savedPathway ? `${progress}%` : undefined,
    },
    {
      tab: 'assessment',
      label: 'Skill Assessment',
      icon: <Award className="w-5 h-5" />,
    },
    {
      tab: 'courses',
      label: 'Course Explorer',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      tab: 'mentor',
      label: 'AI Mentor',
      icon: <Bot className="w-5 h-5" />,
      badge: 'Live',
    },
    {
      tab: 'progress',
      label: 'Progress Tracker',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      tab: 'profile',
      label: 'Profile & Settings',
      icon: <User className="w-5 h-5" />,
    },
  ];

  const handleItemClick = (tab: NavigationTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200/80 z-40 flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">LearnMate</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Agentic Learning Pathways</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleItemClick(item.tab)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Live'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Pathway Helper Widget */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-violet-50/80 border border-indigo-100/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Active Pathway
            </span>
            {savedPathway && <span className="text-xs font-semibold text-indigo-700">{progress}%</span>}
          </div>

          {savedPathway ? (
            <>
              <p className="text-xs font-semibold text-slate-800">{savedPathway.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activeStage ? `Stage ${activeStage.stageNumber}: ${activeStage.title}` : `${savedPathway.completedModules} of ${savedPathway.totalModules} modules completed`}
              </p>
              <progress className="block h-1.5 w-full mt-2.5 accent-indigo-600" value={progress} max={100} aria-label="Saved pathway progress" />
            </>
          ) : (
            <p className="text-xs text-slate-600">No saved roadmap yet.</p>
          )}

          <button
            onClick={() => handleItemClick('pathway')}
            className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-indigo-200/80 rounded-xl text-xs font-semibold text-indigo-700 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>{savedPathway ? 'Resume Next Step' : 'Open Learning Path'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            onClick={() => handleItemClick('profile')}
            className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{student.name}</p>
              <p className="text-[11px] text-slate-400 truncate">Level {student.level} Scholar</p>
            </div>
          </button>
          <div className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60">
            🔥 {student.currentStreak}d
          </div>
        </div>
      </aside>
    </>
  );
};
