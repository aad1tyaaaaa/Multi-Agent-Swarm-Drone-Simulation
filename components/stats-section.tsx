'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Brain } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      title: 'Mission Completion',
      value: '99.2%',
      icon: TrendingUp,
      color: 'text-green-400',
      description: 'Successful mission outcomes',
    },
    {
      title: 'Avg Response Time',
      value: '12ms',
      icon: Zap,
      color: 'text-accent',
      description: 'Ultra-low latency commands',
    },
    {
      title: 'AI Efficiency',
      value: '94.8%',
      icon: Brain,
      color: 'text-blue-400',
      description: 'Algorithm optimization level',
    },
  ];

  const algorithms = [
    {
      name: 'Ant Colony Optimization (ACO)',
      description: 'Simulates pheromone trails for optimal path discovery and distributed problem solving.',
      stats: { efficiency: '96%', coverage: '100%', convergence: '2.3s' },
      color: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
    },
    {
      name: 'Particle Swarm Optimization (PSO)',
      description: 'Models swarm behavior for coordinated movement and collective intelligence.',
      stats: { efficiency: '94%', coverage: '98%', convergence: '1.8s' },
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
    },
    {
      name: 'Reinforcement Learning (RL)',
      description: 'Q-learning agents that adapt strategies based on environmental feedback.',
      stats: { efficiency: '92%', coverage: '95%', convergence: '3.1s' },
      color: 'from-accent/20 to-orange-500/10 border-accent/30',
    },
  ];

  return (
    <section className="bg-background py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">System Performance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur hover:border-accent/50 transition-colors"
                >
                  <Icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.title}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Algorithms Deep Dive */}
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Algorithm Ecosystem</h2>
          <div className="space-y-6">
            {algorithms.map((algo, idx) => (
              <motion.div
                key={algo.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-xl border bg-gradient-to-r ${algo.color}`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">{algo.name}</h3>
                <p className="text-muted-foreground mb-6">{algo.description}</p>

                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(algo.stats).map(([key, value]) => (
                    <div key={key} className="p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{key}</div>
                      <div className="text-xl font-bold text-accent mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
