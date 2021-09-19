import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  LoadAllUsersRepository,
  LastTimeLoggedRepository,
  UpdateUserRepository,
  LoadUserAndCountRepository,
  LoadUserByCpfRepository,
} from '@/data/protocols/user';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { validateCpf } from '@/utils/validator/validate-cpf/validate-cpf';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadAllUsersRepository,
    LastTimeLoggedRepository,
    UpdateUserRepository,
    LoadUserAndCountRepository,
    LoadUserByCpfRepository
{
  public async add(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create(createUserDto);
    return await this.save(newUser);
  }

  public async loadByEmail(email: string): Promise<UserEntity> {
    return await this.createQueryBuilder('users')
      .where('users.email = (:email)', { email })
      .getOne();
  }

  public async loadById(id: number): Promise<UserEntity> {
    return await this.findOne({ where: { id } });
  }

  public async loadAll(): Promise<UserEntity[]> {
    return await this.find();
  }

  public async lastTimeLogged(userId: number, lastLogged: Date): Promise<void> {
    await this.query('UPDATE "users" SET "lastLogged" = $2 WHERE id = $1', [
      userId,
      lastLogged,
    ]);
  }

  public async updateUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updateUser = this.merge(user, { ...updateUserDto });
    return await this.save(updateUser);
  }

  public async loadAndCount(
    offset: number,
    limit: number,
  ): Promise<[UserEntity[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }

  public async loadUserByCpf(cpf: string): Promise<UserEntity> {
    return await this.findOne({ where: { cpf: validateCpf(cpf) } });
  }
}
