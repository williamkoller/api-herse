import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserEntity>;
}
