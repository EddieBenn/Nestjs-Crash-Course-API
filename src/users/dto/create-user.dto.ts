import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @ApiProperty({ required: false })
  age?: number;
}
