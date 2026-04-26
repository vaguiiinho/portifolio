import { Injectable } from '@nestjs/common';
import { Contact } from '../domain/entities/contact';
import type { IContactRepository } from '../domain/repositories/i-contact-repository';

export interface SendContactInput {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class SendContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(input: SendContactInput): Promise<Contact> {
    const id = this.generateId();
    const createdAt = new Date();

    const contact = new Contact(
      id,
      input.name,
      input.email,
      input.message,
      createdAt,
    );

    return this.contactRepository.create(contact);
  }

  private generateId(): string {
    // Simple ID generation
    return Date.now().toString();
  }
}