import { Injectable } from '@nestjs/common';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
      @InjectRepository(History)
      private historyRepository: Repository<History>,
  ) {}

  async logUserAction(actionType: string, userId: number): Promise<History> {
    const logEntry = this.historyRepository.create({
      actionType,
      userId,
    });
    return this.historyRepository.save(logEntry);
  }

async getUserHistory(userId: number, page = 1, limit = 10): Promise<History[]> {
  const skip = (page - 1) * limit;
  return await this.historyRepository.find({
    where: { userId },
    take: limit,
    skip: skip,
    order: { createdAt: 'DESC' },
  });
}
}
