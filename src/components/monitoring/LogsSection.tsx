import { Terminal, AlertCircle, CheckCircle2, Search, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const logs = [
  { id: 1, time: '2026-05-10 12:45:12', level: 'info', service: 'auth-api', message: 'User login successful for user_id: 1042', code: 200 },
  { id: 2, time: '2026-05-10 12:45:15', level: 'warning', service: 'payment-worker', message: 'Latency spike detected in Stripe API connection', code: 499 },
  { id: 3, time: '2026-05-10 12:45:18', level: 'error', service: 'k8s-master', message: 'Failed to schedule pod: Insufficient memory on node-03', code: 503 },
  { id: 4, time: '2026-05-10 12:45:20', level: 'info', service: 'nginx-ingress', message: 'Certificate renewed successfully for domain *.nimbus.cloud', code: 200 },
  { id: 5, time: '2026-05-10 12:45:22', level: 'critical', service: 'database-main', message: 'Read-only mode enabled: disk space < 5%', code: 507 },
  { id: 6, time: '2026-05-10 12:45:25', level: 'info', service: 'redis-cache', message: 'Evicted 1,240 keys due to maxmemory policy', code: 200 },
];

export const LogsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Terminal className="text-accent" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Alerts & System Logs</h2>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input 
                type="text" 
                placeholder="Filter logs..." 
                className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-accent/40 w-64"
              />
           </div>
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
              <Download size={14} />
           </button>
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-error transition-colors">
              <Trash2 size={14} />
           </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center gap-6">
           {['All Logs', 'Errors', 'Warnings', 'Critical'].map((tab, i) => (
              <button 
                key={tab} 
                className={cn(
                  "text-[10px] uppercase font-bold tracking-widest transition-colors",
                  i === 0 ? "text-accent border-b-2 border-accent pb-4 -mb-4" : "text-muted-foreground hover:text-white pb-4 -mb-4"
                )}
              >
                {tab}
              </button>
           ))}
        </div>
        
        <div className="p-4 font-mono text-[11px] leading-relaxed max-h-[600px] overflow-y-auto custom-scrollbar">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "flex items-start gap-4 p-2 rounded hover:bg-white/5 transition-colors group border-l-2 mb-1",
                log.level === 'info' ? "border-transparent" :
                log.level === 'warning' ? "border-warning/40 bg-warning/5" :
                log.level === 'error' ? "border-error/40 bg-error/5" : "border-purple-600 bg-purple-600/5"
              )}
            >
              <span className="text-muted-foreground shrink-0">{log.time}</span>
              <span className={cn(
                "font-bold uppercase w-16",
                log.level === 'info' ? "text-accent" :
                log.level === 'warning' ? "text-warning" :
                log.level === 'error' ? "text-error" : "text-purple-400"
              )}>
                [{log.level}]
              </span>
              <span className="text-highlight font-bold w-32 truncate">[{log.service}]</span>
              <span className="text-white flex-1">{log.message}</span>
              <span className={cn(
                "px-1.5 py-0.5 rounded text-[9px] font-bold",
                log.code < 300 ? "bg-success/20 text-success" : 
                log.code < 500 ? "bg-warning/20 text-warning" : "bg-error/20 text-error"
              )}>
                {log.code}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="glass-card p-6 border-l-4 border-error">
            <div className="flex items-center gap-3 mb-4">
               <AlertCircle className="text-error" size={20} />
               <h4 className="font-bold text-white">Active Critical Alerts</h4>
            </div>
            <div className="space-y-3">
               <div className="p-3 bg-error/10 rounded-lg border border-error/20 flex justify-between items-center">
                  <div>
                     <p className="text-sm font-bold text-white">Storage Critical</p>
                     <p className="text-[10px] text-muted-foreground mt-0.5">Database cluster 'prod-db-01' is running out of disk space.</p>
                  </div>
                  <button className="text-[10px] font-bold text-error uppercase hover:underline">Resolve</button>
               </div>
            </div>
         </div>

         <div className="glass-card p-6 border-l-4 border-success">
            <div className="flex items-center gap-3 mb-4">
               <CheckCircle2 className="text-success" size={20} />
               <h4 className="font-bold text-white">System Notifications</h4>
            </div>
            <div className="space-y-3">
               <div className="p-3 bg-success/10 rounded-lg border border-success/20 flex justify-between items-center">
                  <div>
                     <p className="text-sm font-bold text-white">Auto-Scaling Triggered</p>
                     <p className="text-[10px] text-muted-foreground mt-0.5">Added 3 new instances to 'web-tier-asg' due to high traffic.</p>
                  </div>
                  <span className="text-[9px] text-muted-foreground italic">2m ago</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
