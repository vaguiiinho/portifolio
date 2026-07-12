import { TechStack } from './tech-stack';

describe('TechStack', () => {
  it('normalizes values, removes blanks and deduplicates technologies', () => {
    const techStack = TechStack.create([
      ' TypeScript ',
      '',
      'NestJS',
      'TypeScript',
    ]);

    expect(techStack.toArray()).toEqual(['TypeScript', 'NestJS']);
  });

  it('does not expose its internal collection', () => {
    const techStack = TechStack.create(['TypeScript']);
    const values = techStack.toArray();
    values.push('NestJS');

    expect(techStack.toArray()).toEqual(['TypeScript']);
  });

  it('rejects an empty technology collection', () => {
    expect(() => TechStack.create([' ', ''])).toThrow(
      'Project tech stack must contain at least one technology',
    );
  });
});
