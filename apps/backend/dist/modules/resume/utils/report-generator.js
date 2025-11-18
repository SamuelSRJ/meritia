"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResumeReport = generateResumeReport;
const PdfPrinter = require('pdfmake');
const path = require('path');
function generateResumeReport(data) {
    const fonts = {
        Roboto: {
            normal: path.join(__dirname, '..', '..', '..', '..', 'fonts', 'Roboto-Regular.ttf'),
            bold: path.join(__dirname, '..', '..', '..', '..', 'fonts', 'Roboto-Bold.ttf'),
        }
    };
    const printer = new PdfPrinter(fonts);
    const docDefinition = {
        content: [
            { text: "Relatório de compatibilidade com a vaga", style: "header" },
            { text: "Tech Skills: ", style: "subheader" },
            { text: String(data.tech_score) + "%" },
            { text: "Soft Skills: ", style: "subheader" },
            { text: String(data.soft_score) + "%" },
            { text: "Compatibilidade Geral: ", style: "subheader" },
            { text: String(data.job_match) + "%" },
            { text: "Pontos Fortes", style: "subheader" },
            { ul: data.strengths || [] },
            { text: "Pontos Fracos", style: "subheader" },
            { ul: data.weaknesses || [] },
            { text: "Recomendações", style: "subheader" },
            { ul: data.recommendations || [] },
        ],
        styles: {
            header: { fontSize: 22, bold: true, margin: [0, 0, 0, 10] },
            subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] }
        }
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks = [];
    return new Promise((resolve) => {
        pdfDoc.on("data", (chunk) => chunks.push(chunk));
        pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
    });
}
//# sourceMappingURL=report-generator.js.map