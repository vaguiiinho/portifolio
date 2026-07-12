import { Contact } from '../domain/entities/contact';

export interface ContactResult {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export function toContactResult(contact: Contact): ContactResult {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    message: contact.message,
    createdAt: contact.createdAt,
  };
}
