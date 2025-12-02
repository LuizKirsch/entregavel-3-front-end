import TaskCard from './TaskCard';
import type { Task } from '../App';

import { COLUMNS } from '../api';

type ColumnProps = {
  col: { id: keyof typeof COLUMNS; name: string; color: string; headerColor: string };
  tasks: Task[];
  allTasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, newStatus: keyof typeof COLUMNS) => void;
  onError: (message: string) => void;
};

const Column = ({ col, tasks, allTasks, onEdit, onDelete, onDragStart, onDrop, onError }: ColumnProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedTaskId = e.dataTransfer.getData('text/plain');
    const draggedTask = allTasks.find(t => t.id === draggedTaskId);
    
    if (draggedTask?.status === 'done' && col.id !== 'done') {
      e.preventDefault();
      onError('Após finalizada não pode ser alterada o status');
      return;
    }
    onDrop(e, col.id);
  };

  return (
    <div
      className={`w-full md:w-1/3 p-4 border-2 rounded-2xl ${col.color}`}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
    <div className="flex justify-between items-center mb-4">
      <h2 className={`font-extrabold text-xl ${col.headerColor}`}>
        {col.name} ({tasks.length})
      </h2>
    </div>
    <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '70vh' }}>
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onDragStart={onDragStart} />
      ))}
    </div>
  </div>
  );
};

export default Column;
