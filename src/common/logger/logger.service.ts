import { Injectable } from '@nestjs/common';
import { Logger, LoggerDocument } from './entities/logger.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel('Logger') private LoggerModel: Model<LoggerDocument>,
  ) {}
  async create(createCatDto): Promise<Logger> {
    const createdCat = new this.LoggerModel(createCatDto);
    return await createdCat.save();
  }
}
