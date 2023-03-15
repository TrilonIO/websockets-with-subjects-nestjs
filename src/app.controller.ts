import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  addWebsocketEvent(@Body() body: { name: string; data: string }) {
    return this.appService.addEvent(body.name, body.data);
  }
}
