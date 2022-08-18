import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) { }

  async login(authDto: AuthDto, res) {
    try {
      const { email } = authDto;
      const findAuth = await this.authRepository.findOneBy({ email: email })
      if(findAuth) {
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: "Login successfully.",
          result: findAuth,
        });
      } else {
        const saveAuth = await this.authRepository.save(authDto)
        return res.status(201).send({
          statusCode: 201,
          success: true,
          message: "Create new account successfully.",
          result: saveAuth,
        });
      }
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }
}
