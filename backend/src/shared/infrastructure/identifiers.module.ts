import { Module } from '@nestjs/common';
import { UuidGeneratorService } from './uuid-generator.service';
import { ID_GENERATOR } from '../domain/tokens';

@Module({
  providers: [
    {
      provide: ID_GENERATOR,
      useClass: UuidGeneratorService,
    },
  ],
  exports: [ID_GENERATOR],
})
export class IdentifiersModule {}
