"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import SignOutButton from "@/components/SignOutButton";

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

export default function Nav() {
  const { data: session, isPending } = authClient.useSession();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const user = session?.user;

  return (
    <>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Starlog home"><span className="brand-mark">*</span> starlog</Link>
        <nav aria-label="Main navigation">
          <Link href="/blogs">Journal</Link>
          <Link href="/about">About</Link>
          {isPending ? <span className="nav-session-placeholder" aria-label="Checking sign-in status" /> : user ? (
            <div className="nav-session">
              <Link className="nav-cta nav-write" href="/post">Add a blog <span aria-hidden="true">-&gt;</span></Link>
              <Link className="profile-avatar" href="/profile" aria-label={`${user.name || user.email}'s profile`} title="Your profile">
                {user.image ? <img src={user.image} alt="" /> : <span>{initials(user.name || user.email)}</span>}
              </Link>
              <SignOutButton />
            </div>
          ) : (
            <button className="nav-cta nav-add-blog" type="button" onClick={() => setShowSignInPrompt(true)}>Add a blog <span aria-hidden="true">-&gt;</span></button>
          )}
        </nav>
      </header>
      {showSignInPrompt && <div className="signin-prompt-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowSignInPrompt(false); }}>
        <section className="signin-prompt" role="dialog" aria-modal="true" aria-labelledby="signin-prompt-title">
          <button className="signin-prompt-close" type="button" aria-label="Close" onClick={() => setShowSignInPrompt(false)}>×</button>
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT STORY</p>
          <h2 id="signin-prompt-title">Want to add a blog?</h2>
          <p>You need to sign in before you can write and publish a story.</p>
          <Link className="button button-dark" href="/signin?next=%2Fpost">Sign in to continue <span aria-hidden="true">-&gt;</span></Link>
        </section>
      </div>}
    </>
  );
}
