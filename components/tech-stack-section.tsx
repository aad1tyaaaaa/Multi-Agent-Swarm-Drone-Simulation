'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Database, Zap } from 'lucide-react';

export function TechStackSection() {
  const technologies = [
    {
      category: 'Frontend Framework',
      icon: Code,
      items: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Simulation Engine',
      icon: Cpu,
      items: ['WebGL Rendering', 'Physics Engine', 'WebWorkers', 'Canvas API'],
    },
    {
      category: 'State Management',
      icon: Database,
      items: ['React Context', 'useReducer', 'Real-time Sync', 'Event Streaming'],
    },
    {
      category: 'Performance',
      icon: Zap,
      items: ['12ms Latency', 'GPU Accelerated', '60FPS Rendering', 'Worker Threads'],
    },
  ];

  return (
    <section className="bg-card border-y border-border py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Technology Stack</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Built with cutting-edge technologies optimized for real-time performance and scalability</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border bg-background/50 backdrop-blur hover:border-accent/50 transition-all"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Collision Detection', desc: 'Intelligent algorithms prevent drone conflicts' },
            { title: 'Real-time Telemetry', desc: 'Live monitoring with sub-millisecond updates' },
            { title: 'Adaptive Algorithms', desc: 'Self-optimizing AI for dynamic environments' },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4 rounded-lg border border-border/50 bg-card/30"
            >
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
