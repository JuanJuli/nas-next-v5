import mammoth from "mammoth";

export interface Kuk {
  code: string;
  description: string;
}

export interface Element {
  no: number;
  name: string;
  kuks: Kuk[];
}

export interface UnitCompetency {
  no: number;
  code: string;
  title: string;
  elements: Element[];
}

export interface SchemePreview {
  title: string;
  number: string;
  units: UnitCompetency[];
}

function normalizeText(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/[•]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}


interface ParsedElement {
  elemen: string;
  kriteria: string[];
}
// return array string
const parseElementKuk = (elementText: string): ParsedElement[] => {
  const result: ParsedElement[] = [];
  
  // Split berdasarkan "Elemen:" sebagai pemisah
  const elemenSplit = elementText.split(/(?=Elemen:)/);
  

  for (const chunk of elemenSplit) {
    const trimmed = chunk.trim();
    if (!trimmed.startsWith('Elemen:')) continue;

    // Ambil judul Elemen (teks setelah "Elemen:" sampai baris baru atau "Kriteria")
    const elemenMatch = trimmed.match(/^Elemen:\s*([\s\S]+?)(?=\nKriteria Unjuk Kerja:|\nKriteria:)/);
    const elemenTitle = elemenMatch ? elemenMatch[1].trim() : '';

    // Ambil semua Kriteria Unjuk Kerja
    const kriteriaMatch = trimmed.match(/Kriteria Unjuk Kerja:\s*([\s\S]+?)(?=\nElemen:|$)/);
    const kriteriaRaw = kriteriaMatch ? kriteriaMatch[1].trim() : '';

    // Split kriteria per baris (filter baris kosong)
    const kriteriaList = kriteriaRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    result.push({
      elemen: elemenTitle,
      kriteria: kriteriaList,
    });
  }

  return result;
}

export async function parseAPL02(
  file: File
): Promise<SchemePreview> {
  const buffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer: buffer,
  });

  const text = normalizeText(result.value);

  // ==========================
  // HEADER SCHEMA
  // ==========================

  const titleMatch = text.match(
    /Judul\s*:\s*([\s\S]*?)Nomor\s*:/
  );

  const numberMatch = text.match(
    /Nomor\s*:\s*([^\n]+)/
  );

  const schemeTitle = cleanText(
    titleMatch?.[1] ?? ""
  );

  const schemeNumber = cleanText(
    numberMatch?.[1] ?? ""
  );

  // ==========================
  // SPLIT UNIT
  // ==========================

  const unitBlocks =
    text.match(
      /Unit Kompetensi\s+\d+[\s\S]*?(?=Unit Kompetensi\s+\d+|Rekomendasi untuk Asesi|$)/g
    ) ?? [];

  const units: UnitCompetency[] = [];

  for (const block of unitBlocks) {
    const unitNoMatch = block.match(
      /Unit Kompetensi\s+(\d+)/
    );

    const unitNo = Number(unitNoMatch?.[1] ?? 0);

    const codeMatch = block.match(
      /Kode Unit\s*:\s*([A-Z0-9.]+)/i
    );

    const unitCode = cleanText(
      codeMatch?.[1] ?? ""
    );

    let title = "";

    const titleMatch =
      block.match(
        /Judul Unit\s*:\s*([\s\S]*?)(?=Dapatkah saya|1\.\s*Elemen:)/
      );

    if (titleMatch) {
      title = cleanText(titleMatch[1]);
    }

    const elements: Element[] = [];

    // const elementRegex =
    //   /(\d+)\.\s*Elemen:\s*([\s\S]*?)(?=(\d+)\.\s*Elemen:|$)/g;

    // const elementMatches = [
    //   ...block.matchAll(elementRegex),
    // ];

    const elementMatches = parseElementKuk(block); 


    for (const [index, element] of elementMatches.entries()) {
      const elementNo = index + 1;
      const elementName = cleanText(element.elemen);

      const kuks: Kuk[] = element.kriteria.map((kriteria, kukIndex) => ({
        code: `${elementNo}.${kukIndex + 1}`, // Kode KUK menggunakan index+1
        description: cleanText(kriteria),
      }));

      elements.push({
        no: elementNo,
        name: elementName,
        kuks,
      });
    }

    units.push({
      no: unitNo,
      code: unitCode,
      title,
      elements,
    });
  }

  return {
    title: schemeTitle,
    number: schemeNumber,
    units,
  };
}