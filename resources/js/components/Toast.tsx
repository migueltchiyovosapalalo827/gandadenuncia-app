import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

const typeStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
};

export function Toast({ id, title, description, type = 'info', onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-lg border p-4 shadow-lg transition-all duration-300 ${typeStyles[type]}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="rounded-full p-1 hover:bg-black/5"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 