import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return sourceFiles(path);
    }

    return entry.isFile() && path.endsWith('.ts') && !path.endsWith('.spec.ts')
      ? [path]
      : [];
  });
}

describe('Architecture boundaries', () => {
  it('does not allow the domain layer to import infrastructure', () => {
    const domainDirectories = [
      join(__dirname, 'shared/domain'),
      ...readdirSync(join(__dirname, 'modules'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(__dirname, 'modules', entry.name, 'domain')),
    ];

    const violations = domainDirectories
      .filter((directory) => {
        try {
          readdirSync(directory);
          return true;
        } catch {
          return false;
        }
      })
      .flatMap(sourceFiles)
      .filter((file) => /from\s+['"][^'"]*infrastructure/.test(readFileSync(file, 'utf8')));

    expect(violations).toEqual([]);
  });
});
