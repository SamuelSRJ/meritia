import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class GenerateReportDto {
  @IsNumber()
  tech_score?: number;

  @IsNumber()
  soft_score?: number;

  @IsNumber()
  job_match?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  strengths?: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  weaknesses?: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  recommendations?: string[];
}
