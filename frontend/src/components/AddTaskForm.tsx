import React, { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddTask(description.trim());
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="input-group-enhanced">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="add-task-btn" type="submit">
          <span className="btn-icon">+</span>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;