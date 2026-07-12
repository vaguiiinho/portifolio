import { Injectable, Inject } from '@nestjs/common';
import { Contact } from '../domain/entities/contact';
import type { IContactRepository } from '../domain/repositories/i-contact-repository';
import type { IIdGenerator } from '../../../shared/domain/services/i-id-generator';

export interface SendContactInput {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class SendContact {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
    @Inject('IIdGenerator') private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: SendContactInput): Promise<Contact> {
    const id = this.idGenerator.generate();
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
}
