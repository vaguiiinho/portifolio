import { Module } from '@nestjs/common';
import { ContactController } from './presentation/contact.controller';
import { SendContact } from './application/send-contact';
import { ContactPrismaRepository } from './infrastructure/repositories/contact-prisma-repository';
import { PrismaService } from '../../shared/infrastructure/prisma.service';

@Module({
  controllers: [ContactController],
  providers: [
    SendContact,
    {
      provide: 'IContactRepository',
      useClass: ContactPrismaRepository,
    },
    PrismaService,
  ],
})
export class ContactModule {}
