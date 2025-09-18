export default function Home() {
  return (
    <main style={{minHeight:'60vh',padding:'24px'}}>
      <h1 style={{fontSize:'28px',fontWeight:600}}>Executive Partners</h1>
      <p style={{marginTop:16,opacity:.85}}>
        Temporary minimal homepage while we finalize an update.
      </p>
      <ul style={{marginTop:24,lineHeight:'28px',textDecoration:'underline'}}>
        <li><a href="/jobs">Browse Jobs</a></li>
        <li><a href="/candidates">Candidates</a></li>
        <li><a href="/hiring-managers">Hiring Managers</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </main>
  );
}
