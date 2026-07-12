import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStats } from './update-stats';
import { STATS_REPOSITORY } from '../../../shared/domain/tokens';
import { Stats } from '../domain/entities/stats';
import { IStatsRepository } from '../domain/repositories/i-stats-repository';

describe('UpdateStats', () => {
  let service: UpdateStats;
  let mockRepository: jest.Mocked<IStatsRepository>;

  beforeEach(async () => {
    const mockRepo = {
      find: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStats,
        {
          provide: STATS_REPOSITORY,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UpdateStats>(UpdateStats);
    mockRepository = module.get(STATS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update stats', async () => {
    const existingStats = new Stats('1', 5, 100, new Date());

    const input = {
      projectsCount: 10,
      visitors: 200,
    };

    const updatedStats = new Stats('1', 10, 200, new Date());

    mockRepository.find.mockResolvedValue(existingStats);
    mockRepository.update.mockResolvedValue(updatedStats);

    const result = await service.execute(input);

    expect(mockRepository.find).toHaveBeenCalled();
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result.projectsCount).toBe(10);
    expect(result.visitors).toBe(200);
  });

  it('should keep existing values if not provided', async () => {
    const existingStats = new Stats('1', 5, 100, new Date());

    mockRepository.find.mockResolvedValue(existingStats);
    mockRepository.update.mockResolvedValue(existingStats);

    const result = await service.execute({ projectsCount: 10 });

    expect(result.visitors).toBe(100);
  });
});
