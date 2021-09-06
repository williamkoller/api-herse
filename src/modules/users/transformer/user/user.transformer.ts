import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { UserOutputType } from '@/modules/users/types/user-output.type';

export const userTransformer = (user: UserEntity): UserOutputType => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    lastLogged: user.lastLogged,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
