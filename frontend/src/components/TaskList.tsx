import React from 'react';
import { TaskItem } from '../types/Task';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add a task to get started with your productivity journey!</p>
      </div>
    );
  }

  return (
    <div className="tasks-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
          <div className="task-content">
            <button
              className="toggle-btn"
              onClick={() => onToggleTask(task.id)}
              aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.isCompleted ? (
                <span className="check-icon">✓</span>
              ) : (
                <span className="circle-icon">○</span>
              )}
            </button>
            <span className="task-text">{task.description}</span>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDeleteTask(task.id)}
            aria-label="Delete task"
          >
            <span className="delete-icon">🗑️</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;