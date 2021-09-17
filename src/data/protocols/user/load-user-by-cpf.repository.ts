import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

export interface LoadUserByCpfRepository {
  loadUserByCpf: (cpf: string) => Promise<UserEntity>;
}
