import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload | SyncSnap",
  description: "Upload your file via SyncSnap",
};

/**
 * Upload route: /upload
 * Expects ?job_id=... (from SDK / jobId endpoint).
 * Can also be served from the upload subdomain (upload.*) via middleware rewrite.
 */
export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
