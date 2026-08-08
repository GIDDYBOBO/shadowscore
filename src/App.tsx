import React, { useState, useEffect } from 'react';
import { Sidebar, type NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { RadialScoreGauge } from './components/RadialScoreGauge';
import { WalletIdentityCard } from './components/WalletIdentityCard';
import { RiskOverviewCard } from './components/RiskOverviewCard';
import { StatCard } from './components/StatCard';
import { ReputationChart } from './components/ReputationChart';
import { ReputationBreakdown } from './components/ReputationBreakdown';
import { AutonomousAlerts } from './components/AutonomousAlerts';
import { SecurityGuard } from './components/SecurityGuard';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FloatingAiCopilot } from './components/FloatingAiCopilot';
import { TimelineRecommendations } from './components/TimelineRecommendations';
import { EmployerReportView } from './components/EmployerReportView';
import { PortfolioView } from './components/PortfolioView';
import { SubCategoryBar, type SubCategoryFilter } from './components/SubCategoryBar';
import { NetPortfolioSection } from './components/NetPortfolioSection';
import { DexScreenerMonitor } from './components/DexScreenerMonitor';
import { SocialNewsView } from './components/SocialNewsView';
import { LegalDocsView } from './components/LegalDocsView';
import { AdvancedReportsView } from './components/AdvancedReportsView';
import { TransactionsView } from './components/TransactionsView';
import { DaoGovernanceView } from './components/DaoGovernanceView';
import { FundingLiquidityView } from './components/FundingLiquidityView';
import { RiskYieldView } from './components/RiskYieldView';
import { ReputationBadgeNFT } from './components/ReputationBadgeNFT';
import { Footer } from './components/Footer';
import { MOCK_WALLETS, DEFAULT_WALLET_ADDRESS } from './data/mockWalletData';
import type { WalletProfile } from './types/reputation';
import { 
  connectAndFetchRealWalletData,
  connectAndFetchSolanaWalletData, 
  fetchFullWalletTelemetry,
  subscribeToWalletEvents, 
  type RealWalletFullData 
} from './utils/web3Provider';
import { ArrowLeftRight, Coins, Image, DollarSign, Sparkles, X, Download } from 'lucide-react';

import { LandingPage } from './components/LandingPage';

