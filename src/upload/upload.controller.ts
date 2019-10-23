import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Get, Response, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { multerOptions } from './multer-options.config';
import { IFile } from './upload.models';

@UseGuards(AuthGuard())
@Controller('upload')
export class UploadController {
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  public uploadAvatar(@UploadedFile() file: IFile): any {
    return file;
  }

  @Get(':imageName')
  public getImage(@Param('imageName') imageName: any, @Response() res): any {
    return res.sendFile(imageName, {
      root: 'files',
    });
  }
}
