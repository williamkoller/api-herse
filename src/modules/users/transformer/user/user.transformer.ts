import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { rolesTransformer } from '@/modules/roles/transformer/roles/roles.transformer';
import {
  UserOutput,
  UserParamsOutput,
} from '@/modules/users/interfaces/user-output.interface';
import { formattedDate } from '@/utils/validator/formatted-date/formatted-date';

export const userTransformer = (user: UserEntity): UserOutput => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    lastLogged: formattedDate(user.lastLogged),
    cpf: user.cpf,
    cnh: user.cnh,
    rg: user.rg,
    roles: rolesTransformer(user.roles),
    createdAt: formattedDate(user.createdAt),
    updatedAt: formattedDate(user.updatedAt),
  };
};

export const createUserTransformer = (user: UserEntity): UserParamsOutput => {
  return {
    name: user.name,
    surname: user.surname,
    email: user.email,
    lastLogged: formattedDate(user.lastLogged),
    cpf: user.cpf,
    cnh: user.cnh,
    rg: user.rg,
    createdAt: formattedDate(user.createdAt),
    updatedAt: formattedDate(user.updatedAt),
  };
};

export const usersTransformer = (users: UserEntity[]): UserOutput[] => {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    lastLogged: formattedDate(user.lastLogged),
    cpf: user.cpf,
    cnh: user.cnh,
    rg: user.rg,
    roles: rolesTransformer(user.roles),
    createdAt: formattedDate(user.createdAt),
    updatedAt: formattedDate(user.updatedAt),
  }));
};
