import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { IIdGenerator } from '../domain/services/i-id-generator';

@Injectable()
export class UuidGeneratorService implements IIdGenerator {
  generate(): string {
    return randomUUID();
  }
}
