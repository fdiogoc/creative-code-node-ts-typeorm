import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  endereco!: string;

  @Column()
  numero!: number;

  @Column()
  complemento: string;

  @Column()
  cep: number;

  @Column()
  cidade: string;

  @Column()
  estado: string;
}
