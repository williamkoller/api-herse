import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface LoadUserByIdRepository {
  loadById: (id: number) => Promise<UserEntity>;
}
