import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';

export type UserOutputType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  lastLogged: string;
  roles: RoleEntity[];
  createdAt: Date;
  updatedAt: Date;
};
