import { Inject, Injectable } from '@nestjs/common';
import type { SiteContent } from '../domain/entities/site-content';
import type { IConfigRepository } from '../domain/repositories/i-config-repository';
import { CONFIG_REPOSITORY } from '../../../shared/domain/tokens';
import { ConfigResult, toConfigResult } from './config-result';
import { Config } from '../domain/entities/config';

export interface UpdateConfigInput {
  siteName?: string;
  description?: string;
  aboutBio?: SiteContent['aboutBio'];
  servicesContent?: SiteContent['servicesContent'];
  testimonialsContent?: SiteContent['testimonialsContent'];
}

@Injectable()
export class UpdateConfig {
  constructor(
    @Inject(CONFIG_REPOSITORY)
    private readonly configRepository: IConfigRepository,
  ) {}

  async execute(input: UpdateConfigInput): Promise<ConfigResult> {
    const existingConfig = await this.configRepository.find();

    const updatedConfig = new Config(
      existingConfig.id,
      input.siteName ?? existingConfig.siteName,
      input.description ?? existingConfig.description,
      input.aboutBio ?? existingConfig.aboutBio,
      input.servicesContent ?? existingConfig.servicesContent,
      input.testimonialsContent ?? existingConfig.testimonialsContent,
      new Date(),
    );

    return toConfigResult(await this.configRepository.update(updatedConfig));
  }
}
