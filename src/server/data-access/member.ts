import { db } from "@/server/db";
import type { MemberFormValues } from "@/lib/validations";

export async function getMemberProfileByUserId(userId: string) {
  console.log(userId);
  return await db.memberProfile.findUnique({
    where: { userId },
  });
}

export async function createMemberProfile(userId: string, data: MemberFormValues) {
  return await db.memberProfile.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function updateMemberProfile(userId: string, data: MemberFormValues) {
  return await db.memberProfile.update({
    where: { userId },
    data,
  });
}

export async function deleteMemberProfile(userId: string) {
  return await db.memberProfile.delete({
    where: { userId },
  });
}

export async function getMemberProfileCount() {
  return await db.memberProfile.count();
}

export async function getAllMembersWithProfiles() {
  return await db.user.findMany({
    include: {
      memberProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
