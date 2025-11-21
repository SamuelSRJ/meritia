"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdfReport = generatePdfReport;
const pdf_lib_1 = require("pdf-lib");
async function generatePdfReport(result) {
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
    let cursorY = page.getHeight() - 50;
    function write(text, size = 12) {
        page.drawText(text, {
            x: 50,
            y: cursorY,
            size,
            font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0)
        });
        cursorY -= size + 10;
    }
    write("Job Match Analysis Report", 18);
    cursorY -= 10;
    write(`Tech Skills: ${result.tech_score || "N/A"}%`, 14);
    cursorY -= 10;
    write(`Soft Skills: ${result.soft_score || "N/A"}%`, 14);
    cursorY -= 10;
    write(`Aderencia: ${result.job_match || "N/A"}%`, 14);
    cursorY -= 10;
    if (result.summary) {
        write("Sumário:", 14);
        write(result.summary);
    }
    if (Array.isArray(result.strengths)) {
        cursorY -= 10;
        write("Pontos Fortes:", 14);
        result.strengths.forEach((s) => write("- " + s));
    }
    if (Array.isArray(result.weaknesses)) {
        cursorY -= 10;
        write("Pontos Fracos:", 14);
        result.weaknesses.forEach((s) => write("- " + s));
    }
    if (Array.isArray(result.recommendations)) {
        cursorY -= 10;
        write("Recomendações:", 14);
        result.recommendations.forEach((s) => write("- " + s));
    }
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
}
//# sourceMappingURL=pdf-generator.js.map