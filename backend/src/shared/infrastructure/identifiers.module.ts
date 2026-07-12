import { Module } from '@nestjs/common';
import { UuidGeneratorService } from './uuid-generator.service';

@Module({
  providers: [
    {
      provide: 'IIdGenerator',
      useClass: UuidGeneratorService,
    },
  ],
  exports: ['IIdGenerator'],
})
export class IdentifiersModule {}
