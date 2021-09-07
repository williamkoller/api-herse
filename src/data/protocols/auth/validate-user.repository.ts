import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';

export interface ValidateUserRepository {
  validateUser: (userInputDto: UserInputDto) => Promise<UserOutputDto>;
}
