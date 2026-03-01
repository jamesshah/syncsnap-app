import { notFound } from "next/navigation";
import { UploadForm } from "./_components/upload-form";

type PageProps = {
  searchParams: Promise<{ job_id?: string }>;
};

export default async function UploadPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const jobId = params.job_id?.trim();

  if (!jobId) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">SyncSnap Upload</h1>
        <p className="text-muted-foreground mt-1 text-sm">Send your file to complete the transfer</p>
      </div>
      <UploadForm jobId={jobId} />
    </div>
  );
}
