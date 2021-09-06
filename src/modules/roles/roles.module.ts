import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';
import { BuildPaginationObjectService } from '@/shared/pagination/services/build-pagination-object/build-pagination-object.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';
import { LoadAllRolesService } from './services/load-all-roles/load-all-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RolesRepository])],
  providers: [
    LoadAllRolesService,
    CalculateOffsetService,
    BuildPaginationObjectService,
  ],
  controllers: [RolesController],
})
export class RolesModule {}
