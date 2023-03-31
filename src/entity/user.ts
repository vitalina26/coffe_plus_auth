import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Coffe } from './coffe';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User {
  @Column({ nullable: false })
  userSalt: string;

  @PrimaryColumn()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
  role: UserRole;

  @OneToMany(() => Coffe, (coffe) => coffe.user)
  coffes: Coffe[];
}