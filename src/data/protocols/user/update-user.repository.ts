import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { UpddateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';

export interface UpdateUserRepository {
  updateUser: (
    user: UserEntity,
    updateUserDto: UpddateUserDto,
  ) => Promise<UserEntity>;
}
