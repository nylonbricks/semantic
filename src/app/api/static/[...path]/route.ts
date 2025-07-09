import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

interface Params {
  path: string[];
}

export const GET = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
  const { path: pathSegments } = await params;

  if (!pathSegments || pathSegments.length === 0) {
    return NextResponse.json({ error: 'Path parameter is missing.' }, { status: 400 });
  }

  try {
    const relativePath = pathSegments.join('/');
    const filePath: string = path.join(process.cwd(), 'content', relativePath);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath);
    const mimeType: string = getMimeType(filePath);

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid server state.' }, { status: 500 });
  }
};

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg-audio': 'audio/ogg',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.zip': 'application/zip',
  '.tar': 'application/x-tar',
  '.gz': 'application/gzip',
};

const getMimeType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
};
