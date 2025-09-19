export const dynamic = "force-static";

export default function LocalizedHome() {
  return (
    <main style={{padding:'24px',maxWidth:960,margin:'0 auto',lineHeight:1.6}}>
      <h1 style={{fontSize:28,marginBottom:8}}>Executive Partners</h1>
      <p style={{opacity:.8}}>Temporary localized homepage (/[locale]) — safe mode.</p>
      <ul style={{marginTop:16}}>
        <li><a href="/jobs">Browse Jobs</a></li>
        <li><a href="/candidates">Candidates</a></li>
        <li><a href="/hiring-managers">Hiring Managers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </main>
  );
}
