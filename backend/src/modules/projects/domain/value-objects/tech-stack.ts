export class TechStack {
  private constructor(private readonly values: string[]) {}

  static create(values: string[]): TechStack {
    const normalized = [
      ...new Set(values.map((value) => value.trim()).filter(Boolean)),
    ];

    if (normalized.length === 0) {
      throw new Error(
        'Project tech stack must contain at least one technology',
      );
    }

    return new TechStack(normalized);
  }

  toArray(): string[] {
    return [...this.values];
  }
}
