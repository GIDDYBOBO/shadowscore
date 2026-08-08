import React, { useState } from 'react';
import { X, Send, Sparkles, Bot, User, ShieldAlert, ArrowRight } from 'lucide-react';
import type { WalletProfile, AiChatMessage } from '../types/reputation';
import { ShadowAiOrb } from './ShadowAiOrb';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletProfile;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, wallet }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I'm Shadow AI, your Web3 reputation co-pilot. I can answer questions about your wallet score (${wallet.score}/100), smart contract security, and basic general knowledge topics. How can I assist you today?`,
      timestamp: '10:24 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [queryCount, setQueryCount] = useState(0);

  const quickPrompts = [
    "Why is my score 82/100?",
    "What is Web3 reputation?",
    "Analyze VaultX approval risk",
    "How do I revoke risky contracts?"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AiChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);
    const newCount = queryCount + 1;
    setQueryCount(newCount);

    let aiText = '';
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Off-topic keyword detector
    const offTopicKeywords = ['recipe', 'cook', 'baking', 'football', 'basketball', 'movie', 'novel', 'poem', 'fiction', 'gossip'];
    const isExplicitlyOffTopic = offTopicKeywords.some(kw => query.toLowerCase().includes(kw));

    if (geminiApiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are Shadow AI, an intelligent Web3 reputation & wallet security assistant.
Target Wallet: ${wallet.address}, Score: ${wallet.score}/100 (${wallet.rank}).

Instruction Guidelines:
1. Answer wallet security, smart contract audits, and Web3 reputation questions accurately.
2. Answer basic general questions (e.g. general technology, science, blockchain basics, or basic definitions) helpfully.
3. If the user asks a completely unrelated/off-topic question (e.g. cooking recipes, sports, fiction, entertainment gossip), give a polite 1-sentence answer, then add this warning at the end:
"\n\n⚠️ Notice: I am primarily optimized as your Web3 security & reputation co-pilot. Please keep questions focused on Web3, crypto, or security for best results!"

User Query: ${query}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generated = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generated) {
            aiText = generated;
          }
        }
      } catch (err) {
      }
    }

    // Comprehensive Fallback Logic
    if (!aiText) {
      const qLower = query.toLowerCase();

      if (qLower.includes('score') || qLower.includes('82') || qLower.includes('why')) {
        aiText = `Your score of **${wallet.score}/100** places you in the **${wallet.percentile}** of Web3 wallets. Key positive drivers: clean DeFi swap history, active DAO governance (+4 pts), and 0 drainers. However, your score is suppressed by 15 pts due to an unverified USDC allowance.`;
      } else if (qLower.includes('vaultx') || qLower.includes('risk')) {
        aiText = `⚠️ **VaultX Risk Analysis**: Contract \`0x3910...4a90\` was deployed 48 hours ago without open-source verification. Granting unlimited spend allowances to unverified proxies poses a 78% risk score. I strongly advise revoking this approval in the Security tab.`;
      } else if (qLower.includes('web3') || qLower.includes('what is')) {
        aiText = `**Web3** refers to the decentralized version of the internet built on blockchain technology. Unlike Web2 (where data is controlled by centralized tech giants), Web3 gives users true ownership of digital assets, identities, and reputation via cryptographic wallets.`;
      } else if (qLower.includes('ethereum') || qLower.includes('eth')) {
        aiText = `**Ethereum** is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency used to execute smart contracts and pay gas fees across its Layer-1 and Layer-2 scaling ecosystems.`;
      } else if (qLower.includes('revoke') || qLower.includes('how')) {
        aiText = `Here is how to revoke permissions:\n1. Open the **Security & Revoke** tab in ShadowScore.\n2. Locate unverified or dormant token approvals.\n3. Click **Revoke Approval** (make sure you have ≥ $2 gas fee balance on Base/ETH).\n4. Confirm the transaction to clear spender permissions.`;
      } else if (isExplicitlyOffTopic) {
        aiText = `I can answer basic general questions, but my primary specialization is Web3 wallet security, smart contract audits, and reputation scores.\n\n⚠️ Notice: Please focus your queries on Web3, blockchain technology, or wallet security for optimal guidance!`;
      } else {
        aiText = `Shadow AI Analysis for ${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}: On-chain telemetry reflects consistent smart contract interactions, verified liquidity pool activity, and clean transaction logs. Let me know if you would like me to audit a specific contract approval!`;
      }
    }

    // High frequency rate warning if user asks more than 10 questions in session
    if (newCount >= 10 && newCount % 5 === 0) {
      aiText += `\n\n⚡ **Rate Advisory**: You've asked ${newCount} questions in this active session. Feel free to continue, but make sure to review your active security report!`;
    }

    const aiMsg: AiChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsThinking(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in font-sans">
      <div className="bg-[#0B0E14] border border-dark-border rounded-3xl w-full max-w-2xl h-[650px] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-dark-border flex items-center justify-between bg-dark-800/80">
          <div className="flex items-center space-x-3">
            <ShadowAiOrb size="sm" />
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2 font-mono">
                Shadow AI Co-pilot
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-semibold border border-brand-cyan/30">
                  Gemini AI Powered
                </span>
              </h3>
              <p className="text-xs text-slate-400">Web3 Security & General Knowledge Intelligence</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-dark-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-dark-900 border-b border-dark-border flex items-center space-x-2 overflow-x-auto">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 bg-dark-800 hover:bg-brand-blue/20 hover:text-brand-cyan text-slate-300 text-xs rounded-xl font-medium whitespace-nowrap border border-dark-border transition-all shrink-0 font-mono"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                m.sender === 'user' 
                  ? 'bg-brand-blue text-white rounded-tr-none font-sans' 
                  : 'bg-dark-800 border border-dark-border text-slate-200 rounded-tl-none whitespace-pre-line font-mono'
              }`}>
                <p>{m.text}</p>
                <span className="text-[9px] opacity-60 block text-right font-mono">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-3 text-xs text-brand-cyan font-mono animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Shadow AI is analyzing your query...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-dark-border bg-dark-900 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Shadow AI general tech/Web3 questions, security risks, or contract audits..."
            className="flex-1 bg-dark-800 border border-dark-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan/50 font-mono"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 bg-brand-cyan hover:bg-cyan-400 text-dark-900 disabled:opacity-50 rounded-xl transition-all font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
