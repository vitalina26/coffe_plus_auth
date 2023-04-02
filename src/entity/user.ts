import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Coffe } from './coffe';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User {
  @Column()
  userSalt: string;

  @Column()
  firstname: string;

  @Column()
  secondname: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
  role: UserRole;

  @Column()
  phonenumber: string;

}