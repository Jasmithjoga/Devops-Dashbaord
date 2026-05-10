import { Box, Layers, GitBranch, Activity, Cloud, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const miniChartData = [
  { value: 40 }, { value: 60 }, { value: 45 }, { value: 80 }, { value: 50 }, { value: 90 }, { value: 75 }
];

const MiniChart = ({ color }: { color: string }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={miniChartData}>
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        fill={color} 
        fillOpacity={0.1} 
        strokeWidth={2} 
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const OverviewSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard 
        title="Active Containers" 
        value="42" 
        icon={Box} 
        trend={{ value: '12%', isUp: true }}
        color="accent"
        chart={<MiniChart color="#3b82f6" />}
      />
      <StatCard 
        title="Running Pods" 
        value="1,240" 
        icon={Layers} 
        trend={{ value: '8%', isUp: true }}
        color="purple-gradient-start"
        chart={<MiniChart color="#7c3aed" />}
      />
      <StatCard 
        title="CI/CD Success" 
        value="94.2%" 
        icon={GitBranch} 
        trend={{ value: '2.4%', isUp: true }}
        color="success"
        chart={<MiniChart color="#10b981" />}
      />
      <StatCard 
        title="Server Health" 
        value="99.9%" 
        icon={Activity} 
        trend={{ value: '0.1%', isUp: true }}
        color="highlight"
        chart={<MiniChart color="#06b6d4" />}
      />
      <StatCard 
        title="Cluster Uptime" 
        value="14d 8h" 
        icon={Cloud} 
        color="warning"
        chart={<MiniChart color="#f59e0b" />}
      />
      <StatCard 
        title="Deployments" 
        value="84" 
        icon={CheckCircle2} 
        trend={{ value: '15%', isUp: true }}
        color="accent"
        chart={<MiniChart color="#3b82f6" />}
      />
    </div>
  );
};
