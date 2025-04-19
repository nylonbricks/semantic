import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export const runtime = 'nodejs';

const MIME_TYPES: Record<string, string> = {
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

type Params = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_req: Request, { params }: Params) {
  const { path: pathSegments } = await params;
  const rel = pathSegments.join('/');
  const full = path.join(process.cwd(), 'content', rel);

  const data = await fs.readFile(full);
  const ext = path.extname(full).slice(1);
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  return new NextResponse(data, {
    headers: {
      'Content-Type': mime,
    },
  });
}
