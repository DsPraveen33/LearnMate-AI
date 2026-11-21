import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, Plus, Trash2 } from 'lucide-react';
import { Course } from '../../types';
import { CourseCard } from '../dashboard/CourseCard';
import { Modal } from '../common/Modal';

interface CourseExplorerPageProps {
  courses: Course[];
  onToggleEnroll: (courseId: string | number) => void;
  onAddCourse?: (course: Partial<Course>) => Promise<void>;
  onDeleteCourse?: (courseId: string | number) => Promise<void>;
}

export const CourseExplorerPage: React.FC<CourseExplorerPageProps> = ({
  courses,
  onToggleEnroll,
  onAddCourse,
  onDeleteCourse,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [inspectCourse, setInspectCourse] = useState<Course | null>(null);

  // New Course Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Agentic AI');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDuration, setNewDuration] = useState(6.0);
  const [formError, setFormError] = useState<string | null>(null);

  const categories = [
    'All',
    'Agentic AI',
    'Machine Learning',
    'System Design',
    'Prompt Engineering',
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || c.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'All' || c.level === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleCreateCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!newCode.trim() || !newTitle.trim() || !newDescription.trim()) {
      setFormError('Please fill in Course Code, Title, and Description.');
      return;
    }
    if (onAddCourse) {
      try {
        await onAddCourse({
          code: newCode.trim(),
          title: newTitle.trim(),
          description: newDescription.trim(),
          category: newCategory,
          level: newLevel,
          durationHours: Number(newDuration),
        });
        setIsAddModalOpen(false);
        setNewCode('');
        setNewTitle('');
        setNewDescription('');
      } catch (err: any) {
        setFormError(err.message || 'Failed to create course');
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/60 inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Curated Knowledge Catalog (FastAPI & SQLite)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Course Explorer
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-xl">
            Live database-backed catalog of courses in Agentic AI, modern LLM architectures, and scalable cloud systems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onAddCourse && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          )}

          <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-base font-extrabold text-indigo-600 block">
              {courses.length}
            </span>
            <span className="text-[11px] text-slate-400">Total in DB</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Difficulty Select */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search catalog..."
              className="w-full text-xs bg-white border border-slate-200/80 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="text-xs bg-white border border-slate-200/80 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No courses match your filter</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try resetting your search term or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold hover:bg-indigo-100 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={(c) => setInspectCourse(c)}
              onToggleEnroll={onToggleEnroll}
            />
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Course to Catalog"
          subtitle="Directly creates a course record in the SQLite database"
        >
          <form onSubmit={handleCreateCourseSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. AI-405"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="Agentic AI">Agentic AI</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="System Design">System Design</option>
                  <option value="Prompt Engineering">Prompt Engineering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Advanced Agent Evaluator & Guardrails"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
                placeholder="Comprehensive overview of topics covered..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duration (Hours)
                </label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  step="0.5"
                  min="1"
                  max="50"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs"
              >
                Save Course to DB
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Course Syllabus Modal */}
      {inspectCourse && (
        <Modal
          isOpen={!!inspectCourse}
          onClose={() => setInspectCourse(null)}
          title={inspectCourse.title}
          subtitle={`By ${inspectCourse.instructor.name} • ${inspectCourse.instructor.role}`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed">
              {inspectCourse.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Level</span>
                <span className="font-bold text-slate-800">{inspectCourse.level}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Duration</span>
                <span className="font-bold text-slate-800">{inspectCourse.durationHours} hrs</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Enrolled Students</span>
                <span className="font-bold text-indigo-600">{inspectCourse.enrolledStudents.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Detailed Course Syllabus
              </h4>
              <div className="space-y-2">
                {inspectCourse.syllabus.map((s) => (
                  <div key={s.week} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                    <span className="font-bold text-indigo-700 block">
                      Week {s.week}: {s.title}
                    </span>
                    <ul className="mt-1 list-disc list-inside text-slate-600 space-y-0.5">
                      {s.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {onDeleteCourse && (
                <button
                  onClick={async () => {
                    await onDeleteCourse(inspectCourse.id);
                    setInspectCourse(null);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Course</span>
                </button>
              )}

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setInspectCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onToggleEnroll(inspectCourse.id);
                    setInspectCourse(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-xs"
                >
                  {inspectCourse.isEnrolled ? 'Open Course Player' : 'Enroll Now Free'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
