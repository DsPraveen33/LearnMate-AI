import React, { useState } from 'react';
import { BarChart2, Calendar, Clock, Flame } from 'lucide-react';

interface ActivityChartProps {
  data: { day: string; hours: number; completedModules: number }[];
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  const [activeBar, setActiveBar] = useState<number | null>(null);

  const maxHours = Math.max(...data.map((d) => d.hours), 6);
  const totalHours = data.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  const avgHours = (Number(totalHours) / data.length).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">Weekly Learning Activity</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              On Track
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Hours spent studying across the past 7 days</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">Total This Week</span>
            <span className="font-extrabold text-slate-900 text-sm">{totalHours} hrs</span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">Daily Average</span>
            <span className="font-extrabold text-indigo-600 text-sm">{avgHours} hrs/d</span>
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="mt-8 pt-4 pb-2">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2">
          {data.map((item, index) => {
            const heightPercent = Math.min(100, Math.round((item.hours / maxHours) * 100));
            const isHovered = activeBar === index;
            const isToday = item.day === 'Sat'; // Current simulated day

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setActiveBar(index)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {/* Floating tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                    <div>{item.hours} hrs</div>
                    <div className="text-slate-300 text-[10px]">{item.completedModules} modules</div>
                  </div>
                )}

                {/* Bar */}
                <div className="w-full max-w-[42px] bg-slate-100 rounded-xl overflow-hidden flex items-end h-full">
                  <div
                    className={`w-full rounded-xl transition-all duration-300 ${
                      isToday
                        ? 'bg-gradient-to-t from-blue-600 to-indigo-600 shadow-sm shadow-indigo-500/30'
                        : isHovered
                        ? 'bg-indigo-400'
                        : 'bg-indigo-200 hover:bg-indigo-300'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day label */}
                <div className="mt-3 text-center">
                  <span
                    className={`text-xs font-semibold block ${
                      isToday ? 'text-indigo-600 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.hours}h</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom streak note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-orange-600 font-medium">
          <Flame className="w-4 h-4 fill-orange-500" />
          <span>7 of 7 days completed this week</span>
        </div>
        <span className="text-slate-400 text-[11px]">Goal: 12 hrs/week (173% reached)</span>
      </div>
    </div>
  );
};
