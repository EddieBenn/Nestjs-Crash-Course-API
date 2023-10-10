import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  create(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet = this.petsRepository.create({
      id: uuidv4(),
      ownerId: createPetDto.ownerId,
      ...createPetDto,
    });
    return this.petsRepository.save(newPet);
  }

  async findAll(name?: string): Promise<Pet[]> {
    if (name) {
      return await this.petsRepository.find({ where: { name } });
    }
    return this.petsRepository.find();
  }

  async findOne(id: string): Promise<Pet> {
    try {
      const pet = await this.petsRepository.findOneOrFail({ where: { id } });
      return pet;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    pet.name = updatePetDto.name;

    const updatedPet = await this.petsRepository.save(pet);
    return updatedPet;
  }

  async remove(id: string): Promise<Pet> {
    const pet = await this.findOne(id);

    return await this.petsRepository.remove(pet);
  }
}
