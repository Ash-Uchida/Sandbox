import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignInPage() {
  if (!clerkEnabled) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-lg">
      <SignIn />
    </main>
  );
}
