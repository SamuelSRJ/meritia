import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    analyzeResume(file: Express.Multer.File, body: AnalyzeResumeDto): Promise<any>;
}
