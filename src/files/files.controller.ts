import { Controller, Get, Response, Post, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  @Get(':fileName')
  public getFile(@Param('fileName') fileName, @Response() res): any {
    return res.sendFile(fileName, { root: 'uploads' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  public uploadFile(@UploadedFile() file): any {
    return file;
  }
}
