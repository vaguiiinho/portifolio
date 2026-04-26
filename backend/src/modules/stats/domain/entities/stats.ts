export class Stats {
  private _id: string;
  private _projectsCount: number;
  private _visitors: number;
  private _updatedAt: Date;

  constructor(
    id: string,
    projectsCount: number,
    visitors: number,
    updatedAt: Date,
  ) {
    this._id = id;
    this._projectsCount = projectsCount;
    this._visitors = visitors;
    this._updatedAt = updatedAt;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get projectsCount(): number {
    return this._projectsCount;
  }

  get visitors(): number {
    return this._visitors;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Methods
  incrementProjectsCount(): void {
    this._projectsCount += 1;
    this._updatedAt = new Date();
  }

  decrementProjectsCount(): void {
    if (this._projectsCount > 0) {
      this._projectsCount -= 1;
      this._updatedAt = new Date();
    }
  }

  incrementVisitors(): void {
    this._visitors += 1;
    this._updatedAt = new Date();
  }

  updateProjectsCount(count: number): void {
    this._projectsCount = count;
    this._updatedAt = new Date();
  }

  updateVisitors(count: number): void {
    this._visitors = count;
    this._updatedAt = new Date();
  }
}