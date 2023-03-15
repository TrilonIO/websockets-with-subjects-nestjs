import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { WebsocketsService } from './websockets.service';

@Module({
  providers: [WebsocketsService, WebsocketsGateway],
  exports: [WebsocketsService],
})
export class WebsocketsModule {}
