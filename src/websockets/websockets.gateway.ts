import { OnApplicationShutdown } from '@nestjs/common';
import {
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Subscription } from 'rxjs';
import { Server } from 'socket.io';
import { WebsocketsService } from './websockets.service';

@WebSocketGateway()
export class WebsocketsGateway
  implements OnGatewayInit, OnApplicationShutdown, OnGatewayDisconnect
{
  private subscription: Subscription;
  constructor(private readonly service: WebsocketsService) {}

  afterInit(server: Server): void {
    this.subscription = this.service.getEventSubject$().subscribe({
      next: (event) => server.emit(event.name, event.data),
      error: (err) => server.emit('exception', err.toString()),
    });
  }

  onApplicationShutdown() {
    this.subscription.unsubscribe();
  }

  handleDisconnect(server: Server) {
    server.emit('closed');
  }
}
