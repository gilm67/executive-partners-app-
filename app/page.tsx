// app/page.tsx — redirect the root to /en
import {redirect} from 'next/navigation';

export default function Page() {
  redirect('/en');
}
