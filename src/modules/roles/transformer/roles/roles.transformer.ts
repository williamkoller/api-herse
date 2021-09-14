import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { RoleOutputType } from '@/modules/roles/types/role.output.type';
import { formattedDate } from '@/utils/validator/formatted-date/formatted-date';

export const rolesTransformer = (roles: RoleEntity[]): RoleOutputType[] => {
  for (const role of roles) {
    return [
      {
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions,
        createdAt: formattedDate(role.createdAt),
        updatedAt: formattedDate(role.updatedAt),
      },
    ];
  }
};

export const roleTransformer = (role: RoleEntity): RoleOutputType => {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
    createdAt: formattedDate(role.createdAt),
    updatedAt: formattedDate(role.updatedAt),
  };
};
