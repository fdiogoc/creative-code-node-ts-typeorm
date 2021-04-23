import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Etnia {
  BRANCO = 'Branco',
  NEGRO = 'Negro',
  INDIGENA = 'indígena',
  PARDO = 'Pardo',
}

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column()
  idade: number;

  @Column()
  peso: number;

  @Column()
  telefone: number;

  @Column({
    type: 'enum',
    enum: Etnia,
  })
  etnia: Etnia;
}
