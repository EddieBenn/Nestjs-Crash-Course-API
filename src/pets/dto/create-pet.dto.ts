import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePetDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @ApiProperty()
  ownerId: string;
}
