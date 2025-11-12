import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './modules/resume/resume.module';

@Module({
  imports: [ResumeModule],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ResumeModule],
})

export class AppModule {}