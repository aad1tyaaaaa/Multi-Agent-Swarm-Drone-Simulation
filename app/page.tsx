'use client';

import { SimulationProvider } from '@/lib/simulation-context';
import { HeroSection } from '@/components/hero-section';
import { DashboardSection } from '@/components/dashboard-section';
import { StatsSection } from '@/components/stats-section';
import { TechStackSection } from '@/components/tech-stack-section';
import { FooterSection } from '@/components/footer-section';

export default function Home() {
  return (
    <SimulationProvider>
      <main className="w-full">
        <HeroSection />
        <DashboardSection />
        <StatsSection />
        <TechStackSection />
        <FooterSection />
      </main>
    </SimulationProvider>
  );
}
