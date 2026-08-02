import { BadRequestException, Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import type { File as MulterFile } from 'multer';
import { GetConfig } from '../application/get-config';
import { UpdateConfig } from '../application/update-config';
import { UpdateConfigDto } from './dtos';
import { AuthGuard } from '../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../auth/presentation/guards/roles.guard';
import { Roles } from '../../auth/presentation/decorators/roles.decorator';
import { UserRole } from '../../auth/domain/entities/user';
import { toConfigResponse } from './mappers/config-response.mapper';

@Controller('config')
export class ConfigController {
  constructor(
    private readonly getConfig: GetConfig,
    private readonly updateConfig: UpdateConfig,
  ) {}

  @Get()
  async get() {
    return toConfigResponse(await this.getConfig.execute());
  }

  @Put()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.administrador)
  async update(@Body() dto: UpdateConfigDto) {
    return toConfigResponse(await this.updateConfig.execute(dto));
  }

  @Post('resume')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.administrador)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  async uploadResume(@UploadedFile() file?: MulterFile) {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Envie um arquivo PDF de até 10 MB');
    }
    const directory = join(process.cwd(), 'uploads', 'resume');
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'curriculo.pdf'), file.buffer);
    return { resumeUrl: '/uploads/resume/curriculo.pdf' };
  }
}
