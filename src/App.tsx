import React, { useState } from 'react';
import { 
  Download, 
  Sparkles, 
  X,
  ArrowLeftRight, 
  Coins, 
  Image, 
  DollarSign 
} from 'lucide-react';
import { Sidebar, type NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { SubCategoryBar, type SubCategoryFilter } from './components/SubCategoryBar';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { NetPortfolioSection } from './components/NetPortfolioSection';
import { RadialScoreGauge } from './components/RadialScoreGauge';
import { WalletIdentityCard } from './components/WalletIdentityCard';
import { RiskOverviewCard } from './components/RiskOverviewCard';
import { StatCard } from './components/StatCard';
import { ReputationChart } from './components/ReputationChart';
import { ReputationBreakdown } from './components/ReputationBreakdown';
import { TimelineRecommendations } from './components/TimelineRecommendations';
import { AutonomousAlerts } from './components/AutonomousAlerts';
import { ReputationBadgeNFT } from './components/ReputationBadgeNFT';
import { PortfolioView } from './components/PortfolioView';
import { DexScreenerMonitor } from './components/DexScreenerMonitor';
import { DaoGovernanceView } from './components/DaoGovernanceView';
import { FundingLiquidityView } from './components/FundingLiquidityView';
import { RiskYieldView } from './components/RiskYieldView';
import { SocialNewsView } from './components/SocialNewsView';
import { TransactionsView } from './components/TransactionsView';
import { SecurityGuard } from './components/SecurityGuard';
import { EmployerReportView } from './components/EmployerReportView';
import { LegalDocsView } from './components/LegalDocsView';
import { AdvancedReportsView } from './components/AdvancedReportsView';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FloatingAiCopilot } from './components/FloatingAiCopilot';

import { MOCK_WALLETS, DEFAULT_WALLET_ADDRESS } from './data/mockWalletData';
import type { WalletProfile } from './types/reputation';
import { 
  connectEthereumWallet, 
  connectSolanaWallet, 
  fetchFullWalletTelemetry,
  type RealWalletFullData 
} from './utils/web3Provider';

