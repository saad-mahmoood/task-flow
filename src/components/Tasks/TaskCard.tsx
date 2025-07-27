import React from 'react';
import { Calendar, Flag, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../../lib/supabase';
import { useTasks } from '../../hooks/useTasks';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTasks();
  const [showMenu, setShowMenu] = React.useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800 border-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
    setShowMenu(false);
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    await updateTask(task.id, { status: newStatus });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={clsx(
            'px-3 py-1 rounded-full text-xs font-medium border',
            priorityColors[task.priority]
          )}>
            <Flag className="w-3 h-3 inline mr-1" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          
          <span className={clsx(
            'px-3 py-1 rounded-full text-xs font-medium border',
            statusColors[task.status]
          )}>
            {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
          </span>
        </div>

        {task.due_date && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(task.due_date), 'MMM dd')}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleStatusChange('pending')}
          className={clsx(
            'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors',
            task.status === 'pending'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          )}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange('in_progress')}
          className={clsx(
            'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors',
            task.status === 'in_progress'
              ? 'bg-blue-200 text-blue-800'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          )}
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange('completed')}
          className={clsx(
            'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors',
            task.status === 'completed'
              ? 'bg-green-200 text-green-800'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          )}
        >
          Completed
        </button>
      </div>
    </div>
  );
}