import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '366d' },
    }),
    TypeOrmModule.forFeature([Admin])
  ],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
