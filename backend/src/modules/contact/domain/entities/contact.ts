export class Contact {
  private _id: string;
  private _name: string;
  private _email: string;
  private _message: string;
  private _createdAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    message: string,
    createdAt: Date,
  ) {
    this._id = this.required(id, 'Contact id');
    this._name = this.required(name, 'Contact name');
    this._email = this.normalizeEmail(email);
    this._message = this.required(message, 'Contact message');
    this._createdAt = createdAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get message(): string {
    return this._message;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  updateName(name: string): void {
    this._name = this.required(name, 'Contact name');
  }

  updateEmail(email: string): void {
    this._email = this.normalizeEmail(email);
  }

  updateMessage(message: string): void {
    this._message = this.required(message, 'Contact message');
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      message: this.message,
      createdAt: this.createdAt,
    };
  }

  private required(value: string, field: string): string {
    const normalized = value.trim();
    if (!normalized) {
      throw new Error(`${field} must not be empty`);
    }
    return normalized;
  }

  private normalizeEmail(email: string): string {
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error('Contact email must be valid');
    }
    return normalized;
  }
}
