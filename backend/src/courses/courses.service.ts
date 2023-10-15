import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async getCourses(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ courses: Course[]; totalCount: number }> {
    const skip = (page - 1) * pageSize;

    // Fetch paginated courses
    const courses = await this.coursesRepository.find({
      skip: skip,
      take: pageSize,
    });

    // Fetch total count of courses
    const totalCount = await this.coursesRepository.count();

    // Return courses and total count as an object
    return { courses, totalCount };
  }

  findOne(id: number): Promise<Course> {
    return this.coursesRepository.findOneBy({ id: id });
  }

  async createCourse(course: Course): Promise<Course> {
    console.log(course);
    return this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const result = await this.coursesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

  async editCourse(id: number, course: Course): Promise<Course> {
    const editedCourse = await this.coursesRepository.findOneBy({ id: id });

    if (!editedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    editedCourse.name = course.name;
    editedCourse.members = course.members;
    editedCourse.coachId = course.coachId;
    editedCourse.description = course.description;

    await this.coursesRepository.save(editedCourse);

    return editedCourse;
  }
}
