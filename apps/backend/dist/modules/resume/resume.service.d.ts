export declare class ResumeService {
    private openai;
    analyzeResume(file: Express.Multer.File, jobDescription: string): Promise<any>;
    private extractJson;
}
