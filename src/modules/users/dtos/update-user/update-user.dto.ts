import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpddateUserDto extends PartialType(CreateUserDto) {}
