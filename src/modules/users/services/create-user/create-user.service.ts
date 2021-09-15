import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { validateCpf } from '@/utils/validator/validate-cpf/validate-cpf';
import { LoadUserEmailAlreadyExistsService } from '@/modules/users/services/load-user-by-email-already-exists/load-user-email-already-exists.service';
import { createUserTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserParamsOutput } from '@/modules/users/interfaces/user-output.interface';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly loadUserEmailAlreadyExistsService: LoadUserEmailAlreadyExistsService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserParamsOutput> {
    await this.loadUserEmailAlreadyExistsService.loadByEmail(
      createUserDto.email,
    );

    const data = {
      ...createUserDto,
      password: await this.bcryptAdapter.hash(createUserDto.password),
      cpf: validateCpf(createUserDto.cpf),
    };

    const userCreateddd = await this.userRepo.add(data);

    return createUserTransformer(userCreateddd);
  }
}
