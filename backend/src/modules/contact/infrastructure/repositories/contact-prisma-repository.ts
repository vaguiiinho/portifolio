import { Injectable } from '@nestjs/common';
import { Contact as PrismaContact } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Contact } from '../../domain/entities/contact';
import { IContactRepository } from '../../domain/repositories/i-contact-repository';

@Injectable()
export class ContactPrismaRepository implements IContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Contact[]> {
    const prismaContacts = await this.prisma.contact.findMany();
    return prismaContacts.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Contact | null> {
    const prismaContact = await this.prisma.contact.findUnique({
      where: { id },
    });
    return prismaContact ? this.mapToDomain(prismaContact) : null;
  }

  async create(contact: Contact): Promise<Contact> {
    const data = {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: contact.createdAt,
    };
    const prismaContact = await this.prisma.contact.create({ data });
    return this.mapToDomain(prismaContact);
  }

  async update(contact: Contact): Promise<Contact> {
    const data = {
      name: contact.name,
      email: contact.email,
      message: contact.message,
    };
    const prismaContact = await this.prisma.contact.update({
      where: { id: contact.id },
      data,
    });
    return this.mapToDomain(prismaContact);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaContact: PrismaContact): Contact {
    return new Contact(
      prismaContact.id,
      prismaContact.name,
      prismaContact.email,
      prismaContact.message,
      prismaContact.createdAt,
    );
  }
}