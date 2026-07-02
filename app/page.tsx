// Remove "use client" - this is now a Server Component
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Example of checking server-side

export default async function RCPage() {
  // Replace this with your actual server-side auth check
  const cookieStore = cookies();
  const isLoggedIn = true;

  if (isLoggedIn) {
    redirect("/opc");
  } else {
    redirect("/auth");
  }

  // Next.js handles the redirect before sending any HTML to the browser,
  // so you don't even need a return statement here.
}