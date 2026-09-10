import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface NotificationToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
  className?: string;
}

const typeStyles = {
  success: {
    bg: "bg-emerald-800 text-white border-emerald-700",
    icon: CheckCircle2,
  },
  error: {
    bg: "bg-rose-800 text-white border-rose-700",
    icon: AlertCircle,
  },
  warning: {
    bg: "bg-amber-600 text-white border-amber-500",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-navy-900 text-white border-navy-800",
    icon: Info,
  },
};

export default function NotificationToast({
  message,
  type = "success",
  onClose,
  className = "",
}: NotificationToastProps) {
  const { bg, icon: Icon } = typeStyles[type];

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-md shadow-lg border text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200 ${bg} ${className}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 ml-2"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
