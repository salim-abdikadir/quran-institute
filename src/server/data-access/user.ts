import { db } from "@/server/db";

export async function getUserCount() {
  return await db.user.count();
}

export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}
