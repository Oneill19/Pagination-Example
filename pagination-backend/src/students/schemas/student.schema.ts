import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

export class Address {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

@Schema()
export class Student {
  @Prop()
  @ApiProperty()
  id: number;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  date_of_birth: string;

  @Prop()
  @ApiProperty()
  address: Address;

  @Prop()
  @ApiProperty()
  phone_number: string;

  @Prop()
  @ApiProperty()
  major: string;

  @Prop()
  @ApiProperty()
  gpa: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
