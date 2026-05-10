import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'running' | 'stopped' | 'error' | 'pending' | 'success' | 'warning' | 'healthy' | 'unhealthy' | 'failure';
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  running: { color: 'bg-success', text: 'text-success', label: 'Running' },
  healthy: { color: 'bg-success', text: 'text-success', label: 'Healthy' },
  success: { color: 'bg-success', text: 'text-success', label: 'Success' },
  failure: { color: 'bg-error', text: 'text-error', label: 'Failure' },
  stopped: { color: 'bg-muted', text: 'text-muted-foreground', label: 'Stopped' },
  error: { color: 'bg-error', text: 'text-error', label: 'Error' },
  unhealthy: { color: 'bg-error', text: 'text-error', label: 'Unhealthy' },
  pending: { color: 'bg-warning', text: 'text-warning', label: 'Pending' },
  warning: { color: 'bg-warning', text: 'text-warning', label: 'Warning' },
};

export const StatusBadge = ({ status, label, className, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-2.5 py-1 rounded-full border bg-white/5",
      `border-${config.color.split('-')[1]}/20`,
      className
    )}>
      <div className={cn(
        "rounded-full animate-pulse",
        config.color,
        size === 'sm' ? 'w-1 h-1' : 'w-2 h-2',
        `shadow-[0_0_8px_${config.color === 'bg-success' ? '#10b981' : config.color === 'bg-error' ? '#ef4444' : '#f59e0b'}]`
      )} />
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wider",
        config.text,
        size === 'sm' ? 'text-[8px]' : 'text-[10px]'
      )}>
        {label || config.label}
      </span>
    </div>
  );
};
