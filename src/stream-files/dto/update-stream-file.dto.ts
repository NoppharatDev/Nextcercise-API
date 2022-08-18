import { PartialType } from '@nestjs/swagger';
import { CreateStreamFileDto } from './create-stream-file.dto';

export class UpdateStreamFileDto extends PartialType(CreateStreamFileDto) {}