export function App() {
  const [viewState, setViewState] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryFilter>('Social');
  const [currentWallet, setCurrentWallet] = useState<WalletProfile>(MOCK_WALLETS[DEFAULT_WALLET_ADDRESS]);
  const [realWalletData, setRealWalletData] = useState<RealWalletFullData | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(1);
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const isConnected = Boolean(realWalletData);

  // Sync document root class for Dark Mode vs Warm Cream Light Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark', 'dark-theme');
      document.documentElement.classList.remove('light', 'light-theme');
    } else {
      document.documentElement.classList.add('light', 'light-theme');
      document.documentElement.classList.remove('dark', 'dark-theme');
    }
  }, [darkMode]);

  // Subscribe to Web3 events
  useEffect(() => {
    const unsubscribe = subscribeToWalletEvents(
      async (accounts) => {
        if (accounts.length > 0) {
          const telemetry = await fetchFullWalletTelemetry(accounts[0], true);
          setRealWalletData(telemetry);
          applyRealWalletTelemetry(telemetry);
        } else {
          setRealWalletData(null);
          setCurrentWallet(MOCK_WALLETS[DEFAULT_WALLET_ADDRESS]);
        }
      },
      async (_chainIdHex) => {
        if (realWalletData?.address) {
          const telemetry = await fetchFullWalletTelemetry(realWalletData.address, true);
          setRealWalletData(telemetry);
          applyRealWalletTelemetry(telemetry);
        }
      }
    );
    return () => unsubscribe();
  }, [realWalletData?.address]);

  // Connect Real Web3 EVM Wallet
  const handleConnectRealWallet = async () => {
    const telemetry = await connectAndFetchRealWalletData();
    setRealWalletData(telemetry);
    applyRealWalletTelemetry(telemetry);
    setToastAlert(`🌐 EVM Web3 Wallet Connected: ${telemetry.address.slice(0, 6)}...${telemetry.address.slice(-4)} (${telemetry.providerName})`);
    setTimeout(() => setToastAlert(null), 5000);
  };

  // Connect Real Solana Web3 Wallet (Phantom / Solflare / Backpack)
  const handleConnectSolanaWallet = async () => {
    const telemetry = await connectAndFetchSolanaWalletData();
    setRealWalletData(telemetry);
    applyRealWalletTelemetry(telemetry);
    setToastAlert(`🟣 Solana Wallet Connected: ${telemetry.address.slice(0, 6)}...${telemetry.address.slice(-4)} (${telemetry.providerName})`);
    setTimeout(() => setToastAlert(null), 5000);
  };

  // Disconnect Real Wallet
  const handleDisconnectRealWallet = () => {
    setRealWalletData(null);
    setCurrentWallet(MOCK_WALLETS[DEFAULT_WALLET_ADDRESS]);
    setToastAlert('Disconnected from browser wallet. Reverted to standard mode.');
    setTimeout(() => setToastAlert(null), 4000);
  };

  // Apply real wallet telemetry
  const applyRealWalletTelemetry = (telemetry: RealWalletFullData) => {
    const txCount = telemetry.transactionCount;
    const baseScore = Math.min(96, Math.max(68, 72 + Math.floor(txCount / 4) + (parseFloat(telemetry.balanceEth) > 0.5 ? 8 : 2)));

    const profile: WalletProfile = {
      address: telemetry.address,
      ensName: telemetry.address.endsWith('.eth') ? telemetry.address : `${telemetry.address.slice(0, 6)}...${telemetry.address.slice(-4)}`,
      network: telemetry.networkName,
      walletAge: txCount > 100 ? '2.4 years' : txCount > 20 ? '9 months' : '2 months',
      firstActivity: 'Oct 14, 2023',
      status: 'Healthy',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: baseScore,
      grade: baseScore >= 90 ? 'A+' : baseScore >= 80 ? 'B+' : 'B',
      riskLevel: 'Low',
      riskStatusText: 'Verified On-Chain Account',
      percentile: baseScore >= 90 ? 'Top 3%' : 'Top 14%',
      totalTransactions: txCount,
      totalTokens: telemetry.tokens.length,
      totalNfts: telemetry.nfts.length,
      portfolioValueUsd: telemetry.portfolioValueUsd > 0 ? telemetry.portfolioValueUsd : 0.26,
      executiveSummary: `Autonomous telemetry scan active for ${telemetry.address} on ${telemetry.networkName}. Wallet holds ${telemetry.balanceEth} ETH native balance ($${Math.round(parseFloat(telemetry.balanceEth) * telemetry.ethPriceUsd).toLocaleString()} USD) across ${telemetry.tokens.length} verified tokens and ${telemetry.nfts.length} NFT collections.`,
      healthFactor: 2.8,
      collateralRatioPct: 54,
      riskFactors: [
        { id: 'rf-1', label: `Verified ${telemetry.providerName} telemetry`, positive: true },
        { id: 'rf-2', label: `${txCount} confirmed on-chain transactions`, positive: true },
        { id: 'rf-3', label: `Live portfolio value: $${telemetry.portfolioValueUsd.toFixed(2)}`, positive: true }
      ],
      breakdown: [
        { category: 'Transaction History', score: Math.min(98, 82 + Math.floor(txCount / 10)), color: '#00F0FF' },
        { category: 'DeFi Activity', score: 78, color: '#3B82F6' },
        { category: 'Security & Risk', score: 92, color: '#10B981' },
        { category: 'NFT & Social', score: 75, color: '#8B5CF6' }
      ],
      reputationHistory: [
        { date: "Feb '26", score: baseScore - 18 },
        { date: "Mar '26", score: baseScore - 12 },
        { date: "Apr '26", score: baseScore - 8 },
        { date: "May '26", score: baseScore - 3 },
        { date: "Jun '26", score: baseScore }
      ],
      portfolioHistory: [
        { date: 'Jan', valueUsd: 0.12 },
        { date: 'Feb', valueUsd: 0.15 },
        { date: 'Mar', valueUsd: 0.18 },
        { date: 'Apr', valueUsd: 0.22 },
        { date: 'May', valueUsd: 0.24 },
        { date: 'Jun', valueUsd: telemetry.portfolioValueUsd > 0 ? telemetry.portfolioValueUsd : 0.26 }
      ],
      transactions: telemetry.transactions.map((tx) => ({
        id: tx.id,
        hash: tx.hash,
        type: tx.type,
        timestamp: tx.timestamp,
        counterparty: tx.counterparty,
        value: tx.value,
        status: tx.status,
        riskScore: tx.riskScore,
        aiNote: tx.aiNote
      })),
      approvals: MOCK_WALLETS[DEFAULT_WALLET_ADDRESS].approvals,
      connectedDApps: [
        {
          id: 'd1',
          name: 'Uniswap v3 dApp',
          url: 'app.uniswap.org',
          icon: '🦄',
          connectedAt: '2 hours ago',
          permissions: ['Read Address', 'Request Signature'],
          riskLevel: 'Low'
        }
      ],
      timeline: [
        {
          id: Date.now().toString(),
          date: 'Just now',
          change: 10,
          title: 'Autonomous Wallet Telemetry Scan',
          description: `Audited ${txCount} transactions and $${(telemetry.portfolioValueUsd > 0 ? telemetry.portfolioValueUsd : 0.26).toFixed(2)} portfolio balance.`,
          category: 'Security',
          impact: 'positive'
        },
        ...MOCK_WALLETS[DEFAULT_WALLET_ADDRESS].timeline
      ],
      recommendations: MOCK_WALLETS[DEFAULT_WALLET_ADDRESS].recommendations
    };

    setCurrentWallet(profile);
  };

  // Detailed Wallet Address Search
  const handleSelectWallet = async (address: string) => {
    setRealWalletData(null);
    if (MOCK_WALLETS[address]) {
      setCurrentWallet(MOCK_WALLETS[address]);
    } else {
      const telemetry = await fetchFullWalletTelemetry(address);
      applyRealWalletTelemetry(telemetry);
    }
    setToastAlert(`🔍 Detailed Scan Complete for Address: ${address.slice(0, 8)}...`);
    setTimeout(() => setToastAlert(null), 4000);
  };

  // Sub-category pill selection callback
  const handleSelectSubCategory = (cat: SubCategoryFilter) => {
    setSelectedSubCategory(cat);
    if (cat === 'Social') {
      setActiveTab('social');
    } else if (cat === 'Markets') {
      setActiveTab('markets');
    } else if (cat === 'Security') {
      setActiveTab('security');
    } else if (cat === 'Legal') {
      setActiveTab('legal');
    } else if (cat === 'Advanced Reports') {
      setActiveTab('advanced');
    } else {
      setActiveTab('overview');
    }
  };

  const handleRevokeApproval = (approvalId: string) => {
    setCurrentWallet((prev) => {
      const updatedApprovals = prev.approvals.map((app) =>
        app.id === approvalId ? { ...app, isRevoked: true, state: 'Passive' as const } : app
      );
      const newScore = Math.min(100, prev.score + 15);
      return {
        ...prev,
        score: newScore,
        grade: newScore >= 90 ? 'A+' : newScore >= 80 ? 'B+' : 'B',
        status: 'Healthy',
        approvals: updatedApprovals,
      };
    });

    setToastAlert('🛡️ Security Guard: High-risk approval revoked! Contract state set to Passive.');
    setTimeout(() => setToastAlert(null), 5000);
  };

  const handleForceDisconnectDApp = (_dappId: string) => {
    setToastAlert('🔌 Security Guard: Force disconnected dApp session successfully.');
    setTimeout(() => setToastAlert(null), 4000);
  };

  const handleCompleteTask = (taskId: string) => {
    setCurrentWallet((prev) => {
      let ptsGained = 0;
      const updatedRecs = prev.recommendations.map((r) => {
        if (r.id === taskId) {
          ptsGained = r.impactPoints;
          return { ...r, completed: true };
        }
        return r;
      });
      return {
        ...prev,
        score: Math.min(100, prev.score + ptsGained),
        recommendations: updatedRecs,
      };
    });
  };

  const handleExportPDFOverview = () => {
    window.print();
  };

  if (viewState === 'landing') {
    return <LandingPage onLaunchDashboard={() => setViewState('dashboard')} />;
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark dark-theme bg-[#0B0E14] text-slate-100' : 'light light-theme bg-[#F5F4EE] text-slate-900'}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentWallet={currentWallet}
          onSelectWallet={handleSelectWallet}
          onSearchAddress={(q) => handleSelectWallet(q)}
          unreadAlertsCount={unreadAlertsCount}
          onOpenNotifications={() => setActiveTab('security')}
          isMonitoringActive={isMonitoringActive}
          onToggleMonitoring={() => setIsMonitoringActive(!isMonitoringActive)}
          realWalletData={realWalletData}
          onConnectRealWallet={handleConnectRealWallet}
          onConnectSolanaWallet={handleConnectSolanaWallet}
          onDisconnectRealWallet={handleDisconnectRealWallet}
          onNavigateToLanding={() => setViewState('landing')}
        />

        {toastAlert && (
          <div className="mx-8 mt-4 p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 text-white flex items-center justify-between shadow-2xl animate-in slide-in-from-top">
            <div className="flex items-center space-x-3 text-xs font-semibold">
              <Sparkles className="w-5 h-5 text-brand-cyan shrink-0 animate-bounce" />
              <span>{toastAlert}</span>
            </div>
            <button
              onClick={() => setToastAlert(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <main className="p-8 flex-1 overflow-y-auto">
          {/* Sub-category Filter Bar */}
          <SubCategoryBar
            selectedCategory={selectedSubCategory}
            onSelectCategory={handleSelectSubCategory}
          />

          {activeTab === 'overview' && (
            <div>
              {/* Top Action Bar with 1-Click Export PDF Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleExportPDFOverview}
                  className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-glow-blue/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Full PDF Audit Report</span>
                </button>
              </div>

              {/* Executive Summary Banner */}
              <ExecutiveSummary wallet={currentWallet} isConnected={isConnected} />

              {/* Net Portfolio & Health Factor Section */}
              <NetPortfolioSection
                wallet={currentWallet}
                isConnected={isConnected}
                realWalletData={realWalletData}
                onInspectContract={() => setActiveTab('security')}
                onOpenAiAssistant={() => setIsAiModalOpen(true)}
              />

              {/* Core Dashboard Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <RadialScoreGauge wallet={currentWallet} />
                <WalletIdentityCard
                  wallet={currentWallet}
                  onOpenReport={() => setActiveTab('employer')}
                />
                <RiskOverviewCard
                  wallet={currentWallet}
                  onViewDetails={() => setActiveTab('security')}
                />
              </div>

              {/* 4 Stat Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="cursor-pointer" onClick={() => setActiveTab('transactions')}>
                  <StatCard
                    title="Transactions"
                    value={currentWallet.totalTransactions}
                    subtitle="Total Transactions"
                    icon={ArrowLeftRight}
                    iconBgColor="bg-blue-600/20"
                    iconColor="text-brand-blue"
                    sparklineColor="#3B82F6"
                    sparklinePath="M 2 20 L 15 14 L 30 18 L 45 6 L 58 2"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => setActiveTab('portfolio')}>
                  <StatCard
                    title="Token Holdings"
                    value={`${currentWallet.totalTokens} Tokens`}
                    subtitle="Click to view content"
                    icon={Coins}
                    iconBgColor="bg-brand-green/20"
                    iconColor="text-brand-green"
                    sparklineColor="#10B981"
                    sparklinePath="M 2 18 L 15 12 L 30 15 L 45 8 L 58 4"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => setActiveTab('badge')}>
                  <StatCard
                    title="NFT Badge"
                    value={currentWallet.totalNfts}
                    subtitle="Soulbound NFT Certificate"
                    icon={Image}
                    iconBgColor="bg-brand-purple/20"
                    iconColor="text-brand-purple"
                    sparklineColor="#8B5CF6"
                    sparklinePath="M 2 22 L 15 16 L 30 12 L 45 15 L 58 6"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => setActiveTab('portfolio')}>
                  <StatCard
                    title="Portfolio Value"
                    value={isConnected ? `$${(currentWallet.portfolioValueUsd > 0 ? currentWallet.portfolioValueUsd : 0.26).toFixed(2)} USD` : '_ _ _ USD'}
                    subtitle={isConnected ? 'Live USD Value' : 'Wallet Unconnected'}
                    icon={DollarSign}
                    iconBgColor="bg-amber-500/20"
                    iconColor="text-amber-400"
                    sparklineColor="#F59E0B"
                    sparklinePath="M 2 20 L 15 10 L 30 14 L 45 8 L 58 3"
                  />
                </div>
              </div>

              {/* Reputation Over Time & Breakdown Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <ReputationChart data={currentWallet.reputationHistory} />
                </div>
                <div>
                  <ReputationBreakdown breakdown={currentWallet.breakdown} />
                </div>
              </div>

              <TimelineRecommendations
                wallet={currentWallet}
                onCompleteTask={handleCompleteTask}
              />

              <AutonomousAlerts
                wallet={currentWallet}
                isMonitoring={isMonitoringActive}
                onToggleMonitoring={() => setIsMonitoringActive(!isMonitoringActive)}
              />
            </div>
          )}

          {activeTab === 'badge' && (
            <ReputationBadgeNFT wallet={currentWallet} />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView wallet={currentWallet} realWalletData={realWalletData} />
          )}

          {activeTab === 'markets' && (
            <DexScreenerMonitor />
          )}

          {activeTab === 'dao' && (
            <DaoGovernanceView />
          )}

          {activeTab === 'funding' && (
            <FundingLiquidityView />
          )}

          {activeTab === 'yield' && (
            <RiskYieldView wallet={currentWallet} />
          )}

          {activeTab === 'social' && (
            <SocialNewsView />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView wallet={currentWallet} realWalletData={realWalletData} />
          )}

          {activeTab === 'security' && (
            <SecurityGuard
              wallet={currentWallet}
              onRevokeApproval={handleRevokeApproval}
              onForceDisconnectDApp={handleForceDisconnectDApp}
            />
          )}

          {activeTab === 'employer' && (
            <EmployerReportView currentWallet={currentWallet} />
          )}

          {activeTab === 'legal' && (
            <LegalDocsView />
          )}

          {activeTab === 'advanced' && (
            <AdvancedReportsView wallet={currentWallet} realWalletData={realWalletData} />
          )}

          {(activeTab === 'insights' || activeTab === 'settings') && (
            <div className="glass-card rounded-3xl p-8 border border-dark-border text-center py-16">
              <Sparkles className="w-12 h-12 text-brand-cyan mx-auto mb-4 animate-pulse" />
              <h2 className="text-xl font-bold text-white capitalize">{activeTab} Module</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                ReputationOS autonomous agent is monitoring this module. All on-chain assets and telemetry for address {currentWallet.address} are continuously synchronized.
              </p>
              <button
                onClick={() => setActiveTab('overview')}
                className="mt-6 px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-2xl text-xs font-semibold transition-all shadow-glow-blue/30"
              >
                Return to Overview Dashboard
              </button>
            </div>
          )}

          {/* Footer Component */}
          <Footer />
        </main>
      </div>

      <FloatingAiCopilot onOpenAiAssistant={() => setIsAiModalOpen(true)} />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        wallet={currentWallet}
      />
    </div>
  );
}

export default App;
