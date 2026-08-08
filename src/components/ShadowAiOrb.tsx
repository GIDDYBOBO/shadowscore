import React from 'react';

interface ShadowAiOrbProps {
  size?: 'sm' | 'md' | 'lg';
}

export const ShadowAiOrb: React.FC<ShadowAiOrbProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl',
  }[size];

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} shrink-0 group`}>
      {/* Outer Counter-Rotating Glowing Ring */}
      <div className="absolute inset-0 rounded-full border border-brand-cyan/50 animate-[spin_10s_linear_infinite]" />
      
      {/* Middle Pulsing Halo */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple opacity-40 blur-md animate-pulse" />
      
      {/* Inner Orbit Line */}
      <div className="absolute -inset-1 rounded-full border border-dashed border-brand-purple/60 animate-[spin_16s_linear_infinite_reverse]" />

      {/* 3D Glassmorphic Orb Center Body */}
      <div className="relative w-full h-full rounded-full ai-orb flex items-center justify-center border border-white/40 shadow-glow-cyan overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
        {/* Reflection Shimmer */}
        <div className="absolute top-1 left-2 w-2/5 h-2/5 rounded-full bg-white/50 blur-[1px]" />
        
        {/* Glowing Logo Badge */}
        <span className="font-black tracking-wider text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.9)] flex items-center gap-0.5">
          <span className="text-brand-cyan">AI</span>
        </span>
      </div>
    </div>
  );
};
