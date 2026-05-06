import { Stats } from './stats';

describe('Stats', () => {
  const mockId = '1';
  const mockProjectsCount = 5;
  const mockVisitors = 100;
  const mockUpdatedAt = new Date();

  let stats: Stats;

  beforeEach(() => {
    stats = new Stats(
      mockId,
      mockProjectsCount,
      mockVisitors,
      mockUpdatedAt,
    );
  });

  it('should create stats with correct properties', () => {
    expect(stats.id).toBe(mockId);
    expect(stats.projectsCount).toBe(mockProjectsCount);
    expect(stats.visitors).toBe(mockVisitors);
    expect(stats.updatedAt).toBe(mockUpdatedAt);
  });

  it('should increment projects count', () => {
    stats.incrementProjectsCount();
    expect(stats.projectsCount).toBe(mockProjectsCount + 1);
    expect(stats.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should decrement projects count', () => {
    stats.decrementProjectsCount();
    expect(stats.projectsCount).toBe(mockProjectsCount - 1);
  });

  it('should not decrement below zero', () => {
    const zeroStats = new Stats('2', 0, 0, new Date());
    zeroStats.decrementProjectsCount();
    expect(zeroStats.projectsCount).toBe(0);
  });

  it('should increment visitors', () => {
    stats.incrementVisitors();
    expect(stats.visitors).toBe(mockVisitors + 1);
    expect(stats.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should update projects count', () => {
    const newCount = 10;
    stats.updateProjectsCount(newCount);
    expect(stats.projectsCount).toBe(newCount);
    expect(stats.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should update visitors', () => {
    const newCount = 200;
    stats.updateVisitors(newCount);
    expect(stats.visitors).toBe(newCount);
    expect(stats.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });
});