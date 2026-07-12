export interface StatsResponseDto {
  id: string;
  projectsCount: number;
  visitors: number;
  events: Record<string, number>;
  updatedAt: Date;
}