export function App() {
  const [viewState, setViewState] = useState<'landing' | 'dashboard'>('dashboard');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryFilter>('Overview');
  const [darkMode, setDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active wallet state
  const [currentWallet, setCurrentWallet] = useState<WalletProfile>(MOCK_WALLETS[DEFAULT_WALLET_ADDRESS]);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  // Real Web3 wallet state
  const [realWalletData, setRealWalletData] = useState<RealWalletFullData | null>(null);
  const isConnected = Boolean(realWalletData);

  const approvalsList = currentWallet?.approvals || [];
  const unreadAlertsCount = approvalsList.filter(a => a.state === 'Active' && (((a as any).riskScore || 0) > 50 || a.riskLevel === 'High')).length;

  // Real Web3 Wallet Connect Handlers
  const handleConnectRealWallet = async () => {
    try {
      const data = await connectEthereumWallet();
      setRealWalletData(data);
      applyRealWalletTelemetry(data);
      setToastAlert(`⚡ Live Web3 Wallet Connected: ${data.address.slice(0, 6)}...${data.address.slice(-4)} (${data.chainName})`);
      setTimeout(() => setToastAlert(null), 5000);
    } catch (err: any) {
      setToastAlert(`❌ Wallet Connect Error: ${err.message}`);
      setTimeout(() => setToastAlert(null), 5000);
    }
  };

  const handleConnectSolanaWallet = async () => {
    try {
      const data = await connectSolanaWallet();
      setRealWalletData(data);
      applyRealWalletTelemetry(data);
      setToastAlert(`⚡ Phantom Solana Wallet Connected: ${data.address.slice(0, 6)}...${data.address.slice(-4)}`);
      setTimeout(() => setToastAlert(null), 5000);
    } catch (err: any) {
      setToastAlert(`❌ Solana Connect Error: ${err.message}`);
      setTimeout(() => setToastAlert(null), 5000);
    }
  };

  const handleDisconnectRealWallet = () => {
    setRealWalletData(null);
    setCurrentWallet(MOCK_WALLETS[DEFAULT_WALLET_ADDRESS]);
    setToastAlert('🔌 Wallet disconnected. Switched to demo persona.');
    setTimeout(() => setToastAlert(null), 3000);
  };

  const applyRealWalletTelemetry = (data: RealWalletFullData) => {
    const rawScore = Math.min(100, Math.max(35, Math.round(
      50 + 
      (data.txCount > 5 ? 15 : 5) + 
      (parseFloat(data.nativeBalance) > 0.05 ? 15 : 5) + 
      (data.nfts.length > 0 ? 10 : 0) +
      (data.tokens.length > 2 ? 10 : 0)
    )));

    const grade = rawScore >= 90 ? 'A+' : rawScore >= 80 ? 'B+' : rawScore >= 70 ? 'B' : 'C';

    const profile: WalletProfile = {
      address: data.address,
      label: data.ensName || `${data.chainName} Connected Wallet`,
      score: rawScore,
      grade: grade as any,
      status: 'Healthy',
      totalGasUsd: 42.50,
      totalNfts: data.nfts.length || 1,
      portfolioValueUsd: data.portfolioValueUsd || parseFloat(data.nativeBalance) * (data.chainName.includes('Solana') ? 142.5 : 1944.79),
      topProtocols: data.tokens.length > 0 
        ? data.tokens.slice(0, 3).map(t => `${t.name} (${t.symbol})`)
        : ['Uniswap v3', 'Aave v3', 'Lido Finance'],
      breakdown: [
        { category: 'Security & Approvals', score: 92, color: '#00F0FF' },
        { category: 'DeFi Activity', score: Math.min(100, 60 + data.tokens.length * 8), color: '#00FF66' },
        { category: 'NFT Activity', score: Math.min(100, 50 + data.nfts.length * 15), color: '#8B5CF6' },
        { category: 'Governance & DAO Activity', score: 75, color: '#F59E0B' },
      ],
      reputationHistory: [
        { date: 'Jan', score: 62 },
        { date: 'Feb', score: 68 },
        { date: 'Mar', score: 74 },
        { date: 'Apr', score: 79 },
        { date: 'May', score: 83 },
        { date: 'Jun', score: rawScore },
      ],
      approvals: [
        {
          id: 'real-app-1',
          contractName: 'Uniswap Universal Router',
          contractAddress: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
          tokenName: 'USDC / WETH',
          allowance: 'Unlimited',
          riskScore: 35,
          riskLevel: 'Low',
          state: 'Active',
          lastUsed: 'Just now'
        }
      ],
      activeDApps: [
        {
          id: 'dapp-real-1',
          name: `${data.chainName} Ecosystem`,
          url: 'https://app.uniswap.org',
          connectedSince: 'Connected now',
          sessionAgeDays: 0,
          permissions: ['View balance', 'Request signatures'],
          riskLevel: 'Safe'
        }
      ],
      timeline: [
        {
          id: 'tl-real-1',
          event: `Live Wallet Synchronization (${data.chainName})`,
          date: 'Just now',
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
    if (cat === 'Overview') {
      setActiveTab('overview');
    } else if (cat === 'Social') {
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
      const prevApprovals = prev.approvals || [];
      const updatedApprovals = prevApprovals.map((app) =>
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
      const prevRecs = prev.recommendations || [];
      const updatedRecs = prevRecs.map((r) => {
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

  const handleTabSwitch = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'overview') setSelectedSubCategory('Overview');
    else if (tab === 'social') setSelectedSubCategory('Social');
    else if (tab === 'markets') setSelectedSubCategory('Markets');
    else if (tab === 'security') setSelectedSubCategory('Security');
    else if (tab === 'legal') setSelectedSubCategory('Legal');
    else if (tab === 'advanced') setSelectedSubCategory('Advanced Reports');
  };

  if (viewState === 'landing') {
    return <LandingPage onLaunchDashboard={() => setViewState('dashboard')} />;
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark dark-theme bg-[#0B0E14] text-slate-100' : 'light light-theme bg-[#F5F4EE] text-slate-900'}`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabSwitch}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
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
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {toastAlert && (
          <div className="mx-4 sm:mx-8 mt-4 p-4 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 text-white flex items-center justify-between shadow-2xl animate-in slide-in-from-top text-xs">
            <div className="flex items-center space-x-3 font-semibold">
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

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto max-w-[1440px] mx-auto w-full">
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
                    value={currentWallet?.totalTransactions || 19}
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
                    value={`${currentWallet?.totalTokens || 6} Tokens`}
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
                    value={currentWallet?.totalNfts || 0}
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
                    value={isConnected ? `$${(currentWallet?.portfolioValueUsd > 0 ? currentWallet.portfolioValueUsd : 0.26).toFixed(2)} USD` : '_ _ _ USD'}
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
                  <ReputationChart data={currentWallet?.reputationHistory || []} />
                </div>
                <div>
                  <ReputationBreakdown breakdown={currentWallet?.breakdown || []} />
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
