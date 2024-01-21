import { ApiProperty } from '@nestjs/swagger';
import { Pet } from 'src/pets/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @Column({ nullable: true })
  age?: string;

  @OneToMany(() => Pet, (pet) => pet.owner, {
    eager: true,
  })
  pets: Pet[];
}
