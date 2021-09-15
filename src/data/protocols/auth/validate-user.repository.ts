import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { TokenOutputDto } from '@/modules/auth/dtos/token-output/token-output.dto';

export interface ValidateUserRepository {
  validateUser: (userInputDto: UserInputDto) => Promise<TokenOutputDto>;
}
