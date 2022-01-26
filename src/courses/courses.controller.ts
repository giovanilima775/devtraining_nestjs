import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('')
  async findAll(@Res() response) {
    const courses = await this.coursesService.findAll();
    return response.status(200).json(courses);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post('')
  create(@Body() createCourseDTO: CreateCourseDto) {
    return this.coursesService.create(createCourseDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
