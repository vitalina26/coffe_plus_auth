import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  userSalt: string;

  @Column()
  firstname: string;

  @Column()
  secondname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
  role: UserRole;

  @Column()
  phonenumber: string;
}
