import { LoadUserProfileService } from '@/modules/users/services/load-user-profile/load-user-profile.service';
import { UserOutputType } from '@/modules/users/types/user-output.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserInputDto } from '../dtos/user-input/user-input.dto';
import { UserOutputDto } from '../dtos/user-output/user-output.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loadUserProfileService: LoadUserProfileService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logging user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  public async login(
    @Body() userInputDto: UserInputDto,
  ): Promise<UserOutputDto> {
    return await this.authService.validateUser({
      email: userInputDto.email,
      password: userInputDto.password,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logging user',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  public async me(@Req() req: Request): Promise<UserOutputType> {
    return await this.loadUserProfileService.loadUserProfile(req.user.id);
  }
}
