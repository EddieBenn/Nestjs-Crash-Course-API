import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Successfully reached nestjs-crash-course api!!';
  }
}
