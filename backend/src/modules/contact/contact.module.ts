import { Module } from '@nestjs/common';
import { ContactController } from './presentation/contact.controller';
import { SendContact } from './application/send-contact';
import { ContactPrismaRepository } from './infrastructure/repositories/contact-prisma-repository';
import { IdentifiersModule } from '../../shared/infrastructure';

@Module({
  imports: [IdentifiersModule],
  controllers: [ContactController],
  providers: [
    SendContact,
    {
      provide: 'IContactRepository',
      useClass: ContactPrismaRepository,
    },
  ],
})
export class ContactModule {}
