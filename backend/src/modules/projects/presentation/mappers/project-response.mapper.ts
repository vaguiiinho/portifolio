import type { ProjectResult } from '../../application/project-result';
import type { ProjectResponseDto } from '../dtos/project-response.dto';

export function toProjectResponse(result: ProjectResult): ProjectResponseDto {
  return { ...result, techStack: [...result.techStack] };
}
