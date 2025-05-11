"use server";
import { Roles, UserData } from "@/lib/types/global";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async (): Promise<UserData> => {
  const user = await currentUser();
  const userData = {
    username: user?.username?.toString() ?? "",
    email: user?.emailAddresses[0].emailAddress.toString() ?? "",
    imageUrl: user?.imageUrl.toString() ?? "",
    role: (user?.publicMetadata.role as Roles) ?? "USER",
  };
  return userData;
};
