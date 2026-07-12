import type { StatsResult } from '../../application/stats-result';
import type { StatsResponseDto } from '../dtos/stats-response.dto';

export function toStatsResponse(result: StatsResult): StatsResponseDto {
  return { ...result, events: { ...result.events } };
}
