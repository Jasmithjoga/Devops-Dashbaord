import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Box, 
  Layers, 
  GitBranch, 
  Cloud, 
  Activity, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  Terminal,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, collapsed, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative flex items-center w-full p-3 rounded-xl transition-all duration-300 group",
      active 
        ? "bg-accent/10 text-accent shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
        : "text-muted-foreground hover:bg-white/5 hover:text-white"
    )}
  >
    <Icon size={20} className={cn("shrink-0", active ? "text-accent" : "text-muted-foreground group-hover:text-white")} />
    {!collapsed && (
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="ml-3 font-medium whitespace-nowrap"
      >
        {label}
      </motion.span>
    )}
    {active && (
      <motion.div
        layoutId="active-pill"
        className="absolute left-0 w-1 h-6 bg-accent rounded-full"
      />
    )}
  </button>
);

export const Sidebar = ({ onOpenSettings, onOpenSecurity }: { onOpenSettings: () => void, onOpenSecurity: () => void }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Box, label: 'Docker', id: 'docker' },
    { icon: Layers, label: 'Kubernetes', id: 'kubernetes' },
    { icon: GitBranch, label: 'CI/CD Pipeline', id: 'jenkins-detailed' },
    { icon: Cloud, label: 'AWS EC2', id: 'aws' },
    { icon: Activity, label: 'Prometheus', id: 'prometheus' },
    { icon: BarChart3, label: 'Grafana', id: 'grafana' },
    { icon: Terminal, label: 'Logs & Alerts', id: 'logs' },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id === 'overview' ? 'Overview' : navItems.find(item => item.id === id)?.label || 'Overview');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const bottomItems = [
    { icon: ShieldCheck, label: 'Security', onClick: onOpenSecurity },
    { icon: Settings, label: 'Settings', onClick: onOpenSettings },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-screen glass border-r border-white/5 z-50 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-highlight flex items-center justify-center shadow-lg shadow-accent/20">
                <Cloud className="text-white" size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight gradient-text">TrackIt</span>
            </motion.div>
          )}
          {collapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-highlight flex items-center justify-center mx-auto"
            >
              <Cloud className="text-white" size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-3 space-y-2 py-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            active={activeTab === item.label}
            collapsed={collapsed}
            onClick={() => scrollToSection(item.id)}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {bottomItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            collapsed={collapsed}
            onClick={item.onClick}
          />
        ))}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 mt-4 text-muted-foreground hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </motion.aside>
  );
};
