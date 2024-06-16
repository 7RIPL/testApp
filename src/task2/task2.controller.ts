import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Task2Service } from './task2.service';
import { CreateTask2Dto } from './dto/create-task2.dto';
import {Task2Entity} from "./entities/task2.entity";


@Controller('task2')
export class Task2Controller {
  constructor(private readonly task2Service: Task2Service) {}

  @Post()
  create(@Body() createTask2Dto: CreateTask2Dto) {
    return this.task2Service.create(createTask2Dto);
  }

  @Post('many')
  async createManyUsers(@Body() { count }: { count: number }): Promise<Task2Entity[]> {
    return this.task2Service.createMany(count);
  }

  @Get('update-problems')
  async updateUsersProblems(): Promise<number> {
    return this.task2Service.updateUsersProblems();
  }
}
