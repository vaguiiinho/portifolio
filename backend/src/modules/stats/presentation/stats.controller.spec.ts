import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { GetStats } from '../application/get-stats';
import { UpdateStats } from '../application/update-stats';
import { TrackStatsEvent } from '../application/track-stats-event';
import { Stats } from '../domain/entities/stats';
import { AuthGuard } from '../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../auth/presentation/guards/roles.guard';
import { Reflector } from '@nestjs/core';

describe('StatsController', () => {
  let controller: StatsController;
  let mockGetStats: jest.Mocked<GetStats>;
  let mockUpdateStats: jest.Mocked<UpdateStats>;
  let mockTrackStatsEvent: jest.Mocked<TrackStatsEvent>;

  beforeEach(async () => {
    const mockGet = { execute: jest.fn() };
    const mockUpdate = { execute: jest.fn() };
    const mockTrack = { execute: jest.fn() };
    const mockTokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const mockReflector = {
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        { provide: GetStats, useValue: mockGet },
        { provide: UpdateStats, useValue: mockUpdate },
        { provide: TrackStatsEvent, useValue: mockTrack },
        { provide: 'ITokenService', useValue: mockTokenService },
        { provide: Reflector, useValue: mockReflector },
        AuthGuard,
        RolesGuard,
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    mockGetStats = module.get(GetStats);
    mockUpdateStats = module.get(UpdateStats);
    mockTrackStatsEvent = module.get(TrackStatsEvent);
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

  describe('trackEvent', () => {
    it('should track event', async () => {
      const dto = { key: 'cta:contact', increment: 2 };
      const mockStats = new Stats('1', 5, 100, new Date(), {
        'cta:contact': 2,
      });
      mockTrackStatsEvent.execute.mockResolvedValue(mockStats);

      const result = await controller.trackEvent(dto);

      expect(mockTrackStatsEvent.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockStats);
    });
  });
});
