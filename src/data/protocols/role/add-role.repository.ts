import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { AddRoleDto } from '@/modules/roles/dtos/add-role/add-role.dto';

export interface AddRoleRepository {
  add: (addRoleDto: AddRoleDto) => Promise<RoleEntity>;
}
