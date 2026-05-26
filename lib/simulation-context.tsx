'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Drone {
  id: string;
  x: number;
  y: number;
  battery: number;
  status: 'active' | 'idle' | 'charging' | 'critical';
  algorithm: 'ACO' | 'PSO' | 'RL';
  speed: number;
  heading: number;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  type: 'system' | 'collision' | 'algorithm' | 'battery';
  message: string;
  severity: 'info' | 'warning' | 'critical';
  droneId?: string;
}

interface SimulationContextType {
  drones: Drone[];
  telemetryLogs: TelemetryLog[];
  isRunning: boolean;
  startSimulation: () => void;
  stopSimulation: () => void;
  collisions: number;
  efficiency: number;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [collisions, setCollisions] = useState(0);
  const [efficiency, setEfficiency] = useState(94.2);

  // Initialize drones
  useEffect(() => {
    const initialDrones: Drone[] = Array.from({ length: 12 }, (_, i) => ({
      id: `DRONE-${String(i + 1).padStart(3, '0')}`,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      battery: 60 + Math.random() * 40,
      status: Math.random() > 0.3 ? 'active' : 'idle',
      algorithm: (['ACO', 'PSO', 'RL'] as const)[i % 3],
      speed: Math.random() * 8 + 2,
      heading: Math.random() * 360,
    }));
    setDrones(initialDrones);

    // Add initial logs
    const logs: TelemetryLog[] = [
      {
        id: 'log-1',
        timestamp: new Date().toLocaleTimeString(),
        type: 'system',
        message: 'Swarm initialization complete',
        severity: 'info',
      },
      {
        id: 'log-2',
        timestamp: new Date().toLocaleTimeString(),
        type: 'algorithm',
        message: 'ACO algorithm: Pheromone trails updated',
        severity: 'info',
      },
    ];
    setTelemetryLogs(logs);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setDrones((prevDrones) => {
        let newCollisions = 0;
        const updatedDrones = prevDrones.map((drone) => {
          let { x, y, battery, status, speed, heading } = drone;

          // Update position
          const radians = (heading * Math.PI) / 180;
          x += Math.cos(radians) * speed + (Math.random() - 0.5) * 4;
          y += Math.sin(radians) * speed + (Math.random() - 0.5) * 4;

          // Boundary wrapping
          if (x > 250) x = -250;
          if (x < -250) x = 250;
          if (y > 250) y = -250;
          if (y < -250) y = 250;

          // Update heading
          heading = (heading + (Math.random() - 0.5) * 30) % 360;

          // Battery drain
          battery -= Math.random() * 0.5;
          if (battery < 0) battery = 0;

          // Status update based on battery
          if (battery < 15) {
            status = 'critical';
          } else if (battery < 30) {
            status = 'idle';
          } else {
            status = 'active';
          }

          return { ...drone, x, y, battery, status, heading };
        });

        // Check for collisions (simple distance check)
        for (let i = 0; i < updatedDrones.length; i++) {
          for (let j = i + 1; j < updatedDrones.length; j++) {
            const dx = updatedDrones[i].x - updatedDrones[j].x;
            const dy = updatedDrones[i].y - updatedDrones[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 30) {
              newCollisions++;
            }
          }
        }

        if (newCollisions > 0) {
          setCollisions((prev) => prev + newCollisions);
          setTelemetryLogs((prev) => [
            {
              id: `log-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              type: 'collision',
              message: `${newCollisions} collision(s) detected and avoided`,
              severity: 'warning',
            },
            ...prev.slice(0, 19),
          ]);
        }

        return updatedDrones;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Telemetry updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTelemetryLogs((prev) => {
        const algorithms = ['ACO', 'PSO', 'RL'];
        const algo = algorithms[Math.floor(Math.random() * 3)];
        const messages: Record<string, string> = {
          ACO: 'Pheromone trails updated - optimal path found',
          PSO: 'Particle swarm converging on target zone',
          RL: 'Q-learning model improved by 2.3%',
        };

        const newLog: TelemetryLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'algorithm',
          message: messages[algo],
          severity: 'info',
        };

        return [newLog, ...prev.slice(0, 19)];
      });

      // Update efficiency
      setEfficiency((prev) => {
        const change = (Math.random() - 0.5) * 2;
        const newEff = Math.max(85, Math.min(99, prev + change));
        return parseFloat(newEff.toFixed(1));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startSimulation = useCallback(() => setIsRunning(true), []);
  const stopSimulation = useCallback(() => setIsRunning(false), []);

  return (
    <SimulationContext.Provider value={{ drones, telemetryLogs, isRunning, startSimulation, stopSimulation, collisions, efficiency }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
}
