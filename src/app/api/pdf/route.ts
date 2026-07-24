import { renderTemplate } from "@/lib/template";
import { generatePDF } from "@/lib/pdf";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Data sudah dalam format yang sesuai dengan template
    const { template, ...data } = body;

    // render HTML
    const html = renderTemplate(template, data);

    // generate PDF
    const pdf = await generatePDF(html);

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=${template}.pdf`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}