import { IsString } from "class-validator";

export class AnalyzeResumeDto {
  @IsString()
  jobDescription?: string;
}
