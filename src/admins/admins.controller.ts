import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { AdminDto } from './dto/admin.dto';

@ApiTags('Admins')
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  login(@Body() adminDto: AdminDto, @Res() res) {
    return this.adminsService.login(adminDto, res);
  }
}