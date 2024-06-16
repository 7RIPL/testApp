import { PartialType } from '@nestjs/mapped-types';
import { CreateTask2Dto } from './create-task2.dto';

export class UpdateTask2Dto extends PartialType(CreateTask2Dto) {}
