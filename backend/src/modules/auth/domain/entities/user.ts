export enum UserRole {
  visitante = 'visitante',
  administrador = 'administrador',
}

export class User {
  private _id: string;
  private _email: string;
  private _passwordHash: string;
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
    this._id = id;
    this._email = email;
    this._passwordHash = passwordHash;
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
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
