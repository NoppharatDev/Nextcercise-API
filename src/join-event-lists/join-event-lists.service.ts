import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinEvent } from 'src/join-events/entities/join-event.entity';
import { Path } from 'src/paths/entities/path.entity';
import { Repository } from 'typeorm';
import { JoinEventListDto } from './dto/join-event-list.dto';
import { JoinEventList } from './entities/join-event-list.entity';

@Injectable()
export class JoinEventListsService {
  constructor(
    @InjectRepository(JoinEvent) private joinEventRepository: Repository<JoinEvent>,
    @InjectRepository(JoinEventList) private joinEventListRepository: Repository<JoinEventList>,
    @InjectRepository(Path) private pathRepository: Repository<Path>,
  ) { }

  async generate(eId: string, joinEventListDto: JoinEventListDto, res) {
    const getRndInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    try {
      const { jeId } = joinEventListDto;
      const findJoinEventId = await this.joinEventRepository.findOneBy({ jeId: jeId })
      if (findJoinEventId) {
        const findJoinEventListId = await this.joinEventListRepository.findOneBy({ jeId: jeId })
        if (findJoinEventListId) {
          return res.status(200).send({
            statusCode: 200,
            success: false,
            message: `Found join event id : ${eId})`,
            result: findJoinEventListId,
          });
        } else {
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
          if (groupsLength > 0) {
            const randomKey = getRndInteger(1, groupsLength);
            const randomResult = groups[randomKey];
            console.log(randomKey);
            console.log(randomResult);
            for (const key in randomResult) {
              const dataObj = {
                jeId: jeId,
                cpOrder: randomResult[key]["cpOrder"],
                cpId: randomResult[key]["cpId"]
              }
              await this.joinEventListRepository.save(dataObj)
            }
            return res.status(201).send({
              statusCode: 201,
              success: true,
              message: "Generate join event list successfully.",
              result: randomResult,
            });
          } else {
            return res.status(200).send({
              statusCode: 200,
              success: false,
              message: `Generate join event list faild! (not found paths in event ${eId})`,
              result: objGlobal,
            });
          }
        }
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Not found join event id : ${jeId}`,
          result: findJoinEventId,
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

  async update(jelId: number, joinEventListDto: JoinEventListDto, res) {
    try {
      const findJoinEventListId = await this.joinEventListRepository.findOneBy({ jelId: jelId })
      if (findJoinEventListId) {
        console.log(findJoinEventListId);
        const updateJoinEventList = await this.joinEventListRepository.update(jelId, joinEventListDto)
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: `Update join event list successfully.`,
          result: updateJoinEventList,
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Not found join event list id : ${jelId}`,
          result: findJoinEventListId,
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

  async findAllByEventId(eId: string, res) {
    try {
      const findJoinEventId = await this.joinEventRepository.findOneBy({ eId: eId });
      if (findJoinEventId) {
        console.log(findJoinEventId.jeId);
        const findJoinEventList = await this.joinEventListRepository.findBy({ jeId: findJoinEventId.jeId });
        // console.log(findJoinEventId);
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: `Find join event list successfully.`,
          result: findJoinEventList,
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Not found event id : ${eId}`,
          result: findJoinEventId,
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

  async findOneByJoinEventList(jelId: number, res) {
    try {
      const findOneJoinEventList = await this.joinEventListRepository.findOneBy({ jelId: jelId })
      if (findOneJoinEventList) {
        return res.status(200).send({
          statusCode: 200,
          success: true,
          message: `find join event list successfully.`,
          result: findOneJoinEventList,
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          success: false,
          message: `Not found join event list id : ${jelId}`,
          result: findOneJoinEventList,
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
