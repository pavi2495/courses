import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Course } from './course.entity'; // Assuming the Course entity file is named 'course.entity.ts'
import { CoursesService } from './courses.service'; // Assuming your service is named 'CoursesService'

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.coursesService.getCourses(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() course: Course) {
    return this.coursesService.createCourse(course);
  }

  @Patch(':id')
  async editCourse(
    @Body() course: Course,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Course> {
    const editedCourse = await this.coursesService.editCourse(id, course);
    return editedCourse;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.coursesService.remove(id);
  }
}
