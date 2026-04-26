export class Project {
  private _id: string;
  private _title: string;
  private _description: string;
  private _techStack: string[];
  private _githubUrl: string;
  private _liveUrl: string;
  private _createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    techStack: string[],
    githubUrl: string,
    liveUrl: string,
    createdAt: Date,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._techStack = techStack;
    this._githubUrl = githubUrl;
    this._liveUrl = liveUrl;
    this._createdAt = createdAt;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get techStack(): string[] {
    return [...this._techStack];
  }

  get githubUrl(): string {
    return this._githubUrl;
  }

  get liveUrl(): string {
    return this._liveUrl;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Methods
  updateTitle(title: string): void {
    this._title = title;
  }

  updateDescription(description: string): void {
    this._description = description;
  }

  updateTechStack(techStack: string[]): void {
    this._techStack = [...techStack];
  }

  updateGithubUrl(githubUrl: string): void {
    this._githubUrl = githubUrl;
  }

  updateLiveUrl(liveUrl: string): void {
    this._liveUrl = liveUrl;
  }
}
