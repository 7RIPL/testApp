import { Injectable } from '@nestjs/common';
import { CreateTask2Dto } from './dto/create-task2.dto';
import {Task2Entity} from "./entities/task2.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class Task2Service {
  constructor(
      @InjectRepository(Task2Entity)
      private usersRepository: Repository<Task2Entity>,
  ) {}

  async create(createTask2Dto: CreateTask2Dto): Promise<Task2Entity> {
    const user = this.usersRepository.create(createTask2Dto);
    return await this.usersRepository.save(user);
  }

  async createMany(count: number): Promise<Task2Entity[]> {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = new Task2Entity();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.age = faker.datatype.number({ min: 18, max: 65 });
      user.gender = faker.name.gender();
      users.push(user);
    }

    return await this.usersRepository.save(users);
  }


  async updateUsersProblems(): Promise<number> {
    const { affected } = await this.usersRepository.update({ hasProblems: true }, { hasProblems: false });
    return affected;
  }

}
