import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

// Modules
import { CommonModule } from './common/common.module';

// Config
import { configModuleOptions } from './config/config';
import { dbModuleOptions } from './config/db-config';

// Logger
import { expressLogger } from './logger/winston.config';

// Schemas
import { User, UserSchema } from './users/schemas/user.schema';
import { Student, StudentSchema } from './students/schemas/student.schema';

// Controllers
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { StudentsController } from './students/students.controller';

// Services
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { StudentsService } from './students/students.service';

// Repositories
import { UsersRepository } from './users/users.repository';
import { StudentsRepository } from './students/students.repository';

@Module({
  imports: [
    CommonModule,
    HttpModule,
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRootAsync(dbModuleOptions),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [AppController, AuthController, UsersController, StudentsController],
  providers: [AuthService, UsersService, StudentsService, UsersRepository, StudentsRepository],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(expressLogger).forRoutes('*');
  }
}
