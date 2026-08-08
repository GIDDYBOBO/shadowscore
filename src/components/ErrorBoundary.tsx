import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ShadowScore UI Runtime Guard caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0E14] text-white flex items-center justify-center p-6 font-sans">
          <div className="glass-card rounded-3xl p-8 max-w-lg w-full border border-brand-cyan/40 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center mx-auto shadow-glow-cyan/20">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white">ShadowScore Autonomous Recovery</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                The UI caught a state discrepancy and protected your session from crashing.
              </p>
            </div>

            <div className="p-3.5 bg-dark-950 rounded-2xl border border-dark-border text-left font-mono text-xs text-rose-300">
              {this.state.error?.message || 'State synchronization in progress...'}
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-blue/30 hover:opacity-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore Dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
