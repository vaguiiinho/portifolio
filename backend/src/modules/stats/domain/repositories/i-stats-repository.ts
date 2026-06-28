import { Stats } from '../entities/stats';

export interface IStatsRepository {
  find(): Promise<Stats>;
  update(stats: Stats): Promise<Stats>;
  trackEvent(key: string, increment?: number): Promise<Stats>;
}
