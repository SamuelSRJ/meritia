import { BadRequestException, Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MulterFile } from '../../types/multer-file';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { GenerateReportDto } from './dto/report.dto';
import { ResumeService } from './resume.service';
import { generatePdfReport } from './utils/pdf-generator';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('resume'))
  async analyzeResume(@UploadedFile() file: MulterFile, @Body() body: AnalyzeResumeDto,) {
    if(!file) throw new BadRequestException("Arquivo de curriculo obrigatório.");
    if(!body?.jobDescription) throw new BadRequestException("Descrição da vaga é obrigadória.");

    return this.resumeService.analyzeResume(file, body.jobDescription)
  }

  @Post("report")
  async generateReport(@Body() data: GenerateReportDto, @Res() res: Response) {
    if(!data) {
      throw new BadRequestException("Dados de analise obrigatórios no body.");
    }

    const pdfBuffer = await generatePdfReport(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume-analysis.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  }
}
