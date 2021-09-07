import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface ValidateUserForAuthRepository {
  validateUserForAuth: (eemail: string) => Promise<UserEntity>;
}
