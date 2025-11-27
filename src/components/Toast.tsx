import { useEffect } from 'react';
import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';

type ToastProps = {
  id: string;
  message: string;
  type: 'success' | 'error';
  onClose: (id: string) => void;
};

const Toast = ({ id, message, type, onClose }: ToastProps) => {
  const isSuccess = type === 'success';
  const color = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`${color} text-white p-4 rounded-lg shadow-xl mb-3 flex items-center`} style={{ minWidth: '300px' }}>
      <Icon size={24} className="mr-3" />
      <span className="font-medium flex-grow">{message}</span>
      <button onClick={() => onClose(id)} className="ml-4 p-1 rounded-full hover:bg-white/20">
        <XCircle size={18} />
      </button>
    </div>
  );
};

export default Toast;
