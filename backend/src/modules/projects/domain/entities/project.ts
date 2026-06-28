export class Project {
  private _id: string;
  private _title: string;
  private _description: string;
  private _techStack: string[];
  private _githubUrl: string;
  private _liveUrl: string;
  private _videoUrl?: string;
  private _problemTitle?: string;
  private _problemDescription?: string;
  private _solutionTitle?: string;
  private _solutionDescription?: string;
  private _resultTitle?: string;
  private _resultDescription?: string;
  private _createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    techStack: string[],
    githubUrl: string,
    liveUrl: string,
    createdAt: Date,
    videoUrl?: string,
    problemTitle?: string,
    problemDescription?: string,
    solutionTitle?: string,
    solutionDescription?: string,
    resultTitle?: string,
    resultDescription?: string,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._techStack = techStack;
    this._githubUrl = githubUrl;
    this._liveUrl = liveUrl;
    this._createdAt = createdAt;
    this._videoUrl = videoUrl;
    this._problemTitle = problemTitle;
    this._problemDescription = problemDescription;
    this._solutionTitle = solutionTitle;
    this._solutionDescription = solutionDescription;
    this._resultTitle = resultTitle;
    this._resultDescription = resultDescription;
  }

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

  get videoUrl(): string | undefined {
    return this._videoUrl;
  }

  get problemTitle(): string | undefined {
    return this._problemTitle;
  }

  get problemDescription(): string | undefined {
    return this._problemDescription;
  }

  get solutionTitle(): string | undefined {
    return this._solutionTitle;
  }

  get solutionDescription(): string | undefined {
    return this._solutionDescription;
  }

  get resultTitle(): string | undefined {
    return this._resultTitle;
  }

  get resultDescription(): string | undefined {
    return this._resultDescription;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

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

  updateVideoUrl(videoUrl?: string): void {
    this._videoUrl = videoUrl;
  }

  updateProblemTitle(problemTitle?: string): void {
    this._problemTitle = problemTitle;
  }

  updateProblemDescription(problemDescription?: string): void {
    this._problemDescription = problemDescription;
  }

  updateSolutionTitle(solutionTitle?: string): void {
    this._solutionTitle = solutionTitle;
  }

  updateSolutionDescription(solutionDescription?: string): void {
    this._solutionDescription = solutionDescription;
  }

  updateResultTitle(resultTitle?: string): void {
    this._resultTitle = resultTitle;
  }

  updateResultDescription(resultDescription?: string): void {
    this._resultDescription = resultDescription;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      techStack: this.techStack,
      githubUrl: this.githubUrl,
      liveUrl: this.liveUrl,
      videoUrl: this.videoUrl,
      problemTitle: this.problemTitle,
      problemDescription: this.problemDescription,
      solutionTitle: this.solutionTitle,
      solutionDescription: this.solutionDescription,
      resultTitle: this.resultTitle,
      resultDescription: this.resultDescription,
      createdAt: this.createdAt,
    };
  }
}
