import { notFound } from "next/navigation";
import {
  getSecureLink,
  incrementViewCount,
} from "@/app/actions/secure-link-actions";
import { SecureContent } from "../_components/secure-content";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default async function SecureLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Get the secure link
  const secureLink = await getSecureLink(id);

  // If the link doesn't exist or has expired, return 404
  // if (!secureLink) {
  //   notFound()
  // }

  if (!secureLink) {
    return (
      <div className="flex justify-center items-center flex-grow container max-w-4xl py-[142px] w-full mx-auto">
        <Card className="w-full mx-5">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <CardTitle className="text-xl">Content Unavailable</CardTitle>
          <CardDescription>This secure link is not available.</CardDescription>
        </CardHeader>
      </Card>
      </div>
      
    );
  }

  // Increment the view count
  await incrementViewCount(id);

  return (
    <div className="flex justify-center items-center flex-grow container max-w-4xl py-[142px] w-full mx-auto">
      <SecureContent secureLink={secureLink} />
    </div>
  );
}
