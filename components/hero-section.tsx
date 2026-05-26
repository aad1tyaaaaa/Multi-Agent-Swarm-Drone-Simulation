'use client';

import { motion } from 'framer-motion';
import { Zap, Radio, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background border-b border-border">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(255, 133, 0)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated drones SVG */}
      <motion.div className="absolute top-20 left-20 w-32 h-32" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          {[0, 90, 180, 270].map((angle) => (
            <g key={angle}>
              <line x1="50" y1="50" x2={50 + 25 * Math.cos((angle * Math.PI) / 180)} y2={50 + 25 * Math.sin((angle * Math.PI) / 180)} stroke="currentColor" strokeWidth="2" />
              <circle cx={50 + 25 * Math.cos((angle * Math.PI) / 180)} cy={50 + 25 * Math.sin((angle * Math.PI) / 180)} r="4" fill="currentColor" opacity="0.7" />
            </g>
          ))}
        </svg>
      </motion.div>

      <motion.div className="absolute bottom-20 right-20 w-40 h-40" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-30">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center max-w-4xl mx-auto px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-foreground" style={{ animation: 'text-glow 3s ease-in-out infinite' }}>
            DRONE SWARM
            <br />
            <span className="text-accent">COMMAND CENTER</span>
          </h1>
        </motion.div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">Autonomous fleet management with advanced AI-powered algorithms and real-time mission control</p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            { icon: Zap, label: 'Ultra Low Latency' },
            { icon: Radio, label: 'Real-Time Sync' },
            { icon: Shield, label: 'Collision Avoidance' },
          ].map(({ icon: Icon, label }) => (
            <motion.div key={label} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border backdrop-blur-sm">
              <Icon className="w-5 h-5 text-accent" />
              <span className="text-foreground">{label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-lg bg-accent text-accent-foreground font-bold text-lg hover:opacity-90 transition-opacity"
        >
          LAUNCH SIMULATION
        </motion.button>
      </motion.div>
    </section>
  );
}
