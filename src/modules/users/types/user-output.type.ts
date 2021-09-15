import { RoleOutputType } from '@/modules/roles/types/role.output.type';

export type UserOutputType = {
  id: number;
  name: string;
  surname: string;
  email: string;
  lastLogged: string;
  cpf: string;
  cnh: string;
  rg: string;
  roles: RoleOutputType[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
