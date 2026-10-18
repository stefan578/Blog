import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Post from "@/lib/PostModel";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };
type BlogPost = { id: string; title: string; date: Date; content: string[]; authorName?: string };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const post = await Post.findOne({ id }).select("title content").lean() as BlogPost | null;
  return post ? { title: post.title, description: post.content[0]?.slice(0, 160) } : { title: "Story not found" };
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const post = await Post.findOne({ id }).lean() as BlogPost | null;
  if (!post) notFound();
  return <article className="article-shell"><Link href="/blogs" className="back-link">&lt;- Back to the journal</Link><header className="article-header"><p className="eyebrow"><span className="eyebrow-dot" /> FIELD NOTES</p><h1>{post.title}</h1><time>{new Date(post.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}{post.authorName ? ` | by ${post.authorName}` : ""}</time></header><div className="article-art"><span>*</span><small>NOTES FROM THE JOURNEY</small></div><div className="article-content">{post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><div className="article-end">*</div></article>;
}
