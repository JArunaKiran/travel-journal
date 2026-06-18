"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({callbackUrl: "/login",})
    }
      className="rounded-lg border  px-3 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      Sign Out
    </button>
  );
}