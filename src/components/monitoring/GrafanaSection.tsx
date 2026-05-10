import { BarChart3, Filter, Maximize2, Share2 } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  Legend
} from 'recharts';

const analyticsData = [
  { name: 'Mon', traffic: 4000, latency: 240, uptime: 99.9 },
  { name: 'Tue', traffic: 3000, latency: 139, uptime: 99.8 },
  { name: 'Wed', traffic: 2000, latency: 980, uptime: 99.5 },
  { name: 'Thu', traffic: 2780, latency: 390, uptime: 99.9 },
  { name: 'Fri', traffic: 1890, latency: 480, uptime: 99.9 },
  { name: 'Sat', traffic: 2390, latency: 380, uptime: 99.9 },
  { name: 'Sun', traffic: 3490, latency: 430, uptime: 99.9 },
];

export const GrafanaSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-400/10 border border-orange-400/20">
            <BarChart3 className="text-orange-400" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Grafana Advanced Analytics</h2>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
              <Filter size={16} />
           </button>
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
              <Maximize2 size={16} />
           </button>
           <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-colors">
              <Share2 size={16} />
           </button>
        </div>
      </div>

      <ChartCard 
        title="Infrastructure Health Trends" 
        subtitle="Correlation between traffic volume, system latency, and overall uptime"
        className="w-full"
      >
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={analyticsData}>
            <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Area type="monotone" dataKey="traffic" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" />
            <Bar dataKey="latency" barSize={20} fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="glass-card p-6 h-64 flex flex-col justify-between">
            <div>
               <h4 className="text-sm font-bold text-white">System Load Heatmap</h4>
               <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Global distribution</p>
            </div>
            <div className="flex-1 mt-4 grid grid-cols-7 grid-rows-4 gap-1">
               {Array.from({ length: 28 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={cn(
                      "rounded-[2px] transition-all hover:scale-110",
                      i % 7 === 0 ? "bg-success/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : 
                      i % 5 === 0 ? "bg-warning/60" :
                      i % 3 === 0 ? "bg-accent/40" : "bg-white/5"
                    )}
                  />
               ))}
            </div>
            <div className="flex items-center justify-between mt-4">
               <span className="text-[8px] text-muted-foreground uppercase">Low Load</span>
               <div className="flex gap-1 h-1.5 w-32 bg-gradient-to-r from-white/5 via-accent/40 to-success rounded-full" />
               <span className="text-[8px] text-muted-foreground uppercase">High Load</span>
            </div>
         </div>

         <div className="glass-card p-6 h-64 flex flex-col">
            <h4 className="text-sm font-bold text-white">Traffic Analytics</h4>
            <div className="mt-8 space-y-6">
               {[
                 { label: 'Mobile Users', value: 65, color: 'bg-accent' },
                 { label: 'Desktop Users', value: 85, color: 'bg-highlight' },
                 { label: 'API Clients', value: 45, color: 'bg-purple-gradient-start' },
               ].map((item) => (
                  <div key={item.label} className="space-y-2">
                     <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-white">{item.value}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          className={cn("h-full", item.color)}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
