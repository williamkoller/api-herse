import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { RoleOutputType } from '@/modules/roles/types/role.output.type';
import { formattedDate } from '@/utils/validator/formatted-date/formatted-date';

export const roleTransformer = (role: RoleEntity): RoleOutputType => {
  return {
    id: role.id,
    userId: role.userId,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
    createdAt: formattedDate(role.createdAt),
    updatedAt: formattedDate(role.updatedAt),
  };
};

export const rolesTransformer = (roles: RoleEntity[]): RoleOutputType[] => {
  return roles.map((role) => ({
    id: role.id,
    userId: role.userId,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
    createdAt: formattedDate(role.createdAt),
    updatedAt: formattedDate(role.updatedAt),
  }));
};
