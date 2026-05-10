import { Activity, Zap, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from 'recharts';

const metricsData = [
  { time: '12:00', requests: 1200, errors: 12, latency: 45 },
  { time: '12:05', requests: 1450, errors: 8, latency: 42 },
  { time: '12:10', requests: 1800, errors: 45, latency: 68 },
  { time: '12:15', requests: 2400, errors: 120, latency: 150 },
  { time: '12:20', requests: 2100, errors: 60, latency: 90 },
  { time: '12:25', requests: 1900, errors: 25, latency: 55 },
  { time: '12:30', requests: 1750, errors: 15, latency: 48 },
];

export const PrometheusSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-error/10 border border-error/20">
            <Activity className="text-error" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Prometheus Metrics</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full">
           <Zap size={12} className="text-success" />
           <span className="text-[10px] font-bold text-success uppercase tracking-wider">Scraping: 1s interval</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Request Rate (req/s)" 
          subtitle="Total requests across all ingress controllers"
          extra={<div className="flex items-center gap-1 text-success text-xs font-bold"><ArrowUpRight size={14}/> +12.5%</div>}
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="time" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
              <Area type="step" dataKey="requests" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Error Rate (4xx/5xx)" 
          subtitle="Service level error distribution"
          extra={<div className="flex items-center gap-1 text-error text-xs font-bold"><AlertTriangle size={14}/> Critical Spike</div>}
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={metricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="time" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'P99 Latency', value: '142ms', sub: 'Last 1m avg', color: 'text-highlight' },
           { label: 'Goroutines', value: '14.2k', sub: 'Across cluster', color: 'text-accent' },
           { label: 'Heap Usage', value: '4.8GB', sub: 'Memory footprint', color: 'text-purple-gradient-start' },
         ].map((stat) => (
           <div key={stat.label} className="glass-card p-6 flex flex-col justify-center border-t-2" style={{ borderTopColor: `var(--color-${stat.color.split('-')[1]})` }}>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{stat.label}</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-bold text-white tracking-tighter">{stat.value}</span>
                 <span className="text-[10px] text-muted-foreground italic">{stat.sub}</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
