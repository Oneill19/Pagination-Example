import { Controller, Get, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiAcceptedResponse({ description: 'Returned all students' })
  getStudents() {
    return this.studentsService.find();
  }

  @Get('/query')
  @ApiOperation({ summary: 'Get all students by query' })
  getStudentsByQuery(@Query('page') page: number, @Query('items') items: number) {
    return this.studentsService.findByQuery(page, items);
  }
}
