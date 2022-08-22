import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckpointDto } from './dto/checkpoint.dto';
import { CheckPoint } from './entities/checkpoint.entity';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
var fs = require('fs');

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(CheckPoint) private checkPointRepository: Repository<CheckPoint>
  ) {}

  /**************************/
  /** Create New CheckPoin **/
  /**************************/
  async create(files, checkPointDto: CheckpointDto, res): Promise<CheckPoint> {
    try {
      const { eId, cpId } = checkPointDto;
      const dir = `src/uploads/${eId}/${cpId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      // if(files.backgroundFile) { checkPointDto.backgroundFile = await this.uploadFile(files.backgroundFile, dir); }
      if(files.startFile) { checkPointDto.startFile = await this.uploadFile(files.startFile, dir); }
      if(files.resultFile) { checkPointDto.resultFile = await this.uploadFile(files.resultFile, dir); }
      const saveCheckPoint = await this.checkPointRepository.save(checkPointDto)

      return res.status(201).send({
        statusCode: 201,
        success: true,
        message: "Create new checkpoint successfully",
        result: saveCheckPoint
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

  /******************************/
  /** Update CheckPoint Detail **/
  /******************************/
  async update(files, eId: string, cpId: string, checkPointDto: CheckpointDto, res) {
    try {
      const dir = `src/uploads/${eId}/${cpId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      // if(files.backgroundFile) { checkPointDto.backgroundFile = await this.uploadFile(files.backgroundFile, dir); }
      if(files.startFile) { checkPointDto.startFile = await this.uploadFile(files.startFile, dir); }
      if(files.resultFile) { checkPointDto.resultFile = await this.uploadFile(files.resultFile, dir); }
      const saveCheckPoint = await this.checkPointRepository.update({eId, cpId}, checkPointDto)

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Update checkpoint successfully.",
        result: saveCheckPoint
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

  /******************************/
  /** Start Find CheckPoin All **/
  /******************************/
  async findAll(res): Promise<CheckPoint[]> {
    try {
      const findCheckPoint = await this.checkPointRepository.find({
        order: {
          createdAt: "DESC"
        }
      })

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find checkpoint all successfully.",
        result: findCheckPoint
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

  /***************************************/
  /** Start Find CheckPoin All By Event **/
  /***************************************/
  async findAllByEvent(eId, res): Promise<CheckPoint[]> {
    try {
      const findCheckPoint = await this.checkPointRepository.find({
        where: {
          eId: eId
        },
        order: {
          createdAt: "DESC"
        }
      })

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find checkpoint all by event successfully.",
        result: findCheckPoint
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

  /*****************************/
  /** Start Delete CheckPoint **/
  /*****************************/
  async deleteCheckpoint(eId, cpId, res) {
    try {
      const deleteChackpoint = await this.checkPointRepository.delete({eId, cpId});
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Delete checkpoint successfully`,
        result: deleteChackpoint
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

  async uploadFile(file, dir) {
    const file0 = file[0];
    const date = new Date().getTime();
    const uuid = uuidv4();
    let fileName = btoa(`${date}-${uuid}`);
    const originalName = file0.originalname;
    const splitOriginalName = originalName.split(".");
    const exFile = splitOriginalName[splitOriginalName.length - 1];

    const originalname = `${fileName}.${exFile}`;
    const path = `${dir}/${originalname}`;
    let fileStream = createWriteStream(path);
    fileStream.write(file0.buffer);
    fileStream.end();

    return originalname;
  }
}
