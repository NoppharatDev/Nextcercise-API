import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>
  ) { }

  async login(adminDto: AdminDto, res) {
    try {
      const findAdmin = await this.adminRepository.findOneBy(adminDto);
      if (findAdmin) {
        const { aId, email } = findAdmin;
        const jwt = await this.jwtService.signAsync({
          aId: aId,
          email: email,
        });

        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: `Login successfully!`,
          result: {
            authToken: jwt
          }
        });
      } else {

        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Login failed! Not Found...`,
          result: findAdmin
        });
      }
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error
      });
    }
  }
}
