import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateProject } from '../application/create-project';
import { ListProjects } from '../application/list-projects';
import { UpdateProject } from '../application/update-project';
import { DeleteProject } from '../application/delete-project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';
import { CreateProjectDto, UpdateProjectDto } from './dtos';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProject: CreateProject,
    private readonly listProjects: ListProjects,
    private readonly updateProject: UpdateProject,
    private readonly deleteProject: DeleteProject,
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  @Get()
  async list() {
    return this.listProjects.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProjectDto) {
    return this.createProject.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.updateProject.execute({ id, ...dto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteProject.execute(id);
  }
}
