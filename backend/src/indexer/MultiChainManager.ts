import { SUPPORTED_CHAINS, type ChainConfig } from '../config/chains';
import { ChainIndexer } from './ChainIndexer';

export class MultiChainManager {
  private indexers: Map<string, ChainIndexer> = new Map();

  constructor() {
    this.initializeIndexers();
  }

  private initializeIndexers() {
    Object.entries(SUPPORTED_CHAINS).forEach(([key, config]) => {
      const indexer = new ChainIndexer(config);
      this.indexers.set(key, indexer);
    });
  }

  public async startAll(eventCallbacks: any) {
    console.log(`[MultiChainManager] Launching real-time blockchain indexers across ${this.indexers.size} networks...`);
    for (const [key, indexer] of this.indexers.entries()) {
      indexer.setCallbacks(eventCallbacks);
      indexer.start();
    }
  }

  public stopAll() {
    for (const indexer of this.indexers.values()) {
      indexer.stop();
    }
  }
}

export const multiChainManager = new MultiChainManager();
