'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const interestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  portableAUM: z.enum(['<CHF 50M', 'CHF 50-100M', 'CHF 100-200M', '>CHF 200M']),
  locationStatus: z.enum([
    'Already in Switzerland',
    'Can relocate within 3 months',
    'Can relocate within 6 months',
    'Can relocate within 12 months',
    'Exploring options'
  ]),
  compensation: z.enum(['<CHF 200k', 'CHF 200-300k', 'CHF 300-500k', '>CHF 500k']),
  contactMethod: z.enum(['Email', 'WhatsApp', 'Phone']),
  jobId: z.string().optional(),
  interested: z.boolean().refine(val => val === true, 'You must confirm interest')
});

type InterestFormData = z.infer<typeof interestSchema>;

interface ExpressInterestFormProps {
  jobId?: string;
  jobTitle?: string;
  compact?: boolean;
}

export default function ExpressInterestForm({ 
  jobId, 
  jobTitle,
  compact = false 
}: ExpressInterestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      jobId: jobId || '',
      interested: false
    }
  });

  const onSubmit = async (data: InterestFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      
      // Track with analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'express_interest_submit', {
          job_id: jobId || 'general',
          aum_range: data.portableAUM,
          location_status: data.locationStatus
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h3>Thank You!</h3>
        <p>
          We've received your interest and will respond within 24 hours via your 
          preferred contact method.
        </p>
        <p className="success-note">
          Check your email for confirmation. If you don't see it, please check 
          your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? 'compact' : 'full'}>
      {!compact && (
        <div className="info-box">
          <h3>No CV Required at This Stage</h3>
          <ul>
            <li>We respond within 24 hours</li>
            <li>No obligation, completely confidential</li>
            <li>We'll explain next steps and opportunity details</li>
            <li>Client identity disclosed only after phone conversation</li>
          </ul>
        </div>
      )}

      {/* Personal Information */}
      <div className="form-section">
        <h3>Personal Information</h3>
        
        <div className="input-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            placeholder="Your full name"
          />
          {errors.fullName && <span className="error">{errors.fullName.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address *</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="your.email@example.com"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+55 11 XXXX-XXXX or +41 XX XXX XXXX"
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Interest Confirmation */}
      <div className="form-section">
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input
              {...register('interested')}
              type="checkbox"
              id="interested"
            />
            <span>I'm interested in learning more about this opportunity</span>
          </label>
          {errors.interested && <span className="error">{errors.interested.message}</span>}
        </div>
      </div>

      {/* Portable AUM */}
      <div className="form-section">
        <h3>Portable Brazilian AUM *</h3>
        <div className="radio-group">
          {['<CHF 50M', 'CHF 50-100M', 'CHF 100-200M', '>CHF 200M'].map((option) => (
            <label key={option} className="radio-item">
              <input
                {...register('portableAUM')}
                type="radio"
                value={option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.portableAUM && <span className="error">{errors.portableAUM.message}</span>}
      </div>

      {/* Location Status */}
      <div className="form-section">
        <h3>Current Location & Availability *</h3>
        <p className="helper-text">
          {jobTitle ? `This role is based in Geneva or Zurich, Switzerland` : 'Role location will be discussed'}
        </p>
        <div className="radio-group">
          {[
            'Already in Switzerland',
            'Can relocate within 3 months',
            'Can relocate within 6 months',
            'Can relocate within 12 months',
            'Exploring options'
          ].map((option) => (
            <label key={option} className="radio-item">
              <input
                {...register('locationStatus')}
                type="radio"
                value={option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.locationStatus && <span className="error">{errors.locationStatus.message}</span>}
      </div>

      {/* Current Compensation */}
      <div className="form-section">
        <h3>Current Total Compensation *</h3>
        <div className="radio-group">
          {['<CHF 200k', 'CHF 200-300k', 'CHF 300-500k', '>CHF 500k'].map((option) => (
            <label key={option} className="radio-item">
              <input
                {...register('compensation')}
                type="radio"
                value={option}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.compensation && <span className="error">{errors.compensation.message}</span>}
      </div>

      {/* Contact Method */}
      <div className="form-section">
        <h3>Best Contact Method *</h3>
        <div className="radio-group">
          {[
            { value: 'Email', label: 'Email' },
            { value: 'WhatsApp', label: 'WhatsApp (end-to-end encrypted)' },
            { value: 'Phone', label: 'Phone Call (we call from Swiss number)' }
          ].map((option) => (
            <label key={option.value} className="radio-item">
              <input
                {...register('contactMethod')}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.contactMethod && <span className="error">{errors.contactMethod.message}</span>}
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="guarantee-box">
        <h4>Confidentiality Guarantee</h4>
        <p>✓ We respond within 24 hours</p>
        <p>✓ No obligation, completely confidential</p>
        <p>✓ We never contact your current employer</p>
        <p>✓ Client identity disclosed only after phone conversation</p>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Interest'}
      </button>
    </form>
  );
}
```

### B) `components/StickyInterestWidget.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface StickyInterestWidgetProps {
  jobId: string;
}

export default function StickyInterestWidget({ jobId }: StickyInterestWidgetProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-interest-widget">
      <div className="widget-header">💼 Quick Apply</div>
      <div className="widget-benefits">
        ✓ No CV required<br />
        ✓ Takes 30 seconds<br />
        ✓ 24-hour response
      </div>
      <Link href={`/express-interest?job=${jobId}`} className="widget-btn">
        Express Interest →
      </Link>
    </div>
  );
}
```

### C) `components/MobileBottomBar.tsx`

```typescript
'use client';

import Link from 'next/link';

interface MobileBottomBarProps {
  jobId: string;
}

export default function MobileBottomBar({ jobId }: MobileBottomBarProps) {
  return (
    <div className="mobile-bottom-bar">
      <span className="mobile-bar-text">💼 Quick Apply (30s)</span>
      <Link href={`/express-interest?job=${jobId}`} className="mobile-bar-btn">
        Express Interest →
      </Link>
    </div>
  );
}
```

---

## 📄 STEP 3: Create Pages

### A) `app/express-interest/page.tsx`

```typescript
import { Suspense } from 'react';
import ExpressInterestForm from '@/components/ExpressInterestForm';

export const metadata = {
  title: 'Express Interest - Executive Partners',
  description: 'Express interest in private banking opportunities in 30 seconds. No CV required.',
};

export default function ExpressInterestPage({
  searchParams
}: {
  searchParams: { job?: string }
}) {
  return (
    <div className="express-interest-page">
      <div className="page-header">
        <h1>Confidential Interest Check</h1>
        <p>Senior Relationship Manager — Brazil | Swiss Private Bank</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ExpressInterestForm jobId={searchParams.job} />
      </Suspense>

      <div className="page-footer">
        <p><strong>Executive Partners</strong> | Geneva-Based Executive Search</p>
        <p>Private Banking & Wealth Management Specialists</p>
        <p><em>Confidentiality Guaranteed | GDPR Compliant | 15+ Years Experience</em></p>
      </div>
    </div>
  );
}
```

### B) Update `app/jobs/[slug]/page.tsx`

```typescript
import ExpressInterestForm from '@/components/ExpressInterestForm';
import StickyInterestWidget from '@/components/StickyInterestWidget';
import MobileBottomBar from '@/components/MobileBottomBar';

export default async function JobPage({ params }: { params: { slug: string } }) {
  // Fetch job data
  const job = await getJobBySlug(params.slug);

  return (
    <div className="job-page">
      <h1>{job.title}</h1>
      <div className="job-meta">{job.location} | {job.compensation}</div>

      {/* Job Description */}
      <div className="job-description">
        {job.description}
      </div>

      {/* INLINE INTEREST FORM - Add here after job description */}
      <div className="inline-interest-section">
        <div className="section-badge">STAGE 1</div>
        <h2>⚡ Interested? Two Ways to Apply</h2>
        
        <div className="two-column-apply">
          <div className="apply-option quick-apply">
            <h3>Express Interest (30 Seconds)</h3>
            <p>Perfect if you're still exploring options</p>
            <ul>
              <li>✓ No CV required at this stage</li>
              <li>✓ We respond within 24 hours</li>
              <li>✓ Client identity revealed during phone call</li>
            </ul>
            <ExpressInterestForm 
              jobId={params.slug} 
              jobTitle={job.title}
              compact={true}
            />
          </div>

          <div className="apply-option full-apply">
            <h3>Full Application</h3>
            <p>Ready to submit complete profile?</p>
            <ul>
              <li>Submit CV + Pre-Qualification Form</li>
              <li>Detailed portfolio analysis</li>
              <li>Direct client introduction</li>
            </ul>
            <a href={`/apply?job=${params.slug}`} className="btn-full-apply">
              Apply with CV →
            </a>
          </div>
        </div>
      </div>

      {/* Rest of job page content */}
      <div className="job-details">
        {/* ... */}
      </div>

      {/* STICKY WIDGET - Desktop */}
      <StickyInterestWidget jobId={params.slug} />

      {/* MOBILE BOTTOM BAR */}
      <MobileBottomBar jobId={params.slug} />
    </div>
  );
}