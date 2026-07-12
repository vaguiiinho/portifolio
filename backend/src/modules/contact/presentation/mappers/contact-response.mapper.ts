import type { ContactResult } from '../../application/contact-result';
import type { ContactResponseDto } from '../dtos/contact-response.dto';

export function toContactResponse(result: ContactResult): ContactResponseDto {
  return { ...result };
}
