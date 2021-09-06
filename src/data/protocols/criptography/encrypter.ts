import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface Encrypter {
  encrypt: (user: UserEntity) => Promise<string>;
}
