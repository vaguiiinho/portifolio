import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PROJECT_REPOSITORY } from '../../../shared/domain/tokens';
import { Project } from '../domain/entities/project';
import type { IProjectRepository } from '../domain/repositories/i-project-repository';
import { FindProject } from './find-project';

describe('FindProject', () => {
  let service: FindProject;
  let repository: jest.Mocked<IProjectRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindProject,
        {
          provide: PROJECT_REPOSITORY,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    service = module.get(FindProject);
    repository = module.get(PROJECT_REPOSITORY);
  });

  it('maps a project found by id to an application result', async () => {
    const project = new Project('1', 'Title', 'Description', ['NestJS'], '', '', new Date());
    repository.findById.mockResolvedValue(project);

    await expect(service.execute('1')).resolves.toEqual(project.toJSON());
  });

  it('throws a HTTP-safe error when the project does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.execute('1')).rejects.toBeInstanceOf(NotFoundException);
  });
});
