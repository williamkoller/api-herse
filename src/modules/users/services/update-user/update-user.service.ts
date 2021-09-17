import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { validateCpf } from '@/utils/validator/validate-cpf/validate-cpf';
import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user/update-user.dto';
import { UsersRepository } from '../../repositories/users.repository';
import { LoadUserByIdService } from '../load-user-by-id/load-user-by-id.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly loadUserByIdService: LoadUserByIdService,
  ) {}

  public async updateCpfByUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userFound = await this.loadUserByIdService.loadById(id);

    const cpfExists = await this.usersRepo.loadUserByCpf(updateUserDto.cpf);

    if (cpfExists) throw new ConflictException('CPF is already exists.');

    const updateUserData = {
      ...updateUserDto,
      cpf: validateCpf(updateUserDto.cpf),
    };

    return await this.usersRepo.updateUser(userFound, updateUserData);
  }
}
