export class PasswordHash {
  private constructor(private readonly value: string) {}

  static create(value: string): PasswordHash {
    if (!value.trim()) {
      throw new Error('Password hash must not be empty');
    }

    return new PasswordHash(value);
  }

  toString(): string {
    return this.value;
  }
}
