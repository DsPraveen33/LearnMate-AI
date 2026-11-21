import React from 'react';
import { Award, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { SkillItem } from '../../types';

interface SkillProgressProps {
  skills: SkillItem[];
  onViewAllSkills: () => void;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({ skills, onViewAllSkills }) => {
  const getLevelBadge = (level: SkillItem['level']) => {
    switch (level) {
      case 'Expert':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'Advanced':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Proficient':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">Skill Competency Matrix</h3>
            <span className="p-1 rounded-md bg-indigo-50 text-indigo-600">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">AI-evaluated real-world mastery</p>
        </div>

        <button
          onClick={onViewAllSkills}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 cursor-pointer"
        >
          <span>Assess Skills</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Skill List */}
      <div className="mt-5 space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">{skill.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadge(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" />+{skill.recentGain}%
                </span>
                <span className="font-bold text-slate-900">{skill.percentage}%</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-all duration-500"
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-slate-400">Based on 54 completed coding labs & quizzes</span>
        <span className="font-semibold text-indigo-600 cursor-pointer" onClick={onViewAllSkills}>
          Full Breakdown →
        </span>
      </div>
    </div>
  );
};
