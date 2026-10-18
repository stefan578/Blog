import type { Metadata } from "next";
import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Post from "@/lib/PostModel";

export const metadata: Metadata = { title: "Journal" };
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  await dbConnect();
  const posts = await Post.find().sort({ date: -1 }).lean();
  return <section className="page-shell"><div className="page-intro"><p className="eyebrow"><span className="eyebrow-dot" /> THE JOURNAL</p><h1>A collection of<br /><em>small discoveries.</em></h1><p>Stories, notes, and ideas gathered along the way.</p></div>
    {posts.length ? <div className="archive-list">{posts.map((post, i) => <Link className="archive-item" href={`/blogs/${post.id}`} key={post.id}><span className="archive-number">{String(i + 1).padStart(2, "0")}</span><div><time>{new Date(post.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}{post.authorName ? ` | by ${post.authorName}` : ""}</time><h2>{post.title}</h2><p>{post.content[0]?.slice(0, 180)}{(post.content[0]?.length ?? 0) > 180 ? "..." : ""}</p></div><span className="archive-arrow">-&gt;</span></Link>)}</div> : <div className="empty-state"><span className="empty-star">*</span><h3>No entries just yet.</h3><p>There is always a first story. Come back soon.</p><Link className="text-link" href="/post">Add a blog</Link></div>}
  </section>;
}
