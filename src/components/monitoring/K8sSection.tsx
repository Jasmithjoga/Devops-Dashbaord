import { Layers, Server, Database, Activity, LayoutGrid } from 'lucide-react';
import { ChartCard } from '../ui/ChartCard';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';

const podStatusData = [
  { name: 'Running', value: 124, fill: '#10b981' },
  { name: 'Pending', value: 8, fill: '#f59e0b' },
  { name: 'Failed', value: 3, fill: '#ef4444' },
  { name: 'Succeeded', value: 45, fill: '#3b82f6' },
];

const nodeUtilization = [
  { name: 'node-01', cpu: 75, ram: 82, fill: '#3b82f6' },
  { name: 'node-02', cpu: 45, ram: 55, fill: '#06b6d4' },
  { name: 'node-03', cpu: 92, ram: 88, fill: '#ef4444' },
  { name: 'node-04', cpu: 60, ram: 65, fill: '#7c3aed' },
];

export const K8sSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
            <Layers className="text-accent" size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Kubernetes Cluster</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Context:</span>
              <span className="text-xs font-bold text-white">prod-cluster-01</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Nodes', value: '48 Active', icon: Server, color: 'accent' },
          { label: 'Total Pods', value: '1,240', icon: LayoutGrid, color: 'purple-gradient-start' },
          { label: 'Namespaces', value: '12', icon: Database, color: 'highlight' },
          { label: 'Deployments', value: '84', icon: Activity, color: 'success' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex items-center gap-4 border-l-4"
            style={{ borderLeftColor: `var(--color-${stat.color})` }}
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Pod Health Distribution" 
          subtitle="Overall health of pods across all namespaces"
        >
          <div className="flex items-center justify-center h-full">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={podStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {podStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard 
          title="Node Resource Utilization" 
          subtitle="CPU and Memory consumption per master/worker node"
        >
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="20%" 
              outerRadius="100%" 
              barSize={10} 
              data={nodeUtilization}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
                background
                dataKey="cpu"
                cornerRadius={10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
