import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../../repositories/roles.repository';

@Injectable()
export class LoadUserByRoleService {
  constructor(
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly rolesRepo: RolesRepository,
  ) {}

  public async loadUserByRole(id: number): Promise<string[]> {
    const user = await this.loadUserByIdService.loadById(id);
    return await this.rolesRepo.findUserByRole(user.id);
  }
}
