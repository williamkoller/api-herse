import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';
import { AddRoleService } from './services/add-role/add-role.service';
import { LoadAllRolesService } from './services/load-all-roles/load-all-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RolesRepository])],
  providers: [
    AddRoleService,
    BuildPaginationObjectService,
    CalculateOffsetService,
    LoadAllRolesService,
  ],
  controllers: [RolesController],
})
export class RolesModule {}
