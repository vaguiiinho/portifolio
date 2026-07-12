import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SendContact } from '../application/send-contact';
import { SendContactDto } from './dtos';
import { toContactResponse } from './mappers/contact-response.mapper';

@Controller('contact')
export class ContactController {
  constructor(private readonly sendContact: SendContact) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async send(@Body() dto: SendContactDto) {
    return toContactResponse(await this.sendContact.execute(dto));
  }
}
