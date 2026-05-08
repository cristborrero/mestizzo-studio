export interface ParsedService {
  code: string;
  category: string;
  name: string;
  description: string;
  priceUsd: number;
  priceColRef: number;
}

function stripBold(s: string): string {
  return s.replace(/\*\*/g, '').trim();
}

function parsePrice(raw: string): number {
  const clean = stripBold(raw)
    .replace('$', '')
    .replace(/USD/gi, '')
    .split('/')[0]  // handle "15.00 / seg", "250.00 / mes"
    .split('(')[0]  // handle "35.00 (c/u)"
    .replace(/\\/g, '')
    .replace(/,/g, '')
    .trim();
  
  const price = parseFloat(clean);
  return isNaN(price) ? 0 : price;
}

function parseRefPrice(raw: string): number {
  // Reference is a range like "$150 \- $400 USD" — take the first number
  const clean = stripBold(raw)
    .replace(/\\/g, '')
    .replace(/USD/gi, '');
  const match = clean.match(/[\d,]+\.?\d*/);
  if (!match) return 0;
  
  const price = parseFloat(match[0].replace(/,/g, ''));
  return isNaN(price) ? 0 : price;
}

function detectCategory(header: string): string | null {
  const h = header.toLowerCase();
  if (h.includes('identidad corporativa') || h.includes('branding')) return 'Identidad Corporativa y Branding';
  if (h.includes('merchandising') || h.includes('p.o.p.')) return 'Merchandising y Material P.O.P.';
  if (h.includes('ilustración')) return 'Ilustración';
  if (h.includes('publicidad exterior')) return 'Publicidad Exterior';
  if (h.includes('editorial') || h.includes('catálogos')) return 'Editorial, Catálogos e Impresos';
  if (h.includes('audiovisual') || h.includes('fotografía')) return 'Producción Audiovisual (Fotografía y Video)';
  if (h.includes('animación') || h.includes('edición')) return 'Animación y Edición';
  if (h.includes('web') || h.includes('producto digital')) return 'Diseño Web y Producto Digital';
  if (h.includes('marketing digital') || h.includes('redes sociales')) return 'Marketing Digital y Redes Sociales';
  if (h.includes('marketing estratégico') || h.includes('growth')) return 'Marketing Estratégico y Growth';
  if (h.includes('modelado') || h.includes('3d')) return 'Modelado y Renderizado 3D';
  if (h.includes('inteligencia artificial') || h.includes('ai')) return 'Inteligencia Artificial (AI)';
  return null;
}

export function parseMarkdownServices(content: string): ParsedService[] {
  const parsed: ParsedService[] = [];
  const lines = content.split('\n');
  let currentCategory = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('## ')) {
      const detected = detectCategory(trimmed);
      if (detected) currentCategory = detected;
      continue;
    }

    // Skip separator rows and non-table lines
    if (!trimmed.startsWith('|') || trimmed.includes('----') || !currentCategory) continue;

    const cells = trimmed.split('|').filter(c => c.trim());
    if (cells.length < 4) continue;

    // Table layout: | Código | Servicio | Descripción | Price USD | Price COP ref |
    const code = stripBold(cells[0].trim());
    const name = stripBold(cells[1].trim());
    const description = stripBold(cells[2].trim());
    const priceUsd = parsePrice(cells[3]);
    const priceColRef = cells[4] ? parseRefPrice(cells[4]) : 0;

    // Skip header rows and rows without a valid service code
    if (!code || !name) continue;
    if (name.toLowerCase() === 'servicio' || code.toLowerCase() === 'código') continue;

    // Validate priceUsd is a valid number
    if (priceUsd <= 0) continue;

    parsed.push({ code, category: currentCategory, name, description, priceUsd, priceColRef });
  }

  return parsed;
}

export async function parsePriceList(): Promise<ParsedService[]> {
  const fs = await import('fs/promises');
  const path = await import('path');

  const docPath = path.join(process.cwd(), '..', 'doc', 'lista_de_precios.md');

  try {
    const content = await fs.readFile(docPath, 'utf-8');
    return parseMarkdownServices(content);
  } catch (error) {
    console.error('Error reading price list:', error);
    return [];
  }
}
