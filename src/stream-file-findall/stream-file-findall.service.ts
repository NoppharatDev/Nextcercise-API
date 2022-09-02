import { Controller, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { CheckPoint } from 'src/checkpoints/entities/checkpoint.entity';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateStreamFileFindallDto } from './dto/create-stream-file-findall.dto';
import { UpdateStreamFileFindallDto } from './dto/update-stream-file-findall.dto';

@Injectable()
export class StreamFileFindallService {
  constructor(
    @InjectRepository(Event) private eventResipory: Repository<Event>,
    @InjectRepository(CheckPoint) private checkPointRepository: Repository<CheckPoint>
  ) { }

  create(createStreamFileFindallDto: CreateStreamFileFindallDto) {
    return 'This action adds a new streamFileFindall';
  }
  async findAll(res): Promise<Event[]> {
    try {
      const findImgEvent = await this.eventResipory.find()
      const findImgARscan = await this.checkPointRepository.find()
      const ArrImgbackground = []
      const ArrImgbander = []
      const ArrImgvisual = []
      const ArStart = []
      const ArEnd = []
      const beforeFile = []
      const afterFile = []
      for (const key in findImgEvent) {
        if (Object.prototype.hasOwnProperty.call(findImgEvent, key)) {
          const element = findImgEvent[key];
          const ObjImgbackground = {
            NamefindImgฺbackground: `${element.eId}/${element.background}` ,
            NameImg :`${element.background}`
          }
          const ObjImgbander = {
            NamefindImgฺbander: `${element.eId}/${element.banner}` , 
            NameImg:`${element.banner}`
          }
          const ObjImgvisual = {
            NamefindImgฺvisual: `${element.eId}/${element.visual}` ,
            NameImg:`${element.visual}`
          }
          if (ObjImgbackground && ObjImgbander && ObjImgvisual) {
            ArrImgbackground.push(ObjImgbackground)
            ArrImgbander.push(ObjImgbander)
            ArrImgvisual.push(ObjImgvisual)
          }
        }
      }
      for (const key in findImgARscan) {
        if (Object.prototype.hasOwnProperty.call(findImgARscan, key)) {
          const element = findImgARscan[key];
          const ObjStartARscan = {
            NamefindImgArscan: `${element.eId}/${element.cpId}/${element.startFile}` , 
            Namefile : `${element.startFile}` , 
          }
          const ObjEndARscan = {
            NamefindImgArscan: `${element.eId}/${element.cpId}/${element.resultFile}` , 
            Namefile : `${element.resultFile}`
          }
          const ObjbeforeFile = {
            NamefindImgArscan: `${element.eId}/${element.cpId}/${element.beforeFile}` , 
            Namefile : `${element.beforeFile}`
          }
          const ObjafterFile = {
            NamefindImgArscan: `${element.eId}/${element.cpId}/${element.afterFile}` , 
            Namefile : `${element.afterFile}`
          }
          if (ObjStartARscan && ObjEndARscan) {
            ArStart.push(ObjStartARscan)
            ArEnd.push(ObjEndARscan)
            beforeFile.push(ObjbeforeFile)
            afterFile.push(ObjafterFile)
          }
        }
      }
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find eid and NamePath successfully",
        resultBackground: ArrImgbackground,
        resultBander: ArrImgbander,
        resultvisual: ArrImgvisual ,
        resultStartAr: ArStart , 
        resultEnd : ArEnd ,
        resultbeforeFile: beforeFile , 
        resultafterFile:afterFile
      })
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        return: error,
      })

    }
  }
  findOne(id: number) {
    return `This action returns a #${id} streamFileFindall`;
  }
  update(id: number, updateStreamFileFindallDto: UpdateStreamFileFindallDto) {
    return `This action updates a #${id} streamFileFindall`;
  }
  remove(id: number) {
    return `This action removes a #${id} streamFileFindall`;
  }
}
