import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
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
}
