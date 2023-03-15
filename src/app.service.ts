import { Injectable } from '@nestjs/common';
import { WebsocketsService } from './websockets/websockets.service';

@Injectable()
export class AppService {
  constructor(private readonly websocketsService: WebsocketsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  addEvent(name: string, data: string) {
    this.websocketsService.addEvent(name, data);
    return { success: true };
  }
}
