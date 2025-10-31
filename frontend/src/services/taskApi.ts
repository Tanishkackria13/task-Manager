import axios from 'axios';
import { TaskItem, CreateTaskRequest } from '../types/Task';

const API_BASE_URL = 'http://localhost:5200/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getTasks: async (): Promise<TaskItem[]> => {
    const response = await api.get<TaskItem[]>('/tasks');
    return response.data;
  },
  createTask: async (task: CreateTaskRequest): Promise<TaskItem> => {
    const response = await api.post<TaskItem>('/tasks', task);
    return response.data;
  },
  updateTask: async (id: string, task: TaskItem): Promise<void> => {
    await api.put(`/tasks/${id}`, task);
  },
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};