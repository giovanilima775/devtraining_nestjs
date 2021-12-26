import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Course 1',
      description: 'Description 1',
      tags: ['tag1', 'tag2'],
    },
  ];

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: string): Course {
    const course = this.courses.find((course) => course.id === Number(id));

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  create(createCourseDTO: any): void {
    const course: Course = {
      id: this.courses.length + 1,
      name: createCourseDTO.name,
      description: createCourseDTO.description,
      tags: createCourseDTO.tags,
    };

    this.courses.push(course);
  }

  update(id: string, updateCourseDTO: any): void {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    this.courses[indexCourse] = updateCourseDTO;
    this.courses[indexCourse].id = Number(id);
  }

  delete(id: string): void {
    const indexCourse = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
