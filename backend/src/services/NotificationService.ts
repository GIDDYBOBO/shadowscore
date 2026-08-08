export interface NotificationPayload {
  recipient: string;
  channel: 'TELEGRAM' | 'DISCORD' | 'WEBHOOK' | 'EMAIL';
  event: 'HIGH_RISK_ALERT' | 'UNLIMITED_APPROVAL_DETECTED' | 'WHALE_TRANSFER';
  title: string;
  body: string;
}

export class NotificationService {
  private dispatchHistory: NotificationPayload[] = [];

  public async dispatchAlert(payload: NotificationPayload): Promise<boolean> {
    this.dispatchHistory.push(payload);
    console.log(`[Notification Service] Dispatched ${payload.event} to ${payload.channel} (${payload.recipient})`);
    return true;
  }

  public getHistory(): NotificationPayload[] {
    return this.dispatchHistory.slice(-20);
  }
}

export const notificationService = new NotificationService();
