import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @ApiCreatedResponse({ type: Pet })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetDto);
  }

  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({ type: Pet, isArray: true })
  @Get()
  findAll(@Query('name') name?: string): Promise<Pet[]> {
    return this.petsService.findAll(name);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Pet, description: 'Return Pet' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pet> {
    const pet = this.petsService.findOne(id);

    if (!pet) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return pet;
  }

  @ApiOkResponse({ type: Pet })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pet> {
    return this.petsService.update(id, updatePetDto);
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Pet> {
    return this.petsService.remove(id);
  }
}
