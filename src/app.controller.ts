import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('createdataset')
  creatDataset() {
    return this.appService.datasetCreate();
  }

  @Get()
  getUser() {
    return this.appService.getUser();
  }
}
