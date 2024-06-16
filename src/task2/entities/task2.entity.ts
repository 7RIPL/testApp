import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task2Entity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column({ default: true })
    hasProblems: boolean;
}