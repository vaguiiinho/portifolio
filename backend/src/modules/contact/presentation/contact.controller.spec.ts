import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { SendContact } from '../application/send-contact';
import { Contact } from '../domain/entities/contact';

describe('ContactController', () => {
  let controller: ContactController;
  let mockSendContact: jest.Mocked<SendContact>;

  beforeEach(async () => {
    const mockSend = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        { provide: SendContact, useValue: mockSend },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    mockSendContact = module.get(SendContact);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('send', () => {
    it('should send contact', async () => {
      const dto = { name: 'John', email: 'john@example.com', message: 'Hello' };
      const mockContact = new Contact('1', 'John', 'john@example.com', 'Hello', new Date());
      mockSendContact.execute.mockResolvedValue(mockContact);

      const result = await controller.send(dto);

      expect(mockSendContact.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(mockContact);
    });
  });
});