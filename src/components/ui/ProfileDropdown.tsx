import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Shield, Activity, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProfileDropdown = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-16 right-0 w-[280px] glass-card border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            {/* User Info Card */}
            <div className="p-6 bg-gradient-to-br from-white/5 to-transparent border-b border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-highlight p-0.5">
                  <div className="w-full h-full rounded-[14px] bg-charcoal flex items-center justify-center text-white font-bold text-lg">
                    J
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Jasmith</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">SRE Architect • Cloud Ops</p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              { [
                { icon: User, label: 'Profile Settings', color: 'text-accent' },
                { icon: CreditCard, label: 'Billing & Plans', color: 'text-white' },
                { icon: Shield, label: 'Security Center', color: 'text-success' },
                { icon: Activity, label: 'System Health', color: 'text-highlight' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-all group"
                >
                  <item.icon size={16} className={cn("group-hover:scale-110 transition-transform", item.color)} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-white/5">
               <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-error/10 text-muted-foreground hover:text-error transition-all group">
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
