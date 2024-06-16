import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':userId')
  async getUserHistory(
      @Param('userId', ParseIntPipe) userId: number,
      @Query('page', ParseIntPipe) page = 1,
      @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<History[]> {
    return this.historyService.getUserHistory(userId, page, limit);
  }
}