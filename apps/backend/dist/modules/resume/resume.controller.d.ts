import { AnalyzeResumeDto } from './dto/analyze-resume.dto';
import { ResumeService } from './resume.service';
import { MulterFile } from '../../types/multer-file';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    analyzeResume(file: MulterFile, body: AnalyzeResumeDto): Promise<any>;
}
