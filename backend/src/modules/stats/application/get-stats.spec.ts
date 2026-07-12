import { Test, TestingModule } from '@nestjs/testing';
import { GetStats } from './get-stats';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { Stats } from '../domain/entities/stats';
import { IStatsRepository } from '../domain/repositories/i-stats-repository';

describe('GetStats', () => {
  let service: GetStats;
  let mockRepository: jest.Mocked<IStatsRepository>;

  beforeEach(async () => {
    const mockRepo = {
      find: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStats,
        {
          provide: STATS_REPOSITORY,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<GetStats>(GetStats);
    mockRepository = module.get(STATS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return stats', async () => {
    const mockStats = new Stats('1', 5, 100, new Date());

    mockRepository.find.mockResolvedValue(mockStats);

    const result = await service.execute();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockStats.toJSON());
  });
});
