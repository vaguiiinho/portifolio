import { Test, TestingModule } from '@nestjs/testing';
import { TrackStatsEvent } from './track-stats-event';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { Stats } from '../domain/entities/stats';
import { IStatsRepository } from '../domain/repositories/i-stats-repository';

describe('TrackStatsEvent', () => {
  let service: TrackStatsEvent;
  let mockRepository: jest.Mocked<IStatsRepository>;

  beforeEach(async () => {
    const mockRepo = {
      find: jest.fn(),
      update: jest.fn(),
      trackEvent: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackStatsEvent,
        {
          provide: STATS_REPOSITORY,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<TrackStatsEvent>(TrackStatsEvent);
    mockRepository = module.get(STATS_REPOSITORY);
  });

  it('should track event', async () => {
    const existingStats = new Stats('1', 5, 100, new Date(), {
      'page:home': 2,
    });
    const updatedStats = new Stats('1', 5, 100, new Date(), {
      'page:home': 2,
      'cta:contact': 1,
    });

    mockRepository.find.mockResolvedValue(existingStats);
    mockRepository.update.mockResolvedValue(updatedStats);

    const result = await service.execute({ key: 'cta:contact' });

    expect(mockRepository.find).toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.events['cta:contact']).toBe(1);
  });
});
