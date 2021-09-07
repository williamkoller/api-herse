import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface LoadAllUsersRepository {
  loadAll: () => Promise<UserEntity[]>;
}
