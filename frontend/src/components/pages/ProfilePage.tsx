import React, { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  Flame,
  Award,
  Sparkles,
  ShieldCheck,
  Save,
  Bell,
  Cpu,
  Trophy,
  Database,
  Lock,
} from 'lucide-react';
import { StudentProfile, AchievementBadge } from '../../types';

interface ProfilePageProps {
  student: StudentProfile;
  badges: AchievementBadge[];
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onTriggerToast: (message: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  student,
  badges,
  onUpdateProfile,
  onTriggerToast,
}) => {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [careerGoal, setCareerGoal] = useState(student.careerGoal);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(student.dailyGoalMinutes);
  const [preferredStyle, setPreferredStyle] = useState(student.preferredLearningStyle);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      careerGoal,
      dailyGoalMinutes,
      preferredLearningStyle: preferredStyle,
    });
    onTriggerToast('Student profile and preferences updated successfully!');
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Database':
        return <Database className="w-5 h-5 text-blue-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-violet-500" />;
      default:
        return <Trophy className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-50 shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900">{student.name}</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              Level {student.level} Scholar
            </span>
          </div>

          <p className="text-xs font-medium text-slate-500 mt-1">{student.title}</p>
          <p className="text-xs text-indigo-600 font-semibold mt-0.5">
            Track: {student.track}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-xl border border-orange-200/60">
              <Flame className="w-4 h-4 fill-orange-500" />
              {student.currentStreak} Day Streak
            </span>
            <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-200/60">
              <Award className="w-4 h-4" />
              {student.xpPoints} XP Earned
            </span>
            <span className="text-slate-400">
              {student.xpToNextLevel - student.xpPoints} XP to Level {student.level + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form & Learning Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Editable Settings Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Learning Preferences & Goals</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize how LearnMate AI paces your agentic pathway
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Career Role
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  placeholder="e.g. Principal AI Agent Architect"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Daily Learning Commitment (Minutes)
                </label>
                <input
                  type="number"
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  min="15"
                  max="180"
                  step="5"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Learning Modality
                </label>
                <select
                  value={preferredStyle}
                  onChange={(e) => setPreferredStyle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Hands-on Labs & Architecture Code">Hands-on Labs & Architecture Code</option>
                  <option value="Architectural Whitepapers & Research">Architectural Whitepapers & Research</option>
                  <option value="Guided Video Walkthroughs">Guided Video Walkthroughs</option>
                  <option value="Rapid Fire Quizzes & Diagnostics">Rapid Fire Quizzes & Diagnostics</option>
                </select>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">Notification Preferences</span>
              <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="font-semibold text-slate-800 block">Daily Habit & Streak Reminders</span>
                  <span className="text-slate-400 text-[11px]">Notify before 8:00 PM to maintain streak</span>
                </div>
                <input
                  type="checkbox"
                  checked={streakAlerts}
                  onChange={(e) => setStreakAlerts(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="font-semibold text-slate-800 block">AI Mentor Proactive Suggestions</span>
                  <span className="text-slate-400 text-[11px]">Receive smart recommendations when learning pace slows</span>
                </div>
                <input
                  type="checkbox"
                  checked={aiSuggestions}
                  onChange={(e) => setAiSuggestions(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Badges & Achievements */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Achievement Badges</h3>
                <p className="text-xs text-slate-400 mt-0.5">Milestone badges earned</p>
              </div>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>

            <div className="space-y-3">
              {badges.map((badge) => {
                const isUnlocked = badge.unlockedAt !== null;
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-slate-50/60 border-slate-200/80'
                        : 'bg-slate-100/40 border-slate-200/50 opacity-60'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs shrink-0">
                      {isUnlocked ? (
                        getBadgeIcon(badge.icon)
                      ) : (
                        <Lock className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {badge.title}
                        </span>
                        {isUnlocked ? (
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            Unlocked
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {badge.description}
                      </p>
                      {badge.unlockedAt && (
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Earned {badge.unlockedAt}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-xs text-indigo-600 font-semibold">
              4 of 6 Badges Collected (67%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
