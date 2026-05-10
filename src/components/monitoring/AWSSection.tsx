import { Cloud, HardDrive, Database, Activity, ShieldCheck } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { StatusBadge } from '../ui/StatusBadge';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

const networkData = [
  { name: '00:00', in: 450, out: 300 },
  { name: '04:00', in: 320, out: 210 },
  { name: '08:00', in: 850, out: 640 },
  { name: '12:00', in: 980, out: 720 },
  { name: '16:00', in: 740, out: 580 },
  { name: '20:00', in: 1200, out: 950 },
  { name: '23:59', in: 600, out: 420 },
];

const instances = [
  { id: 'i-0a2b3c4d', type: 't3.large', zone: 'us-east-1a', cpu: 42, status: 'running' },
  { id: 'i-5e6f7g8h', type: 'm5.xlarge', zone: 'us-east-1b', cpu: 15, status: 'running' },
  { id: 'i-9i0j1k2l', type: 'c5.2xlarge', zone: 'us-east-1a', cpu: 88, status: 'running' },
  { id: 'i-3m4n5o6p', type: 't3.medium', zone: 'us-east-1c', cpu: 0, status: 'stopped' },
];

export const AWSSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Cloud className="text-orange-500" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">AWS EC2 Monitoring</h2>
        </div>
        <div className="flex items-center gap-2">
           <ShieldCheck className="text-success" size={16} />
           <span className="text-xs font-medium text-muted-foreground italic">VPC: vpc-0428ea (Production)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Traffic */}
        <ChartCard 
          title="Network Throughput" 
          subtitle="Real-time data ingress and egress (MB/s)"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={networkData}>
              <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
              />
              <Bar dataKey="in" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="out" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Global Storage Status */}
        <div className="space-y-4">
           {[
             { label: 'EBS Volume Usage', value: '4.2 TB', icon: HardDrive, color: 'text-highlight' },
             { label: 'S3 Object Count', value: '1.2M', icon: Database, color: 'text-accent' },
             { label: 'ElastiCache Hits', value: '98.5%', icon: Activity, color: 'text-success' },
           ].map((stat) => (
             <div key={stat.label} className="glass-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <stat.icon size={16} className={stat.color} />
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</span>
                   </div>
                   <span className="text-xs font-bold text-white">{stat.value}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '42%' }}
                     className="h-full bg-accent"
                   />
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* EC2 Instance Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-[10px] text-muted-foreground uppercase tracking-widest">
              <th className="px-6 py-4 font-bold">Instance ID</th>
              <th className="px-6 py-4 font-bold">Instance Type</th>
              <th className="px-6 py-4 font-bold">Zone</th>
              <th className="px-6 py-4 font-bold">CPU Usage</th>
              <th className="px-6 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {instances.map((instance) => (
              <tr key={instance.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 text-sm font-mono text-accent">{instance.id}</td>
                <td className="px-6 py-4 text-sm text-white font-medium">{instance.type}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground">{instance.zone}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className={`h-full ${instance.cpu > 80 ? 'bg-error' : 'bg-success'}`}
                          style={{ width: `${instance.cpu}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">{instance.cpu}%</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={instance.status as any} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
