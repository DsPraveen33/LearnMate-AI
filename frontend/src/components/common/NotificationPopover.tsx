import React from 'react';
import { NotificationItem } from '../../types';
import { Bell, Flame, CheckCircle2, Sparkles, BookOpen, Check } from 'lucide-react';

interface NotificationPopoverProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  notifications,
  onMarkAllAsRead,
  onClose,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'streak':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'achievement':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'recommendation':
        return <Sparkles className="w-4 h-4 text-violet-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-600" />
          <h4 className="font-semibold text-sm text-slate-800">Notifications</h4>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {notifications.filter((n) => !n.read).length} new
          </span>
        </div>
        <button
          onClick={onMarkAllAsRead}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          Mark all read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">No notifications yet</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 hover:bg-slate-50 transition-colors flex gap-3 ${
                !notif.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="mt-0.5 p-2 rounded-xl bg-slate-100/80 shrink-0 h-fit">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 leading-snug">{notif.title}</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                <p className="text-[11px] text-slate-400 mt-1">{notif.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 text-center">
        <button
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
