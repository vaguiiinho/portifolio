export class Stats {
  private _id: string;
  private _projectsCount: number;
  private _visitors: number;
  private _events: Record<string, number>;
  private _updatedAt: Date;

  constructor(
    id: string,
    projectsCount: number,
    visitors: number,
    updatedAt: Date,
    events: Record<string, number> = {},
  ) {
    this._id = id;
    this._projectsCount = projectsCount;
    this._visitors = visitors;
    this._events = { ...events };
    this._updatedAt = updatedAt;
  }

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

  get events(): Record<string, number> {
    return { ...this._events };
  }

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

  trackEvent(key: string, increment = 1): void {
    if (!key.trim()) {
      return;
    }

    this._events[key] = (this._events[key] ?? 0) + increment;
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      projectsCount: this.projectsCount,
      visitors: this.visitors,
      events: this.events,
      updatedAt: this.updatedAt,
    };
  }
}
