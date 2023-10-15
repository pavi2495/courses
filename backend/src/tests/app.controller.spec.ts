import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import * as mysql from 'mysql2/promise';
import { randomInt } from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();


// Define Course data type
interface Course {
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
    await connection.execute('delete from course');
  });

  it('/courses (POST)', async () => {
    const courseId = randomInt(1000);
    const course: Course = {
      name: 'course-A',
      members: 2,
      coachId: 1,
      description: 'This is a course',
    };

    await request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(201);
    // cleanup
    await connection.execute(`DELETE FROM course where id=${courseId}`);
  });

  it('/courses (GET)', async () => {
    const courseId = randomInt(1000);
    // Insert a test course into the database
    await connection.execute(
      `INSERT INTO course (id, name, members, coachId, description) VALUES (${courseId}, 'Test course', 2, 1, 'This is a course')`,
    );

    const response = await request(app.getHttpServer())
      .get('/courses')
      .query({ page: 1, pageSize: 1 })
      .expect(200);

    // Assert that the response body is an array with a length of 1 (page size)
    expect(Array.isArray(response.body.courses)).toBe(true);
    expect(response.body.courses.length).toBe(1);

    // cleanup
    await connection.execute(`DELETE FROM course where id=${courseId}`);
  });

  it('/courses/:id (GET)', async () => {
    const courseId = randomInt(1000);
    // Insert a test course into the database
    await connection.execute(
      `INSERT INTO course (id, name, members, coachId, description) VALUES (${courseId}, 'Test course', 2, 1, 'This is a course')`,
    );

    const response = await request(app.getHttpServer()).get(
      `/courses/${courseId}`,
    );
    expect(response.status).toBe(200);
    connection.execute(`DELETE FROM course WHERE id=${courseId}`);
  });

  it('/courses/:id (PATCH)', async () => {
    const courseId = randomInt(1000);

    // Insert a test course into the database
    await connection.execute(
      `INSERT INTO course (id, name, members, coachId, description) VALUES (${courseId}, 'Test course', 2, 1, 'This is a course')`,
    );

    const updatedCourse: Partial<Course> = {
      name: 'course-B',
      members: 2,
      coachId: 1,
      description: 'This is a course B',
    };

    await request(app.getHttpServer())
      .patch(`/courses/${courseId}`)
      .send(updatedCourse)
      .expect(200);

    // Retrieve the updated course from the database and assert its properties
    const [rows] = await connection.execute(
      'SELECT * FROM course WHERE id = ?',
      [courseId],
    );

    const [updatedCourseFromDb] = rows as Course[];
    expect(updatedCourseFromDb.name).toBe(updatedCourse.name);
    expect(updatedCourseFromDb.members).toBe(updatedCourse.members);
    expect(updatedCourseFromDb.coachId).toBe(updatedCourse.coachId);
    expect(updatedCourseFromDb.description).toBe(updatedCourse.description);

    // cleanup
    await connection.execute(`DELETE FROM course where id=${courseId}`);
  });

  it('/courses/:id (DELETE)', async () => {
    // Insert a test course into the database
    const courseId = 9999; //randomInt(1000)
    await connection.execute(
      `INSERT INTO course (id, name, members, coachId, description) VALUES (${courseId}, 'Test course', 2, 1, 'This is a course')`,
    );

    await request(app.getHttpServer())
      .delete(`/courses/${courseId}`)
      .expect(200);

    // Attempt to retrieve the deleted course from the database
    const [rows] = await connection.execute(
      'SELECT * FROM course WHERE id = ?',
      [courseId],
    );

    const [deletedcourseFromDb] = rows as Course[];
    expect(deletedcourseFromDb).toBeUndefined();
  });

  afterAll(async () => {
    // Close the database connection and the NestJS application
    await connection.execute(`DELETE FROM course`);
    await connection.end();
    await app.close();
  });
});
