import { getUserCount, deleteUser } from "@/server/data-access/user";
import { 
  getMemberProfileCount, 
  getAllMembersWithProfiles, 
  deleteMemberProfile 
} from "@/server/data-access/member";
import { 
  getEventCount, 
  getRegistrationCount, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from "@/server/data-access/event";
import type { EventFormValues } from "@/lib/validations";

export async function getStatsUseCase() {
  const [userCount, memberCount, eventCount, registrationCount] = await Promise.all([
    getUserCount(),
    getMemberProfileCount(),
    getEventCount(),
    getRegistrationCount(),
  ]);

  return {
    userCount,
    memberCount,
    eventCount,
    registrationCount,
  };
}

export async function getMembersUseCase() {
  return await getAllMembersWithProfiles();
}

export async function deleteMemberProfileUseCase(userId: string) {
  return await deleteMemberProfile(userId);
}

export async function deleteUserUseCase(id: string) {
  return await deleteUser(id);
}

export async function createEventUseCase(data: EventFormValues) {
  return await createEvent(data);
}

export async function updateEventUseCase(id: string, data: EventFormValues) {
  return await updateEvent(id, data);
}

export async function deleteEventUseCase(id: string) {
  return await deleteEvent(id);
}
