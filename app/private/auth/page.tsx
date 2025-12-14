"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PrivateAuthPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying secure access…");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setMessage("This link is missing or invalid. Please request a new secure link.");
      return;
    }

    fetch("/api/magic-link/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("invalid");
        const data = await res.json();
        if (!data?.ok) throw new Error("invalid");
        router.replace("/private");
      })
      .catch(() => {
        setMessage("This link has expired or was already used. Please request a new secure link.");
      });
  }, [params, router]);

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-2xl font-semibold">Private Candidate Area</h1>
      <p className="mt-4 text-white/80">{message}</p>
    </div>
  );
}