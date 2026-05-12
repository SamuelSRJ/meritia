import { Response } from 'express';
import { MulterFile } from '../../types/multer-file';
import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { GenerateReportDto } from './dto/report.dto';
import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    analyzeResume(file: MulterFile, body: AnalyzeResumeDto): Promise<any>;
    generateReport(data: GenerateReportDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=resume.controller.d.ts.map