import { cookies } from "next/headers"
import { getLocaleFromCookieValue, getLocaleCookieName } from "@/lib/locale"
import { getResumePdfContent } from "@/lib/content/localized"

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
}

function buildPdf(): Uint8Array {
  const locale = getLocaleFromCookieValue(cookies().get(getLocaleCookieName())?.value)
  const resumePdfContent = getResumePdfContent(locale)
  const lines = [
    resumePdfContent.title,
    resumePdfContent.subtitle,
    "",
    resumePdfContent.summaryTitle,
    resumePdfContent.summary,
    "",
    resumePdfContent.stacksTitle,
    resumePdfContent.stacks,
    "",
    resumePdfContent.experienceTitle,
    ...resumePdfContent.experienceLines,
    "",
    resumePdfContent.contactsTitle,
    ...resumePdfContent.contacts,
  ]

  const textCommands = [
    "BT",
    "/F1 18 Tf",
    "72 760 Td",
    `(${escapePdfText(lines[0])}) Tj`,
    "/F1 12 Tf",
    "0 -26 Td",
    `(${escapePdfText(lines[1])}) Tj`,
    "/F1 10 Tf",
    ...lines.slice(2).map((line) => `0 -18 Td (${escapePdfText(line)}) Tj`),
    "ET",
  ]

  const contentStream = textCommands.join("\n")
  const streamLength = Buffer.byteLength(contentStream, "ascii")

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ]

  let body = "%PDF-1.4\n"
  const offsets: number[] = [0]

  for (const object of objects) {
    offsets.push(Buffer.byteLength(body, "ascii"))
    body += object
  }

  const xrefOffset = Buffer.byteLength(body, "ascii")
  const xrefLines = [
    "xref",
    "0 6",
    "0000000000 65535 f ",
    ...offsets.slice(1).map((offset) => `${offset.toString().padStart(10, "0")} 00000 n `),
    "trailer",
    "<< /Size 6 /Root 1 0 R >>",
    "startxref",
    `${xrefOffset}`,
    "%%EOF",
  ]

  const pdf = `${body}${xrefLines.join("\n")}\n`
  return new TextEncoder().encode(pdf)
}

export async function GET() {
  const pdf = buildPdf()
  const body = pdf as unknown as BodyInit

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="curriculo-joao-silva.pdf"',
      "Content-Length": String(pdf.byteLength),
    },
  })
}
