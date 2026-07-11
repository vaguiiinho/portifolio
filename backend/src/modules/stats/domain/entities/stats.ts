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
    this._id = this.requiredId(id);
    this._projectsCount = this.validCount(projectsCount, 'Projects count');
    this._visitors = this.validCount(visitors, 'Visitors count');
    this._events = this.normalizeEvents(events);
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
    this._projectsCount = this.validCount(count, 'Projects count');
    this._updatedAt = new Date();
  }

  updateVisitors(count: number): void {
    this._visitors = this.validCount(count, 'Visitors count');
    this._updatedAt = new Date();
  }

  trackEvent(key: string, increment = 1): void {
    if (!key.trim()) {
      return;
    }

    if (!Number.isInteger(increment) || increment <= 0) {
      throw new Error('Event increment must be a positive integer');
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

  private requiredId(id: string): string {
    const normalized = id.trim();
    if (!normalized) {
      throw new Error('Stats id must not be empty');
    }
    return normalized;
  }

  private validCount(value: number, field: string): number {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(`${field} must be a non-negative integer`);
    }
    return value;
  }

  private normalizeEvents(
    events: Record<string, number>,
  ): Record<string, number> {
    return Object.fromEntries(
      Object.entries(events).map(([key, value]) => [
        key,
        this.validCount(value, `Event "${key}"`),
      ]),
    );
  }
}
