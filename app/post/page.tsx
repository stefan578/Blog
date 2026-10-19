import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import PostForm from "@/components/PostForm";

export const dynamic = "force-dynamic";
export default async function PostPage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  return <section className="page-shell compose-page"><p className="eyebrow"><span className="eyebrow-dot" /> NEW POST</p><h1>Write a <em>post.</em></h1><p className="compose-intro">Add a title and write your post below.</p><PostForm /></section>;
}
