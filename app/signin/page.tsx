"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { refetch: refreshSession } = authClient.useSession();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const result = signUp
        ? await authClient.signUp.email({ email, name, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "That didn’t work. Check your details and try again.");
      } else {
        await refreshSession();
        const requestedPath = new URLSearchParams(window.location.search).get("next");
        const nextPath = requestedPath?.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/";
        router.push(nextPath);
        router.refresh();
      }
    } catch {
      setError("Couldn’t reach the sign-in service. Try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-note">
        <p className="auth-kicker">STARLOG <span>/</span> WRITER SIGN-IN</p>
        <div className="auth-doodle" aria-hidden="true"><i /><i /><i /><i /></div>
        <h1>Oh, hey.<br /><em>Welcome back.</em></h1>
        <p className="auth-note-copy">Sign in here when you want to add something to the blog.</p>
        <p className="auth-note-foot">A place for every writer's stories.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">{signUp ? "FIRST TIME HERE?" : "YOUR BLOG ACCOUNT"}</p>
        <h2>{signUp ? "Create an account" : "Sign in"}</h2>
        <p className="auth-subtitle">
          {signUp ? "Make an account with the email you use for this blog." : "Use the email and password you signed up with."}
        </p>

        {signUp && (
          <label className="field-label" htmlFor="name">
            NAME
            <input id="name" autoComplete="name" className="text-field" value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
        )}
        <label className="field-label" htmlFor="email">
          EMAIL
          <input id="email" type="email" autoComplete="email" className="text-field" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="field-label" htmlFor="password">
          PASSWORD
          <input id="password" type="password" autoComplete={signUp ? "new-password" : "current-password"} minLength={8} className="text-field" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark auth-submit" disabled={pending}>
          {pending ? "Signing you in…" : signUp ? "Create account" : "Sign in"}
          <span aria-hidden="true">→</span>
        </button>
        <p className="auth-switch">
          {signUp ? "Already have an account?" : "Need an account?"}{" "}
          <button type="button" onClick={() => { setSignUp(!signUp); setError(""); }}>
            {signUp ? "Sign in" : "Create one"}
          </button>
        </p>
      </form>
    </section>
  );
}
