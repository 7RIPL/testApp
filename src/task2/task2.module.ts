import { Module } from '@nestjs/common';
import { Task2Service } from './task2.service';
import { Task2Controller } from './task2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Task2Entity} from "./entities/task2.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task2Entity])],
  controllers: [Task2Controller],
  providers: [Task2Service],
  exports: [Task2Service],
})
export class Task2Module {}
