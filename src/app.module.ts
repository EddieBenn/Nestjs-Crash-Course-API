import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { PetsModule } from './pets/pets.module';
import { Pet } from './pets/entities/pet.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    User,
    UsersModule,
    Pet,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
