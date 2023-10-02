import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @ApiProperty({ required: false })
  age?: number;
}
