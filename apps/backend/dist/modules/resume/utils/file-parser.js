"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromFile = extractTextFromFile;
const pdf_parse_1 = require("pdf-parse");
const mammoth_1 = require("mammoth");
async function extractTextFromFile(file) {
    if (!file)
        throw new Error('Nenhum arquivo enviado.');
    const { mimetype, buffer, originalname } = file;
    if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) {
        const data = await (0, pdf_parse_1.default)(buffer);
        return data.text;
    }
    if (mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        originalname.endsWith('.docx')) {
        const result = await mammoth_1.default.extractRawText({ buffer });
        return result.value;
    }
    throw new Error('Formato de arquivo não suportado.');
}
//# sourceMappingURL=file-parser.js.map