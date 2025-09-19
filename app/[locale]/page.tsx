export const dynamic = "force-static";

export default function Page() {
  return (
    <main style={{padding:'24px', maxWidth: 960, margin: '0 auto'}}>
      <h1 style={{fontSize: 28, marginBottom: 8}}>Executive Partners</h1>
      <p style={{opacity:.8}}>Temporary localized homepage (/[locale]/page.tsx). Rendering OK.</p>
      <ul style={{marginTop:16, lineHeight:1.9}}>
        <li><a href="/jobs">Browse Jobs</a></li>
        <li><a href="/candidates">Candidates</a></li>
        <li><a href="/hiring-managers">Hiring Managers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </main>
  );
}
