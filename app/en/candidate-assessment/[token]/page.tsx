import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EP Candidate Assessment | Executive Partners",
  description: "Confidential AUM Portability and Business Case Assessment",
  robots: "noindex, nofollow",
};

export default function AssessmentPage({ params }: { params: { token: string } }) {
  return (
    <main style={{ minHeight: "100vh", background: "#F8F6F1" }}>
      <AssessmentForm token={params.token} />
    </main>
  );
}

function AssessmentForm({ token }: { token: string }) {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --navy: #0B0F1A; --gold: #C9A84C; --gold-light: #F5EDD6; --gold-mid: #E8D5A3;
          --bg: #F8F6F1; --surface: #FFFFFF; --surface2: #F2EFE8;
          --text: #1A1A2E; --muted: #6B6B7A; --border: #DDD8CC;
          --red: #C62828; --green: #2E7D32; --amber: #E65100;
        }
        body { font-family: "DM Sans", sans-serif; background: var(--bg); color: var(--text); }
        #app { max-width: 780px; margin: 0 auto; padding: 24px 20px 80px; }
      `}</style>
      <div id="app">
        <div id="assessment-root" data-token={token} />
      </div>
      <AssessmentScript token={token} />
    </>
  );
}

function AssessmentScript({ token }: { token: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function() {
          const TOKEN = "${token}";
          // Full assessment app injected here
          window.__EP_TOKEN = TOKEN;
          if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initAssessment); } else { initAssessment(); }
          function initAssessment() {
            const root = document.getElementById("assessment-root");
            if (!root) return;
            root.innerHTML = getAppHTML();
            buildProgress();
            document.getElementById("f-aum")?.addEventListener("input", () => { calcROA(); calcBP(); });
            document.getElementById("f-revenue")?.addEventListener("input", calcROA);
            document.getElementById("f-portability")?.addEventListener("input", calcBP);
            ["f-nnm1","f-nnm2","f-nnm3","f-target-roa"].forEach(id => {
              document.getElementById(id)?.addEventListener("input", calcBP);
            });
          }

          let cur = 0;
          const TOTAL = 6;
          const LABELS = ["Profile","Book","Revenue","Legal","Business Plan","Motivation"];

          function getAppHTML() {
            return \`
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
.ep-header{text-align:center;padding:40px 0 32px;border-bottom:1px solid var(--border);margin-bottom:36px}
.ep-logo{font-family:"Cormorant Garamond",serif;font-size:13px;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
.ep-title{font-family:"Cormorant Garamond",serif;font-size:36px;font-weight:600;color:var(--navy);line-height:1.2;margin-bottom:8px}
.ep-subtitle{font-size:14px;color:var(--muted);max-width:480px;margin:0 auto}
.progress-wrap{margin-bottom:32px}
.progress-bar{display:flex;align-items:flex-start;position:relative;padding-top:4px}
.progress-bar::before{content:"";position:absolute;top:17px;left:20px;right:20px;height:1px;background:var(--border);z-index:0}
.step-dot{display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;z-index:1}
.dot{width:28px;height:28px;border-radius:50%;border:2px solid var(--border);background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;color:var(--muted);transition:all 0.3s}
.step-dot.active .dot{background:var(--navy);border-color:var(--navy);color:var(--gold)}
.step-dot.done .dot{background:var(--green);border-color:var(--green);color:#fff}
.step-label{font-size:10px;color:var(--muted);text-align:center;line-height:1.3;max-width:64px}
.step-dot.active .step-label{color:var(--navy);font-weight:500}
.block{display:none}.block.active{display:block;animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.block-header{margin-bottom:22px}
.block-tag{font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:5px}
.block-title{font-family:"Cormorant Garamond",serif;font-size:28px;font-weight:600;color:var(--navy);margin-bottom:6px}
.block-purpose{font-size:13px;color:var(--muted);font-style:italic;border-left:2px solid var(--gold-mid);padding-left:12px;line-height:1.5}
.q-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:22px;margin-bottom:16px}
.q-label{font-size:11px;font-weight:500;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:5px}
.q-text{font-family:"Cormorant Garamond",serif;font-size:19px;font-weight:500;color:var(--navy);margin-bottom:10px;line-height:1.4}
.q-hint{font-size:12px;color:var(--muted);background:var(--surface2);border-radius:6px;padding:10px 12px;margin-bottom:14px;line-height:1.6}
.q-hint strong{color:var(--navy);font-weight:500}
.field-group{margin-bottom:14px}
.field-group label{display:block;font-size:12px;font-weight:500;color:var(--muted);margin-bottom:5px;letter-spacing:0.04em}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.field-row.thirds{grid-template-columns:1fr 1fr 1fr}
input[type=text],input[type=number],textarea,select{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-size:14px;font-family:"DM Sans",sans-serif;color:var(--text);outline:none;transition:border-color 0.2s;appearance:none}
input:focus,textarea:focus,select:focus{border-color:var(--navy);background:#fff}
textarea{resize:vertical;min-height:84px;line-height:1.6}
.input-with-unit{position:relative;display:flex;align-items:center}
.input-with-unit input{padding-right:88px}
.unit-badge{position:absolute;right:10px;font-size:11px;font-weight:500;color:var(--muted);background:var(--gold-mid);padding:2px 8px;border-radius:4px;pointer-events:none;white-space:nowrap}
.roa-box{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;min-height:42px}
.roa-figure{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:600;color:var(--navy)}
.roa-label{font-size:12px;color:var(--muted)}
.roa-badge{font-size:11px;font-weight:500;padding:3px 8px;border-radius:4px}
.roa-low{background:#FFEBEE;color:var(--red)}.roa-ok{background:#E8F5E9;color:var(--green)}.roa-high{background:#E3F2FD;color:#1565C0}
.flag-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:500;padding:3px 9px;border-radius:4px;margin-bottom:10px}
.flag-red{background:#FFEBEE;color:var(--red)}.flag-amber{background:#FFF3E0;color:var(--amber)}
.checklist{display:flex;flex-direction:column;gap:7px}
.check-item{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:7px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;transition:all 0.15s;user-select:none}
.check-item:hover{border-color:var(--navy)}
.check-item input[type=checkbox]{width:15px;height:15px;accent-color:var(--navy);cursor:pointer;flex-shrink:0}
.check-item span{font-size:13px;color:var(--text);line-height:1.4}
.check-item.checked{background:var(--gold-light);border-color:var(--gold)}
.slider-wrap{margin-top:6px}
.slider-row{display:flex;align-items:center;gap:14px}
.slider-row input[type=range]{flex:1;accent-color:var(--navy);cursor:pointer}
.slider-val{font-family:"Cormorant Garamond",serif;font-size:24px;font-weight:600;color:var(--navy);min-width:56px;text-align:right}
.slider-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:5px}
.slider-marker{display:flex;justify-content:center;margin-top:4px}
.slider-marker span{font-size:11px;background:var(--navy);color:var(--gold);padding:2px 8px;border-radius:4px}
.radio-group{display:flex;flex-direction:column;gap:7px}
.radio-item{display:flex;align-items:flex-start;gap:10px;padding:10px 13px;border-radius:8px;border:1px solid var(--border);cursor:pointer;background:var(--surface2);transition:all 0.15s;user-select:none}
.radio-item:hover{border-color:var(--navy)}
.radio-item input[type=radio]{accent-color:var(--navy);cursor:pointer;flex-shrink:0;margin-top:3px}
.radio-item span{font-size:13px;color:var(--text);line-height:1.4}
.radio-item.selected{background:var(--gold-light);border-color:var(--gold)}
.quick-select{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.qs-btn{padding:5px 12px;border-radius:6px;border:1px solid var(--border);background:var(--surface2);font-size:12px;font-family:"DM Sans",sans-serif;color:var(--muted);cursor:pointer;transition:all 0.15s}
.qs-btn:hover{border-color:var(--navy);color:var(--navy)}
.qs-btn.active{background:var(--navy);border-color:var(--navy);color:var(--gold)}
.product-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.product-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:7px;border:1px solid var(--border);background:var(--surface2)}
.product-item input[type=checkbox]{width:14px;height:14px;accent-color:var(--navy);flex-shrink:0;cursor:pointer}
.product-item .prod-name{font-size:12px;color:var(--text);flex:1;line-height:1.3}
.product-item .prod-pct{width:52px;padding:3px 6px;font-size:12px;text-align:center;background:#fff;border:1px solid var(--border);border-radius:4px}
.product-item.active-prod{background:var(--gold-light);border-color:var(--gold)}
.bp-preview{background:var(--navy);border-radius:8px;padding:16px 18px;margin-top:12px;display:none}
.bp-preview-title{font-size:11px;color:var(--gold);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px}
.bp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.bp-cell{text-align:center}
.bp-year{font-size:10px;color:#8892A4;margin-bottom:3px}
.bp-aum{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:600;color:#E8EAF0}
.bp-rev{font-size:11px;color:var(--gold);margin-top:2px}
.bp-divider{border-top:1px solid rgba(255,255,255,0.1);margin:10px 0}
.bp-downside{font-size:11px;color:#8892A4}
.bp-downside strong{color:#EF9A9A}
.candidate-card{background:var(--navy);color:#E8EAF0;border-radius:10px;padding:14px 20px;margin-bottom:22px;display:flex;align-items:center;gap:14px}
.candidate-avatar{width:40px;height:40px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",serif;font-size:16px;font-weight:600;color:var(--navy);flex-shrink:0}
.candidate-name{font-family:"Cormorant Garamond",serif;font-size:17px;font-weight:500}
.candidate-meta{font-size:12px;color:#8892A4;margin-top:1px}
.nav-bar{display:flex;justify-content:space-between;align-items:center;margin-top:24px;padding-top:20px;border-top:1px solid var(--border)}
.btn{padding:11px 22px;border-radius:8px;font-size:14px;font-weight:500;font-family:"DM Sans",sans-serif;cursor:pointer;border:none;transition:all 0.2s;outline:none}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--muted)}
.btn-ghost:hover{border-color:var(--navy);color:var(--navy)}
.btn-primary{background:var(--navy);color:var(--gold);letter-spacing:0.03em}
.btn-primary:hover{background:#1a2035}
.btn-submit{background:var(--gold);color:var(--navy);font-weight:600;padding:13px 30px;font-size:15px}
.btn-submit:hover{background:#b8942a}
.btn-submit:disabled{opacity:0.5;cursor:not-allowed}
.intro-panel{background:var(--gold-light);border:1px solid var(--gold-mid);border-radius:10px;padding:16px 20px;margin-bottom:24px}
.intro-panel p{font-size:13px;color:var(--navy);line-height:1.7}
.thank-you{text-align:center;padding:60px 20px;display:none}
.thank-you.visible{display:block}
.thank-you-icon{width:64px;height:64px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:#fff}
.thank-you h2{font-family:"Cormorant Garamond",serif;font-size:30px;color:var(--navy);margin-bottom:10px}
.thank-you p{font-size:14px;color:var(--muted);max-width:400px;margin:0 auto;line-height:1.7}
</style>

<div class="ep-header">
  <div class="ep-logo">Executive Partners</div>
  <div class="ep-title">AUM Portability &<br>Business Case Assessment</div>
  <div class="ep-subtitle">A confidential evaluation prepared exclusively for your EP mandate process</div>
</div>

<div class="intro-panel">
  <p>This assessment takes approximately <strong>15–20 minutes</strong>. Your answers are processed confidentially and used solely to prepare your portability and business case analysis. Be as specific as possible.<br><br>
  <strong>Important:</strong> Do not share client names. Use descriptive references (e.g. "Swiss family office, CHF 45M, Geneva") throughout.</p>
</div>

<div class="progress-wrap"><div class="progress-bar" id="progress-bar"></div></div>
<div id="candidate-banner"></div>

<div class="block active" id="block-0">
  <div class="block-header">
    <div class="block-tag">Introduction</div>
    <div class="block-title">Candidate Profile</div>
    <div class="block-purpose">Basic information to personalise your analysis and calibrate the right benchmarks.</div>
  </div>
  <div class="q-card">
    <div class="field-row">
      <div class="field-group"><label>First name *</label><input type="text" id="f-name" placeholder="First name" oninput="updateBanner()"></div>
      <div class="field-group"><label>Last name *</label><input type="text" id="f-surname" placeholder="Last name" oninput="updateBanner()"></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Current institution *</label><input type="text" id="f-institution" placeholder="e.g. Julius Baer, UBS, Pictet…" oninput="updateBanner()"></div>
      <div class="field-group"><label>Years at current institution *</label><input type="number" id="f-tenure" placeholder="e.g. 7" min="0" max="45"></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Seniority level</label>
        <select id="f-seniority"><option value="">Select</option><option>Associate Director</option><option>Director</option><option>Executive Director</option><option>Managing Director</option><option>Team Head / Market Head</option><option>Other senior RM</option></select>
      </div>
      <div class="field-group"><label>Primary market coverage *</label><input type="text" id="f-market" placeholder="e.g. Italian offshore, LATAM, Swiss HNW…"></div>
    </div>
    <div class="field-group"><label>Current booking centre(s)</label><input type="text" id="f-booking" placeholder="e.g. Geneva, Zurich, Dubai"></div>
  </div>
  <div class="nav-bar"><div></div><button class="btn btn-primary" onclick="go(1)">Continue →</button></div>
</div>

<div class="block" id="block-1">
  <div class="block-header">
    <div class="block-tag">Block 1 of 5</div>
    <div class="block-title">AUM Composition & Book Structure</div>
    <div class="block-purpose">The foundation. We rebuild your book from the ground up — never from a single figure.</div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-red">⚠ Critical input</div>
    <div class="q-label">Q1 — Book Size & Structure</div>
    <div class="q-text">What is the total AUM of your book, and how is it structured?</div>
    <div class="q-hint"><strong>Enter AUM in CHF millions.</strong> For example, type 280 for CHF 280 million. Concentration matters more than the headline number — a CHF 300M book in 8 relationships carries very different portability risk than the same figure across 60 clients.</div>
    <div class="field-row">
      <div class="field-group"><label>Total AUM (CHF millions) *</label><div class="input-with-unit"><input type="number" id="f-aum" placeholder="e.g. 280" min="0"><span class="unit-badge">CHF millions</span></div></div>
      <div class="field-group"><label>Number of active client relationships *</label><input type="number" id="f-clients" placeholder="e.g. 35" min="1"></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Largest single relationship (% of total AUM — max 99%)</label><input type="number" id="f-concentration" placeholder="e.g. 18" min="0" max="99"></div>
      <div class="field-group"><label>% of AUM self-originated (vs. assigned / inherited)</label>
        <div class="quick-select" id="qs-originated">
          <button class="qs-btn" onclick="setQS('f-originated','qs-originated',this,'25')">25%</button>
          <button class="qs-btn" onclick="setQS('f-originated','qs-originated',this,'50')">50%</button>
          <button class="qs-btn" onclick="setQS('f-originated','qs-originated',this,'75')">75%</button>
          <button class="qs-btn" onclick="setQS('f-originated','qs-originated',this,'90')">90%</button>
          <button class="qs-btn" onclick="setQS('f-originated','qs-originated',this,'100')">100%</button>
        </div>
        <input type="number" id="f-originated" placeholder="Or enter % manually" min="0" max="100">
      </div>
    </div>
    <div class="field-group"><label>Client domicile distribution</label><textarea id="f-domicile" placeholder="e.g. 60% French residents, 25% Swiss, 15% Italian cross-border…"></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q2 — Portability Estimate</div>
    <div class="q-text">What percentage of your AUM do you honestly expect to transfer within 12 months?</div>
    <div class="q-hint"><strong>EP baseline: 40%.</strong> Field data places realistic first-year transfer at roughly 40% of stated portable AUM. Be honest — optimistic inputs produce misleading outputs.</div>
    <div class="slider-wrap">
      <div class="slider-row">
        <input type="range" id="f-portability" min="0" max="100" value="40" step="5">
        <div class="slider-val" id="portability-val">40%</div>
      </div>
      <div class="slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
      <div class="slider-marker"><span>↑ EP baseline at 40%</span></div>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Main reason for your estimate</label><textarea id="f-portability-reason" placeholder="e.g. I have spoken with my top 8 clients. 6 confirmed intention to follow…"></textarea></div>
    <div class="field-group"><label>Have you moved before? If yes — what % followed and over what timeframe?</label><input type="text" id="f-prior-move" placeholder="e.g. Yes — moved from CS in 2019, ~55% transferred within 18 months  /  No prior move"></div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-amber">~ Probe carefully</div>
    <div class="q-label">Q3 — Institutional Anchors</div>
    <div class="q-text">Which clients have services anchored at your current institution beyond your personal relationship?</div>
    <div class="q-hint"><strong>Tick all that apply.</strong> Clients with lending, trust structures, or multi-department ties are significantly less likely to move regardless of personal relationship strength.</div>
    <div class="checklist">
      <label class="check-item"><input type="checkbox" name="anchors" value="lending" onchange="toggleCheck(this)"> <span>Lending / Lombard credit facilities</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="trust" onchange="toggleCheck(this)"> <span>Trust or fiduciary structures held at the bank</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="custody" onchange="toggleCheck(this)"> <span>Long-standing custody / safe deposit arrangements</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="multigenerational" onchange="toggleCheck(this)"> <span>Multi-generational family relationships with the institution itself</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="multi-contact" onchange="toggleCheck(this)"> <span>Clients with contacts in other departments (legal, corporate, investment)</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="eam" onchange="toggleCheck(this)"> <span>Assets held via external asset managers / intermediaries (&gt;25% of AUM)</span></label>
    </div>
    <div class="field-group" style="margin-top:12px"><label>Estimated % of total AUM affected by one or more anchors</label>
      <div class="quick-select" id="qs-anchor">
        <button class="qs-btn" onclick="setQS('f-anchor-pct','qs-anchor',this,'0')">None</button>
        <button class="qs-btn" onclick="setQS('f-anchor-pct','qs-anchor',this,'10')">~10%</button>
        <button class="qs-btn" onclick="setQS('f-anchor-pct','qs-anchor',this,'25')">~25%</button>
        <button class="qs-btn" onclick="setQS('f-anchor-pct','qs-anchor',this,'40')">~40%</button>
        <button class="qs-btn" onclick="setQS('f-anchor-pct','qs-anchor',this,'60')">~60%</button>
      </div>
      <input type="number" id="f-anchor-pct" placeholder="Or enter % manually" min="0" max="100">
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" onclick="go(0)">← Previous</button><button class="btn btn-primary" onclick="go(2)">Continue →</button></div>
</div>

<div class="block" id="block-2">
  <div class="block-header">
    <div class="block-tag">Block 2 of 5</div>
    <div class="block-title">Revenue Quality & Wallet Share</div>
    <div class="block-purpose">AUM size alone is incomplete. Revenue and margin quality define the real value of the hire.</div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-red">⚠ Critical input</div>
    <div class="q-label">Q4 — Revenue Production</div>
    <div class="q-text">What is your annual revenue production and how does it break down?</div>
    <div class="q-hint"><strong>Enter revenue in CHF millions</strong> — the same unit as AUM. Example: if you generate CHF 2.8 million per year, type 2.8. The tool will automatically calculate your ROA in basis points.<br><br><strong>Benchmarks:</strong> Swiss onshore 65–90 bps. International / cross-border 90–130 bps. Below 50 bps requires explanation.</div>
    <div class="field-row">
      <div class="field-group"><label>Annual revenue (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-revenue" placeholder="e.g. 2.8" min="0" step="0.1"><span class="unit-badge">CHF millions</span></div></div>
      <div class="field-group"><label>Implied ROA — auto-calculated</label><div class="roa-box" id="roa-box"><span style="font-size:13px;color:var(--muted)">Enter AUM and revenue above</span></div></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>% recurring revenue (advisory fees, DPM, retainers)</label>
        <div class="quick-select" id="qs-recurring">
          <button class="qs-btn" onclick="setQS('f-recurring','qs-recurring',this,'20')">20%</button>
          <button class="qs-btn" onclick="setQS('f-recurring','qs-recurring',this,'40')">40%</button>
          <button class="qs-btn" onclick="setQS('f-recurring','qs-recurring',this,'60')">60%</button>
          <button class="qs-btn" onclick="setQS('f-recurring','qs-recurring',this,'80')">80%</button>
        </div>
        <input type="number" id="f-recurring" placeholder="% recurring" min="0" max="100">
      </div>
      <div class="field-group"><label>% transactional revenue (trades, structured products)</label>
        <div class="quick-select" id="qs-transactional">
          <button class="qs-btn" onclick="setQS('f-transactional','qs-transactional',this,'20')">20%</button>
          <button class="qs-btn" onclick="setQS('f-transactional','qs-transactional',this,'40')">40%</button>
          <button class="qs-btn" onclick="setQS('f-transactional','qs-transactional',this,'60')">60%</button>
          <button class="qs-btn" onclick="setQS('f-transactional','qs-transactional',this,'80')">80%</button>
        </div>
        <input type="number" id="f-transactional" placeholder="% transactional" min="0" max="100">
      </div>
    </div>
    <div class="field-group"><label>Co-management note</label><textarea id="f-co-manage" placeholder="e.g. This is my personal book with no co-management.  /  I co-manage 3 relationships with Fixed Income — 70/30 split, CHF 45M combined."></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q5 — Wallet Share & Product Mix</div>
    <div class="q-text">How much of your clients' total wealth are you managing, and what products make up your book?</div>
    <div class="q-hint">Managing 100% of a client's CHF 20M is a deeper relationship than managing 15% of a CHF 200M portfolio. Wallet share reveals relationship depth and new money potential.</div>
    <div class="radio-group">
      <label class="radio-item" onclick="selectRadio(this,'wallet')"><input type="radio" name="wallet" value="high"> <span>High — I manage the majority (&gt;60%) of most clients' total investable wealth</span></label>
      <label class="radio-item" onclick="selectRadio(this,'wallet')"><input type="radio" name="wallet" value="mid"> <span>Medium — I manage 30–60% of most clients' total wealth</span></label>
      <label class="radio-item" onclick="selectRadio(this,'wallet')"><input type="radio" name="wallet" value="low"> <span>Low — less than 30%; significant share remains at other institutions</span></label>
      <label class="radio-item" onclick="selectRadio(this,'wallet')"><input type="radio" name="wallet" value="unknown"> <span>Unknown — I do not have full visibility into clients' total wealth positions</span></label>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Product mix — tick each product and enter approximate % of AUM</label>
      <div class="q-hint" style="margin-top:6px;margin-bottom:10px">Percentages do not need to total 100% — focus on the most significant segments.</div>
      <div class="product-grid">
        <div class="product-item" id="prod-dpm"><input type="checkbox" name="products" value="dpm" onchange="toggleProd(this)"><span class="prod-name">Discretionary (DPM)</span><input type="number" class="prod-pct" placeholder="%" id="pct-dpm" disabled></div>
        <div class="product-item" id="prod-advisory"><input type="checkbox" name="products" value="advisory" onchange="toggleProd(this)"><span class="prod-name">Advisory mandates</span><input type="number" class="prod-pct" placeholder="%" id="pct-advisory" disabled></div>
        <div class="product-item" id="prod-lending"><input type="checkbox" name="products" value="lending" onchange="toggleProd(this)"><span class="prod-name">Lombard / lending</span><input type="number" class="prod-pct" placeholder="%" id="pct-lending" disabled></div>
        <div class="product-item" id="prod-alts"><input type="checkbox" name="products" value="alts" onchange="toggleProd(this)"><span class="prod-name">Private equity / alts</span><input type="number" class="prod-pct" placeholder="%" id="pct-alts" disabled></div>
        <div class="product-item" id="prod-structured"><input type="checkbox" name="products" value="structured" onchange="toggleProd(this)"><span class="prod-name">Structured products</span><input type="number" class="prod-pct" placeholder="%" id="pct-structured" disabled></div>
        <div class="product-item" id="prod-execution"><input type="checkbox" name="products" value="execution" onchange="toggleProd(this)"><span class="prod-name">Execution / custody</span><input type="number" class="prod-pct" placeholder="%" id="pct-execution" disabled></div>
      </div>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" onclick="go(1)">← Previous</button><button class="btn btn-primary" onclick="go(3)">Continue →</button></div>
</div>

<div class="block" id="block-3">
  <div class="block-header">
    <div class="block-tag">Block 3 of 5</div>
    <div class="block-title">Legal Constraints & Compliance Position</div>
    <div class="block-purpose">Legal friction is the most underestimated portability killer. Every figure here affects your real transfer window.</div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-red">⚠ Disqualifier risk</div>
    <div class="q-label">Q6 — Notice Period, Garden Leave & Non-Solicitation</div>
    <div class="q-text">What are your current contractual constraints on departure and client contact?</div>
    <div class="q-hint"><strong>Why this matters:</strong> Garden leave directly reduces your transfer window. A 3-month notice + 3-month garden leave means your first client contact at a new institution happens at month 6 — leaving only 6 months before the critical 12-month mark.</div>
    <div class="field-row">
      <div class="field-group"><label>Notice period (months)</label>
        <div class="quick-select" id="qs-notice">
          <button class="qs-btn" onclick="setQS('f-notice','qs-notice',this,'1')">1m</button>
          <button class="qs-btn" onclick="setQS('f-notice','qs-notice',this,'2')">2m</button>
          <button class="qs-btn" onclick="setQS('f-notice','qs-notice',this,'3')">3m</button>
          <button class="qs-btn" onclick="setQS('f-notice','qs-notice',this,'6')">6m</button>
          <button class="qs-btn" onclick="setQS('f-notice','qs-notice',this,'12')">12m</button>
        </div>
        <input type="number" id="f-notice" placeholder="Or enter manually" min="0" max="24">
      </div>
      <div class="field-group"><label>Garden leave — if enforced (months)</label>
        <div class="quick-select" id="qs-garden">
          <button class="qs-btn" onclick="setQS('f-garden','qs-garden',this,'0')">None</button>
          <button class="qs-btn" onclick="setQS('f-garden','qs-garden',this,'1')">1m</button>
          <button class="qs-btn" onclick="setQS('f-garden','qs-garden',this,'3')">3m</button>
          <button class="qs-btn" onclick="setQS('f-garden','qs-garden',this,'6')">6m</button>
        </div>
        <input type="number" id="f-garden" placeholder="Or enter manually" min="0" max="12">
      </div>
    </div>
    <div class="field-group"><label>Non-solicitation clause</label>
      <select id="f-nonsolicit">
        <option value="none">No non-solicitation clause</option>
        <option value="expired">Was present but has expired</option>
        <option value="short">Up to 12 months — covering clients and prospects</option>
        <option value="medium">12–24 months — covering clients and prospects</option>
        <option value="long">Over 24 months — covering clients and prospects</option>
        <option value="unknown">Clause exists — scope under legal review</option>
      </select>
    </div>
    <div class="field-group"><label>Compliance and regulatory record</label>
      <select id="f-compliance">
        <option value="none">Clean — no disciplinary matters or investigations</option>
        <option value="minor">Minor matter, fully resolved and documented</option>
        <option value="pending">Pending matter — details in notes below</option>
      </select>
    </div>
    <div class="field-group"><label>Additional legal notes (optional)</label><textarea id="f-legal-notes" placeholder="e.g. Reviewed with a lawyer — non-solicit covers current clients only for 12 months from departure…"></textarea></div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-red">⚠ Disqualifier risk</div>
    <div class="q-label">Q7 — Client Onboarding Risk</div>
    <div class="q-text">Do any clients present KYC or onboarding complexity at a new institution?</div>
    <div class="q-hint"><strong>Why this matters:</strong> A client who cleared KYC at your current bank may not clear it elsewhere. Standards have tightened since 2022. Onboarding friction has blocked significant AUM transfer in multiple documented moves.</div>
    <div class="field-group"><label>Estimated % of AUM with potential onboarding complexity</label>
      <div class="quick-select" id="qs-kyc">
        <button class="qs-btn" onclick="setQS('f-kyc-risk','qs-kyc',this,'0')">None</button>
        <button class="qs-btn" onclick="setQS('f-kyc-risk','qs-kyc',this,'10')">~10%</button>
        <button class="qs-btn" onclick="setQS('f-kyc-risk','qs-kyc',this,'20')">~20%</button>
        <button class="qs-btn" onclick="setQS('f-kyc-risk','qs-kyc',this,'35')">~35%</button>
        <button class="qs-btn" onclick="setQS('f-kyc-risk','qs-kyc',this,'50')">~50%+</button>
      </div>
      <input type="number" id="f-kyc-risk" placeholder="Or enter % manually" min="0" max="100">
    </div>
    <div class="checklist" style="margin-top:8px">
      <label class="check-item"><input type="checkbox" name="kyc" value="pep" onchange="toggleCheck(this)"><span>Politically exposed persons (PEP) or PEP-adjacent</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="complex-sow" onchange="toggleCheck(this)"><span>Complex source-of-wealth (business proceeds, real estate, inheritance)</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="offshore" onchange="toggleCheck(this)"><span>Clients domiciled in higher-risk or restricted jurisdictions</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="eam" onchange="toggleCheck(this)"><span>Assets via external asset managers requiring intermediary onboarding</span></label>
    </div>
    <div class="field-group" style="margin-top:12px"><label>Realistic onboarding timeline for your top 10 clients at a new platform</label>
      <select id="f-onboarding-time">
        <option value="fast">Under 60 days — straightforward profiles</option>
        <option value="medium">60–120 days — some complexity, manageable</option>
        <option value="slow">120–180 days — significant EDD likely</option>
        <option value="uncertain">Uncertain — not fully assessed</option>
      </select>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" onclick="go(2)">← Previous</button><button class="btn btn-primary" onclick="go(4)">Continue →</button></div>
</div>

<div class="block" id="block-4">
  <div class="block-header">
    <div class="block-tag">Block 4 of 5</div>
    <div class="block-title">Business Plan & Revenue Trajectory</div>
    <div class="block-purpose">Model the economics of your move as a hiring committee would. Every assumption must survive a downside scenario.</div>
  </div>
  <div class="q-card">
    <div class="q-label">Q8 — Three-Year AUM & Revenue Build</div>
    <div class="q-text">What is your projected NNM and AUM trajectory over three years?</div>
    <div class="q-hint"><strong>Enter NNM in CHF millions per year.</strong> The model calculates cumulative AUM (transferred book + NNM each year) and applies your target ROA to get annual revenue. Year 1 starts from your transferred book, not zero.<br><br><strong>Realistic NNM guidance:</strong> Year 1 typically 30–50% of transferred book. Year 2 slows as transfer completes. Year 3 reflects new business. Be conservative — committees stress-test Year 1.</div>
    <div class="field-row thirds">
      <div class="field-group"><label>Year 1 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm1" placeholder="e.g. 90" min="0"><span class="unit-badge">CHF M</span></div></div>
      <div class="field-group"><label>Year 2 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm2" placeholder="e.g. 45" min="0"><span class="unit-badge">CHF M</span></div></div>
      <div class="field-group"><label>Year 3 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm3" placeholder="e.g. 30" min="0"><span class="unit-badge">CHF M</span></div></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Target ROA at new institution (basis points)</label>
        <div class="quick-select" id="qs-roa">
          <button class="qs-btn" onclick="setQS('f-target-roa','qs-roa',this,'65');calcBP()">65 bps</button>
          <button class="qs-btn" onclick="setQS('f-target-roa','qs-roa',this,'80');calcBP()">80 bps</button>
          <button class="qs-btn" onclick="setQS('f-target-roa','qs-roa',this,'100');calcBP()">100 bps</button>
          <button class="qs-btn" onclick="setQS('f-target-roa','qs-roa',this,'120');calcBP()">120 bps</button>
        </div>
        <input type="number" id="f-target-roa" placeholder="e.g. 80" min="0" max="300">
      </div>
      <div class="field-group"><label>New prospect pipeline by Year 3 (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-prospects" placeholder="e.g. 40" min="0"><span class="unit-badge">CHF M</span></div></div>
    </div>
    <div class="bp-preview" id="bp-preview">
      <div class="bp-preview-title">Business Plan Preview — Cumulative AUM Model</div>
      <div class="bp-grid" id="bp-grid"></div>
      <div class="bp-divider"></div>
      <div class="bp-downside" id="bp-downside"></div>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Key assumptions and risks</label><textarea id="f-bp-assumptions" placeholder="e.g. Year 1 NNM assumes 45% of current book transfers by month 12. Main risk: 2 large clients in succession planning may delay to Year 2…"></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q9 — Compensation Expectations</div>
    <div class="q-text">What compensation structure are you expecting?</div>
    <div class="q-hint"><strong>EP rule:</strong> The hire must break even within 36 months in the base scenario. Total cost = base + ~18% employer charges (CH) + bonus + infrastructure. Enter base salary and total Year 1 comp in CHF thousands (e.g. 280 for CHF 280,000).</div>
    <div class="field-row">
      <div class="field-group"><label>Expected base salary (CHF thousands / year)</label><div class="input-with-unit"><input type="number" id="f-base" placeholder="e.g. 280" min="0"><span class="unit-badge">CHF 000s</span></div></div>
      <div class="field-group"><label>Expected total comp Year 1 (CHF thousands)</label><div class="input-with-unit"><input type="number" id="f-total-comp" placeholder="e.g. 420" min="0"><span class="unit-badge">CHF 000s</span></div></div>
    </div>
    <div class="field-group"><label>Year 1 guarantee expectation</label>
      <select id="f-guarantee">
        <option value="no">No guarantee — willing to be assessed on transferred book</option>
        <option value="partial">Partial guarantee — cover transition risk only (3–6 months)</option>
        <option value="full">Full Year 1 guarantee requested</option>
      </select>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" onclick="go(3)">← Previous</button><button class="btn btn-primary" onclick="go(5)">Continue →</button></div>
</div>

<div class="block" id="block-5">
  <div class="block-header">
    <div class="block-tag">Block 5 of 5</div>
    <div class="block-title">Motivation & Platform Fit</div>
    <div class="block-purpose">A strong book with weak motivation is a retention risk. We assess whether the move makes strategic sense.</div>
  </div>
  <div class="q-card">
    <div class="q-label">Q10 — Primary Motivation</div>
    <div class="q-text">What is driving your decision to move now, and why this institution specifically?</div>
    <div class="q-hint"><strong>Push vs pull:</strong> Push-only motivation (frustration at current employer) correlates with shorter tenure at the new institution. The strongest moves are driven by genuine pull factors.</div>
    <div class="field-group"><label>Push factors — what has changed at your current institution?</label><textarea id="f-push" placeholder="e.g. Change in management, reduction in product shelf, shift in risk appetite, compensation ceiling…"></textarea></div>
    <div class="field-group"><label>Pull factors — what does the target platform offer that your current one does not?</label><textarea id="f-pull" placeholder="e.g. Stronger alternatives shelf, better booking infrastructure, more entrepreneurial culture, clearer path to senior partnership…"></textarea></div>
    <div class="field-group"><label>Where else are you currently in conversation?</label><input type="text" id="f-competitors" placeholder="e.g. Early conversation with Lombard Odier. Nothing advanced elsewhere.  /  This is the only active conversation."></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q11 — Platform Knowledge & Additional Context</div>
    <div class="q-text">How well do you know the target institution's infrastructure and product shelf?</div>
    <div class="q-hint">Candidates who have not investigated the platform in depth often discover mismatches post-hire. For boutique or EAM mandates, the infrastructure change from a Tier-1 requires explicit acknowledgment.</div>
    <div class="radio-group">
      <label class="radio-item" onclick="selectRadio(this,'platform')"><input type="radio" name="platform" value="strong"> <span>Strong — spoken with people inside, clear view of product shelf and culture</span></label>
      <label class="radio-item" onclick="selectRadio(this,'platform')"><input type="radio" name="platform" value="moderate"> <span>Moderate — know from market reputation, had initial conversations</span></label>
      <label class="radio-item" onclick="selectRadio(this,'platform')"><input type="radio" name="platform" value="limited"> <span>Limited — early stage, not yet investigated in depth</span></label>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Any additional context not captured above</label><textarea id="f-additional" placeholder="e.g. I have a strong referral network in the Franco-Swiss frontalier market not reflected in current AUM…"></textarea></div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" onclick="go(4)">← Previous</button><button class="btn btn-submit" id="submit-btn" onclick="submitAssessment()">Submit Assessment →</button></div>
</div>

<div class="thank-you" id="thank-you">
  <div class="thank-you-icon">✓</div>
  <h2>Assessment submitted</h2>
  <p>Thank you. Your assessment has been received and is being processed. Gil M. Chalem will be in touch within 24 hours to discuss the analysis and next steps.</p>
</div>
\`;
          }

          function buildProgress() {
            const bar = document.getElementById("progress-bar");
            if (!bar) return;
            bar.innerHTML = LABELS.map((l, i) => \`
              <div class="step-dot \${i === 0 ? "active" : ""}" id="dot-\${i}">
                <div class="dot">\${i + 1}</div>
                <div class="step-label">\${l}</div>
              </div>\`).join("");
          }

          function updateProgress() {
            for (let i = 0; i < TOTAL; i++) {
              const d = document.getElementById(\`dot-\${i}\`);
              if (!d) continue;
              d.className = "step-dot" + (i < cur ? " done" : i === cur ? " active" : "");
              d.querySelector(".dot").textContent = i < cur ? "✓" : String(i + 1);
            }
          }

          function go(n) {
            const prev = document.getElementById(\`block-\${cur}\`);
            if (prev) prev.classList.remove("active");
            cur = n;
            const next = document.getElementById(\`block-\${cur}\`);
            if (next) next.classList.add("active");
            updateProgress();
            updateBanner();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }

          function updateBanner() {
            const name = ((document.getElementById("f-name")?.value || "") + " " + (document.getElementById("f-surname")?.value || "")).trim();
            const inst = document.getElementById("f-institution")?.value || "";
            const el = document.getElementById("candidate-banner");
            if (!el) return;
            if (name.length > 1 && cur > 0) {
              const ini = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
              el.innerHTML = \`<div class="candidate-card"><div class="candidate-avatar">\${ini}</div><div><div class="candidate-name">\${name}</div><div class="candidate-meta">\${inst ? inst + " — " : ""}EP Portability & Business Case Assessment</div></div></div>\`;
            } else { el.innerHTML = ""; }
          }

          function toggleCheck(cb) { cb.closest(".check-item").classList.toggle("checked", cb.checked); }

          function toggleProd(cb) {
            const item = document.getElementById("prod-" + cb.value);
            const pct = document.getElementById("pct-" + cb.value);
            if (cb.checked) { item?.classList.add("active-prod"); if (pct) { pct.disabled = false; pct.focus(); } }
            else { item?.classList.remove("active-prod"); if (pct) { pct.disabled = true; pct.value = ""; } }
          }

          function selectRadio(el, group) {
            document.querySelectorAll(\`input[name="\${group}"]\`).forEach(r => r.closest(".radio-item")?.classList.remove("selected"));
            el.classList.add("selected");
          }

          function setQS(fieldId, groupId, btn, val) {
            const field = document.getElementById(fieldId);
            if (field) field.value = val;
            document.querySelectorAll(\`#\${groupId} .qs-btn\`).forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
          }

          function calcROA() {
            const aum = parseFloat(document.getElementById("f-aum")?.value) || 0;
            const rev = parseFloat(document.getElementById("f-revenue")?.value) || 0;
            const box = document.getElementById("roa-box");
            if (!box) return;
            if (aum > 0 && rev > 0) {
              const roa = Math.round((rev / aum) * 10000);
              let cls = "roa-ok", label = "Within benchmark range";
              if (roa < 50) { cls = "roa-low"; label = "Below benchmark — explain"; }
              else if (roa > 130) { cls = "roa-high"; label = "Above benchmark — verify"; }
              box.innerHTML = \`<div><div class="roa-figure">\${roa} <span style="font-size:14px;font-weight:400;color:var(--muted)">bps</span></div><div class="roa-label">Return on Assets</div></div><span class="roa-badge \${cls}">\${label}</span>\`;
            } else { box.innerHTML = \`<span style="font-size:13px;color:var(--muted)">Enter AUM and revenue above</span>\`; }
          }

          function calcBP() {
            const aum = parseFloat(document.getElementById("f-aum")?.value) || 0;
            const port = parseFloat(document.getElementById("f-portability")?.value) || 40;
            const nnm1 = parseFloat(document.getElementById("f-nnm1")?.value) || 0;
            const nnm2 = parseFloat(document.getElementById("f-nnm2")?.value) || 0;
            const nnm3 = parseFloat(document.getElementById("f-nnm3")?.value) || 0;
            const roa = parseFloat(document.getElementById("f-target-roa")?.value) || 0;
            const pv = document.getElementById("f-portability");
            if (pv) document.getElementById("portability-val").textContent = port + "%";
            const preview = document.getElementById("bp-preview");
            if (aum > 0 && roa > 0) {
              const tr = Math.round(aum * (port / 100));
              const y1 = tr + nnm1, y2 = y1 + nnm2, y3 = y2 + nnm3;
              const r1 = (y1 * (roa / 10000)).toFixed(2), r2 = (y2 * (roa / 10000)).toFixed(2), r3 = (y3 * (roa / 10000)).toFixed(2);
              const ds = Math.round(aum * (port / 100) * 0.6);
              document.getElementById("bp-grid").innerHTML = \`
                <div class="bp-cell"><div class="bp-year">Year 1</div><div class="bp-aum">CHF \${y1}M</div><div class="bp-rev">CHF \${r1}M revenue</div></div>
                <div class="bp-cell"><div class="bp-year">Year 2</div><div class="bp-aum">CHF \${y2}M</div><div class="bp-rev">CHF \${r2}M revenue</div></div>
                <div class="bp-cell"><div class="bp-year">Year 3</div><div class="bp-aum">CHF \${y3}M</div><div class="bp-rev">CHF \${r3}M revenue</div></div>\`;
              document.getElementById("bp-downside").innerHTML = \`Downside (60% portability): <strong>CHF \${ds}M transferred</strong> → Year 1 revenue CHF \${(ds * (roa / 10000)).toFixed(2)}M\`;
              if (preview) preview.style.display = "block";
            } else { if (preview) preview.style.display = "none"; }
          }

          function getProductMix() {
            const prods = ["dpm","advisory","lending","alts","structured","execution"];
            const names = {dpm:"DPM",advisory:"Advisory",lending:"Lending",alts:"PE/Alts",structured:"Structured",execution:"Execution"};
            return prods.filter(p => document.querySelector(\`input[name="products"][value="\${p}"]\`)?.checked)
              .map(p => { const pct = document.getElementById("pct-" + p)?.value; return pct ? \`\${names[p]} \${pct}%\` : names[p]; })
              .join(", ") || "not specified";
          }

          function gatherData() {
            const cb = n => Array.from(document.querySelectorAll(\`input[name="\${n}"]:checked\`)).map(c => c.value);
            const rb = n => { const r = document.querySelector(\`input[name="\${n}"]:checked\`); return r ? r.value : "not specified"; };
            const v = id => document.getElementById(id)?.value || "";
            return {
              name: (v("f-name") + " " + v("f-surname")).trim(),
              institution: v("f-institution"), tenure: v("f-tenure"), seniority: v("f-seniority"),
              market: v("f-market"), booking: v("f-booking"),
              aum: parseFloat(v("f-aum")) || 0, clients: v("f-clients"),
              concentration: v("f-concentration"), originated: v("f-originated"), domicile: v("f-domicile"),
              portability: v("f-portability"), portabilityReason: v("f-portability-reason"), priorMove: v("f-prior-move"),
              anchors: cb("anchors"), anchorPct: v("f-anchor-pct"),
              revenue: parseFloat(v("f-revenue")) || 0, recurring: v("f-recurring"), transactional: v("f-transactional"),
              coManage: v("f-co-manage"), wallet: rb("wallet"), products: getProductMix(),
              notice: v("f-notice"), garden: v("f-garden"), nonsolicit: v("f-nonsolicit"),
              compliance: v("f-compliance"), legalNotes: v("f-legal-notes"),
              kycRisk: v("f-kyc-risk"), kycFlags: cb("kyc"), onboarding: v("f-onboarding-time"),
              nnm1: parseFloat(v("f-nnm1")) || 0, nnm2: parseFloat(v("f-nnm2")) || 0, nnm3: parseFloat(v("f-nnm3")) || 0,
              targetROA: parseFloat(v("f-target-roa")) || 0, prospects: v("f-prospects"),
              bpAssumptions: v("f-bp-assumptions"), base: v("f-base"), totalComp: v("f-total-comp"),
              guarantee: v("f-guarantee"), push: v("f-push"), pull: v("f-pull"),
              competitors: v("f-competitors"), platform: rb("platform"), additional: v("f-additional")
            };
          }

          async function submitAssessment() {
            const btn = document.getElementById("submit-btn");
            if (btn) { btn.disabled = true; btn.textContent = "Submitting…"; }
            const data = gatherData();
            try {
              const res = await fetch("/api/submit-assessment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: TOKEN, data })
              });
              if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Submission failed");
              }
              // Show thank you
              document.querySelectorAll(".block").forEach(b => b.classList.remove("active"));
              document.getElementById("candidate-banner").innerHTML = "";
              document.getElementById("progress-bar").parentElement.style.display = "none";
              const ty = document.getElementById("thank-you");
              if (ty) ty.classList.add("visible");
            } catch (e) {
              alert("Submission error: " + e.message + "\n\nPlease try again or contact gil.chalem@execpartners.ch");
              if (btn) { btn.disabled = false; btn.textContent = "Submit Assessment →"; }
            }
          }

          // Slider live update
          document.addEventListener("input", e => {
            if (e.target.id === "f-portability") {
              const pv = document.getElementById("portability-val");
              if (pv) pv.textContent = e.target.value + "%";
              calcBP();
            }
          });
        })();
        `,
      }}
    />
  );
}
