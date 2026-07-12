import { Module } from '@nestjs/common';
import { ContactController } from './presentation/contact.controller';
import { SendContact } from './application/send-contact';
import { ContactPrismaRepository } from './infrastructure/repositories/contact-prisma-repository';
import { IdentifiersModule, RateLimitGuard } from '../../shared/infrastructure';
import { CONTACT_REPOSITORY } from '../../shared/domain/tokens';

@Module({
  imports: [IdentifiersModule],
  controllers: [ContactController],
  providers: [
    SendContact,
    RateLimitGuard,
    {
      provide: CONTACT_REPOSITORY,
      useClass: ContactPrismaRepository,
    },
  ],
})
export class ContactModule {}
