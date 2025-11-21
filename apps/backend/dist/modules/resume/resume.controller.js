"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const analyze_resume_dto_1 = require("./dto/analyze-resume.dto");
const report_dto_1 = require("./dto/report.dto");
const resume_service_1 = require("./resume.service");
const pdf_generator_1 = require("./utils/pdf-generator");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async analyzeResume(file, body) {
        if (!file)
            throw new common_1.BadRequestException("Arquivo de curriculo obrigatório.");
        if (!(body === null || body === void 0 ? void 0 : body.jobDescription))
            throw new common_1.BadRequestException("Descrição da vaga é obrigadória.");
        return this.resumeService.analyzeResume(file, body.jobDescription);
    }
    async generateReport(data, res) {
        if (!data) {
            throw new common_1.BadRequestException("Dados de analise obrigatórios no body.");
        }
        const pdfBuffer = await (0, pdf_generator_1.generatePdfReport)(data);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="resume-analysis.pdf"',
            'Content-Length': pdfBuffer.length,
        });
        return res.send(pdfBuffer);
    }
};
exports.ResumeController = ResumeController;
__decorate([
    (0, common_1.Post)('analyze'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('resume')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, analyze_resume_dto_1.AnalyzeResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "analyzeResume", null);
__decorate([
    (0, common_1.Post)("report"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.GenerateReportDto, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "generateReport", null);
exports.ResumeController = ResumeController = __decorate([
    (0, common_1.Controller)('resume'),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map