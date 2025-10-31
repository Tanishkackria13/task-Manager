import React from 'react';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'active', label: 'Active', icon: '⏰' },
    { key: 'completed', label: 'Completed', icon: '✅' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          <span className="filter-icon">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;