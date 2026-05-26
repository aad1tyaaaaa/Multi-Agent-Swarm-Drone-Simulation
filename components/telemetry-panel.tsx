'use client';

import { motion } from 'framer-motion';
import { useSimulation } from '@/lib/simulation-context';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export function TelemetryPanel() {
  const { telemetryLogs, collisions, efficiency } = useSimulation();

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'collision':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'algorithm':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'battery':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border overflow-hidden">
      {/* Stats Header */}
      <div className="p-4 border-b border-border space-y-3">
        <h2 className="text-lg font-bold text-foreground">Telemetry</h2>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="text-xs text-muted-foreground">Efficiency</div>
            <motion.div className="text-2xl font-bold text-accent" animate={{ opacity: [0.8, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              {efficiency.toFixed(1)}%
            </motion.div>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="text-xs text-muted-foreground">Collisions</div>
            <motion.div className="text-2xl font-bold text-red-400" animate={{ scale: collisions > 0 ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.3 }}>
              {collisions}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Logs Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        <div className="p-4 space-y-2">
          {telemetryLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No events yet</p>
            </div>
          ) : (
            telemetryLogs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-3 rounded-lg border ${getSeverityColor(log.severity)} text-xs font-mono`}
              >
                <div className="flex items-start gap-2">
                  {getLogIcon(log.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground truncate">{log.message}</div>
                    <div className="text-xs opacity-70 mt-1">{log.timestamp}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Control Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <div className="text-xs text-muted-foreground text-center">System Status: <span className="text-green-400">ONLINE</span></div>
      </div>
    </div>
  );
}
