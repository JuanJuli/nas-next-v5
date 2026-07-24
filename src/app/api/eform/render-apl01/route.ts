/**
 * Next.js API Route untuk Render FR.APL.01 Template
 * 
 * Endpoint: /api/eform/render-apl01
 * Method: POST
 * 
 * Body: FRAPL01Data (lihat frApl01.ts)
 * 
 * Response: HTML string atau PDF file
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import type { FRAPL01Data } from '@/types/frApl01';

// Register Handlebars helpers
Handlebars.registerHelper('increment', function(value: number) {
  return parseInt(String(value)) + 1;
});

Handlebars.registerHelper('formatDate', function(date: string) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data: FRAPL01Data = await request.json();

    // Validate required fields
    if (!data.namaLengkap || !data.nik) {
      return NextResponse.json(
        { 
          status: 'ERROR',
          message: 'Required fields are missing',
          data: null 
        },
        { status: 400 }
      );
    }

    // Read template
    const templatePath = path.join(process.cwd(), 'public', 'template-eform', 'FR.APL.01 Template Base.html');
    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    // Compile template
    const template = Handlebars.compile(templateSource);

    // Render template with data
    const renderedHtml = template(data);

    // Return HTML
    return new NextResponse(renderedHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Error rendering template:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        message: error instanceof Error ? error.message : 'Failed to render template',
        data: null
      },
      { status: 500 }
    );
  }
}
