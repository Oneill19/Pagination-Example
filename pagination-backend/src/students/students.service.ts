import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  find() {
    return this.studentsRepository.find();
  }

  async findByQuery(page: number, items: number) {
    const skip = (page - 1) * items;
    const data = await this.studentsRepository.find({}, { skip, limit: items });

    const total = await this.studentsRepository.countDocuments();

    return {
      data,
      total,
      page,
      totalPage: Math.ceil(total / items),
    };
  }
}
