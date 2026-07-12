import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ConfigController } from './config.controller';
import { GetConfig } from '../application/get-config';
import { UpdateConfig } from '../application/update-config';
import { AuthGuard } from '../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../auth/presentation/guards/roles.guard';
import { Config } from '../domain/entities/config';
import type { SiteContent } from '../domain/entities/site-content';
import { TOKEN_SERVICE } from '../../../shared/domain/tokens';

describe('ConfigController', () => {
  let controller: ConfigController;
  let mockGetConfig: jest.Mocked<GetConfig>;
  let mockUpdateConfig: jest.Mocked<UpdateConfig>;

  beforeEach(async () => {
    const mockGet = { execute: jest.fn() };
    const mockUpdate = { execute: jest.fn() };
    const mockTokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const mockReflector = {
      getAllAndOverride: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigController],
      providers: [
        { provide: GetConfig, useValue: mockGet },
        { provide: UpdateConfig, useValue: mockUpdate },
        { provide: TOKEN_SERVICE, useValue: mockTokenService },
        { provide: Reflector, useValue: mockReflector },
        AuthGuard,
        RolesGuard,
      ],
    }).compile();

    controller = module.get(ConfigController);
    mockGetConfig = module.get(GetConfig);
    mockUpdateConfig = module.get(UpdateConfig);
  });

  it('should return config', async () => {
    const mockConfig = new Config(
      '1',
      'Site',
      'Description',
      { pt: ['Descrição em português'], en: ['Description in English'] },
      {
        pt: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
        en: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
      },
      { pt: { cards: [], trustPoints: [] }, en: { cards: [], trustPoints: [] } },
      new Date('2026-06-28T00:00:00.000Z'),
    );
    mockGetConfig.execute.mockResolvedValue(mockConfig.toJSON());

    await expect(controller.get()).resolves.toEqual(mockConfig.toJSON());
    expect(mockGetConfig.execute).toHaveBeenCalled();
  });

  it('should update config', async () => {
    const dto: Omit<SiteContent, 'contactContent'> & { siteName?: string; description?: string } = {
      aboutBio: { pt: ['Novo bio'], en: ['New bio'] },
      servicesContent: {
        pt: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
        en: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
      },
      testimonialsContent: { pt: { cards: [], trustPoints: [] }, en: { cards: [], trustPoints: [] } },
      siteName: 'New site',
    };
    const mockConfig = new Config(
      '1',
      'New site',
      'Description',
      { pt: ['Novo bio'], en: ['New bio'] },
      {
        pt: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
        en: { ctaTitle: 'Need scope?', ctaDescription: 'Need scope?', ctaLabel: 'Quote', cards: [] },
      },
      { pt: { cards: [], trustPoints: [] }, en: { cards: [], trustPoints: [] } },
      new Date('2026-06-28T00:00:00.000Z'),
    );
    mockUpdateConfig.execute.mockResolvedValue(mockConfig.toJSON());

    await expect(controller.update(dto)).resolves.toEqual(mockConfig.toJSON());
    expect(mockUpdateConfig.execute).toHaveBeenCalledWith(dto);
  });
});
