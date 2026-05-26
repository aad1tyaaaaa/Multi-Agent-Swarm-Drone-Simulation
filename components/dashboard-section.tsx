'use client';

import { useSimulation } from '@/lib/simulation-context';
import { DroneFleetStatus } from './drone-fleet-status';
import { LiveMissionMap } from './live-mission-map';
import { TelemetryPanel } from './telemetry-panel';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export function DashboardSection() {
  const { isRunning, startSimulation, stopSimulation } = useSimulation();

  return (
    <section className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Control Bar */}
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Mission Control</h1>
          <p className="text-sm text-muted-foreground">Real-time fleet operations</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRunning ? stopSimulation : startSimulation}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Resume
            </>
          )}
        </motion.button>
      </div>

      {/* Main Dashboard Grid */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left Panel - Fleet Status (3 cols) */}
        <div className="col-span-3 min-w-0 overflow-hidden">
          <DroneFleetStatus />
        </div>

        {/* Center Panel - Mission Map (6 cols) */}
        <div className="col-span-6 min-w-0 overflow-hidden">
          <LiveMissionMap />
        </div>

        {/* Right Panel - Telemetry (3 cols) */}
        <div className="col-span-3 min-w-0 overflow-hidden">
          <TelemetryPanel />
        </div>
      </div>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 1400px) {
          .col-span-3 {
            @apply col-span-2;
          }
          .col-span-6 {
            @apply col-span-8;
          }
        }

        @media (max-width: 1024px) {
          .col-span-2,
          .col-span-8 {
            @apply col-span-4;
          }
        }

        @media (max-width: 768px) {
          .grid {
            @apply grid-cols-1;
          }

          .col-span-2,
          .col-span-4,
          .col-span-8 {
            @apply col-span-1;
          }
        }
      `}</style>
    </section>
  );
}
