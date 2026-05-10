import React from 'react';
import { GitBranch, CheckCircle2, XCircle, PlayCircle, Clock, Terminal, Box, Layers, Cloud, Activity, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { StatCard } from '../ui/StatCard';
import { StatusBadge } from '../ui/StatusBadge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  XAxis, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

const buildTrends = [
  { day: 'Mon', success: 42, failure: 2 },
  { day: 'Tue', success: 38, failure: 5 },
  { day: 'Wed', success: 55, failure: 1 },
  { day: 'Thu', success: 48, failure: 3 },
  { day: 'Fri', success: 62, failure: 0 },
  { day: 'Sat', success: 25, failure: 2 },
  { day: 'Sun', success: 18, failure: 1 },
];

const recentBuilds = [
  { num: '#1042', project: 'frontend-service', status: 'success', duration: '2m 15s', trigger: 'GitHub Webhook', time: '5m ago' },
  { num: '#1041', project: 'auth-api', status: 'success', duration: '4m 30s', trigger: 'Manual Run', time: '12m ago' },
  { num: '#1040', project: 'payment-gateway', status: 'failure', duration: '1m 12s', trigger: 'GitHub Webhook', time: '45m ago' },
  { num: '#1039', project: 'search-index-worker', status: 'success', duration: '8m 45s', trigger: 'Cron Schedule', time: '2h ago' },
];

const pipelineStages = [
  { name: 'GitHub', icon: GitBranch, status: 'success' },
  { name: 'Jenkins', icon: GitBranch, status: 'success' },
  { name: 'Docker', icon: Box, status: 'success' },
  { name: 'Kubernetes', icon: Layers, status: 'success' },
  { name: 'AWS EC2', icon: Cloud, status: 'running' },
];

export const JenkinsDetailedSection = () => {
  return (
    <div className="space-y-8" id="jenkins-detailed">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
            <GitBranch size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Enterprise CI/CD Pipelines</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <RefreshCw size={12} className="animate-spin" />
              Auto-syncing...
           </div>
           <button className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold shadow-lg shadow-accent/20 hover:bg-accent/80 transition-colors flex items-center gap-2">
              <PlayCircle size={14} />
              Run Pipeline
           </button>
        </div>
      </div>

      {/* 1. Jenkins Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Pipelines" value="124" icon={GitBranch} color="accent" />
        <StatCard title="Successful Builds" value="8,420" icon={CheckCircle2} color="success" />
        <StatCard title="Failed Builds" value="142" icon={XCircle} color="error" />
        <StatCard title="Running Jobs" value="8" icon={Activity} color="highlight" />
        <StatCard title="Deploy Success" value="98.2%" icon={Zap} color="success" />
        <StatCard title="Avg Build Time" value="4m 24s" icon={Clock} color="purple-gradient-start" />
      </div>

      {/* 2. CI/CD Pipeline Visualization */}
      <div className="glass-card p-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">End-to-End Pipeline Flow</h3>
        <div className="relative flex items-center justify-between gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {pipelineStages.map((stage, i) => (
            <React.Fragment key={stage.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 relative min-w-[120px]"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-500",
                  stage.status === 'success' 
                    ? "bg-success/10 border-success/40 text-success shadow-success/10" 
                    : "bg-accent/10 border-accent/40 text-accent animate-pulse shadow-accent/10"
                )}>
                  <stage.icon size={28} />
                  {stage.status === 'success' && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center border-2 border-background"
                    >
                      <CheckCircle2 size={12} className="text-white" />
                    </motion.div>
                  )}
                </div>
                <span className="text-xs font-bold text-white tracking-wider">{stage.name}</span>
                <StatusBadge status={stage.status as any} size="sm" />
              </motion.div>
              {i < pipelineStages.length - 1 && (
                <div className="flex-1 min-w-[40px] flex items-center justify-center">
                  <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
                    />
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground ml-2" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 3. Recent Build Activity */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Terminal size={18} className="text-accent" />
                Recent Build Activity
              </h3>
              <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-1 rounded">Last 24 Hours</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-muted-foreground uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Build</th>
                    <th className="px-6 py-4 font-bold">Project</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Duration</th>
                    <th className="px-6 py-4 font-bold">Trigger</th>
                    <th className="px-6 py-4 font-bold text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBuilds.map((build) => (
                    <tr key={build.num} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 text-xs font-mono text-accent font-bold">{build.num}</td>
                      <td className="px-6 py-4 text-xs font-medium text-white">{build.project}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={build.status as any} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground font-mono">{build.duration}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <GitBranch size={12} className="text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{build.trigger}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[10px] text-muted-foreground text-right">{build.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Deployment Logs Panel */}
          <div className="glass-card flex flex-col h-[300px]">
             <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                   <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Deployment Logs</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                   <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                   <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
             </div>
             <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] space-y-1 bg-[#0a0a0a] custom-scrollbar">
                <p className="text-muted-foreground">[12:40:01] <span className="text-success">INFO</span> Pipeline triggered by commit <span className="text-accent">abc1234</span></p>
                <p className="text-muted-foreground">[12:40:05] <span className="text-success">INFO</span> Fetching latest code from <span className="text-white">origin/main</span></p>
                <p className="text-muted-foreground">[12:40:12] <span className="text-success">INFO</span> Building Docker image: <span className="text-highlight">trackit-api:v2.4.1</span></p>
                <p className="text-muted-foreground">[12:41:45] <span className="text-success">INFO</span> Successfully pushed to Amazon ECR</p>
                <p className="text-muted-foreground">[12:41:50] <span className="text-accent">WAIT</span> Deploying to Kubernetes cluster... pod-01, pod-02</p>
                <p className="text-muted-foreground">[12:42:01] <span className="text-success">INFO</span> Health check passed. Traffic routed to v2.4.1</p>
                <p className="text-success">[12:42:05] SUCCESS Deployment completed successfully in 2m 4s</p>
                <motion.div 
                  animate={{ opacity: [0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-accent/40 inline-block align-middle ml-1"
                />
             </div>
          </div>
        </div>

        {/* 5. Build Analytics & 7. Activity Feed */}
        <div className="space-y-8">
           <ChartCard title="Build Success Trends" subtitle="Daily pipeline performance stats">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={buildTrends}>
                  <XAxis dataKey="day" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  />
                  <Bar dataKey="success" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="failure" stackId="a" fill="#ef4444" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </ChartCard>

           <div className="glass-card p-6 flex flex-col h-[400px]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6">
                 <Zap size={16} className="text-highlight" />
                 Real-Time Activity Feed
              </h3>
              <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                 {[
                   { type: 'commit', user: 'jasmith', desc: 'Updated k8s deployment spec', time: '1m ago', icon: GitBranch, color: 'text-white' },
                   { type: 'build', user: 'jenkins', desc: 'Build #1042 successful', time: '5m ago', icon: GitBranch, color: 'text-success' },
                   { type: 'image', user: 'docker', desc: 'Image tagged v2.4.1 pushed', time: '12m ago', icon: Box, color: 'text-highlight' },
                   { type: 'deploy', user: 'k8s', desc: 'Rolled out frontend-v2 to 4 nodes', time: '15m ago', icon: Layers, color: 'text-accent' },
                   { type: 'health', user: 'aws', desc: 'Auto-scaling: added 2 nodes', time: '20m ago', icon: Cloud, color: 'text-orange-500' },
                 ].map((act, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 group"
                    >
                       <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5", act.color)}>
                          <act.icon size={14} />
                       </div>
                       <div className="flex-1">
                          <p className="text-[11px] text-white font-medium">{act.desc}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[9px] text-muted-foreground uppercase font-bold">{act.user}</span>
                             <span className="text-[9px] text-muted-foreground">•</span>
                             <span className="text-[9px] text-muted-foreground italic">{act.time}</span>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* 6. Active Deployment Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Running Deployments', value: '4', icon: PlayCircle, color: 'accent' },
           { label: 'Pending Jobs', value: '2', icon: Clock, color: 'warning' },
           { label: 'Successful Releases', value: '1,242', icon: CheckCircle2, color: 'success' },
           { label: 'Failed Releases', value: '18', icon: XCircle, color: 'error' },
         ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-5 border-t-2"
              style={{ borderTopColor: `var(--color-${item.color})` }}
            >
               <div className="flex justify-between items-center mb-4">
                  <div className={cn("p-2 rounded-lg bg-white/5", `text-${item.color}`)}>
                     <item.icon size={18} />
                  </div>
                  <span className="text-2xl font-bold text-white">{item.value}</span>
               </div>
               <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.label}</p>
            </motion.div>
         ))}
      </div>
    </div>
  );
};
