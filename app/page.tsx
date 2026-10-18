import Link from "next/link";
import dbConnect from "@/lib/mongoose";
import Post from "@/lib/PostModel";

export const dynamic = "force-dynamic";

export default async function Home() {
  await dbConnect();
  const posts = await Post.find().sort({ date: -1 }).limit(3).lean();
  return <>
    <section className="hero"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> A PERSONAL BLOG</p><h1>A few things<br />I’ve been <em>thinking about.</em></h1><p className="hero-intro">Notes on projects, things I’ve learned, and whatever else seems worth writing down.</p><div className="hero-actions"><Link className="button button-dark" href="/blogs">Read the blog <span>↗</span></Link><Link className="text-link" href="/about">About this site <span>→</span></Link></div></div><div className="hero-stamp"><span>EST.</span><strong>20<br />24</strong><i>✳</i></div><div className="hero-caption">A PERSONAL<br />WORK IN PROGRESS</div></section>
    <section className="latest section-wrap"><div className="section-heading"><div><p className="eyebrow">RECENT POSTS</p><h2>From the <em>blog</em></h2></div><Link className="text-link" href="/blogs">See all posts <span>→</span></Link></div>
      {posts.length ? <div className="post-grid">{posts.map((post, index) => <Link className={`post-card ${index === 0 ? "featured" : ""}`} href={`/blogs/${post.id}`} key={post.id}><div className={`card-art art-${index % 3}`}><span className="card-art-index">0{index + 1}</span><span className="card-art-symbol">{["✳", "◒", "⌁"][index % 3]}</span></div><div className="post-meta"><time>{new Date(post.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</time><span>5 MIN READ</span></div><h3>{post.title}</h3><p>{post.content[0]?.slice(0, 150)}{(post.content[0]?.length ?? 0) > 150 ? "…" : ""}</p><span className="read-link">Read the story <b>↗</b></span></Link>)}</div> : <div className="empty-state"><span className="empty-star">✳</span><h3>The first page is still blank.</h3><p>Good things take a little time. Check back soon for a new story.</p><Link href="/blogs">Visit the journal <span>→</span></Link></div>}
    </section><section className="quote-band"><span className="quote-mark">✳</span><p>Thanks for reading. There’s more on the blog whenever you’re ready.</p><Link className="text-link" href="/blogs">Browse all posts <span>→</span></Link></section>
  </>;
}
