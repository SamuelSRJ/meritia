import { MulterFile } from "../../types/multer-file";
export declare class ResumeService {
    private ai;
    private readonly MAX_RETRIES;
    private readonly MODELS;
    private getBackoffTime;
    constructor();
    analyzeResume(file: MulterFile, jobDescription: string): Promise<any>;
    private generateContentWithRetry;
    private delay;
    private extractJson;
}
