import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly loadUserByRoleService: LoadUserByRoleService,
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      ctx.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const { headers, user } = ctx.switchToHttp().getRequest<Request>();

    if (!user) {
      throw new BadRequestException(
        'The property the user of the request is not correctly named or undefined.',
      );
    }

    const role = headers['x-role'];

    if (!role) {
      throw new BadRequestException('Role must be informed.');
    }

    const loadUserByRole = await this.loadUserByRoleService.loadUserByRole(
      user.id,
    );

    const hasRole = (): string =>
      loadUserByRole.find((roles) => roles === role);

    const hasPermission = (): string =>
      permissions.find((permission) => permission === hasRole());

    if (hasPermission() && hasRole()) return true;

    throw new ForbiddenException(
      'Role does not have permissions to access this endpoint',
    );
  }
}
