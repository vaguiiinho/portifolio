import { Inject, Injectable } from '@nestjs/common';
import { Config } from '../domain/entities/config';
import type { IConfigRepository } from '../domain/repositories/i-config-repository';
import { CONFIG_REPOSITORY } from '../../../shared/domain/tokens';

@Injectable()
export class GetConfig {
  constructor(
    @Inject(CONFIG_REPOSITORY)
    private readonly configRepository: IConfigRepository,
  ) {}

  async execute(): Promise<Config> {
    return this.configRepository.find();
  }
}
