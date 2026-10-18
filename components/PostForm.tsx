"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postBlog, type PostType } from "@/app/post/actions";

export default function PostForm() {
  const [paragraphs, setParagraphs] = useState([""]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const post: PostType = { id: crypto.randomUUID(), date: new Date(), title: String(form.get("title") ?? ""), content: paragraphs };
    try { const id = await postBlog(post); router.push(`/blogs/${id}`); } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not publish the story."); setPending(false); }
  }

  return <form className="editor-form" onSubmit={handleSubmit}><label className="field-label" htmlFor="title">STORY TITLE</label><input id="title" name="title" className="text-field title-field" placeholder="Give this story a name…" maxLength={160} required />
    <div className="editor-section-title"><label className="field-label">YOUR STORY</label><span>Let the words find their way.</span></div>
    {paragraphs.map((paragraph, index) => <textarea className="text-field content-field" key={index} aria-label={`Paragraph ${index + 1}`} placeholder={index === 0 ? "It started on an ordinary day…" : "And then…"} value={paragraph} maxLength={12000} required={index === 0} onChange={(event) => setParagraphs((current) => current.map((value, i) => i === index ? event.target.value : value))} />)}
    <button className="add-paragraph" type="button" onClick={() => setParagraphs((current) => [...current, ""])}>＋ Add another paragraph</button>
    {error && <p className="form-error" role="alert">{error}</p>}<div className="editor-footer"><span>Your draft is yours until you publish.</span><button className="button button-dark" disabled={pending}>{pending ? "Publishing…" : "Publish story"} <span>↗</span></button></div>
  </form>;
}
