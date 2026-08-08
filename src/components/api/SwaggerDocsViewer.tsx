import React, { useState } from 'react';
import { 
  Code, 
  Terminal, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Layers, 
  Server, 
  Radio 
} from 'lucide-react';
import { SWAGGER_OPENAPI_SPEC } from '../../../backend/src/api/swaggerSpec';
import { ApiController } from '../../../backend/src/api/apiController';

export const SwaggerDocsViewer: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/chains');
  const [testResponse, setTestResponse] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const endpoints = [
    { method: 'GET', path: '/chains', desc: 'Get Supported Blockchain Networks' },
    { method: 'GET', path: '/protocols', desc: 'Get Supported DeFi & DEX Protocols' },
    { method: 'GET', path: '/leaderboard', desc: 'Get Highest Reputation Web3 Wallets' },
    { method: 'GET', path: '/transactions/live', desc: 'Get Live Multi-Chain DexScreener Feed' },
    { method: 'GET', path: '/token/ETH', desc: 'Get Token Telemetry & Whale Distribution' },
    { method: 'GET', path: '/wallet/vitalik.eth', desc: 'Get Wallet Overview & Intelligence' },
    { method: 'GET', path: '/wallet/vitalik.eth/reputation', desc: 'Get 8-Dimensional ShadowScore AI Reputation' },
    { method: 'GET', path: '/wallet/vitalik.eth/nfts', desc: 'Get Wallet NFT Portfolio & Floor Prices' }
  ];

  const handleTestRequest = async (path: string) => {
    setSelectedEndpoint(path);
    const res = await ApiController.handleRoute(path);
    setTestResponse(res.data);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(`curl -X GET "https://api.shadowscore.ai/v1${selectedEndpoint}" -H "Authorization: Bearer ss_dev_testkey"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Swagger Documentation Hero Card */}
      <div className="glass-card rounded-3xl p-6 border border-dark-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 flex items-center justify-center font-black text-2xl">
              <Code className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2 font-mono">
                <h2 className="text-xl font-extrabold text-white tracking-tight">OpenAPI 3.0.3 & WebSocket API Gateway</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                  Swagger v1.0.0
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30">
                  99.99% Uptime
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                High-throughput REST and WebSocket APIs for on-chain indexing, reputation scoring, and live transaction feeds.
              </p>
            </div>
          </div>

          <button
            onClick={copyCurl}
            className="px-4 py-2.5 bg-dark-900 hover:bg-dark-800 border border-dark-border rounded-2xl text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-2 transition-all shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-brand-green" /> : <Copy className="w-4 h-4 text-brand-cyan" />}
            <span>{copied ? 'Copied cURL Command!' : 'Copy cURL Command'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Endpoints Grid & Live Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Left Col: Endpoint Selector */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-3">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            Interactive Endpoints Explorer
          </h3>

          <div className="space-y-2 pt-2">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                onClick={() => handleTestRequest(ep.path)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedEndpoint === ep.path
                    ? 'bg-dark-800/90 border-brand-cyan/60 shadow-glow-cyan/10'
                    : 'bg-dark-900/60 border-dark-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-lg bg-brand-green/20 text-brand-green font-bold text-[10px]">
                    {ep.method}
                  </span>
                  <div>
                    <span className="font-bold text-white text-xs block">{ep.path}</span>
                    <span className="text-[10px] text-slate-400">{ep.desc}</span>
                  </div>
                </div>

                <span className="text-brand-cyan font-bold text-[11px] hover:underline">
                  Execute ➔
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Live Response Inspector */}
        <div className="glass-card rounded-3xl p-6 border border-dark-border space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-green" />
              Live Gateway Response Inspector
            </h3>
            <span className="text-[10px] text-brand-green font-bold px-2 py-0.5 rounded bg-brand-green/20">
              HTTP 200 OK
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-950 border border-dark-border overflow-x-auto h-[400px] text-[11px] text-brand-cyan">
            <pre>
              {testResponse 
                ? JSON.stringify(testResponse, null, 2) 
                : '// Click any endpoint on the left to execute live gateway query'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
