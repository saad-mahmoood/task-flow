import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardOverview } from './DashboardOverview';
import { TasksView } from './TasksView';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'tasks':
        return <TasksView />;
      case 'calendar':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Calendar view coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Settings coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}