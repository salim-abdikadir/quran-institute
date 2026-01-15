import { db } from "@/server/db";

export async function createPost(userId: string, name: string) {
  return await db.post.create({
    data: {
      name,
      createdBy: { connect: { id: userId } },
    },
  });
}

export async function getLatestPost(userId: string) {
  return await db.post.findFirst({
    orderBy: { createdAt: "desc" },
    where: { createdBy: { id: userId } },
  });
}
