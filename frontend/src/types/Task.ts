export interface TaskItem {
    id: string;
    description: string;
    isCompleted: boolean;
  }
  
  export interface CreateTaskRequest {
    description: string;
    isCompleted: boolean;
  }