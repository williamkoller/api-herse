import { RoleOutputType } from '@/modules/roles/types/role.output.type';

export interface UserOutput {
  id: number;
  name: string;
  surname: string;
  email: string;
  lastLogged: Date | string;
  cpf: string;
  cnh: string;
  rg: string;
  roles: RoleOutputType[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserParamsOutput = Omit<UserOutput, 'id' | 'roles'>;
