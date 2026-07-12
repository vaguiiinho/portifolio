import type { ConfigResult } from '../../application/config-result';
import type { ConfigResponseDto } from '../dtos/config-response.dto';

export function toConfigResponse(result: ConfigResult): ConfigResponseDto {
  return {
    ...result,
    aboutBio: {
      pt: result.aboutBio.pt ? [...result.aboutBio.pt] : undefined,
      en: result.aboutBio.en ? [...result.aboutBio.en] : undefined,
    },
    servicesContent: structuredClone(result.servicesContent),
    testimonialsContent: structuredClone(result.testimonialsContent),
  };
}
