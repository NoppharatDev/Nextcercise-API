import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinEventDto } from './dto/join-event.dto';
import { JoinEvent } from './entities/join-event.entity';

@Injectable()
export class JoinEventsService {
  constructor(
    @InjectRepository(JoinEvent) private joinEventRepository: Repository<JoinEvent>,
  ) { }

  async joinEvent(joinEventDto: JoinEventDto, res) {
    try {
      const { eId, uId } = joinEventDto;
      const findJoinEvent = await this.joinEventRepository.findOneBy({ eId: eId, uId: uId })
      if (findJoinEvent) {
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: "Found join event in system.",
          result: findJoinEvent,
        });
      } else {
        const saveJoinEvent = await this.joinEventRepository.save(joinEventDto)
        return res.status(201).send({
          statusCode: 201,
          success: true,
          message: "Join event successfully.",
          result: saveJoinEvent,
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
