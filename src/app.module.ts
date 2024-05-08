import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BookModule,
    UserModule,
  ],
})
export class AppModule {}
