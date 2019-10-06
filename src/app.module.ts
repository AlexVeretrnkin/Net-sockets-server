import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSocket } from './app.socket';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppSocket],
})
export class AppModule {}
