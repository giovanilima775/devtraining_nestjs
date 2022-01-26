import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return await this.courseRepository.find();
  }

  findOne(id: string) {
    const course = this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  create(createCourseDTO: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDTO,
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string): Promise<void> {
    const course = await this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    this.courseRepository.delete(id);
  }
}
