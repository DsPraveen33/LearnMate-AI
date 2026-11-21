import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  colorScheme: 'blue' | 'indigo' | 'violet' | 'emerald';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  colorScheme,
}) => {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      ring: 'group-hover:ring-blue-500/20',
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      ring: 'group-hover:ring-indigo-500/20',
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
      ring: 'group-hover:ring-violet-500/20',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      ring: 'group-hover:ring-emerald-500/20',
    },
  }[colorScheme];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${colorStyles.bg} ${colorStyles.text} transition-all`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </span>

        {trend && (
          <div
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${
              trend.isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend.value}
          </div>
        )}
      </div>

      <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>
    </div>
  );
};
