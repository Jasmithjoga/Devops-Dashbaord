import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, RefreshCw, Bell, Monitor, Palette, Save } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}

const Toggle = ({ enabled, onToggle, label }: ToggleProps) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm font-medium text-white">{label}</span>
    <button
      onClick={onToggle}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200 outline-none",
        enabled ? "bg-accent" : "bg-white/10"
      )}
    >
      <motion.div
        animate={{ x: enabled ? 22 : 2 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </button>
  </div>
);

export const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Monitor size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Dashboard Settings</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">Customization & Performance</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              <section className="space-y-4">
                <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Palette size={12} /> Appearance
                </h4>
                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => setDarkMode(true)}
                     className={cn(
                       "p-4 rounded-2xl border transition-all flex flex-col items-center gap-3",
                       darkMode ? "bg-accent/10 border-accent text-accent" : "bg-white/5 border-white/5 text-muted-foreground"
                     )}
                   >
                     <Moon size={24} />
                     <span className="text-xs font-bold uppercase tracking-wider">Dark Mode</span>
                   </button>
                   <button 
                     onClick={() => setDarkMode(false)}
                     className={cn(
                       "p-4 rounded-2xl border transition-all flex flex-col items-center gap-3",
                       !darkMode ? "bg-accent/10 border-accent text-accent" : "bg-white/5 border-white/5 text-muted-foreground"
                     )}
                   >
                     <Sun size={24} />
                     <span className="text-xs font-bold uppercase tracking-wider">Light Mode</span>
                   </button>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                  <RefreshCw size={12} /> Real-Time Engine
                </h4>
                <div className="space-y-1">
                  <Toggle label="Auto-Refresh Dashboard" enabled={autoRefresh} onToggle={() => setAutoRefresh(!autoRefresh)} />
                  <div className="py-4 space-y-4">
                     <div className="flex justify-between items-center text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        <span>Refresh Interval</span>
                        <span className="text-accent">5 Seconds</span>
                     </div>
                     <input type="range" className="w-full h-1.5 bg-white/10 rounded-full appearance-none accent-accent cursor-pointer" />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Bell size={12} /> System Notifications
                </h4>
                <Toggle label="Enable Push Notifications" enabled={notifications} onToggle={() => setNotifications(!notifications)} />
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end gap-4">
               <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-white transition-colors">
                 Cancel
               </button>
               <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent/80 transition-all flex items-center gap-2">
                 <Save size={16} />
                 Save Changes
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
