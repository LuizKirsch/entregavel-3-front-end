import type { Task } from './App';

const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'https://pacaro-tarefas.netlify.app/api/kirsch';

export type ApiTask = {
  id: number | string;
  user?: string;
  createdAt?: string;
  title: string;
  description: string;
  step: string;
};

export const COLUMNS = {
  todo: { id: 'todo', name: 'A Fazer', color: 'bg-red-500/10 border-red-500', headerColor: 'text-red-600' },
  inProgress: { id: 'inProgress', name: 'Em Andamento', color: 'bg-yellow-500/10 border-yellow-500', headerColor: 'text-yellow-600' },
  done: { id: 'done', name: 'Concluído', color: 'bg-green-500/10 border-green-500', headerColor: 'text-green-600' },
} as const;

export const PRIORITIES = ['Low', 'Medium', 'High'] as const;

export const mapStepToStatus = (step?: string): keyof typeof COLUMNS => {
  if (!step) return 'todo';
  const s = step.toLowerCase();
  if (s.includes('pronto')) return 'done';
  if (s.includes('andamento')) return 'inProgress';
  if (s.includes('para')) return 'todo';
  return 'todo';
};

export const mapStatusToStep = (status: keyof typeof COLUMNS): string => {
  switch (status) {
    case 'todo':
      return 'Para fazer';
    case 'inProgress':
      return 'Em andamento';
    case 'done':
      return 'Pronto';
  }
};

export const fetchTasksFromApi = async (): Promise<Task[]> => {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error('Falha ao buscar tarefas');
  const data: ApiTask[] = await res.json();
  return data.map(d => ({
    id: String(d.id),
    title: d.title,
    description: d.description,
    status: mapStepToStatus(d.step),
    priority: 'Medium' as const,
  }));
};

export const createTaskApi = async (task: Partial<Task>): Promise<Task> => {
  const body = {
    title: task.title,
    description: task.description,
    step: mapStatusToStep(task.status || 'todo'),
  };
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Falha ao criar tarefa');
  const d: ApiTask = await res.json();
  return {
    id: String(d.id),
    title: d.title,
    description: d.description,
    status: mapStepToStatus(d.step),
    priority: 'Medium',
  };
};

export const updateTaskApi = async (task: Partial<Task> & { id: string }): Promise<Task> => {
  const body = {
    title: task.title,
    description: task.description,
    step: mapStatusToStep(task.status || 'todo'),
  };
  const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Falha ao atualizar tarefa');
  const d: ApiTask = await res.json();
  return {
    id: String(d.id),
    title: d.title,
    description: d.description,
    status: mapStepToStatus(d.step),
    priority: 'Medium',
  };
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Falha ao deletar tarefa');
};

export const patchTaskStepApi = async (id: string, status: keyof typeof COLUMNS): Promise<void> => {
  const body = { step: mapStatusToStep(status) };
  const res = await fetch(`${API_BASE}/tasks/${id}/update-step`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Falha ao atualizar status da tarefa');
};
