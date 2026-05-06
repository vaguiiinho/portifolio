import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { GetStats } from '../application/get-stats';
import { UpdateStats } from '../application/update-stats';
import { Stats } from '../domain/entities/stats';

describe('StatsController', () => {
  let controller: StatsController;
  let mockGetStats: jest.Mocked<GetStats>;
  let mockUpdateStats: jest.Mocked<UpdateStats>;

  beforeEach(async () => {
    const mockGet = { execute: jest.fn() };
    const mockUpdate = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        { provide: GetStats, useValue: mockGet },
        { provide: UpdateStats, useValue: mockUpdate },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    mockGetStats = module.get(GetStats);
    mockUpdateStats = module.get(UpdateStats);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return stats', async () => {
      const mockStats = new Stats('1', 5, 100, new Date());
      mockGetStats.execute.mockResolvedValue(mockStats);

      const result = await controller.get();

      expect(mockGetStats.execute).toHaveBeenCalled();
      expect(result).toBe(mockStats);
    });
  });

  describe('update', () => {
    it('should update stats', async () => {
      const dto = { projectsCount: 10, visitors: 200 };
      const mockStats = new Stats('1', 10, 200, new Date());
      mockUpdateStats.execute.mockResolvedValue(mockStats);

      const result = await controller.update(dto);

      expect(mockUpdateStats.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockStats);
    });
  });
});