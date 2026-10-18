"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

export default function ProfilePage() {
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  if (isPending) return <section className="page-shell"><p className="eyebrow">YOUR PROFILE</p><p>Loading your account…</p></section>;
  if (!user) return <section className="page-shell profile-page"><p className="eyebrow">YOUR PROFILE</p><h1>You’re signed out.</h1><p>Sign in to see your account details.</p><Link className="button button-dark" href="/signin">Go to sign in <span>→</span></Link></section>;

  return (
    <section className="page-shell profile-page">
      <Link href="/" className="back-link">← Back to the blog</Link>
      <p className="eyebrow profile-eyebrow">YOUR PROFILE</p>
      <div className="profile-card">
        <div className="profile-avatar-large">
          {user.image ? <img src={user.image} alt={`${user.name || "Your"} profile`} /> : <span>{initials(user.name || user.email)}</span>}
        </div>
        <div className="profile-info">
          <h1>{user.name || "Your profile"}</h1>
          <p>{user.email}</p>
          <span className="profile-note">{error ? "Account details are temporarily unavailable." : "Signed in to Starlog"}</span>
        </div>
      </div>
    </section>
  );
}
