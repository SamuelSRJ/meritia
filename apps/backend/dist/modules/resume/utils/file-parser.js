"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromFile = extractTextFromFile;
const mammoth_1 = __importDefault(require("mammoth"));
const pdfParse = require('pdf-parse');
async function extractTextFromFile(file) {
    var _a, _b;
    if (!file)
        throw new Error('Nenhum arquivo enviado.');
    const { mimetype, buffer, originalname } = file;
    if (mimetype === 'application/pdf' || ((_a = originalname === null || originalname === void 0 ? void 0 : originalname.endsWith) === null || _a === void 0 ? void 0 : _a.call(originalname, '.pdf'))) {
        const data = await pdfParse(buffer);
        return data.text;
    }
    if (mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        ((_b = originalname === null || originalname === void 0 ? void 0 : originalname.endsWith) === null || _b === void 0 ? void 0 : _b.call(originalname, '.docx'))) {
        const result = await mammoth_1.default.extractRawText({ buffer });
        return result.value;
    }
    throw new Error('Formato de arquivo não suportado.');
}
//# sourceMappingURL=file-parser.js.map