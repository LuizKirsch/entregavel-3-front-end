import { Edit, Trash2 } from 'lucide-react';
import type { Task } from '../App';

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
};

const TaskCard = ({ task, onEdit, onDelete, onDragStart }: TaskCardProps) => (
  <div
    className="p-4 mb-3 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg"
    draggable
    onDragStart={() => onDragStart(task.id)}
  >
    <div className="flex justify-between">
      <p onClick={() => onEdit(task)} className="font-semibold text-gray-800 cursor-pointer">
        {task.title}
      </p>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(task)} className="text-indigo-500"><Edit size={16} /></button>
        <button onClick={() => onDelete(task.id)} className="text-red-500"><Trash2 size={16} /></button>
      </div>
    </div>
    <p className="text-gray-500 text-sm mt-1 mb-2">{task.description}</p>
  </div>
);

export default TaskCard;
