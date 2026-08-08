export interface LiveStreamTxItem {
  id: string;
  txHash: string;
  walletAddress: string;
  tokenSymbol: string;
  tokenAddress?: string;
  amount: number;
  usdValue: number;
  gasGwei: number;
  chainName: string;
  swapRoute: string;
  protocol: string;
  status: 'SUCCESS' | 'REVERTED';
  timestamp: string;
}

type StreamListener = (tx: LiveStreamTxItem) => void;

export class LiveTransactionStreamService {
  private memoryBuffer: LiveStreamTxItem[] = [];
  private listeners: Set<StreamListener> = new Set();
  private isStreaming: boolean = false;
  private intervalId: any = null;

  constructor() {
    this.seedInitialStream();
    this.startLiveStreamEngine();
  }

  private seedInitialStream() {
    const protocols = ['Uniswap v3', 'Aerodrome', 'Raydium V4', 'Curve Finance', 'PancakeSwap v3'];
    const chains = ['Ethereum', 'Base', 'Solana', 'Arbitrum', 'Polygon', 'BNB Chain'];
    const tokens = [
      { sym: 'ETH/USDC', in: 'ETH', out: 'USDC', usd: 1944.79 },
      { sym: 'SOL/BONK', in: 'SOL', out: 'BONK', usd: 142.50 },
      { sym: 'KAITO/ETH', in: 'KAITO', out: 'ETH', usd: 1.25 },
      { sym: 'PEPE/WETH', in: 'PEPE', out: 'WETH', usd: 4200.00 },
      { sym: 'crvUSD/USDT', in: 'crvUSD', out: 'USDT', usd: 5000.00 }
    ];

    for (let i = 0; i < 15; i++) {
      const tok = tokens[i % tokens.length];
      const chain = chains[i % chains.length];
      const proto = protocols[i % protocols.length];
      const isSuccess = Math.random() > 0.05;

      const randomWallet = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const randomTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      this.memoryBuffer.push({
        id: `stream-${i}`,
        txHash: `${randomTx.slice(0, 6)}...${randomTx.slice(-4)}`,
        walletAddress: `${randomWallet.slice(0, 6)}...${randomWallet.slice(-4)}`,
        tokenSymbol: tok.sym,
        amount: Math.round((Math.random() * 5 + 0.1) * 100) / 100,
        usdValue: Math.round(tok.usd * (Math.random() * 2 + 0.5) * 100) / 100,
        gasGwei: Math.round((Math.random() * 12 + 6) * 10) / 10,
        chainName: chain,
        swapRoute: `${tok.in} ➔ ${tok.out}`,
        protocol: proto,
        status: isSuccess ? 'SUCCESS' : 'REVERTED',
        timestamp: new Date(Date.now() - i * 4000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }

  public startLiveStreamEngine() {
    if (this.isStreaming) return;
    this.isStreaming = true;

    // Emits new live transactions every 1.5 - 3 seconds
    this.intervalId = setInterval(() => {
      this.generateLiveIncomingTx();
    }, 2200);
  }

  private generateLiveIncomingTx() {
    const protocols = ['Uniswap v3', 'Aerodrome', 'Raydium V4', 'Curve Finance', 'PancakeSwap v3'];
    const chains = ['Ethereum', 'Base', 'Solana', 'Arbitrum', 'Polygon', 'BNB Chain'];
    const tokens = [
      { sym: 'ETH/USDC', in: 'ETH', out: 'USDC', usd: 1944.79 },
      { sym: 'SOL/BONK', in: 'SOL', out: 'BONK', usd: 142.50 },
      { sym: 'KAITO/ETH', in: 'KAITO', out: 'ETH', usd: 1.25 },
      { sym: 'PEPE/WETH', in: 'PEPE', out: 'WETH', usd: 4200.00 },
      { sym: 'WBTC/USDT', in: 'WBTC', out: 'USDT', usd: 64500.00 }
    ];

    const tok = tokens[Math.floor(Math.random() * tokens.length)];
    const chain = chains[Math.floor(Math.random() * chains.length)];
    const proto = protocols[Math.floor(Math.random() * protocols.length)];
    const isSuccess = Math.random() > 0.04;

    const randomWallet = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const amt = Math.round((Math.random() * 4 + 0.1) * 100) / 100;

    const newTx: LiveStreamTxItem = {
      id: `stream-${Date.now()}`,
      txHash: `${randomTx.slice(0, 6)}...${randomTx.slice(-4)}`,
      walletAddress: `${randomWallet.slice(0, 6)}...${randomWallet.slice(-4)}`,
      tokenSymbol: tok.sym,
      amount: amt,
      usdValue: Math.round(tok.usd * amt * 100) / 100,
      gasGwei: Math.round((Math.random() * 14 + 5) * 10) / 10,
      chainName: chain,
      swapRoute: `${tok.in} ➔ ${tok.out}`,
      protocol: proto,
      status: isSuccess ? 'SUCCESS' : 'REVERTED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.memoryBuffer.unshift(newTx);
    if (this.memoryBuffer.length > 200) this.memoryBuffer.pop();

    // Broadcast to all active WebSocket listeners
    this.listeners.forEach((listener) => listener(newTx));
  }

  public subscribe(callback: StreamListener): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public getRecentTransactions(limit: number = 30): LiveStreamTxItem[] {
    return this.memoryBuffer.slice(0, limit);
  }
}

export const liveTransactionStreamService = new LiveTransactionStreamService();
