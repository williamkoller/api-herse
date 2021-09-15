import { BeforeInsert, Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '@/infra/db/entities/base-entity/base-entity';
import { RoleEntity } from '@/infra/db/entities/role-entity/role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  surname: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogged?: Date;

  @Column({ type: 'varchar', nullable: true })
  cpf: string;

  @Column({ type: 'varchar', nullable: true })
  cnh: string;

  @Column({ type: 'varchar', nullable: true })
  rg: string;

  @OneToMany(() => RoleEntity, (role) => role.user, { eager: true })
  @JoinTable()
  roles: RoleEntity[];

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
