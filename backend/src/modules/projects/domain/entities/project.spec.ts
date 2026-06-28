import { Project } from './project';

describe('Project', () => {
  const mockId = '1';
  const mockTitle = 'Test Project';
  const mockDescription = 'A test project';
  const mockTechStack = ['TypeScript', 'NestJS'];
  const mockGithubUrl = 'https://github.com/test';
  const mockLiveUrl = 'https://live.com';
  const mockCreatedAt = new Date();

  let project: Project;

  beforeEach(() => {
    project = new Project(
      mockId,
      mockTitle,
      mockDescription,
      mockTechStack,
      mockGithubUrl,
      mockLiveUrl,
      mockCreatedAt,
    );
  });

  it('should create a project with correct properties', () => {
    expect(project.id).toBe(mockId);
    expect(project.title).toBe(mockTitle);
    expect(project.description).toBe(mockDescription);
    expect(project.techStack).toEqual(mockTechStack);
    expect(project.githubUrl).toBe(mockGithubUrl);
    expect(project.liveUrl).toBe(mockLiveUrl);
    expect(project.createdAt).toBe(mockCreatedAt);
  });

  it('should return a copy of techStack array', () => {
    const techStack = project.techStack;
    techStack.push('New Tech');
    expect(project.techStack).toEqual(mockTechStack);
  });

  it('should update title', () => {
    const newTitle = 'Updated Title';
    project.updateTitle(newTitle);
    expect(project.title).toBe(newTitle);
  });

  it('should update description', () => {
    const newDescription = 'Updated description';
    project.updateDescription(newDescription);
    expect(project.description).toBe(newDescription);
  });

  it('should update techStack', () => {
    const newTechStack = ['React', 'Node.js'];
    project.updateTechStack(newTechStack);
    expect(project.techStack).toEqual(newTechStack);
  });

  it('should update githubUrl', () => {
    const newGithubUrl = 'https://github.com/updated';
    project.updateGithubUrl(newGithubUrl);
    expect(project.githubUrl).toBe(newGithubUrl);
  });

  it('should update liveUrl', () => {
    const newLiveUrl = 'https://updated.com';
    project.updateLiveUrl(newLiveUrl);
    expect(project.liveUrl).toBe(newLiveUrl);
  });
});
