import { db } from "@/server/db";
import type { EventFormValues } from "@/lib/validations";

export async function getAllEvents() {
  return await db.event.findMany({
    orderBy: { date: 'asc' },
  });
}

export async function getEventById(id: string) {
  return await db.event.findUnique({
    where: { id },
  });
}

export async function registerUserForEvent(userId: string, eventId: string) {
  return await db.eventRegistration.create({
    data: {
      userId,
      eventId,
    },
  });
}

export async function checkEventRegistration(userId: string, eventId: string) {
  return await db.eventRegistration.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });
}

export async function createEvent(data: EventFormValues) {
  return await db.event.create({
    data,
  });
}

export async function updateEvent(id: string, data: EventFormValues) {
  return await db.event.update({
    where: { id },
    data,
  });
}

export async function deleteEvent(id: string) {
  return await db.event.delete({
    where: { id },
  });
}

export async function getEventCount() {
  return await db.event.count();
}

export async function getRegistrationCount() {
  return await db.eventRegistration.count();
}
