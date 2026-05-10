import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Key, Lock, Fingerprint, Eye, Copy, Smartphone, CheckCircle2, Monitor } from 'lucide-react';

export const SecurityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-card border border-white/10 shadow-2xl overflow-hidden my-8"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10 text-success">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Security & Compliance</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">SRE Access Control Center</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* API Token Management */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                     <Key size={12} /> API Token Management
                   </h4>
                   <button className="text-[10px] font-bold text-accent uppercase tracking-widest hover:underline">+ Generate New Token</button>
                </div>
                
                <div className="space-y-3">
                   {[
                     { name: 'Grafana-Dev-01', key: 'pk_live_******************abc', expiry: 'Jan 12, 2027', status: 'active' },
                     { name: 'Jenkins-Auto-Deploy', key: 'pk_test_******************xyz', expiry: 'Dec 05, 2026', status: 'active' },
                   ].map((token) => (
                     <div key={token.name} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start mb-3">
                           <div>
                              <p className="text-sm font-bold text-white">{token.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Expires: {token.expiry}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"><Eye size={14}/></button>
                              <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"><Copy size={14}/></button>
                              <button className="p-1.5 rounded-lg hover:bg-error/10 text-error/60 transition-colors"><X size={14}/></button>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground bg-black/20 p-2 rounded-lg">
                           <Lock size={12}/>
                           {token.key}
                        </div>
                     </div>
                   ))}
                </div>
              </section>

              {/* MFA Status */}
              <section className="p-6 rounded-2xl bg-gradient-to-br from-success/5 to-transparent border border-success/20">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <Smartphone size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">Two-Factor Authentication</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">MFA is currently active on your account via Google Authenticator. Your backup codes are stored securely.</p>
                   </div>
                   <button className="px-4 py-2 rounded-lg bg-success text-white text-xs font-bold shadow-lg shadow-success/20">
                      Manage MFA
                   </button>
                </div>
              </section>

              {/* Login Activity */}
              <section className="space-y-6">
                <h4 className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                  <Fingerprint size={12} /> Recent Login Activity
                </h4>
                <div className="overflow-hidden border border-white/5 rounded-2xl">
                   <table className="w-full text-left">
                      <tbody className="divide-y divide-white/5">
                        {[
                          { device: 'MacBook Pro (Chrome)', location: 'San Francisco, US', ip: '192.168.1.42', time: 'Just now' },
                          { device: 'iPhone 15 Pro', location: 'San Francisco, US', ip: '172.20.10.2', time: '2 hours ago' },
                          { device: 'Linux Workstation', location: 'London, UK', ip: '10.0.0.124', time: '1 day ago' },
                        ].map((log, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                             <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground">
                                      <Monitor size={14} />
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-white">{log.device}</p>
                                      <p className="text-[10px] text-muted-foreground">{log.location}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-4 py-4 text-xs font-mono text-muted-foreground">{log.ip}</td>
                             <td className="px-4 py-4 text-[10px] text-muted-foreground text-right">{log.time}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end">
               <div className="flex items-center gap-2 text-success font-bold text-[10px] uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3" /> System Shield v4.0.2 Active
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
