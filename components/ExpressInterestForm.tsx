"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Reusable, market-aware Express Interest form
 * - Premium Tailwind UI
 * - Market + Job aware via props
 * - Posts to /api/submit-interest
 */

type Market =
  | "CH"
  | "UK"
  | "UAE"
  | "SG"
  | "HK"
  | "US"
  | "EU"
  | "BR"
  | "LATAM"
  | "GLOBAL"
  | "INTL";

type Option = { value: string; label: string };

const DEFAULT_LOCATION_OPTIONS: Option[] = [
  { value: "Already in location", label: "Already in location" },
  { value: "Can relocate within 3 months", label: "Can relocate within 3 months" },
  { value: "Can relocate within 6 months", label: "Can relocate within 6 months" },
  { value: "Can relocate within 12 months", label: "Can relocate within 12 months" },
  { value: "Exploring options", label: "Exploring options" },
];

const DEFAULT_CONTACT_OPTIONS: Option[] = [
  { value: "Email", label: "Email" },
  { value: "WhatsApp", label: "WhatsApp (end-to-end encrypted)" },
  { value: "Phone", label: "Phone call (we call from Swiss number)" },
];

/** Reasonable defaults you can override per job/market */
const MARKET_DEFAULTS: Record<
  Market,
  {
    aumCurrency: string;
    aumOptions: string[];
    compCurrency: string;
    compOptions: string[];
    phonePlaceholder: string;
  }
> = {
  CH: {
    aumCurrency: "CHF",
    aumOptions: ["< 50M", "50–100M", "100–200M", "> 200M"],
    compCurrency: "CHF",
    compOptions: ["< 200k", "200–300k", "300–500k", "> 500k"],
    phonePlaceholder: "+41 XX XXX XX XX",
  },
  UK: {
    aumCurrency: "GBP",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "GBP",
    compOptions: ["< 150k", "150–250k", "250–400k", "> 400k"],
    phonePlaceholder: "+44 7XXX XXXXXX",
  },
  UAE: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "AED",
    compOptions: ["< 700k", "700k–1.2M", "1.2M–2.0M", "> 2.0M"],
    phonePlaceholder: "+971 5X XXX XXXX",
  },
  SG: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "SGD",
    compOptions: ["< 250k", "250–400k", "400–650k", "> 650k"],
    phonePlaceholder: "+65 XXXX XXXX",
  },
  HK: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "HKD",
    compOptions: ["< 2.0M", "2.0–3.5M", "3.5–6.0M", "> 6.0M"],
    phonePlaceholder: "+852 XXXX XXXX",
  },
  US: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "USD",
    compOptions: ["< 200k", "200–350k", "350–600k", "> 600k"],
    phonePlaceholder: "+1 (XXX) XXX-XXXX",
  },
  EU: {
    aumCurrency: "EUR",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "EUR",
    compOptions: ["< 180k", "180–300k", "300–500k", "> 500k"],
    phonePlaceholder: "+33 X XX XX XX XX",
  },
  BR: {
    aumCurrency: "CHF",
    aumOptions: ["< 50M", "50–100M", "100–200M", "> 200M"],
    compCurrency: "CHF",
    compOptions: ["< 200k", "200–300k", "300–500k", "> 500k"],
    phonePlaceholder: "+55 11 XXXX-XXXX",
  },
  LATAM: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "USD",
    compOptions: ["< 150k", "150–300k", "300–500k", "> 500k"],
    phonePlaceholder: "+52 XX XXXX XXXX",
  },
  GLOBAL: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "USD",
    compOptions: ["< 200k", "200–350k", "350–600k", "> 600k"],
    phonePlaceholder: "+41 XX XXX XX XX",
  },
  INTL: {
    aumCurrency: "USD",
    aumOptions: ["< 25M", "25–50M", "50–100M", "> 100M"],
    compCurrency: "USD",
    compOptions: ["< 200k", "200–350k", "350–600k", "> 600k"],
    phonePlaceholder: "+41 XX XXX XX XX",
  },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Ensure enum arrays are never empty + remove blanks */
function normalizeList(list: string[] | undefined, fallback: string[]) {
  const cleaned = (list ?? []).map((s) => String(s).trim()).filter(Boolean);
  return cleaned.length ? cleaned : fallback;
}

function makeSchema(args: {
  aumOptions: string[];
  locationOptions: string[];
  compOptions: string[];
  contactOptions: string[];
}) {
  const aumEnum = z.enum([args.aumOptions[0], ...args.aumOptions.slice(1)] as [
    string,
    ...string[]
  ]);
  const locEnum = z.enum([args.locationOptions[0], ...args.locationOptions.slice(1)] as [
    string,
    ...string[]
  ]);
  const compEnum = z.enum([args.compOptions[0], ...args.compOptions.slice(1)] as [
    string,
    ...string[]
  ]);
  const contactEnum = z.enum([args.contactOptions[0], ...args.contactOptions.slice(1)] as [
    string,
    ...string[]
  ]);

  return z.object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(8, "Please enter a valid phone number"),

    portableAUM: aumEnum,
    locationStatus: locEnum,
    compensation: compEnum,
    contactMethod: contactEnum,

    jobId: z.string().optional(),
    jobTitle: z.string().optional(),
    market: z.string().optional(),

    interested: z.literal(true, {
      errorMap: () => ({ message: "Please confirm your interest" }),
    }),
  });
}

