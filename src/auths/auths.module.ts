import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Auth])],
  controllers: [AuthsController],
  providers: [AuthsService]
})
export class AuthsModule {}
