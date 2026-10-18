"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignOut() {
    setPending(true);
    setError("");
    try {
      const result = await authClient.signOut();
      if (result.error) {
        setError("Couldn’t sign out. Try again.");
        setPending(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Couldn’t sign out. Try again.");
      setPending(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <span className="signout-wrap">
      <button className="nav-cta nav-signout" type="button" onClick={handleSignOut} disabled={pending}>
        {pending ? "Signing out…" : "Sign out"}
      </button>
      {error && <span className="signout-error" role="alert">{error}</span>}
    </span>
  );
}
