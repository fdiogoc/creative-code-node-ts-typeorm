import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  endereco!: string;

  @Column()
  numero!: number;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  cep: number;

  @Column()
  cidade: string;

  @Column({ nullable: true })
  estado: string;
}
