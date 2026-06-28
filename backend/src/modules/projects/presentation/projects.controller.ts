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
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File as MulterFile } from 'multer';
import { CreateProject } from '../application/create-project';
import { ListProjects } from '../application/list-projects';
import { UpdateProject } from '../application/update-project';
import { DeleteProject } from '../application/delete-project';
import { IProjectRepository } from '../domain/repositories/i-project-repository';
import { CreateProjectDto, UpdateProjectDto } from './dtos';

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

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
  @UseInterceptors(
    FileInterceptor('videoFile', {
      limits: {
        fileSize: MAX_VIDEO_SIZE,
      },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateProjectDto,
    @UploadedFile() videoFile?: MulterFile,
  ) {
    return this.createProject.execute({
      ...dto,
      videoUrl: this.resolveVideoUrl(dto.videoUrl, videoFile),
    });
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('videoFile', {
      limits: {
        fileSize: MAX_VIDEO_SIZE,
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @UploadedFile() videoFile?: MulterFile,
  ) {
    return this.updateProject.execute({
      id,
      ...dto,
      videoUrl: this.resolveVideoUrl(dto.videoUrl, videoFile),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.deleteProject.execute(id);
  }

  private resolveVideoUrl(
    videoUrl?: string,
    videoFile?: MulterFile,
  ): string | undefined {
    if (videoFile) {
      if (!videoFile.mimetype.startsWith('video/')) {
        throw new BadRequestException('Video file must be a video MIME type');
      }

      return `data:${videoFile.mimetype};base64,${videoFile.buffer.toString('base64')}`;
    }

    return videoUrl;
  }
}
