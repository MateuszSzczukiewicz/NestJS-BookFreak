import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env: string = process.env.NODE_ENV || 'development';
const dotenv_path: string = path.resolve(process.cwd(), `.env.${env}`);
const result: dotenv.DotenvConfigOutput = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
        requestCert: true,
      },
      migrationsRun: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/**/*.entity{.ts,.js}'],
    };
  }
}

export default TypeOrmConfig.getOrmConfig(new ConfigService());

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
