import { liveTransactionStreamService, type LiveStreamTxItem } from '../services/LiveTransactionStreamService';

export class LiveWebSocketServer {
  private clients: Set<(event: string, payload: any) => void> = new Set();

  constructor() {
    this.initBroadcaster();
  }

  private initBroadcaster() {
    liveTransactionStreamService.subscribe((tx: LiveStreamTxItem) => {
      this.broadcast('NEW_TRANSACTION', tx);
    });
  }

  public registerClient(sendFn: (event: string, payload: any) => void) {
    this.clients.add(sendFn);
    return () => this.clients.delete(sendFn);
  }

  public broadcast(event: string, payload: any) {
    this.clients.forEach((client) => {
      try {
        client(event, payload);
      } catch (err) {}
    });
  }
}

export const wsBroadcaster = new LiveWebSocketServer();
