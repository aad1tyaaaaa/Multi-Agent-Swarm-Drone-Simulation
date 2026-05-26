'use client';

import { motion } from 'framer-motion';
import { useSimulation } from '@/lib/simulation-context';
import { Battery, Activity } from 'lucide-react';

export function DroneFleetStatus() {
  const { drones } = useSimulation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'idle':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 border-green-500/30';
      case 'idle':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'critical':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          Fleet Status
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{drones.length} drones online</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        <div className="p-4 space-y-2">
          {drones.map((drone, idx) => (
            <motion.div
              key={drone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3 rounded-lg border ${getStatusBg(drone.status)} transition-all hover:border-accent/50`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-bold text-foreground">{drone.id}</span>
                <span className={`text-xs font-semibold uppercase ${getStatusColor(drone.status)}`}>{drone.status}</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Algorithm:</span>
                  <span className="text-accent">{drone.algorithm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Battery:</span>
                  <div className="flex items-center gap-1">
                    <Battery className="w-3 h-3" />
                    <span className="text-foreground">{drone.battery.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="w-full bg-background rounded h-1 overflow-hidden mt-1">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${drone.battery}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
