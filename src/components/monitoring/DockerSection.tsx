import { Box } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { StatusBadge } from '../ui/StatusBadge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const activityData = [
  { name: '00:00', cpu: 45, ram: 60 },
  { name: '04:00', cpu: 52, ram: 62 },
  { name: '08:00', cpu: 85, ram: 75 },
  { name: '12:00', cpu: 78, ram: 80 },
  { name: '16:00', cpu: 65, ram: 72 },
  { name: '20:00', cpu: 90, ram: 85 },
  { name: '23:59', cpu: 70, ram: 78 },
];

const containerStats = [
  { name: 'API Gateway', status: 'running', cpu: 12, ram: 256, uptime: '12d 4h' },
  { name: 'Auth Service', status: 'running', cpu: 8, ram: 128, uptime: '12d 4h' },
  { name: 'Payment Worker', status: 'error', cpu: 0, ram: 0, uptime: '0h' },
  { name: 'Search Engine', status: 'running', cpu: 45, ram: 1024, uptime: '5d 2h' },
  { name: 'Notification Hub', status: 'running', cpu: 15, ram: 512, uptime: '8d 1h' },
];

export const DockerSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Box className="text-accent" size={20} />
        </div>
        <h2 className="text-xl font-bold text-white">Docker Monitoring</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Usage Chart */}
        <ChartCard 
          title="Cluster Resource Usage" 
          subtitle="Real-time CPU and RAM utilization across all containers"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#525252" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#525252" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#171717', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorCpu)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="ram" 
                stroke="#7c3aed" 
                fillOpacity={1} 
                fill="url(#colorRam)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Container Status Distribution */}
        <ChartCard 
          title="Container Status" 
          subtitle="Distribution of current states"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Running', value: 42, color: '#10b981' },
              { name: 'Stopped', value: 5, color: '#737373' },
              { name: 'Error', value: 2, color: '#ef4444' },
            ]}>
              <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {[0, 1, 2].map((_, index) => (
                  <Cell key={`cell-${index}`} fill={['#10b981', '#737373', '#ef4444'][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Container List Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h3 className="font-bold text-white">Active Containers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-muted-foreground uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Container Name</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">CPU Usage</th>
                <th className="px-6 py-4 font-bold text-center">RAM Usage</th>
                <th className="px-6 py-4 font-bold">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {containerStats.map((container) => (
                <tr key={container.name} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
                        <Box size={14} />
                      </div>
                      <span className="text-sm font-medium text-white">{container.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={container.status as any} size="sm" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${container.cpu}%` }}
                          className={cn("h-full", container.cpu > 80 ? 'bg-error' : 'bg-accent')}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{container.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-white">{container.ram} MB</span>
                        <span className="text-[10px] text-muted-foreground">Limit: 2GB</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground font-mono">
                    {container.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
