import { Injectable } from '@nestjs/common';
import { CreateStreamFileDto } from './dto/create-stream-file.dto';
import { UpdateStreamFileDto } from './dto/update-stream-file.dto';

@Injectable()
export class StreamFilesService {
  create(createStreamFileDto: CreateStreamFileDto) {
    return 'This action adds a new streamFile';
  }

  findAll() {
    return `This action returns all streamFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} streamFile`;
  }

  update(id: number, updateStreamFileDto: UpdateStreamFileDto) {
    return `This action updates a #${id} streamFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} streamFile`;
  }
}
