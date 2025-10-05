// app/[locale]/page.tsx
import { redirect } from 'next/navigation';

export default function LocaleEntry() {
  // If you have locale detection, use it here.
  // For now, just land on the English homepage (NOT bp-simulator).
  redirect('/en');
}
