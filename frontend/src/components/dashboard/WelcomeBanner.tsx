import React from 'react';
import { Sparkles, ArrowRight, Flame, Target, Trophy } from 'lucide-react';
import { StudentProfile } from '../../types';

interface WelcomeBannerProps {
  student: StudentProfile;
  savedPathway: { title: string; completion: number; nextModule?: string } | null;
  onResumeLearning: () => void;
  onOpenAssessment: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  student,
  savedPathway,
  onResumeLearning,
  onOpenAssessment,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-600/10">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-indigo-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Agentic Pathway Recommendation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {student.name.split(' ')[0]}! 👋
          </h2>

          <p className="mt-2 text-sm sm:text-base text-indigo-100 font-normal leading-relaxed">
            {savedPathway ? (
              <>
                You have completed <strong className="text-white">{savedPathway.completion}%</strong> of{' '}
                <span className="underline decoration-indigo-300 underline-offset-4 font-semibold">{savedPathway.title}</span>.
                {savedPathway.nextModule && <> Next module: {savedPathway.nextModule}.</>}
              </>
            ) : (
              'Set a learning goal in My Learning Path to create your first roadmap.'
            )}
          </p>

          {/* Quick inline metrics */}
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>
                <strong className="text-white">{student.currentStreak} Days</strong> Streak
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Target className="w-4 h-4 text-emerald-300" />
              <span>
                Daily Goal: <strong className="text-white">35 / {student.dailyGoalMinutes} mins</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>
                Level <strong className="text-white">{student.level}</strong> ({student.xpPoints} XP)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            onClick={onResumeLearning}
            className="px-5 py-3 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{savedPathway?.nextModule ? 'Resume Current Module' : 'Open Learning Path'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenAssessment}
            className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Take Skill Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
