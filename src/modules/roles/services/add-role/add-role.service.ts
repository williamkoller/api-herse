import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { AddRoleDto } from '../../dtos/add-role/add-role.dto';
import { RolesRepository } from '../../repositories/roles.repository';

@Injectable()
export class AddRoleService {
  constructor(private readonly rolesRepo: RolesRepository) {}
  public async add(addRoleDto: AddRoleDto): Promise<RoleEntity> {
    const role = await this.rolesRepo.findByName(addRoleDto.name);

    if (role) {
      throw new ConflictException('There is already a role with that name.');
    }

    return await this.rolesRepo.add(addRoleDto);
  }
}
