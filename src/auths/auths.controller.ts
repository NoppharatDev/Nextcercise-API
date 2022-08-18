import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auths')
@Controller('auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post()
  login(@Body() authDto: AuthDto, @Res() res) {
    return this.authsService.login(authDto, res);
  }
}
