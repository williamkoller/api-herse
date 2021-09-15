import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface LoadUserAndCountRepository {
  loadAndCount: (
    offset: number,
    limit: number,
  ) => Promise<[UserEntity[], number]>;
}
