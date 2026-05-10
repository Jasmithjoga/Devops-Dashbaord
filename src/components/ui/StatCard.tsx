import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color?: string;
  chart?: React.ReactNode;
}

export const StatCard = ({ title, value, icon: Icon, trend, color = "accent", chart }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-6 flex flex-col relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full",
        `bg-${color}`
      )} />

      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border",
          `bg-${color}/10 border-${color}/20 text-${color}`
        )}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border",
            trend.isUp 
              ? "text-success bg-success/10 border-success/20" 
              : "text-error bg-error/10 border-error/20"
          )}>
            {trend.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {trend.value}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
      </div>

      {chart && (
        <div className="mt-4 h-12 w-full opacity-60">
          {chart}
        </div>
      )}
    </motion.div>
  );
};
