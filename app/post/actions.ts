"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";

export interface PostType { id: string; date: Date; title: string; content: string[] }

async function requireUser() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  return session.user;
}

export async function postBlog(input: PostType): Promise<string> {
  const author = await requireUser();
  const title = input.title.trim();
  const content = input.content.map((line) => line.trim()).filter(Boolean);
  if (!title || title.length > 160 || content.length === 0 || content.some((line) => line.length > 12000)) {
    throw new Error("Add a title and at least one paragraph. Each paragraph must be under 12,000 characters.");
  }
  await dbConnect();
  const id = crypto.randomUUID();
  await Post.create({ id, date: new Date(), title, content, authorId: author.id, authorName: author.name || author.email, authorImage: author.image || "" });
  return id;
}
