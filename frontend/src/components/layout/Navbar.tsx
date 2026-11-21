import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Flame,
  ChevronDown,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';
import { NavigationTab, StudentProfile, NotificationItem } from '../../types';
import { NotificationPopover } from '../common/NotificationPopover';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  student: StudentProfile;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  activeTab,
  onTabChange,
  student,
  notifications,
  onMarkAllNotificationsRead,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'pathway':
        return 'Personalized Learning Pathway';
      case 'assessment':
        return 'Skill Diagnostic & Assessment';
      case 'courses':
        return 'Course Explorer & Catalog';
      case 'mentor':
        return 'AI Study Mentor & Coach';
      case 'progress':
        return 'Learning Analytics & Progress';
      case 'profile':
        return 'Student Profile & Preferences';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {getPageTitle(activeTab)}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400">
            LearnMate AI • Adaptive Agentic Curriculum
          </p>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search courses, skills, agent concepts (e.g. LangGraph)..."
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm pl-10 pr-10 py-2 rounded-xl border border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-hidden text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick search popup */}
        {isSearchFocused && (
          <div className="absolute top-11 left-0 right-0 bg-white rounded-xl shadow-lg border border-slate-200 p-2 text-xs z-50">
            <p className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase">
              Quick Suggestions
            </p>
            <button
              onMouseDown={() => {
                onTabChange('pathway');
                setSearchQuery('');
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>StateGraph & Multi-Agent Loops</span>
              <span className="text-[10px] text-indigo-600 font-medium">In Progress</span>
            </button>
            <button
              onMouseDown={() => {
                onTabChange('courses');
                setSearchQuery('');
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>IBM Granite 3.0 Specialization</span>
              <span className="text-[10px] text-slate-400 font-medium">Course</span>
            </button>
            <button
              onMouseDown={() => {
                onTabChange('mentor');
                setSearchQuery('');
              }}
              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>Ask AI: Explain Vector RAG Reranking</span>
              <span className="text-[10px] text-violet-600 font-medium">AI Coach</span>
            </button>
          </div>
        )}
      </div>

      {/* Right: Quick Stats, Notifications, AI Button, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <div
          title={`${student.currentStreak} day learning streak! Keep it going!`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/60 text-orange-700 text-xs font-bold"
        >
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span>{student.currentStreak}d streak</span>
        </div>

        {/* Ask AI Quick Action Button */}
        <button
          onClick={() => onTabChange('mentor')}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xs shadow-indigo-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Coach</span>
        </button>

        {/* Notifications Icon with Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {isNotificationsOpen && (
            <NotificationPopover
              notifications={notifications}
              onMarkAllAsRead={onMarkAllNotificationsRead}
              onClose={() => setIsNotificationsOpen(false)}
            />
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{student.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{student.email}</p>
              </div>

              <div className="p-1">
                <button
                  onClick={() => {
                    onTabChange('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    onTabChange('progress');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  Analytics & Reports
                </button>
                <button
                  onClick={() => {
                    onTabChange('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
