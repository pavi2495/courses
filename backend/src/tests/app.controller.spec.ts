import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

// Define Course data type
interface Course {
  id: number;
  name: string;
  members: number;
  coachId: number;
  description: string;
}

describe('CoursesController (e2e)', () => {
  let app: INestApplication;
  let connection: mysql.Connection;

  beforeAll(async () => {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/courses (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/courses')
      .query({ page: 1, pageSize: 2 })
      .expect(200);

    expect(Array.isArray(response.body.courses)).toBe(true);
    expect(response.body.courses.length).toBe(2);
  });

  it('/courses (POST)', async () => {
    const course: Course = {
      id: 2,
      name: 'Test Course',
      members: 20,
      coachId: 1,
      description: 'This is a test course.',
    };
    return await request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(201);
  });

  it('/courses (POST)', async () => {
    const course: Course = {
      id: 1,
      name: 'Test Course',
      members: 15,
      coachId: 2,
      description: 'This is another test course.',
    };
    return await request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(201);
  });

  it('/courses/:id (GET)', async () => {
    const courseId = 1;
    return await request(app.getHttpServer())
      .get(`/courses/${courseId}`)
      .expect(200);
  });

  it('/courses/:id (PATCH)', async () => {
    const courseId = 2;
    const updatedCourse: Partial<Course> = {
      name: 'Updated Test Course',
      description: 'This is an updated test course.',
    };
    return await request(app.getHttpServer())
      .patch(`/courses/${courseId}`)
      .send(updatedCourse)
      .expect(200);
  });

  it('/courses/:id (DELETE)', async () => {
    const courseId = 1;
    return await request(app.getHttpServer())
      .delete(`/courses/${courseId}`)
      .expect(200);
  });

  afterAll(async () => {
    await connection.end();
    await app.close();
  });
});
