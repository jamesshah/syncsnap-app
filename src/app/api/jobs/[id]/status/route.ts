import { env } from "~/env";
import { NextResponse } from "next/server";

const SYNCSNAP_BASE = String(env.SYNCSNAP_API_URL);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id?.trim()) {
    return NextResponse.json(
      { error: "Job id is required in path" },
      { status: 400 },
    );
  }

  let body: { status?: string };
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const status = body?.status?.trim();
  if (!status || !["completed", "failed"].includes(status)) {
    return NextResponse.json(
      { error: "status must be 'completed' or 'failed'" },
      { status: 400 },
    );
  }

  const url = `${SYNCSNAP_BASE}/jobs/${encodeURIComponent(id)}/status`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (!res.ok) {
    if (res.status === 404) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: data?.error ?? "Failed to update job status" },
      { status: res.status },
    );
  }

  return NextResponse.json(data);
}
