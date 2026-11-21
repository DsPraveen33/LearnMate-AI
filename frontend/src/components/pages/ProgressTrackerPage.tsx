import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  PieChart,
  FileText,
} from 'lucide-react';
import { StudentProfile, SkillItem } from '../../types';

interface ProgressTrackerPageProps {
  student: StudentProfile;
  skills: SkillItem[];
  weeklyActivity: { day: string; hours: number; completedModules: number }[];
  onTriggerToast: (message: string) => void;
}

export const ProgressTrackerPage: React.FC<ProgressTrackerPageProps> = ({
  student,
  skills,
  weeklyActivity,
  onTriggerToast,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('month');

  const distribution = [
    { label: 'Interactive Coding Labs', percentage: 55, color: 'bg-indigo-600', hours: '26.7 hrs' },
    { label: 'Architectural Theory & Whitepapers', percentage: 25, color: 'bg-blue-500', hours: '12.1 hrs' },
    { label: 'Skill Diagnostic Quizzes', percentage: 20, color: 'bg-violet-500', hours: '9.7 hrs' },
  ];

  const certificates = [
    {
      id: 'cert-1',
      title: 'Pydantic v2 & Structured LLM Tool Execution',
      issuedDate: 'Nov 12, 2026',
      credentialId: 'LM-AI-84920-STR',
      grade: 'Distinction (98%)',
    },
    {
      id: 'cert-2',
      title: 'Dense & Sparse Vector Retrieval with PostgreSQL',
      issuedDate: 'Nov 04, 2026',
      credentialId: 'LM-AI-59182-VEC',
      grade: 'Distinction (95%)',
    },
    {
      id: 'cert-3',
      title: 'FastAPI High-Throughput Async AI Services',
      issuedDate: 'Oct 28, 2026',
      credentialId: 'LM-AI-31904-FST',
      grade: 'Honors (92%)',
    },
  ];

  const handleExportReport = () => {
    onTriggerToast('Comprehensive Student Learning Analytics exported successfully (PDF/JSON)!');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 inline-flex items-center gap-1.5 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Learning Velocity Analytics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learning Progress & Analytics
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-xl">
            Track study consistency, skill mastery velocity, and credential achievements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['week', 'month', 'all'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Monthly Study Time</span>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">{student.totalHours} hrs</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            ↑ 18% higher than cohort avg
          </span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Mastery Velocity</span>
          <div className="mt-2 text-2xl font-extrabold text-indigo-600">4.8 skills/mo</div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            Top 5% learning efficiency
          </span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Task Completion Rate</span>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">94.2%</div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            33 of 35 tasks on schedule
          </span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase">Diagnostic Average</span>
          <div className="mt-2 text-2xl font-extrabold text-violet-600">91.5%</div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            Across 14 technical evaluations
          </span>
        </div>
      </div>

      {/* 2-Column Section: Study Time Distribution + Weekly Rhythm */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Time Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Study Time Distribution</h3>
                <p className="text-xs text-slate-400 mt-0.5">Where your effort was invested this month</p>
              </div>
              <PieChart className="w-5 h-5 text-indigo-500" />
            </div>

            {/* Visual multi-segment bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex my-6">
              {distribution.map((item) => (
                <div
                  key={item.label}
                  className={`${item.color} h-full`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.label}: ${item.percentage}%`}
                />
              ))}
            </div>

            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-semibold text-slate-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{item.hours}</span>
                    <span className="font-bold text-slate-900">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Optimized ratio: 50% labs / 30% theory / 20% quiz</span>
            <span className="font-bold text-emerald-600">✓ Healthy Balance</span>
          </div>
        </div>

        {/* Competencies Progress Bars */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Verified Technical Skills</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated benchmark assessments</p>
              </div>
              <Award className="w-5 h-5 text-violet-500" />
            </div>

            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{skill.name}</span>
                    <span className="font-bold text-indigo-600">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Next benchmark test: Nov 28</span>
            <span className="text-indigo-600 font-semibold cursor-pointer">
              View Syllabus Alignment →
            </span>
          </div>
        </div>
      </div>

      {/* Verified Credentials Gallery */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verified Milestones & Credentials</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cryptographically verifiable certificates earned on LearnMate AI
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
            {certificates.length} Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-white shadow-2xs border border-slate-200 text-indigo-600">
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {cert.grade}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {cert.title}
                </h4>

                <div className="mt-3 space-y-1 text-[11px] text-slate-400">
                  <div>Issued: <strong className="text-slate-600">{cert.issuedDate}</strong></div>
                  <div className="font-mono text-[10px]">ID: {cert.credentialId}</div>
                </div>
              </div>

              <button
                onClick={() => onTriggerToast(`Downloaded certificate: ${cert.title}`)}
                className="mt-5 w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Credential</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
