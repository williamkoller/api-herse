import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';

export interface AddRoleRepository {
  add: () => Promise<RoleEntity>;
}
