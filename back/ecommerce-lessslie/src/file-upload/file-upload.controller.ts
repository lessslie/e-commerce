import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUpLoadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUpLoadService) {}

  @Post('uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000,
            message: 'El tamaño de la imagen debe ser inferior a 200kb',
          }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(file, productId);
  }
}
