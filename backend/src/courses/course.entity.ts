import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  name: string;

  @Column({ type: 'int' })
  @Min(1)
  @Max(100)
  @IsNumber()
  members: number;

  @Column({ type: 'int' })
  @Min(1)
  @IsNumber()
  coachId: number;

  @Column({ type: 'varchar', length: 1024 })
  @MinLength(1)
  @MaxLength(1000)
  @IsString()
  description: string;
}
