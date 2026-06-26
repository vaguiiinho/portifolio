import { Inject, Injectable } from '@nestjs/common';
import { Config } from '../domain/entities/config';
import type { IConfigRepository } from '../domain/repositories/i-config-repository';

export interface UpdateConfigInput {
  siteName?: string;
  description?: string;
}

@Injectable()
export class UpdateConfig {
  constructor(
    @Inject('IConfigRepository')
    private readonly configRepository: IConfigRepository,
  ) {}

  async execute(input: UpdateConfigInput): Promise<Config> {
    const existingConfig = await this.configRepository.find();

    const updatedConfig = new Config(
      existingConfig.id,
      input.siteName ?? existingConfig.siteName,
      input.description ?? existingConfig.description,
      new Date(),
    );

    return this.configRepository.update(updatedConfig);
  }
}
