import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}

export const ChartCard = ({ title, subtitle, children, className, extra }: ChartCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("glass-card p-6 flex flex-col h-full", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {extra && <div className="flex items-center gap-2">{extra}</div>}
      </div>
      
      <div className="flex-1 min-h-[200px] w-full">
        {children}
      </div>
    </motion.div>
  );
};
