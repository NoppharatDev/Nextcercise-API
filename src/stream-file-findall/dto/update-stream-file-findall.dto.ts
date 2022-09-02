import { PartialType } from '@nestjs/swagger';
import { CreateStreamFileFindallDto } from './create-stream-file-findall.dto';

export class UpdateStreamFileFindallDto extends PartialType(CreateStreamFileFindallDto) {}
