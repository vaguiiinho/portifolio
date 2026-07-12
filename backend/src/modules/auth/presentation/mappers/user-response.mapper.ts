import type { UserResult } from '../../application/user-result';
import type { UserResponseDto } from '../dtos/user-response.dto';

export function toUserResponse(result: UserResult): UserResponseDto {
  return {
    id: result.id,
    email: result.email,
    role: result.role,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };
}
