import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';

export interface AddUserRepository {
  add: (createUserDto: CreateUserDto) => Promise<UserEntity>;
}
