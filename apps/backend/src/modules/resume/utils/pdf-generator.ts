import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePdfReport(result: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let cursorY = page.getHeight() - 50;

  function write(text: string, size = 12) {
    page.drawText(text, {
      x: 50,
      y: cursorY,
      size,
      font,
      color: rgb(0, 0, 0)
    });
    cursorY -= size + 10
  }

  // TITLE
  write("Job Match Analysis Report", 18);
  cursorY -= 10;

  // TECH SKILLS
  write(`Tech Skills: ${result.tech_score || "N/A"}%`, 14);
  cursorY -= 10;

  // SOFT SKILLS
  write(`Soft Skills: ${result.soft_score || "N/A"}%`, 14);
  cursorY -= 10;

  // MATCH SCORE
  write(`Aderencia: ${result.job_match || "N/A"}%`, 14);
  cursorY -= 10;

  // SUMMARY
  if (result.summary) {
    write("Sumário:", 14);
    write(result.summary);
  }

  // STRENGTHS
  if (Array.isArray(result.strengths)) {
    cursorY -= 10;
    write("Pontos Fortes:", 14)
    result.strengths.forEach((s: string) => write("- " + s))
  }

  // WEAKNESSES
  if (Array.isArray(result.weaknesses)) {
    cursorY -= 10;
    write("Pontos Fracos:", 14)
    result.weaknesses.forEach((s: string) => write("- " + s))
  }

  // RECOMMENDATIONS
  if (Array.isArray(result.recommendations)) {
    cursorY -= 10;
    write("Recomendações:", 14)
    result.recommendations.forEach((s: string) => write("- " + s));
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}