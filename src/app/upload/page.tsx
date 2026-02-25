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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip p-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-[-120px] left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-[220px] w-[220px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          SyncSnap Upload
        </h1>
        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
          Send your file from this device to finish the flow your started on
          desktop.
        </p>
      </div>
      <UploadForm jobId={jobId} />
    </div>
  );
}
