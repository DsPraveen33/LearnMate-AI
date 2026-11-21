import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { LearningPathway, NavigationTab, StudentProfile, NotificationItem } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  student: StudentProfile;
  savedPathway: LearningPathway | null;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  student,
  savedPathway,
  notifications,
  onMarkAllNotificationsRead,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        student={student}
        savedPathway={savedPathway}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          activeTab={activeTab}
          onTabChange={onTabChange}
          student={student}
          notifications={notifications}
          onMarkAllNotificationsRead={onMarkAllNotificationsRead}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
