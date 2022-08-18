import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StreamFilesService } from './stream-files.service';
import { CreateStreamFileDto } from './dto/create-stream-file.dto';
import { UpdateStreamFileDto } from './dto/update-stream-file.dto';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stream Files')
@Controller('stream-files')
export class StreamFilesController {
  constructor(private readonly streamFilesService: StreamFilesService) { }

  @Get('event/:eId/:fileName')
  getEventFile(@Param('eId') eId: string, @Param('fileName') fileName: string, @Res() res) {
    try {
      const coolPath = join(process.cwd(), `src/uploads/${eId}/${fileName}`);
      if (existsSync(coolPath)) {
        const file = createReadStream(coolPath);
        file.pipe(res);
      } else {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: `Not found file in (src/uploads/${eId}/${fileName})`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: `server error (${error.message})`,
      });
    }
  }

  @Get('checkpoint/:eId/:cpId/:fileName')
    getCheckPointFile(@Param('eId') eId: string, @Param('cpId') cpId: string, @Param('fileName') fileName: string, @Res() res) {
    try {
      const coolPath = join(process.cwd(), `src/uploads/${eId}/${cpId}/${fileName}`);
      if (existsSync(coolPath)) {
        const file = createReadStream(coolPath);
        file.pipe(res);
      } else {
        return res.status(400).send({
          statusCode: 400,
          success: false,
          message: `Not found file in (src/uploads/${eId}/${cpId}/${fileName})`,
        });
      }
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: `server error (${error.message})`,
      });
    }
  }

}
