import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person/Person';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER || 'myuser',
      password: process.env.DATABASE_PASSWORD || 'nnV%LZyN@i946Z3Xx9',
      database: process.env.DATABASE_NAME || 'mydatabase',
      entities: [Person],
      synchronize: true,
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
