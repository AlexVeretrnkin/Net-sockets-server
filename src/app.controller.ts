import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApp(@Res() res) {
    // res.sendFile(__dirname + '/client/index.html');
  }
}
