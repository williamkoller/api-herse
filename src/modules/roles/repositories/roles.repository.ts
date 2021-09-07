import {
  AddRoleRepository,
  FindRoleAndCountRepository,
  FindRoleByNameRepository,
} from '@/data/protocols/role';
import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddRoleDto } from '../dtos/add-role/add-role.dto';

@EntityRepository(RoleEntity)
export class RolesRepository
  extends Repository<RoleEntity>
  implements
    AddRoleRepository,
    FindRoleAndCountRepository,
    FindRoleByNameRepository
{
  public async add(addRoleDto: AddRoleDto): Promise<RoleEntity> {
    const newRole = this.create(addRoleDto);
    return await this.save(newRole);
  }

  public async findByName(name: string): Promise<RoleEntity> {
    return await this.createQueryBuilder('roles')
      .where('(roles.name ILIKE :name)', { name: `%${name}%` })
      .getOne();
  }

  public async findRoleAndCount(
    offset: number,
    limit: number,
  ): Promise<[RoleEntity[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
