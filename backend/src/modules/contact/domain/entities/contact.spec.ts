import { Contact } from './contact';

describe('Contact', () => {
  const mockId = '1';
  const mockName = 'John Doe';
  const mockEmail = 'john@example.com';
  const mockMessage = 'Hello, this is a test message';
  const mockCreatedAt = new Date();

  let contact: Contact;

  beforeEach(() => {
    contact = new Contact(
      mockId,
      mockName,
      mockEmail,
      mockMessage,
      mockCreatedAt,
    );
  });

  it('should create a contact with correct properties', () => {
    expect(contact.id).toBe(mockId);
    expect(contact.name).toBe(mockName);
    expect(contact.email).toBe(mockEmail);
    expect(contact.message).toBe(mockMessage);
    expect(contact.createdAt).toBe(mockCreatedAt);
  });

  it('should update name', () => {
    const newName = 'Jane Doe';
    contact.updateName(newName);
    expect(contact.name).toBe(newName);
  });

  it('should update email', () => {
    const newEmail = 'jane@example.com';
    contact.updateEmail(newEmail);
    expect(contact.email).toBe(newEmail);
  });

  it('should update message', () => {
    const newMessage = 'Updated message';
    contact.updateMessage(newMessage);
    expect(contact.message).toBe(newMessage);
  });

  it('should normalize email and reject invalid contact data', () => {
    contact.updateEmail(' JANE@EXAMPLE.COM ');
    expect(contact.email).toBe('jane@example.com');
    expect(
      () => new Contact(mockId, '', mockEmail, mockMessage, mockCreatedAt),
    ).toThrow('Contact name must not be empty');
  });
});
