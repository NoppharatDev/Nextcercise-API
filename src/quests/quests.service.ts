import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestDto } from './dto/quest.dto';
import { Quest } from './entities/quest.entity';

@Injectable()
export class QuestsService {
  constructor(
    @InjectRepository(Quest) private questRepository: Repository<Quest>
  ) { }

  async create(res, questDto: QuestDto) {
    try {
      const saveQuest = await this.questRepository.save(questDto);
      return res.status(201).send({
        statusCode: 201,
        success: true,
        message: `Create new quest successfully!`,
        result: saveQuest
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

  async findAll(res) {
    try {
      const findQuests = await this.questRepository.find({
        order: {
          createdAt: "DESC"
        }
      })
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Find quest all successfully (found ${findQuests.length} rows)`,
        result: findQuests
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

  async findOne(qId: number, res) {
    try {
      const findQuestOne = await this.questRepository.findOneBy({ qId: qId });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Find one quest successfully`,
        result: findQuestOne
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

  async findTrash(res) {
    try {
      const findAllQuestInTrash = await this.questRepository.findBy({ isTrash: true });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Find quest all in trash successfully`,
        result: findAllQuestInTrash
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

  async update(qId: number, questDto: QuestDto, res) {
    try {
      const updateQuest = await this.questRepository.update(qId, questDto);
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Update quest successfully`,
        result: updateQuest
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

  async removeToTrashQuest(qId: number, res) {
    try {
      const removeToTrashQuest = await this.questRepository.update(qId, { isTrash: true });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Remove quest to trash successfully`,
        result: removeToTrashQuest
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

  async restoreQuest(qId: number, res) {
    try {
      const restoreQuest = await this.questRepository.update(qId, { isTrash: false });
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Restore quest successfully`,
        result: restoreQuest
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

  async deleteQuest(qId: number, res) {
    try {
      const deleteQuest = await this.questRepository.delete(qId);
      return res.status(200).send({
        statusCode: 200,
        success: true,
        message: `Delete quest successfully`,
        result: deleteQuest
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
