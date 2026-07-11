import { Email, PasswordHash } from '../value-objects';

export enum UserRole {
  visitante = 'visitante',
  administrador = 'administrador',
}

export class User {
  private _id: string;
  private _email: Email;
  private _passwordHash: PasswordHash;
  private _role: UserRole;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    email: string,
    passwordHash: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date,
  ) {
    if (!id.trim()) {
      throw new Error('User id must not be empty');
    }

    if (!Object.values(UserRole).includes(role)) {
      throw new Error('User role must be valid');
    }

    this._id = id;
    this._email = Email.create(email);
    this._passwordHash = PasswordHash.create(passwordHash);
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email.toString();
  }

  get passwordHash(): string {
    return this._passwordHash.toString();
  }

  get role(): UserRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
