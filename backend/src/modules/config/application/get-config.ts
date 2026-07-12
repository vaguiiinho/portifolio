import { Inject, Injectable } from '@nestjs/common';
import type { IConfigRepository } from '../domain/repositories/i-config-repository';
import { CONFIG_REPOSITORY } from '../../../shared/domain/tokens';
import { ConfigResult, toConfigResult } from './config-result';

@Injectable()
export class GetConfig {
  constructor(
    @Inject(CONFIG_REPOSITORY)
    private readonly configRepository: IConfigRepository,
  ) {}

  async execute(): Promise<ConfigResult> {
    return toConfigResult(await this.configRepository.find());
  }
}
