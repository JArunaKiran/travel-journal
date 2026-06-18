"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", {callbackUrl: "/"})}
      className="rounded-lg bg-black text-white px-4 py-2"
    >
      Sign in with Google
    </button>
  );
}