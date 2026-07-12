import { Injectable, Inject } from '@nestjs/common';
import { Contact } from '../domain/entities/contact';
import type { IContactRepository } from '../domain/repositories/i-contact-repository';
import type { IIdGenerator } from '../../../shared/domain/services/i-id-generator';
import { CONTACT_REPOSITORY, ID_GENERATOR } from '../../../shared/domain/tokens';
import { ContactResult, toContactResult } from './contact-result';

export interface SendContactInput {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class SendContact {
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private readonly contactRepository: IContactRepository,
    @Inject(ID_GENERATOR) private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: SendContactInput): Promise<ContactResult> {
    const id = this.idGenerator.generate();
    const createdAt = new Date();

    const contact = new Contact(
      id,
      input.name,
      input.email,
      input.message,
      createdAt,
    );

    return toContactResult(await this.contactRepository.create(contact));
  }
}
