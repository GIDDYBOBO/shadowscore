import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Bot, X, MessageSquare } from 'lucide-react';

interface FloatingAiCopilotProps {
  onOpenAiAssistant: () => void;
}

const AI_HELP_MESSAGES = [
  "🤖 Hi! I'm your Shadow AI Co-pilot. Need help auditing your wallet?",
  "💡 Want an instant smart contract security audit or risk scan?",
  "🛡️ I can help you detect unverified token approvals and revoke risks!",
  "📊 Curious about your reputation score breakdown? Click me!",
  "⚡ Ask me about real-time market sentiment or high-yield DeFi pools!"
];

export const FloatingAiCopilot: React.FC<FloatingAiCopilotProps> = ({ onOpenAiAssistant }) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Initial delay pop-up message (after 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupMessage(AI_HELP_MESSAGES[0]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Periodic random pop-up messages every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        const nextIdx = (prev + 1) % AI_HELP_MESSAGES.length;
        setPopupMessage(AI_HELP_MESSAGES[nextIdx]);
        setIsVisible(true);
        return nextIdx;
      });
    }, 16000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-auto font-sans">
      {/* Floating Dynamic Speech Bubble Pop-up Toast */}
      {popupMessage && isVisible && (
        <div className="max-w-xs bg-dark-900/95 border border-brand-cyan/50 text-white p-3.5 rounded-2xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 zoom-in-95 relative group font-sans">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-2 -left-2 w-5 h-5 bg-dark-800 border border-dark-border rounded-full text-slate-400 hover:text-white flex items-center justify-center shadow-md transition-colors"
            title="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>

          <div 
            onClick={onOpenAiAssistant}
            className="cursor-pointer space-y-1.5"
          >
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-brand-cyan font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Shadow AI Co-pilot</span>
            </div>
            <p className="text-xs text-slate-200 leading-snug font-medium">
              {popupMessage}
            </p>
            <span className="inline-block text-[10px] text-brand-cyan font-bold font-mono group-hover:underline">
              Tap to chat with Shadow AI ➔
            </span>
          </div>

          {/* Speech Bubble Arrow pointing down-right to the floating button */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-dark-900 border-r border-b border-brand-cyan/50 transform rotate-45" />
        </div>
      )}

      {/* Floating Round Modern Action Button */}
      <button
        onClick={onOpenAiAssistant}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple p-[2px] shadow-glow-cyan/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shrink-0"
        title="Ask Shadow AI Co-pilot"
      >
        {/* Animated Rotating Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-brand-cyan/40 animate-spin-slow pointer-events-none" />

        {/* Inner Button Content */}
        <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center relative overflow-hidden group-hover:bg-dark-800 transition-colors">
          <BrainCircuit className="w-6 h-6 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />

          {/* Glowing Notification Dot */}
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-green rounded-full ring-2 ring-dark-900 animate-pulse" />
        </div>
      </button>
    </div>
  );
};
