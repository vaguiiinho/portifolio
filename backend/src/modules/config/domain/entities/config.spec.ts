import { Config } from './config';

describe('Config', () => {
  const mockId = '1';
  const mockSiteName = 'My Portfolio';
  const mockDescription = 'A portfolio site';
  const mockUpdatedAt = new Date();

  let config: Config;

  beforeEach(() => {
    config = new Config(mockId, mockSiteName, mockDescription, mockUpdatedAt);
  });

  it('should create config with correct properties', () => {
    expect(config.id).toBe(mockId);
    expect(config.siteName).toBe(mockSiteName);
    expect(config.description).toBe(mockDescription);
    expect(config.updatedAt).toBe(mockUpdatedAt);
  });

  it('should update site name', () => {
    const newSiteName = 'Updated Portfolio';
    config.updateSiteName(newSiteName);
    expect(config.siteName).toBe(newSiteName);
    expect(config.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });

  it('should update description', () => {
    const newDescription = 'Updated description';
    config.updateDescription(newDescription);
    expect(config.description).toBe(newDescription);
    expect(config.updatedAt.getTime()).toBeGreaterThan(mockUpdatedAt.getTime());
  });
});
