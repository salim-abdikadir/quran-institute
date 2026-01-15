import { createPost, getLatestPost } from "@/server/data-access/post";

export async function createPostUseCase(userId: string, name: string) {
  return await createPost(userId, name);
}

export async function getLatestPostUseCase(userId: string) {
  return await getLatestPost(userId);
}
