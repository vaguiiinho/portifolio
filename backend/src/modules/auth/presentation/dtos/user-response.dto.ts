import { UserRole } from '../../domain/entities/user';

export interface UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
