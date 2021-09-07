import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { UserOutputType } from '@/modules/users/types/user-output.type';
import { formattedDate } from '@/utils/validator/formatted-date/formatted-date';

export const userTransformer = (user: UserEntity): UserOutputType => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    lastLogged: formattedDate(user.lastLogged),
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const usersTransformer = (users: UserEntity[]): UserOutputType[] => {
  for (const user of users) {
    return [
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        lastLogged: formattedDate(user.lastLogged),
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    ];
  }
};
