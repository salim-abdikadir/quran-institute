import { TRPCError } from "@trpc/server";
import { 
  getMemberProfileByUserId, 
  createMemberProfile, 
  updateMemberProfile 
} from "@/server/data-access/member";
import type { MemberFormValues } from "@/lib/validations";
import { Policy, type SessionUser } from "@/server/data-policy";

export async function getMyProfileUseCase(user: SessionUser) {
  Policy.isLoggedIn(user);
  const profile = await getMemberProfileByUserId(user.id);
  return profile;
}

export async function registerMemberUseCase(user: SessionUser, data: MemberFormValues) {
  Policy.isLoggedIn(user);
  const existingProfile = await getMemberProfileByUserId(user.id);
  if (existingProfile) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Profile already exists",
    });
  }
  return await createMemberProfile(user.id, data);
}

export async function updateMemberProfileUseCase(user: SessionUser, data: MemberFormValues) {
  Policy.isLoggedIn(user);
  const profile = await getMemberProfileByUserId(user.id);
  if (!profile) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Profile not found",
    });
  }
  
  Policy.isOwner(user, profile.userId);
  return await updateMemberProfile(user.id, data);
}
