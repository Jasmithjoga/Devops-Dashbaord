import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle2, Info, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const notifications = [
  { id: 1, type: 'critical', title: 'High CPU Usage', desc: 'Kubernetes node-03 is exceeding 95% CPU utilization.', time: '2m ago', icon: AlertTriangle, color: 'text-error' },
  { id: 2, type: 'success', title: 'Deployment Success', desc: 'Frontend-service v2.4.1 deployed to US-EAST-1.', time: '15m ago', icon: CheckCircle2, color: 'text-success' },
  { id: 3, type: 'info', title: 'New Access Token', desc: 'A new API token was generated for "Grafana-Read-Only".', time: '1h ago', icon: Info, color: 'text-accent' },
  { id: 4, type: 'warning', title: 'Database Backup', desc: 'Daily backup for "prod-db-01" completed with warnings.', time: '4h ago', icon: Zap, color: 'text-warning' },
];

export const NotificationDropdown = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-16 right-0 w-[400px] glass-card border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-accent" />
                <h3 className="font-bold text-white text-sm uppercase tracking-widest">Notifications</h3>
              </div>
              <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">4 NEW</span>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex gap-4">
                    <div className={cn("mt-1 p-2 rounded-lg bg-white/5 shrink-0", notif.color)}>
                      <notif.icon size={16} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">{notif.title}</p>
                        <span className="text-[10px] text-muted-foreground italic whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{notif.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full p-4 text-[10px] font-bold text-muted-foreground hover:text-white transition-colors bg-white/5 uppercase tracking-widest">
              View All Alerts
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
