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
    this._id = id;
    this._name = name;
    this._email = email;
    this._message = message;
    this._createdAt = createdAt;
  }

  // Getters
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

  // Methods
  updateName(name: string): void {
    this._name = name;
  }

  updateEmail(email: string): void {
    this._email = email;
  }

  updateMessage(message: string): void {
    this._message = message;
  }
}
