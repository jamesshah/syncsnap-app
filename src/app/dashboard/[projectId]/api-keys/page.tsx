import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ApiKeysManagement } from "~/app/_components/project/api-keys-management";

export default async function ApiKeysPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const session = await auth();
  const { projectId } = await params;

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return <ApiKeysManagement projectId={projectId} />;
}
