import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post("analyze")
  @UseInterceptors(FileInterceptor("resume"))
  async analyzeResume(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AnalyzeResumeDto,
  ) {
    return this.resumeService.analyzeResume(file, body.jobDescription);
  }
}
