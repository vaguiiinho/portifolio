import { Contact as PrismaContact } from '../../../../generated/prisma/client';
import { Contact } from '../../domain/entities/contact';

export class ContactPrismaMapper {
  static toDomain(contact: PrismaContact): Contact {
    return new Contact(
      contact.id,
      contact.name,
      contact.email,
      contact.message,
      contact.createdAt,
    );
  }

  static toPersistence(contact: Contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: contact.createdAt,
    };
  }
}
