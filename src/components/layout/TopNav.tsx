import { Search, Bell, Globe, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NotificationDropdown } from '../ui/NotificationDropdown';
import { ProfileDropdown } from '../ui/ProfileDropdown';
import { cn } from '@/lib/utils';

export const TopNav = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/5 px-8 py-4 flex items-center justify-between backdrop-blur-xl">
      <div className="flex items-center gap-8 flex-1">
        {/* Search Bar */}
        <div className="relative group max-w-md w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search resources, pods, logs..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Global Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">US-EAST-1</span>
          </div>
          <div className="flex items-center gap-2">
            <Server size={14} className="text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Cluster: production-v2</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          className={cn(
            "relative p-2.5 rounded-xl border transition-all duration-300",
            showNotifications ? "bg-accent/20 border-accent/40 text-accent" : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
          )}
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-background shadow-[0_0_8px_#ef4444]" />
        </motion.button>

        <NotificationDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

        {/* Region Selector */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors text-sm font-medium">
          <Globe size={16} />
          Global
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 relative">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">Jasmith</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">SRE Architect</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className={cn(
              "w-10 h-10 rounded-xl border p-0.5 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300",
              showProfile ? "bg-accent/20 border-accent/40" : "bg-gradient-to-br from-slate to-charcoal border-white/10"
            )}
          >
            <div className={cn(
              "w-full h-full rounded-[10px] flex items-center justify-center font-bold transition-colors",
              showProfile ? "bg-accent text-white" : "bg-white/10 text-accent"
            )}>
              J
            </div>
          </motion.div>
          
          <ProfileDropdown isOpen={showProfile} onClose={() => setShowProfile(false)} />
        </div>
      </div>
    </header>
  );
};
