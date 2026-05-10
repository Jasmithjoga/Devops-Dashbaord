import { GitBranch, Clock, CheckCircle2, XCircle, PlayCircle, Terminal } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { StatusBadge } from '../ui/StatusBadge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from 'recharts';

const buildHistory = [
  { build: '#102', duration: 120, status: 'success' },
  { build: '#103', duration: 145, status: 'success' },
  { build: '#104', duration: 110, status: 'success' },
  { build: '#105', duration: 300, status: 'failure' },
  { build: '#106', duration: 130, status: 'success' },
  { build: '#107', duration: 125, status: 'success' },
  { build: '#108', duration: 140, status: 'success' },
];

const pipelines = [
  { name: 'Frontend Web App', branch: 'main', status: 'success', lastBuild: '10m ago', duration: '2m 15s' },
  { name: 'Auth API Service', branch: 'develop', status: 'success', lastBuild: '2h ago', duration: '4m 45s' },
  { name: 'Data Pipeline', branch: 'feature/etl', status: 'failure', lastBuild: '1h ago', duration: '12m 30s' },
  { name: 'Infrastructure IaC', branch: 'master', status: 'success', lastBuild: '1d ago', duration: '8m 20s' },
];

export const JenkinsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <GitBranch className="text-accent" size={20} />
        </div>
        <h2 className="text-xl font-bold text-white">CI/CD Pipeline</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Build Duration Trends */}
        <ChartCard 
          title="Build Duration Trends" 
          subtitle="Time taken for recent builds (seconds)"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={buildHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="build" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0a0a0a' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pipeline Summary Stats */}
        <div className="space-y-4">
           {[
             { label: 'Success Rate', value: '94.2%', icon: CheckCircle2, color: 'text-success' },
             { label: 'Avg Build Time', value: '4m 12s', icon: Clock, color: 'text-accent' },
             { label: 'Failed Builds', value: '12', icon: XCircle, color: 'text-error' },
             { label: 'Total Runs', value: '1,420', icon: PlayCircle, color: 'text-highlight' },
           ].map((stat, i) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-4 flex items-center justify-between"
             >
                <div className="flex items-center gap-3">
                   <stat.icon className={stat.color} size={18} />
                   <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-lg font-bold text-white">{stat.value}</span>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Active Pipelines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pipelines.map((pipeline, i) => (
          <motion.div
            key={pipeline.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 group hover:border-accent/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl border",
                  pipeline.status === 'success' ? "bg-success/10 border-success/20 text-success" : "bg-error/10 border-error/20 text-error"
                )}>
                  <Terminal size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-accent transition-colors">{pipeline.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <GitBranch size={12} className="text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-mono">{pipeline.branch}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={pipeline.status as any} size="sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Last Build</span>
                <span className="text-xs font-bold text-white">{pipeline.lastBuild}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Duration</span>
                <span className="text-xs font-bold text-white">{pipeline.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
