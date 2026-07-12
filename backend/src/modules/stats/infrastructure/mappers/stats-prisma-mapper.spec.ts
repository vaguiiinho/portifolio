import { Stats } from '../../domain/entities/stats';
import { StatsPrismaMapper } from './stats-prisma-mapper';

describe('StatsPrismaMapper', () => {
  it('maps event counters without exposing mutable domain state', () => {
    const stats = new Stats('1', 2, 3, new Date('2026-01-01T00:00:00.000Z'), {
      'page:home': 4,
    });

    expect(StatsPrismaMapper.toPersistence(stats)).toMatchObject({
      projectsCount: 2,
      visitors: 3,
      events: { 'page:home': 4 },
    });
  });
});
