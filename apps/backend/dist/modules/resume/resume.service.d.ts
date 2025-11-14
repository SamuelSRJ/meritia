import { MulterFile } from '../../types/multer-file';
export declare class ResumeService {
    private openai;
    analyzeResume(file: MulterFile, jobDescription: string): Promise<any>;
    private extractJson;
}
