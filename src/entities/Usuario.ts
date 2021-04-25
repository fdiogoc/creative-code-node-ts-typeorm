import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Etnia {
  BRANCO = 'Branco',
  NEGRO = 'Negro',
  INDIGENA = 'indígena',
  PARDO = 'Pardo',
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({ nullable: true })
  idade: number;

  @Column({ nullable: true })
  peso: number;

  @Column({ nullable: true })
  telefone: string;

  @Column({
    type: 'enum',
    enum: Etnia,
    nullable: true,
  })
  etnia: Etnia;
}
