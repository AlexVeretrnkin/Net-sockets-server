import { Injectable, UseFilters, UseGuards } from '@nestjs/common';
import { Client } from '@nestjs/microservices/external/nats-client.interface';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway(33000)
export class AppSocket implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() private server: any;
  wsClients = [];
  gameQueue = [];

  private removeClientFromList(array, client): void {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === client) {
        array.splice(i, 1);
        break;
      }
    }
  }

  afterInit() {
    this.server.emit('testing', { do: 'stuff' });
  }
  handleConnection(client) {
    this.wsClients.push(client);
    client.emit('connection', 'Connection to the game successful');
  }
  handleDisconnect(client) {
    this.removeClientFromList(this.wsClients, client);
    this.removeClientFromList(this.gameQueue, client);
    client.emit('connection', 'Disconnect successful');
  }
  @SubscribeMessage('queue')
  enterGame(client: Client, data: string): string {
    if (data === 'enter' && !this.gameQueue.includes(client)) {
      this.gameQueue.push(client);
      client.emit('queue', 'entered');
    } else if (data === 'leave' && this.gameQueue.includes(client)) {
      this.removeClientFromList(this.gameQueue, client);
      client.emit('queue', 'left');
    }
    return data;
  }

}
