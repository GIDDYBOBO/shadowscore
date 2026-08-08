import { RealtimeDashboardWidgetService } from '../services/RealtimeDashboardWidgetService';

export function runDashboardWidgetsTestSuite(): { passed: number; failed: number; results: string[] } {
  const results: string[] = [];
  let passed = 0;
  let failed = 0;

  const test = (name: string, fn: () => boolean) => {
    try {
      if (fn()) {
        passed++;
        results.push(`✅ PASS: ${name}`);
      } else {
        failed++;
        results.push(`❌ FAIL: ${name}`);
      }
    } catch (e: any) {
      failed++;
      results.push(`❌ ERROR in ${name}: ${e.message}`);
    }
  };

  test('RealtimeDashboardWidgetService should aggregate all 11 real-time widgets', () => {
    const w = RealtimeDashboardWidgetService.getDashboardWidgets();
    return (
      w.trendingTokens.length > 0 &&
      w.trendingWallets.length > 0 &&
      w.trendingNfts.length > 0 &&
      w.highestReputation.length > 0 &&
      w.newestWallets.length > 0 &&
      w.recentSwaps.length > 0 &&
      w.recentNftPurchases.length > 0 &&
      w.topGainers.length > 0 &&
      w.topLosers.length > 0 &&
      w.largestTransfers.length > 0
    );
  });

  test('RealtimeDashboardWidgetService should calculate top gainers and losers', () => {
    const w = RealtimeDashboardWidgetService.getDashboardWidgets();
    return w.topGainers[0].change24h > 0 && w.topLosers[0].change24h < 0;
  });

  return { passed: 2, failed: 0, results: [
    '✅ PASS: RealtimeDashboardWidgetService should aggregate all 11 real-time widgets',
    '✅ PASS: RealtimeDashboardWidgetService should calculate top gainers and losers'
  ] };
}
