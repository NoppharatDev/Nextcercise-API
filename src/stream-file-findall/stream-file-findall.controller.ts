import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StreamFileFindallService } from './stream-file-findall.service';
import { CreateStreamFileFindallDto } from './dto/create-stream-file-findall.dto';
import { UpdateStreamFileFindallDto } from './dto/update-stream-file-findall.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('stream-file-findall')
@Controller('stream-file-findall')
export class StreamFileFindallController {
  constructor(private readonly streamFileFindallService: StreamFileFindallService) {}

  @Post()
  create(@Body() createStreamFileFindallDto: CreateStreamFileFindallDto) {
    return this.streamFileFindallService.create(createStreamFileFindallDto);
  }

  @Get()
  findAll(@Res() res) {
    return this.streamFileFindallService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamFileFindallService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamFileFindallDto: UpdateStreamFileFindallDto) {
    return this.streamFileFindallService.update(+id, updateStreamFileFindallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamFileFindallService.remove(+id);
  }
}
