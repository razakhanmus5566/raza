/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 selection:bg-neon-cyan selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#111] to-[#050505]" />
      </div>

      {/* Header */}
      <header className="h-[60px] theme-header-border bg-bg-panel flex items-center px-[30px] relative z-20">
        <h1 className="text-2xl font-bold tracking-[4px] neon-text-primary">
          SYNTH_SNAKE_OS.v1
        </h1>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-[280px_1fr_240px] h-[calc(100vh-160px)] relative z-10 w-full">
        {/* Left Sidebar */}
        <aside className="bg-bg-sidebar border-r border-border-subtle p-5 flex flex-col gap-5 overflow-y-auto">
          <div className="text-[10px] uppercase font-mono text-[#555] tracking-[2px]">Neural Playlist</div>
          <div className="space-y-4">
            <div className="track-card active">
                <div className="text-sm font-bold">Midnight Protocol</div>
                <div className="text-[11px] text-[#888]">AI_GEN_V1.2</div>
            </div>
            <div className="track-card">
                <div className="text-sm font-bold">Silicon Dreams</div>
                <div className="text-[11px] text-[#888]">AI_GEN_V1.5</div>
            </div>
            <div className="track-card">
                <div className="text-sm font-bold">Vector Velocity</div>
                <div className="text-[11px] text-[#888]">AI_GEN_V0.9</div>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-end gap-1 h-10">
                {[20, 50, 80, 40, 90, 60, 30, 70, 50, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-neon-secondary opacity-60" style={{ height: `${h}%` }} />
                ))}
            </div>
          </div>
        </aside>

        {/* Center: Game Board */}
        <main className="flex flex-col items-center justify-center p-8 bg-transparent">
          <SnakeGame />
          <div className="mt-5 text-[#555] text-xs font-mono uppercase tracking-widest">
            [W][A][S][D] TO NAVIGATE NEURAL GRID
          </div>
        </main>

        {/* Right Sidebar: Stats */}
        <aside className="bg-bg-sidebar border-l border-border-subtle p-5 flex flex-col gap-8">
            <div className="stat-box">
                <div className="text-[10px] uppercase font-mono text-[#555] tracking-[2px]">Core Score</div>
                <div id="ui-score-display" className="text-3xl font-bold neon-text-primary my-2 tracking-tighter">000,000</div>
            </div>
            
            <div className="stat-box">
                <div className="text-[10px] uppercase font-mono text-[#555] tracking-[2px]">Multiplier</div>
                <div className="text-3xl font-bold neon-text-secondary my-2">x1.0</div>
            </div>

            <div className="stat-box mt-auto">
                <div className="text-[10px] uppercase font-mono text-[#555] tracking-[2px]">System Health</div>
                <div className="h-2 bg-[#222] mt-4 relative overflow-hidden">
                    <div className="h-full bg-neon-primary" style={{ width: '88%' }} />
                </div>
            </div>
        </aside>
      </div>

      {/* Footer Player Controls */}
      <footer className="h-[100px] theme-footer-border bg-bg-panel flex items-center px-10 gap-10 relative z-20">
        <MusicPlayer />
      </footer>

      {/* Footer Decoration */}
      <footer className="mt-12 w-full max-w-5xl flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-mono text-white/20 relative z-10">
        <span>© 2026 DIGITAL_VOID</span>
        <div className="flex gap-4">
            <span className="hover:text-neon-cyan transition-colors cursor-pointer">Protocol</span>
            <span className="hover:text-neon-magenta transition-colors cursor-pointer">Encryption</span>
            <span className="hover:text-neon-lime transition-colors cursor-pointer">Neural_Link</span>
        </div>
      </footer>
    </div>
  );
}
