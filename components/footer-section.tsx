'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-background border-t border-border py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Drone Swarm</h3>
            <p className="text-sm text-muted-foreground">Advanced autonomous fleet management with AI-powered algorithms for next-generation logistics.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">© 2025 Drone Swarm Inc. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-card border border-border hover:border-accent/50 text-muted-foreground hover:text-accent transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
