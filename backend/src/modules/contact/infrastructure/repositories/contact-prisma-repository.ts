import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Contact } from '../../domain/entities/contact';
import { IContactRepository } from '../../domain/repositories/i-contact-repository';
import { ContactPrismaMapper } from '../mappers/contact-prisma-mapper';

@Injectable()
export class ContactPrismaRepository implements IContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Contact[]> {
    const prismaContacts = await this.prisma.contact.findMany();
    return prismaContacts.map(ContactPrismaMapper.toDomain);
  }

  async findById(id: string): Promise<Contact | null> {
    const prismaContact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return prismaContact ? ContactPrismaMapper.toDomain(prismaContact) : null;
  }

  async create(contact: Contact): Promise<Contact> {
    const data = ContactPrismaMapper.toPersistence(contact);
    const prismaContact = await this.prisma.contact.create({ data });
    return ContactPrismaMapper.toDomain(prismaContact);
  }

  async update(contact: Contact): Promise<Contact> {
    const {
      id: _id,
      createdAt: _createdAt,
      ...data
    } = ContactPrismaMapper.toPersistence(contact);
    const prismaContact = await this.prisma.contact.update({
      where: { id: contact.id },
      data,
    });
    return ContactPrismaMapper.toDomain(prismaContact);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
