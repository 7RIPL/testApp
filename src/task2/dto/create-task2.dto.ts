import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateTask2Dto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsInt()
    age: number;

    @IsString()
    gender: string;

    @IsBoolean()
    hasProblems: boolean;
}
