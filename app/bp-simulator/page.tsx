import { redirect } from "next/navigation";

export default function Page() {
  // Immediate server-side redirect
  redirect("/portability");
}
