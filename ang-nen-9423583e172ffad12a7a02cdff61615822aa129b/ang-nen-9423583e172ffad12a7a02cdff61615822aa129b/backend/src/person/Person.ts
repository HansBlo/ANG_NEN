import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  vorname: string;

  @Column({ length: 50 })
  nachname: string;

  @Column({ nullable: true })
  alter: number;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  stadt: string;

  @Column({ length: 100, nullable: true })
  beruf: string;

  @CreateDateColumn({ name: 'erstellt_am', type: 'timestamp' })
  erstelltAm: Date;
}
