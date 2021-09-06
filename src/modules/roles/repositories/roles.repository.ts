import {
  AddRoleRepository,
  FindRoleAndCountRepository,
} from '@/data/protocols/role';
import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RoleEntity)
export class RolesRepository
  extends Repository<RoleEntity>
  implements AddRoleRepository, FindRoleAndCountRepository
{
  public async add(): Promise<RoleEntity> {
    const newRole = this.create();
    return this.save(newRole);
  }

  public async findRoleAndCount(
    offset: number,
    limit: number,
  ): Promise<[RoleEntity[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
