import fs from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";

const INVALID_STATE_STATUS = 500;
const FILE_NOT_FOUND_STATUS = 404;

export const GET = async (
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) => {
  const { path: pathParams } = await context.params;

  try {
    const filePath = path.join(process.cwd(), "content", ...pathParams);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found." },
        { status: FILE_NOT_FOUND_STATUS }
      );
    }

    const fileContent = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid server state." },
      { status: INVALID_STATE_STATUS }
    );
  }
};

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg-audio": "audio/ogg",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".zip": "application/zip",
  ".tar": "application/x-tar",
  ".gz": "application/gzip",
};

const getMimeType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
};
