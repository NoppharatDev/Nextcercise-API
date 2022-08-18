import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';
import { Repository } from 'typeorm';
import { GeneratePathDto, PathDto } from './dto/path.dto';
import { Path } from './entities/path.entity';

@Injectable()
export class PathsService {
  constructor(
    @InjectRepository(Path) private pathRepository: Repository<Path>,
    @InjectRepository(CheckPoint) private checkPointRepository: Repository<CheckPoint>,
  ) { }


  async generatePath(generatePathDto: GeneratePathDto, res) {
    const { eId, path, start } = generatePathDto;
    try {

      await this.pathRepository.delete({eId})

      const findCheckPoint = await this.checkPointRepository.find({
        where: { eId: eId },
      });

      const inputArr = [];
      findCheckPoint.map((r, k) => {
        inputArr.push(r.cpId);
      })

      inputArr.splice(inputArr.indexOf(start), 1);
      let result = [];

      const permute = (arr, m = []) => {
        if (arr.length === 0) {
          result.push(m);
        } else {
          for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), m.concat(next));
          }
        }
      };

      permute(inputArr);
      const arrData = [];
      result.map((r, k) => {
        if ((k + 1) <= path) {
          r.unshift(start);
          arrData.push(r);
        }
      });

      arrData.map((r, k) => {
        r.map(async (r2, k2) => {
          const objData = {
            pId: (k + 1),
            eId: eId,
            cpId: r[k2],
            cpOrder: (k2 + 1),
          }
          await this.pathRepository.save(objData)
        })
      });

      return res.status(201).send({
        statusCode: 201,
        success: true,
        message: "Generate path successfully.",
        // result: arrData
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error
      });
    }
  }

  async findAllByEvent(eId: string, res): Promise<Path[]> {
    try {
      const findCheckPointCount = await this.checkPointRepository.count({
        where: { eId: eId },
      });
      const findPath = await this.pathRepository.find({
        where: {
          eId: eId,
        },
        order: {
          pId: 'ASC',
          cpOrder: 'ASC',
        },
      });

      // for(const key in findPath) {
      //   console.log(findPath[key].cpOrder);
      //   console.log(findPath[key].cpId);
      // }

      const objGlobal = new Object();
      const groups = findPath.reduce((groups, item) => {
        const group = groups[item.pId] || [];
        group.push({
          cpOrder: item.cpOrder,
          cpId: item.cpId,
        });
        groups[item.pId] = group;
        return groups;
      }, []);
      objGlobal['eventId'] = eId;
      objGlobal['pathObj'] = groups;
      // console.log(objGlobal);

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find path successfully.",
        result: objGlobal
      });
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
