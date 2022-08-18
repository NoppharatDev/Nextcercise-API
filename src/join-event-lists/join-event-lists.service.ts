import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Path } from 'src/paths/entities/path.entity';
import { Repository } from 'typeorm';
import { JoinEventListDto } from './dto/join-event-list.dto';
import { JoinEventList } from './entities/join-event-list.entity';

@Injectable()
export class JoinEventListsService {
  constructor(
    @InjectRepository(JoinEventList) private joinEventListRepository: Repository<JoinEventList>,
    @InjectRepository(Path) private pathRepository: Repository<Path>,
  ) { }

  async generate(eId: string, joinEventListDto: JoinEventListDto, res) {
    const getRndInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    try {
      const findPath = await this.pathRepository.find({
        where: {
          eId: eId,
        },
        order: {
          pId: 'ASC',
          cpOrder: 'ASC',
        },
      });
      const objGlobal = new Object();
      const groups = findPath.reduce((groups, item) => {
        const group = groups[item.pId] || [];
        group.push({
          cpOrder: item.cpOrder,
          cpId: item.cpId,
        });
        groups[item.pId] = group;
        return groups;
      }, {});
      objGlobal['eventId'] = eId;
      objGlobal['pathObj'] = groups;
      const groupsLength = Object.keys(groups).length;
      if(groupsLength > 0) {
        const randomKey = getRndInteger(1, groupsLength);
        console.log(randomKey);        
        console.log(groups[randomKey]);
        return res.status(201).send({
          statusCode: 201,
          success: true,
          message: "Generate join event list successfully.",
          result: objGlobal,
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Generate join event list faild! (not found paths in event ${eId})`,
          result: objGlobal,
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

  findAll() {
    return `This action returns all joinEventLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} joinEventList`;
  }

  update(id: number, joinEventListDto: JoinEventListDto) {
    return `This action updates a #${id} joinEventList`;
  }

  remove(id: number) {
    return `This action removes a #${id} joinEventList`;
  }
}
