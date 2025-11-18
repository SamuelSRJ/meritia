import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MulterFile } from '../../types/multer-file';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { ResumeService } from './resume.service';
import { generateResumeReport } from './utils/report-generator';
import { GenerateReportDto } from './dto/report.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('resume'))
  async analyzeResume(@UploadedFile() file: MulterFile, @Body() body: AnalyzeResumeDto,) {
    return this.resumeService.analyzeResume(file, body.jobDescription);
  }

  @Post("report")
  async getReport(@Body() data: GenerateReportDto, @Res() res: Response) {
    if (!data) {
      return res.status(400).json({ error: "Missing analysis data in body" });
    }

    const pdfBuffer = await generateResumeReport(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume-analysis.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  }
}
