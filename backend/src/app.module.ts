import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/course.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost', // Use environment variable or default to localhost
      port: 3306,
      username: process.env.DB_USER || 'root', // Use environment variable or default to root
      password: process.env.DB_PASSWORD || '123', // Use environment variable or default to 123
      database: process.env.DB_DATABASE || 'courses', // Use environment variable or default to courses
      entities: [Course],
      synchronize: true,
    }),
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
