import mammoth from 'mammoth';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse');
import type { MulterFile } from '../../../types/multer-file';

export async function extractTextFromFile(file: MulterFile) {
  if (!file) throw new Error('Nenhum arquivo enviado.');

  const { mimetype, buffer, originalname } = file;

  if (mimetype === 'application/pdf' || originalname?.endsWith?.('.pdf')) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    originalname?.endsWith?.('.docx')
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error('Formato de arquivo não suportado.');
}