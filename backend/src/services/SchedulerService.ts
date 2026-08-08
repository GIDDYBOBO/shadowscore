export class SchedulerService {
  private activeJobs: string[] = [];

  constructor() {
    this.initCronSchedules();
  }

  private initCronSchedules() {
    this.activeJobs.push('CRON_PRICE_SYNC (Every 15s)');
    this.activeJobs.push('CRON_STALE_APPROVAL_CLEANUP (Every 6h)');
    this.activeJobs.push('CRON_REPUTATION_TIER_RECALC (Daily 00:00 UTC)');
  }

  public getActiveJobs(): string[] {
    return this.activeJobs;
  }
}

export const schedulerService = new SchedulerService();
