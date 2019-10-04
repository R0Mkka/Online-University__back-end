import { Controller, Get } from '@nestjs/common';

@Controller('files')
export class FilesController {
  @Get()
  public getFiels(): any {
    return [1, 2, 3];
  }
}
