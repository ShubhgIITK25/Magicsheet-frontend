// Remove "use client" - this is now a Server Component
import { redirect } from "next/navigation";

export default async function RCPage() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    redirect("/opc");
  } else {
    redirect("/auth");
  }

  // Next.js handles the redirect before sending any HTML to the browser,
  // so you don't even need a return statement here.
}