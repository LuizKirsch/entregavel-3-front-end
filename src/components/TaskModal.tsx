import { useState } from 'react';
import { PlusCircle, Edit, XCircle, Save } from 'lucide-react';
import type { Task } from '../App';
const COLUMNS = {
  todo: { id: 'todo', name: 'A Fazer' },
  inProgress: { id: 'inProgress', name: 'Em Andamento' },
  done: { id: 'done', name: 'Concluído' },
} as const;

type TaskModalProps = {
  taskToEdit?: Task | null;
  onSave: (task: Partial<Task>) => void;
  onClose: () => void;
};

const TaskModal = ({ taskToEdit, onSave, onClose }: TaskModalProps) => {
  const isEditing = !!taskToEdit;
  const [title, setTitle] = useState<string>(taskToEdit?.title || '');
  const [description, setDescription] = useState<string>(taskToEdit?.description || '');
  const [status, setStatus] = useState<keyof typeof COLUMNS>(taskToEdit?.status || 'todo');

  const handleSave = () => {
    if (title.trim() === '') return;
    onSave({
      id: taskToEdit?.id,
      title,
      description,
      status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            {isEditing ? <Edit size={24} className="mr-2 text-indigo-600" /> : <PlusCircle size={24} className="mr-2 text-indigo-600" />}
            {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <XCircle size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <select className="w-full p-3 border rounded-lg" value={status} onChange={e => setStatus(e.target.value as keyof typeof COLUMNS)}>
            {Object.values(COLUMNS).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow"
          >
            <Save size={18} className="inline mr-2" />
            {isEditing ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
