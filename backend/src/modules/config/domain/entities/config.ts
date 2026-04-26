export class Config {
  private _id: string;
  private _siteName: string;
  private _description: string;
  private _updatedAt: Date;

  constructor(
    id: string,
    siteName: string,
    description: string,
    updatedAt: Date,
  ) {
    this._id = id;
    this._siteName = siteName;
    this._description = description;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get siteName(): string {
    return this._siteName;
  }

  get description(): string {
    return this._description;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Methods
  updateSiteName(siteName: string): void {
    this._siteName = siteName;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this._description = description;
    this._updatedAt = new Date();
  }
}