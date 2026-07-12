import { Contact } from '../../domain/entities/contact';
import { ContactPrismaMapper } from './contact-prisma-mapper';

describe('ContactPrismaMapper', () => {
  it('preserves the normalized contact data', () => {
    const contact = new Contact(
      'contact-1',
      'Jane',
      ' JANE@EXAMPLE.COM ',
      'Hello',
      new Date('2026-01-01T00:00:00.000Z'),
    );

    expect(ContactPrismaMapper.toPersistence(contact)).toMatchObject({
      email: 'jane@example.com',
      name: 'Jane',
      message: 'Hello',
    });
  });
});
