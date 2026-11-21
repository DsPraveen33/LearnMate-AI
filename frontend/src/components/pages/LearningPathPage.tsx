import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Lock,
  PlayCircle,
  FileCode,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LearningPathway, PathwayModule } from '../../types';
import type { SavedRoadmap } from '../../services/api';
import { RoadmapGenerator } from './RoadmapGenerator';
import { Modal } from '../common/Modal';

interface LearningPathPageProps {
  pathway: LearningPathway;
  studentId: number;
  onRoadmapSaved: (roadmap: SavedRoadmap) => void;
  onLaunchModule: (module: PathwayModule) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({
  pathway, studentId, onRoadmapSaved, onLaunchModule,
}) => {
  const activeStage = pathway.stages.find(stage => stage.status === 'in_progress');
  const [activeStageId, setActiveStageId] = useState(activeStage?.id ?? pathway.stages[0]?.id ?? '');
  const [selectedModule, setSelectedModule] = useState<PathwayModule | null>(null);

  const getModuleIcon = (type: PathwayModule['type']) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case 'lab':
        return <FileCode className="w-4 h-4 text-indigo-500" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-violet-500" />;
      case 'project':
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
    }
  };

  const overallPercent = Math.round(
    pathway.totalModules ? (pathway.completedModules / pathway.totalModules) * 100 : 0
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Dynamic Agentic Pathway
            </span>
            <span className="text-xs text-slate-400 font-medium">{activeStage ? `Stage ${activeStage.stageNumber} of ${pathway.totalStages} Active` : `${pathway.totalStages} stages`}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {pathway.title}
          </h2>

          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            {pathway.description}
          </p>

          {/* Quick Metrics */}
          <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              {pathway.completedModules} of {pathway.totalModules} modules finished
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              ~{pathway.estimatedTotalHours} hours total curriculum
            </span>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80 min-w-[180px]">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-200"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * overallPercent) / 100}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-700"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-xl font-extrabold text-slate-900">
              {overallPercent}%
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-slate-700">Total Progress</span>
        </div>
      </div>

      <RoadmapGenerator studentId={studentId} onSaved={roadmap => {
        onRoadmapSaved(roadmap);
        setActiveStageId('stage-1');
      }} />

      {/* Roadmap Stages */}
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-slate-900">Curriculum Milestones & Modules</h3>

        <div className="space-y-4">
          {pathway.stages.map((stage) => {
            const isExpanded = activeStageId === stage.id;
            const isCompleted = stage.status === 'completed';
            const isInProgress = stage.status === 'in_progress';
            const isLocked = stage.status === 'locked';

            return (
              <div
                key={stage.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isInProgress
                    ? 'bg-white border-indigo-200 shadow-md ring-2 ring-indigo-500/10'
                    : isCompleted
                    ? 'bg-white border-slate-200/80'
                    : 'bg-slate-50/70 border-slate-200/60 opacity-80'
                }`}
              >
                {/* Stage Header Accordion */}
                <div
                  onClick={() => setActiveStageId(isExpanded ? '' : stage.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : isInProgress
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        `0${stage.stageNumber}`
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Stage {stage.stageNumber} • {stage.estimatedWeeks} Weeks
                        </span>
                        {isInProgress && (
                          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                            CURRENT
                          </span>
                        )}
                        {isCompleted && (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            COMPLETED
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{stage.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                      <span className="text-xs font-bold text-slate-800">
                        {stage.completionPercentage}% Done
                      </span>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${stage.completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Modules List */}
                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 sm:px-6 py-4 space-y-2.5 bg-slate-50/40">
                    {stage.modules.map((mod) => (
                      <div
                        key={mod.id}
                        className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                          mod.inProgress
                            ? 'bg-indigo-50/80 border-indigo-200'
                            : mod.completed
                            ? 'bg-white border-slate-200/80'
                            : 'bg-white/80 border-slate-200/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                            {getModuleIcon(mod.type)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                                {mod.title}
                              </span>
                              {mod.inProgress && (
                                <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                                  Next Up
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                              <span className="capitalize">{mod.type}</span>
                              <span>• {mod.duration}</span>
                              <span className="hidden md:inline text-slate-500">• {mod.description}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedModule(mod)}
                            className="text-xs text-slate-600 hover:text-indigo-600 font-medium px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                          >
                            Details
                          </button>

                          {mod.locked ? (
                            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs flex items-center gap-1 font-medium px-2.5">
                              <Lock className="w-3.5 h-3.5" /> Locked
                            </span>
                          ) : mod.completed ? (
                            <button
                              onClick={() => onLaunchModule(mod)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Review
                            </button>
                          ) : (
                            <button
                              onClick={() => onLaunchModule(mod)}
                              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            >
                              <span>Start Lab</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <Modal
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
          title={selectedModule.title}
          subtitle={`Type: ${selectedModule.type.toUpperCase()} • Duration: ${selectedModule.duration}`}
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedModule.description}
            </p>

            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-2">
              <span className="font-bold text-indigo-900 block">Learning Objectives:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Understand the architectural pattern and performance implications.</li>
                <li>Write production Python code using asynchronous primitives.</li>
                <li>Verify your implementation against automated unit tests and pass criteria.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLaunchModule(selectedModule);
                  setSelectedModule(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-xs"
              >
                Launch Learning Sandbox
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
