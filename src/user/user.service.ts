import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import { HistoryService} from "../history/history.service";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly historyService: HistoryService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where:{
        email: createUserDto.email,
      },
    })

    if (existUser) throw new BadRequestException('Этот email занят!')

    const user = await this.userRepository.save({
      name:createUserDto.name,
      email: createUserDto.email,
    })

    await this.historyService.logUserAction('CREATE', user.id);

    return { user }
  }

  async findAll() {
    return await this.userRepository.find();
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {id},
    });
    if (!user) throw new NotFoundException('Пользователь не найден');

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      const existUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
      if (existUser && existUser.id !== id) {
        throw new BadRequestException('Этот email уже занят');
      }
      user.email = updateUserDto.email;
    }


    await this.userRepository.save(user);
    await this.historyService.logUserAction('UPDATE', user.id);

    return user;
  }
}