type ExpressInterestFormProps = {
  jobId?: string;
  jobTitle?: string;
  compact?: boolean;

  /** Market tuning */
  market?: Market;

  /** Labels (per job) */
  locationLabel?: string;
  aumLabel?: string;
  compLabel?: string;

  /** Override ranges (per job/market) */
  portableAumCurrency?: string;
  portableAumOptions?: string[];
  /** Alias (so your job page can pass aumOptions) */
  aumOptions?: string[];

  compensationCurrency?: string;
  compensationOptions?: string[];
  locationOptions?: string[];
  contactOptions?: Option[];
};

export default function ExpressInterestForm({
  jobId,
  jobTitle,
  compact = false,
  market = "GLOBAL",
  locationLabel,
  aumLabel,
  compLabel,
  portableAumCurrency,
  portableAumOptions,
  aumOptions,
  compensationCurrency,
  compensationOptions,
  locationOptions,
  contactOptions,
}: ExpressInterestFormProps) {
  const defaults = MARKET_DEFAULTS[market];

  const aumCcy = portableAumCurrency ?? defaults.aumCurrency;
  const aumOpts = normalizeList(aumOptions ?? portableAumOptions, defaults.aumOptions);

  const compCcy = compensationCurrency ?? defaults.compCurrency;
  const compOpts = normalizeList(compensationOptions, defaults.compOptions);

  const locOpts = normalizeList(
    locationOptions,
    DEFAULT_LOCATION_OPTIONS.map((o) => o.value)
  );

  const contactOpts = (contactOptions ?? DEFAULT_CONTACT_OPTIONS).filter(
    (x) => x?.value && x?.label
  );

  const schema = React.useMemo(
    () =>
      makeSchema({
        aumOptions: aumOpts,
        locationOptions: locOpts,
        compOptions: compOpts,
        contactOptions: contactOpts.map((x) => x.value),
      }),
    [
      aumOpts.join("|"),
      locOpts.join("|"),
      compOpts.join("|"),
      contactOpts.map((x) => x.value).join("|"),
    ]
  );

  type FormData = z.infer<typeof schema>;

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      jobId: jobId ?? "",
      jobTitle: jobTitle ?? "",
      market,
      interested: false as any,
      contactMethod: "Email" as any,
      // Provide safe initial values for enums (avoids edge-case validation issues)
      portableAUM: aumOpts[0] as any,
      locationStatus: locOpts[0] as any,
      compensation: compOpts[0] as any,
    },
    mode: "onTouched",
  });

  const interested = watch("interested");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          jobId: jobId ?? data.jobId,
          jobTitle: jobTitle ?? data.jobTitle,
          market,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "express_interest_submit", {
          job_id: jobId || "general",
          market,
          aum_range: data.portableAUM,
          location_status: data.locationStatus,
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
        <div className="flex items-start gap-4">
          <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200">
            ✓
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-white">
              Thank you — received.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              We’ll respond within <span className="text-white">24 hours</span> via your
              preferred contact method.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/65">
              If you don’t see our confirmation email, please check your spam folder.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Section = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
        <div className="h-px w-10 bg-[#d4af37]/60" />
      </div>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-white/60">{subtitle}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );

  const Field = ({
    label,
    error,
    children,
  }: {
    label: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-white/60">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-sm text-rose-200/90">{error}</p> : null}
    </div>
  );

  const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    function Input(props, ref) {
      return (
        <input
          ref={ref}
          {...props}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white",
            "placeholder:text-white/35",
            "focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37]/30",
            props.className
          )}
        />
      );
    }
  );

  const RadioPill = ({
    name,
    value,
    label,
  }: {
    name: keyof FormData;
    value: string;
    label: string;
  }) => (
    <label className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3 transition hover:bg-white/[0.04]">
      <input
        type="radio"
        value={value}
        {...register(name as any)}
        className="h-4 w-4 accent-[#d4af37]"
      />
      <span className="text-sm text-white/80 group-hover:text-white">{label}</span>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-has-[:checked]:ring-[#d4af37]/35" />
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Hidden fields so they’re always part of the form payload (and schema) */}
      <input type="hidden" {...register("jobId")} value={jobId ?? ""} readOnly />
      <input type="hidden" {...register("jobTitle")} value={jobTitle ?? ""} readOnly />
      <input type="hidden" {...register("market")} value={market} readOnly />

      {!compact && (
        <div className="rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-5">
          <div className="text-[12px] uppercase tracking-wider text-[#d4af37]">
            Confidential — No CV required
          </div>
          <div className="mt-2 text-sm text-white/80">
            Fast, discreet process. We respond within{" "}
            <span className="text-white">24 hours</span>. Client identity is disclosed
            only after a short call.
          </div>
          <div className="mt-4 grid gap-2 text-sm text-white/70 md:grid-cols-2">
            <div>✓ No obligation</div>
            <div>✓ Fully confidential</div>
            <div>✓ We never contact your employer</div>
            <div>✓ Clear next steps</div>
          </div>
        </div>
      )}

      <Section title="Personal information" subtitle="This stays confidential and is never shared without your consent.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" error={errors.fullName?.message}>
            <Input {...register("fullName")} placeholder="Your full name" autoComplete="name" />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <Input {...register("email")} type="email" placeholder="you@domain.com" autoComplete="email" />
          </Field>

          <Field label="Phone" error={errors.phone?.message}>
            <Input {...register("phone")} type="tel" placeholder={defaults.phonePlaceholder} autoComplete="tel" />
          </Field>

          <Field label="Preferred contact method" error={errors.contactMethod?.message}>
            <div className="grid gap-2">
              {contactOpts.map((o) => (
                <RadioPill key={o.value} name={"contactMethod"} value={o.value} label={o.label} />
              ))}
            </div>
          </Field>
        </div>
      </Section>

      <Section
        title="Confirmation"
        subtitle="To protect confidentiality, we only reveal the client after a short call."
      >
        <label className="group relative flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:bg-white/[0.04]">
          <input {...register("interested")} type="checkbox" className="mt-1 h-4 w-4 accent-[#d4af37]" />
          <div>
            <div className="text-sm text-white/80 group-hover:text-white">
              I’m interested in learning more about this opportunity
            </div>
            {errors.interested?.message ? (
              <div className="mt-2 text-sm text-rose-200/90">{errors.interested.message}</div>
            ) : (
              <div className="mt-2 text-xs text-white/55">You can withdraw at any time.</div>
            )}
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-has-[:checked]:ring-[#d4af37]/35" />
        </label>
      </Section>

      <Section
        title={aumLabel ?? "Portable AUM"}
        subtitle={`Select your estimated portable assets (${aumCcy}).`}
      >
        <div className="grid gap-2 md:grid-cols-2">
          {aumOpts.map((opt) => (
            <RadioPill key={opt} name={"portableAUM"} value={opt} label={`${aumCcy} ${opt}`} />
          ))}
        </div>
        {errors.portableAUM?.message ? (
          <p className="mt-2 text-sm text-rose-200/90">{errors.portableAUM.message}</p>
        ) : null}
      </Section>

      <Section
        title={locationLabel ? `Location & availability (${locationLabel})` : "Location & availability"}
        subtitle={jobTitle ? "Role location will be confirmed during our call." : "We’ll confirm role details during our call."}
      >
        <div className="grid gap-2 md:grid-cols-2">
          {locOpts.map((opt) => (
            <RadioPill key={opt} name={"locationStatus"} value={opt} label={opt} />
          ))}
        </div>
        {errors.locationStatus?.message ? (
          <p className="mt-2 text-sm text-rose-200/90">{errors.locationStatus.message}</p>
        ) : null}
      </Section>

      <Section
        title={compLabel ?? "Current total compensation"}
        subtitle={`Choose your current total comp (${compCcy}).`}
      >
        <div className="grid gap-2 md:grid-cols-2">
          {compOpts.map((opt) => (
            <RadioPill key={opt} name={"compensation"} value={opt} label={`${compCcy} ${opt}`} />
          ))}
        </div>
        {errors.compensation?.message ? (
          <p className="mt-2 text-sm text-rose-200/90">{errors.compensation.message}</p>
        ) : null}
      </Section>

      {error ? (
        <div className="rounded-2xl border border-rose-200/20 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="text-[12px] uppercase tracking-wider text-white/60">
          Confidentiality guarantee
        </div>
        <div className="mt-3 grid gap-2 text-sm text-white/70 md:grid-cols-2">
          <div>✓ Response within 24 hours</div>
          <div>✓ No obligation, confidential</div>
          <div>✓ No contact with your employer</div>
          <div>✓ Client disclosed after call</div>
        </div>
      </div>

      {/* ✅ GOLD CTA + lock + premium microcopy */}
      <div className="space-y-2">
        <button
          type="submit"
          disabled={isSubmitting || !interested}
          className={cn(
            "w-full rounded-xl px-5 py-3 text-sm font-semibold transition",
            // Always gold (even disabled)
            "bg-brandGold/30 text-brandGoldPale hover:bg-brandGold/40 hover:text-white",
            "ring-1 ring-inset ring-[#d4af37]/25",
            "focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30",
            // Disabled but still gold + premium
            "disabled:cursor-not-allowed disabled:opacity-100 disabled:hover:bg-brandGold/30 disabled:hover:text-brandGoldPale",
            // Slightly reduce contrast when disabled (without turning grey)
            !interested ? "brightness-90" : ""
          )}
        >
          {isSubmitting ? "Submitting…" : "Submit interest"}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-white/55">
          {/* lock icon (no extra library needed) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#d4af37]/80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>

          <span>
            <span className="text-white/70">Confidential submission</span> — we never contact your employer.
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-white/45">
        By submitting, you agree to be contacted regarding this opportunity. We never share your details without consent.
      </p>
    </form>
  );
}