import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import SignInButton from "@/components/auth/SignInButton";

export default async function LoginPage() {
  const session =
    await getServerSession(
      authOptions
    );

  if (session) {
    redirect("/");
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Travel Journal
      </h1>

      <p className="mb-6">
        Sign in to continue.
      </p>

      <SignInButton />
    </main>
  );
}