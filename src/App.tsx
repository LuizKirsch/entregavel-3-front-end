import {
  fetchTasksFromApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  patchTaskStepApi,
  COLUMNS,
  PRIORITIES
} from './api';
import { useState, useEffect, useCallback } from 'react';
import { Loader } from 'lucide-react';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';
import { Header } from './components/Header';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: keyof typeof COLUMNS;
  priority: typeof PRIORITIES[number];
};

type ToastType = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message: msg, type }]);
  }, []);

  const closeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTasksFromApi();
        setTasks(data);
      } catch (err: unknown) {
        console.error(err);
        showToast('Erro ao carregar tarefas', 'error');
      }
      setLoading(false);
    };
    load();
  }, [showToast]);

  const openModalForAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (taskData.id) {
        const originalTask = tasks.find(t => t.id === taskData.id);
        if (originalTask?.status === 'done' && taskData.status !== 'done') {
          showToast('Após finalizada não pode ser alterada o status', 'error');
          return;
        }
        const updated = await updateTaskApi(taskData as Partial<Task> & { id: string });
        setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
        showToast('Tarefa atualizada!', 'success');
      } else {
        const created = await createTaskApi(taskData);
        setTasks(prev => [...prev, created]);
        showToast('Tarefa criada!', 'success');
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      console.error(err);
      showToast('Erro ao salvar tarefa', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const title = tasks.find(t => t.id === id)?.title;
      await deleteTaskApi(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      showToast(`Tarefa "${title}" removida.`, 'success');
    } catch (err: unknown) {
      console.error(err);
      showToast('Erro ao deletar tarefa', 'error');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatus: keyof typeof COLUMNS) => {
    e.preventDefault();
    const id = draggingId;
    if (!id) return;
    try {
      await patchTaskStepApi(id, newStatus);
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
      );
      showToast('Status atualizado!', 'success');
    } catch (err: unknown) {
      console.error(err);
      showToast('Erro ao atualizar status', 'error');
    }
    setDraggingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="fixed top-5 right-5 z-50">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={closeToast} />
        ))}
      </div>

        <Header></Header>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader className="animate-spin text-indigo-600" size={40} />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {Object.values(COLUMNS).map(col => (
            <Column
              key={col.id}
              col={col}
              tasks={tasks.filter(t => t.status === col.id)}
              allTasks={tasks}
              onEdit={openModalForEdit}
              onDelete={handleDelete}
              onDragStart={setDraggingId}
              onDrop={handleDrop}
              onError={(msg) => showToast(msg, 'error')}
            />
          ))}
        </div>
      )}

      <button
        onClick={openModalForAdd}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center text-2xl z-40"
      >
        +
      </button>

      {isModalOpen && (
        <TaskModal
          taskToEdit={editingTask}
          onSave={handleSaveTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
