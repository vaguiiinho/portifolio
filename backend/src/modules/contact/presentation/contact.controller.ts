import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { SendContact } from '../application/send-contact';
import { SendContactDto } from './dtos';
import { toContactResponse } from './mappers/contact-response.mapper';
import { RateLimit, RateLimitGuard } from '../../../shared/infrastructure';

@Controller('contact')
export class ContactController {
  constructor(private readonly sendContact: SendContact) {}

  @Post()
  @UseGuards(RateLimitGuard)
  @RateLimit(10, 60_000)
  @HttpCode(HttpStatus.CREATED)
  async send(@Body() dto: SendContactDto) {
    return toContactResponse(await this.sendContact.execute(dto));
  }
}
