import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BarChart,
  ShieldCheck,
} from 'lucide-react';
import { AssessmentQuestion, SkillItem } from '../../types';

interface SkillAssessmentPageProps {
  questions: AssessmentQuestion[];
  skills: SkillItem[];
  onCompleteAssessment: (score: number) => void;
}

export const SkillAssessmentPage: React.FC<SkillAssessmentPageProps> = ({
  questions,
  skills,
  onCompleteAssessment,
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 mins

  // Countdown timer when active
  useEffect(() => {
    if (!isTestActive || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTestActive, isSubmitted]);

  const handleStartTest = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setTimeLeft(300);
    setIsTestActive(true);
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    onCompleteAssessment(finalScore);
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const score = isSubmitted ? calculateScore() : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Intro Header */}
      {!isTestActive && !isSubmitted && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20 inline-flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Adaptive AI Skill Diagnostic
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Skill Assessment & Gap Analysis
              </h2>
              <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
                Benchmark your mastery of autonomous agent loops, cyclical state graphs, deterministic tool schemas, and hybrid RAG. Your score dynamically optimizes your personal pathway.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-indigo-200" /> 5 Minutes
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-200" /> 5 Multi-Choice Questions
                </span>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="px-6 py-3.5 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Begin Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Verified Competencies */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Current Track Competencies Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-800">{skill.name}</span>
                    <span className="font-extrabold text-indigo-600">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{skill.category}</span>
                    <span className="font-semibold text-slate-600">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Assessment Form */}
      {isTestActive && !isSubmitted && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          {/* Quiz Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <h3 className="text-sm font-semibold text-slate-600 mt-0.5">
                Skill Track: {currentQ.skill} ({currentQ.difficulty})
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, '0')} remaining
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {answeredCount}/{questions.length} answered
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>

            {currentQ.codeSnippet && (
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-900 shadow-xs ring-2 ring-indigo-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
                }
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Submit Diagnostic
              </button>
            )}
          </div>
        </div>
      )}

      {/* Submitted Results View */}
      {isSubmitted && (
        <div className="space-y-6">
          {/* Results Summary Hero */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 inline-flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Assessment Complete
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Diagnostic Results: {score}%
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xl">
                {score >= 80
                  ? 'Outstanding! You demonstrate advanced proficiency in cyclical state machines, deterministic schemas, and RAG architectures.'
                  : 'Great effort! Your foundational concepts are clear. Reviewing LangGraph StateGraph edges will help elevate your scores to Expert.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleStartTest}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Test
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsTestActive(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
              >
                Return to Overview
              </button>
            </div>
          </div>

          {/* Question Breakdown with Explanations */}
          <div className="space-y-4">
            <h4 className="font-bold text-base text-slate-900">Detailed Answer Review</h4>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/30 border-emerald-200/80'
                      : 'bg-rose-50/20 border-rose-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700">
                      Question {idx + 1}: {q.skill}
                    </span>
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{q.question}</p>

                  <div className="mt-3 p-3 bg-white/80 rounded-xl border border-slate-200/80 text-xs space-y-1">
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Your answer:</strong>{' '}
                      {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                    </p>
                    <p className="text-emerald-700 font-semibold">
                      <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                    </p>
                    <p className="text-slate-500 pt-1 text-[11px] leading-relaxed">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
