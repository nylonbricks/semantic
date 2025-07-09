import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const ERRORS = {
  INVALID_STATE: {
    status: 500,
    message: 'Invalid server state.',
  },
  MISSING_PATH_PARAM: {
    status: 400,
    message: 'Path parameter is missing.',
  },
  FILE_NOT_FOUND: {
    status: 404,
    message: 'File not found.',
  },
} as const;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const pathParams: string | null = searchParams.get('path');

  if (!pathParams) {
    return NextResponse.json(
      { error: ERRORS.MISSING_PATH_PARAM.message },
      { status: ERRORS.MISSING_PATH_PARAM.status },
    );
  }

  try {
    const filePath: string = path.join(process.cwd(), 'content', pathParams);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: ERRORS.FILE_NOT_FOUND.message },
        { status: ERRORS.FILE_NOT_FOUND.status },
      );
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
    return NextResponse.json(
      { error: ERRORS.INVALID_STATE.message },
      { status: ERRORS.INVALID_STATE.status },
    );
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
