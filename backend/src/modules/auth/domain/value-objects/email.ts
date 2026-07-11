export class Email {
  private static readonly pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    const normalized = value.trim().toLowerCase();

    if (!Email.pattern.test(normalized)) {
      throw new Error('Email must be valid');
    }

    return new Email(normalized);
  }

  toString(): string {
    return this.value;
  }
}
