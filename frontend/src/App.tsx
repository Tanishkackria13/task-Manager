import React, { useState, useEffect } from 'react';
import { TaskItem } from './types/Task';
import { taskApi } from './services/taskApi';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter, { FilterType } from './components/TaskFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      alert('Failed to load tasks. Make sure the backend is running!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (description: string) => {
    try {
      const newTask = await taskApi.createTask({
        description,
        isCompleted: false,
      });
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        await taskApi.updateTask(id, updatedTask);
        setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.isCompleted;
      case 'completed':
        return task.isCompleted;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const totalCount = tasks.length;

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <h1 className="app-title">TASKIFY</h1>
          <p className="app-subtitle">Stay Organized. Get Things Done</p>
        </div>
      </div>

      <div className="app-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              {/* Stats Card */}
              <div className="stats-card">
                <div className="stat-item">
                  <div className="stat-number">{totalCount}</div>
                  <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{completedCount}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{totalCount - completedCount}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>

              {/* Add Task Card */}
              <div className="task-card">
                <h3 className="card-title">Add New Task</h3>
                <AddTaskForm onAddTask={handleAddTask} />
              </div>

              {/* Tasks Card */}
              <div className="task-card">
                <div className="card-header-row">
                  <h3 className="card-title">Your Tasks</h3>
                  <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
                </div>
                
                <div className="tasks-count">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} 
                  {filter !== 'all' && ` (${filter})`}
                </div>
                
                <TaskList
                  tasks={filteredTasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;