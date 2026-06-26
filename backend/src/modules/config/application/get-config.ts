import { Inject, Injectable } from '@nestjs/common';
import { Config } from '../domain/entities/config';
import type { IConfigRepository } from '../domain/repositories/i-config-repository';

@Injectable()
export class GetConfig {
  constructor(
    @Inject('IConfigRepository')
    private readonly configRepository: IConfigRepository,
  ) {}

  async execute(): Promise<Config> {
    return this.configRepository.find();
  }
}
