import React from 'react';
import { CheckSquare, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useTasks } from '../../hooks/useTasks';

export function DashboardOverview() {
  const { tasks } = useTasks();

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    overdue: tasks.filter(t => 
      t.due_date && new Date(t.due_date) < new Date() && t.status !== 'completed'
    ).length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your task overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={CheckSquare}
          color="blue"
          trend={{ value: 12, isUp: true }}
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={TrendingUp}
          color="emerald"
          trend={{ value: 8, isUp: true }}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Overdue"
          value={stats.overdue}
          icon={AlertCircle}
          color="red"
          trend={{ value: 3, isUp: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm font-semibold text-gray-900">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
                <p className="text-xs text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{stats.total - stats.completed - stats.inProgress}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-emerald-500' :
                  task.status === 'in_progress' ? 'bg-orange-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.status.replace('_', ' ')}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(task.updated_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}