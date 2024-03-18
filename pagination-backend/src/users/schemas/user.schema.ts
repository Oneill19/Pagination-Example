import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty({ isArray: true })
  specialty: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
