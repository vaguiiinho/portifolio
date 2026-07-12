import { ProjectUrl } from './project-url';

describe('ProjectUrl', () => {
  it('normalizes optional external URLs', () => {
    expect(ProjectUrl.external(' https://github.com/example/repo ')).toBe(
      'https://github.com/example/repo',
    );
    expect(ProjectUrl.external('')).toBe('');
  });

  it('accepts supported video URL formats', () => {
    expect(ProjectUrl.video('https://example.com/demo.mp4')).toBe(
      'https://example.com/demo.mp4',
    );
    expect(ProjectUrl.video('/uploads/demo.mp4')).toBe('/uploads/demo.mp4');
    expect(ProjectUrl.video('data:video/mp4;base64,AAAA')).toBe(
      'data:video/mp4;base64,AAAA',
    );
  });

  it('rejects malformed and unsupported URLs', () => {
    expect(() => ProjectUrl.external('ftp://example.com/repo')).toThrow(
      'Project external URL must be a valid HTTP(S) URL',
    );
    expect(() => ProjectUrl.video('invalid-url')).toThrow(
      'Project video URL must be a valid HTTP(S) URL',
    );
  });
});
