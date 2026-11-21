import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Plus, Tag, AlertCircle } from 'lucide-react';
import { LearningTask } from '../../types';

interface TaskListProps {
  tasks: LearningTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, course: string, duration: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('Agentic AI Specialization');
  const [newDuration, setNewDuration] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim(), newCourse, newDuration);
    setNewTitle('');
    setIsAdding(false);
  };

  const getPriorityStyle = (priority: LearningTask['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-base text-slate-900">Upcoming Learning Tasks</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {tasks.filter((t) => !t.completed).length} pending actions for this week
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1 text-xs font-semibold px-3 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Quick Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5 animate-in fade-in duration-150">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Implement ReAct agent retry decorator..."
            className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:border-indigo-500"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <select
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option value="Agentic Reasoning with LangGraph">LangGraph Reasoning</option>
              <option value="IBM Granite 3.0 Specialization">IBM Granite 3.0</option>
              <option value="High-Performance Vector DBs">Vector Databases</option>
            </select>
            <input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
              className="w-20 text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
              placeholder="mins"
              min="5"
              max="240"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 ml-auto cursor-pointer"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer group ${
              task.completed
                ? 'bg-slate-50/60 border-slate-200/50 opacity-70'
                : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-xs'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-slate-400 group-hover:text-indigo-600 transition-colors"
              aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {task.title}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityStyle(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="font-medium text-slate-500">{task.course}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {task.durationMinutes} mins
                </span>
                <span>• {task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
