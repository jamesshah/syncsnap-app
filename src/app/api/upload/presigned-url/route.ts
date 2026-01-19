import { env } from "~/env";
import { NextResponse } from "next/server";

const SYNCSNAP_BASE = String(env.SYNCSNAP_API_URL) ;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("job_id")?.trim();

  if (!jobId) {
    return NextResponse.json(
      { error: "job_id is required in query parameter" },
      { status: 400 }
    );
  }

  let body: { file_name?: string };
  try {
    body = (await request.json()) as { file_name?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const fileName = body?.file_name?.trim();
  if (!fileName) {
    return NextResponse.json(
      { error: "file_name is required in request body" },
      { status: 400 }
    );
  }

  const url = `${SYNCSNAP_BASE}/uploads/presigned-url?job_id=${encodeURIComponent(jobId)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file_name: fileName }),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    if (res.status === 404) {
      return NextResponse.json(
        { error: "Invalid or expired job" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: data?.error ?? "Failed to get upload URL" },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}
