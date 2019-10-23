import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as mime from 'mime';

import { IFile } from './upload.models';
import { BadRequestException } from '@nestjs/common';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 1048576,
  },
  storage: diskStorage({
    destination: './files/',
    filename: (req, file: IFile, cb) => {
      if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
        cb(new BadRequestException('Only jpeg and png images allowed!'));
      }

      cb(null, `${Date.now().toString()}.${mime.getExtension(file.mimetype)}`);
    },
  }),
};
