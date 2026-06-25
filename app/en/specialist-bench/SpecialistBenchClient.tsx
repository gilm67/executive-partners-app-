"use client";

import { useState } from "react";

const ROLES = [
  "Assistant Relationship Manager (ARM)",
  "Compliance Officer",
  "Risk Manager",
  "Operations / Middle Office",
  "Legal / Regulatory",
  "Fund Administration",
  "Client Onboarding / KYC",
  "Product Specialist",
  "Portfolio Management Assistant",
  "Other",
];

const MARKETS = [
  "Switzerland (CH)",
  "France",
  "Germany / Austria",
  "UK",
  "Middle East (UAE / Saudi)",
  "Asia (Singapore / HK)",
  "LATAM",
  "Italy",
  "Israel",
  "Other",
];

const EXPERIENCE = [
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  institution: string;
  experience: string;
  markets: string[];
  languages: string;
  brief: string;
  consent: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  institution: "",
  experience: "",
  markets: [],
  languages: "",
  brief: "",
  consent: false,
};

export default function SpecialistBenchPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleMarket = (m: string) => {
    setForm((f) => ({
      ...f,
      markets: f.markets.includes(m)
        ? f.markets.filter((x) => x !== m)
        : [...f.markets, m],
    }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.role || !form.institution || !form.experience || !form.consent) {
      setErrorMsg("Please complete all required fields and confirm your consent.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/specialist-bench", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#1B3A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#1B3A6B] mb-3">You are on the bench.</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Your profile has been added to our Specialist Bench. We will reach out confidentially when a partner bank requests your specific expertise. No noise, no spam.
          </p>
          <p className="text-sm text-gray-400">Executive Partners, Geneva</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <section className="bg-[#1B3A6B] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A14A] text-sm font-semibold tracking-widest uppercase mb-4">
            Executive Partners — Specialist Bench
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-5">
            Your expertise deserves the right opportunity.
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            We work exclusively in private banking and wealth management. If you hold a specialist or support role and you are open to the right conversation, register here. We approach you when a partner bank is looking for exactly your profile. Nothing more.
          </p>
        </div>
      </section>

      <section className="bg-[#C9A14A]/10 border-y border-[#C9A14A]/30 py-5 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-6 justify-center text-sm text-[#1B3A6B] font-medium">
          <span className="flex items-center gap-2"><span className="text-[#C9A14A]">◆</span> Strictly confidential</span>
          <span className="flex items-center gap-2"><span className="text-[#C9A14A]">◆</span> No unsolicited outreach to your current employer</span>
          <span className="flex items-center gap-2"><span className="text-[#C9A14A]">◆</span> We contact you only when there is a real match</span>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-xl font-semibold text-[#1B3A6B] mb-8">Register your profile</h2>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">First name <span className="text-[#C9A14A]">*</span></label>
              <input type="text" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]" placeholder="Jean" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last name <span className="text-[#C9A14A]">*</span></label>
              <input type="text" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]" placeholder="Dupont" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Professional email <span className="text-[#C9A14A]">*</span></label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]" placeholder="j.dupont@privatebank.com" />
            <p className="text-xs text-gray-400 mt-1">Personal email accepted. We never contact your employer.</p>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Current role <span className="text-[#C9A14A]">*</span></label>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white">
              <option value="">Select your role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Current institution <span className="text-[#C9A14A]">*</span></label>
              <input type="text" value={form.institution} onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]" placeholder="Pictet, UBS, EFG..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Experience <span className="text-[#C9A14A]">*</span></label>
              <select value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white">
                <option value="">Select</option>
                {EXPERIENCE.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Markets / geographies you cover</label>
            <div className="flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <button key={m} type="button" onClick={() => toggleMarket(m)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.markets.includes(m) ? "bg-[#1B3A6B] text-white border-[#1B3A6B]" : "bg-white text-gray-600 border-gray-200 hover:border-[#1B3A6B]/40"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Languages</label>
            <input type="text" value={form.languages} onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]" placeholder="French (native), English (fluent), German (working)" />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Anything we should know? <span className="text-gray-400">(optional)</span></label>
            <textarea value={form.brief} onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] resize-none" placeholder="Specialisation, certifications, particular market expertise..." />
          </div>

          <div className="mb-7 bg-[#F8F7F4] rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-0.5 accent-[#1B3A6B] w-4 h-4" />
              <span className="text-xs text-gray-600 leading-relaxed">
                I consent to Executive Partners storing my profile and contacting me confidentially when a relevant opportunity arises. I understand my information will not be shared with any third party without my prior agreement. I can withdraw at any time by emailing <a href="mailto:recruiter@execpartners.ch" className="text-[#1B3A6B] underline">recruiter@execpartners.ch</a>.
              </span>
            </label>
          </div>

          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

          <button onClick={handleSubmit} disabled={status === "loading"} className="w-full bg-[#1B3A6B] hover:bg-[#152e58] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm tracking-wide">
            {status === "loading" ? "Submitting..." : "Join the Specialist Bench"}
          </button>

          {status === "error" && <p className="text-red-500 text-sm mt-3 text-center">Something went wrong. Please email us at recruiter@execpartners.ch.</p>}

          <p className="text-xs text-gray-400 text-center mt-5">Strictly confidential. No unsolicited approaches to your current employer.</p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Looking for senior Relationship Manager positions?{" "}
            <a href="/en/candidate-assessment" className="text-[#1B3A6B] font-medium hover:underline">Use our Business Plan Simulator instead.</a>
          </p>
        </div>
      </section>
    </main>
  );
}
