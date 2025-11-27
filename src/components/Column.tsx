import TaskCard from './TaskCard';
import type { Task } from '../App';

import { COLUMNS } from '../api';

type ColumnProps = {
  col: { id: keyof typeof COLUMNS; name: string; color: string; headerColor: string };
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, newStatus: keyof typeof COLUMNS) => void;
  onAdd?: () => void;
};

const Column = ({ col, tasks, onEdit, onDelete, onDragStart, onDrop, onAdd }: ColumnProps) => (
  <div
    className={`w-full md:w-1/3 p-4 border-2 rounded-2xl ${col.color}`}
    onDragOver={e => e.preventDefault()}
    onDrop={e => onDrop(e, col.id)}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className={`font-extrabold text-xl ${col.headerColor}`}>
        {col.name} ({tasks.length})
      </h2>
      {col.id === 'todo' && onAdd && (
        <button onClick={onAdd} className="p-2 bg-indigo-600 text-white rounded-full shadow">
          +
        </button>
      )}
    </div>
    <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '70vh' }}>
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onDragStart={onDragStart} />
      ))}
    </div>
  </div>
);

export default Column;
