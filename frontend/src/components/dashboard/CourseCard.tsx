import React from 'react';
import { Star, Clock, BookOpen, Users, ArrowRight, Check } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onToggleEnroll: (courseId: string | number) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onToggleEnroll,
}) => {
  const getDifficultyBadge = (level: Course['level']) => {
    switch (level) {
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      {/* Top Banner Gradient with Category & Difficulty */}
      <div className={`h-24 bg-gradient-to-r ${course.gradient} p-4 flex flex-col justify-between relative`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
            {course.category}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-white/95 ${getDifficultyBadge(
              course.level
            )}`}
          >
            {course.level}
          </span>
        </div>

        {course.isFeatured && (
          <div className="absolute bottom-2 right-4 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-md">
            ★ AI Recommended
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4
            onClick={() => onSelectCourse(course)}
            className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {course.title}
          </h4>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Instructor & Meta */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
              />
              <span className="text-xs text-slate-600 font-medium truncate max-w-[120px]">
                {course.instructor.name}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({course.reviewCount})</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* If enrolled: progress bar */}
          {course.isEnrolled && course.progressPercentage !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-500 font-medium">Progress</span>
                <span className="font-bold text-indigo-600">{course.progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${course.progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.durationHours}h
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.modulesCount} modules
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCourse(course)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Details
            </button>

            {course.isEnrolled ? (
              <button
                onClick={() => onSelectCourse(course)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={() => onToggleEnroll(course.id)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <span>Enroll Free</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
