import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto/event.dto';
import { v4 as uuidv4 } from 'uuid';
import { createWriteStream } from 'fs';
import { Event, EventDraft } from './entities/event.entity';
var fs = require('fs');

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(EventDraft) private eventDraftRepository: Repository<EventDraft>,
  ) { }

  /**********************/
  /** Create New Event **/
  /**********************/
  async create(files, eventDto, res): Promise<Event> {
    try {
      const { isPublish, isDraft, isTrash, isNoPath } = eventDto;
      eventDto.eId = uuidv4();
      const dir = `src/uploads/${eventDto.eId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      if(isPublish === 'true') { eventDto.isPublish = true } else if(isPublish === 'false') { eventDto.isPublish = false }
      if(isDraft === 'true') { eventDto.isDraft = true } else if(isDraft === 'false') { eventDto.isDraft = false }
      if(isTrash === 'true') { eventDto.isTrash = true } else if(isTrash === 'false') { eventDto.isTrash = false }
      if(isNoPath === 'true') { eventDto.isNoPath = true } else if(isNoPath === 'false') { eventDto.isNoPath = false }  

      if (files.header) { eventDto.header = await this.uploadFile(files.header, eventDto.eId); }
      if (files.banner) { eventDto.banner = await this.uploadFile(files.banner, eventDto.eId); }
      if (files.visual) { eventDto.visual = await this.uploadFile(files.visual, eventDto.eId); }
      // console.log(eventDto);
      const saveEvent = await this.eventRepository.save(eventDto);
      const saveEventDraft = await this.eventDraftRepository.save(eventDto);

      return res.status(201).send({
        statusCode: 201,
        success: true,
        message: "Create event successfully.",
        result: {
          saveEvent,
          saveEventDraft
        },
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  /*************************/
  /** Update Event Detail **/
  /*************************/
  async update(files, id: string, eventDto, res) {
    // console.log(eventDto);
    try {
      const { isPublish, isDraft, isTrash, isNoPath } = eventDto;
      const { eId, ...newEventDto } = eventDto;
      eventDto.eId = uuidv4();
      const dir = `src/uploads/${eventDto.eId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      if(isPublish === 'true') { eventDto.isPublish = true } else if(isPublish === 'false') { eventDto.isPublish = false }
      if(isDraft === 'true') { eventDto.isDraft = true } else if(isDraft === 'false') { eventDto.isDraft = false }
      if(isTrash === 'true') { eventDto.isTrash = true } else if(isTrash === 'false') { eventDto.isTrash = false }
      if(isNoPath === 'true') { eventDto.isNoPath = true } else if(isNoPath === 'false') { eventDto.isNoPath = false }  

      if (files.header) { newEventDto.header = await this.uploadFile(files.header, eventDto.eId); }
      if (files.banner) { newEventDto.banner = await this.uploadFile(files.banner, eventDto.eId); }
      if (files.visual) { newEventDto.visual = await this.uploadFile(files.visual, eventDto.eId); }
      const updateEvent = await this.eventRepository.update(id, newEventDto);
      const updateEventDraft = await this.eventDraftRepository.update(id, newEventDto);

      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Update event successfully.",
        result: {
          updateEvent,
          updateEventDraft
        },
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  async removeToTrashEvent(eId: string, res) {
    try {
      const removeEventToTrash = await this.eventRepository.update(eId, { isTrash: true });
      const removeEventDraftToTrash = await this.eventDraftRepository.update(eId, { isTrash: true });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Remove event to trash successfully.",
        result: {removeEventToTrash, removeEventDraftToTrash},
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  async restoreEvent(eId: string, res) {
    try {
      const removeEventToTrash = await this.eventRepository.update(eId, { isTrash: false });
      const removeEventDraftToTrash = await this.eventDraftRepository.update(eId, { isTrash: false });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Restore event successfully.",
        result: {removeEventToTrash, removeEventDraftToTrash},
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  async findAll(res): Promise<Event[]> {
    try {
      const findEvent = await this.eventDraftRepository.find({ order: { createdAt: 'DESC' } });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find events successfully.",
        result: findEvent,
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  async findOne(id: string, res): Promise<Event> {
    try {
      const findOneEvent = await this.eventDraftRepository.findOne({
        where: {
          eId: id,
        },
      });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: "Find event one successfully.",
        result: findOneEvent,
      });
    } catch (error) {
      return res.status(400).send({
        statusCode: 400,
        success: false,
        message: error.message,
        result: error,
      });
    }
  }

  async findTrash(res) {
    try {
      const findAllEventInTrash = await this.eventDraftRepository.findBy({ isTrash: true });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Find event all in trash successfully`,
        result: findAllEventInTrash
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

  async deleteEvent(eId: string, res) {
    try {  
      const deleteEvent = await this.eventRepository.delete(eId);
      const deleteEventDraft = await this.eventDraftRepository.delete(eId);
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Delete event successfully`,
        result: {deleteEvent, deleteEventDraft}
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
    const path = `src/uploads/${dir}/${originalname}`;
    let fileStream = createWriteStream(path);
    fileStream.write(file0.buffer);
    fileStream.end();

    return originalname;
  }
}
