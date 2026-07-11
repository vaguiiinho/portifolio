export class PlainPassword {
  private constructor(private readonly value: string) {}

  static create(value: string): PlainPassword {
    if (value.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    return new PlainPassword(value);
  }

  toString(): string {
    return this.value;
  }
}
