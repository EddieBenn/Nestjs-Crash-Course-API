import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;
}
