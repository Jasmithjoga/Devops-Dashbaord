import { motion } from 'framer-motion';
import { Sparkles, Activity } from 'lucide-react';
import { OverviewSection } from '@/components/monitoring/OverviewSection';
import { DockerSection } from '@/components/monitoring/DockerSection';
import { K8sSection } from '@/components/monitoring/K8sSection';
import { AWSSection } from '@/components/monitoring/AWSSection';
import { PrometheusSection } from '@/components/monitoring/PrometheusSection';
import { GrafanaSection } from '@/components/monitoring/GrafanaSection';
import { LogsSection } from '@/components/monitoring/LogsSection';
import { JenkinsDetailedSection } from '@/components/monitoring/JenkinsDetailedSection';

export const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-accent font-medium mb-2"
          >
            <Sparkles size={16} />
            <span className="text-sm uppercase tracking-widest">Platform Insights</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white"
          >
            Infrastructure <span className="gradient-text">Overview</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-2 max-w-xl"
          >
            Real-time monitoring and observability across your cloud-native stack. 
            All systems operational.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md"
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">System Health</span>
            <span className="text-xl font-bold text-success">99.98%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Activity className="text-success" size={24} />
          </div>
        </motion.div>
      </section>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* 1. Overview Stats */}
        <motion.section variants={itemVariants} id="overview">
          <OverviewSection />
        </motion.section>

        <div className="grid grid-cols-1 gap-16">
          {/* 2. Docker Monitoring */}
          <motion.section variants={itemVariants} id="docker">
            <DockerSection />
          </motion.section>

          {/* 3. Kubernetes Monitoring */}
          <motion.section variants={itemVariants} id="kubernetes">
            <K8sSection />
          </motion.section>


          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            {/* 5. AWS Monitoring */}
            <motion.section variants={itemVariants} id="aws">
              <AWSSection />
            </motion.section>

            {/* 6. Prometheus Metrics */}
            <motion.section variants={itemVariants} id="prometheus">
              <PrometheusSection />
            </motion.section>
          </div>

          {/* New Detailed Jenkins Section */}
          <motion.section variants={itemVariants} id="jenkins-detailed">
            <JenkinsDetailedSection />
          </motion.section>

          {/* 7. Grafana Analytics */}
          <motion.section variants={itemVariants} id="grafana">
            <GrafanaSection />
          </motion.section>

          {/* 8. Logs & Alerts */}
          <motion.section variants={itemVariants} id="logs">
            <LogsSection />
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};
