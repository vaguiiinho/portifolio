import { Test, TestingModule } from '@nestjs/testing';
import { SendContact } from './send-contact';
import { Contact } from '../domain/entities/contact';
import { IContactRepository } from '../domain/repositories/i-contact-repository';

describe('SendContact', () => {
  let service: SendContact;
  let mockRepository: jest.Mocked<IContactRepository>;
  const idGenerator = { generate: jest.fn(() => 'contact-id') };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendContact,
        {
          provide: 'IContactRepository',
          useValue: mockRepo,
        },
        {
          provide: 'IIdGenerator',
          useValue: idGenerator,
        },
      ],
    }).compile();

    service = module.get<SendContact>(SendContact);
    mockRepository = module.get('IContactRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };

    const mockContact = new Contact(
      '123',
      input.name,
      input.email,
      input.message,
      new Date(),
    );

    mockRepository.create.mockResolvedValue(mockContact);

    const result = await service.execute(input);

    expect(mockRepository.create).toHaveBeenCalled();
    expect(idGenerator.generate).toHaveBeenCalled();
    expect(result).toBe(mockContact);
    expect(result.name).toBe(input.name);
  });
});
