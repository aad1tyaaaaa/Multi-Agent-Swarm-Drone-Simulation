'use client';

import { useSimulation } from '@/lib/simulation-context';
import { motion } from 'framer-motion';
import { Radar } from 'lucide-react';

export function LiveMissionMap() {
  const { drones } = useSimulation();
  const SCALE = 1.2; // Scale factor for visual representation

  return (
    <div className="h-full flex flex-col bg-card border-r border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Radar className="w-5 h-5 text-accent" style={{ animation: 'pulse-ring 2s ease-in-out infinite' }} />
          Live Mission Map
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Real-time fleet visualization</p>
      </div>

      <div className="flex-1 relative overflow-hidden bg-background">
        {/* SVG Canvas for map */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="pulseGradient">
              <stop offset="0%" stopColor="rgb(255, 133, 0)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(255, 133, 0)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background grid */}
          <g opacity="0.1" strokeWidth="1" stroke="rgb(255, 133, 0)">
            {[0, 100, 200, 300, 400, 500].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100%" />
            ))}
            {[0, 100, 200, 300, 400, 500].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2="100%" y2={y} />
            ))}
          </g>

          {/* Center crosshair */}
          <g opacity="0.2" strokeWidth="1" stroke="rgb(255, 133, 0)">
            <line x1="50%" y1="0" x2="50%" y2="100%" />
            <line x1="0" y1="50%" x2="100%" y2="50%" />
            <circle cx="50%" cy="50%" r="30" fill="none" />
            <circle cx="50%" cy="50%" r="60" fill="none" />
          </g>

          {/* Drones */}
          {drones.map((drone, idx) => {
            const centerX = window.innerWidth ? (window.innerWidth / 2 - 250) / 2 : 250;
            const centerY = window.innerHeight ? window.innerHeight / 2 - 150 : 250;
            const x = centerX + drone.x * SCALE;
            const y = centerY + drone.y * SCALE;

            const getAlgoColor = (algo: string) => {
              switch (algo) {
                case 'ACO':
                  return 'rgb(34, 197, 94)'; // green
                case 'PSO':
                  return 'rgb(59, 130, 246)'; // blue
                case 'RL':
                  return 'rgb(255, 133, 0)'; // orange
                default:
                  return 'rgb(200, 200, 200)';
              }
            };

            return (
              <g key={drone.id} filter="url(#glow)">
                {/* Pulse ring */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={getAlgoColor(drone.algorithm)}
                  opacity="0.2"
                  animate={{ r: [12, 25] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ pointerEvents: 'none' }}
                />
                {/* Drone body */}
                <circle cx={x} cy={y} r="6" fill={getAlgoColor(drone.algorithm)} />
                {/* Direction indicator */}
                <line
                  x1={x}
                  y1={y}
                  x2={x + 10 * Math.cos((drone.heading * Math.PI) / 180)}
                  y2={y + 10 * Math.sin((drone.heading * Math.PI) / 180)}
                  stroke={getAlgoColor(drone.algorithm)}
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 text-xs space-y-1">
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            ACO Algorithm
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            PSO Algorithm
          </div>
          <div className="flex items-center gap-2 text-accent">
            <div className="w-2 h-2 rounded-full bg-accent" />
            RL Algorithm
          </div>
        </div>
      </div>
    </div>
  );
}
