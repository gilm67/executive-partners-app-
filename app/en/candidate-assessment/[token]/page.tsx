"use client";

import { useEffect, useRef } from "react";

export default function AssessmentPage({ params }: { params: { token: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const token = params.token;
    ref.current.innerHTML = getFormHTML();
    initApp(token);
  }, [params.token]);

  return (
    <div
      ref={ref}
      style={{ minHeight: "100vh", background: "#F8F6F1", fontFamily: "DM Sans, sans-serif" }}
    />
  );
}

function initApp(token: string) {
  // inject google fonts
  if (!document.getElementById("ep-fonts")) {
    const link = document.createElement("link");
    link.id = "ep-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }

  let cur = 0;
  const TOTAL = 6;
  const LABELS = ["Profile", "Book", "Revenue", "Legal", "Business Plan", "Motivation"];

  // Fetch token info and personalize the page on load
  fetch(`/api/token-info/${token}`)
    .then(res => res.ok ? res.json() : null)
    .then(info => {
      if (!info) return;
      const { candidateName, institution, mandate } = info;
      if (candidateName) {
        const parts = candidateName.trim().split(" ");
        const first = parts[0] || "";
        const last = parts.slice(1).join(" ") || "";
        const fName = document.getElementById("f-name") as HTMLInputElement;
        const fSurname = document.getElementById("f-surname") as HTMLInputElement;
        if (fName) fName.value = first;
        if (fSurname) fSurname.value = last;
      }
      if (institution) {
        const fInst = document.getElementById("f-institution") as HTMLInputElement;
        if (fInst) fInst.value = institution;
      }
      // Personalize subtitle
      const subtitle = document.querySelector(".ep-subtitle");
      if (subtitle && candidateName) {
        subtitle.innerHTML = `Prepared exclusively for <strong>${candidateName}</strong>` +
          (mandate ? ` &mdash; ${mandate}` : "") +
          (institution ? ` at ${institution}` : "");
      }
      // Show candidate banner immediately
      if (candidateName) {
        const ini = candidateName.trim().split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
        const el = document.getElementById("candidate-banner");
        if (el) {
          el.innerHTML = `<div class="candidate-card"><div class="candidate-avatar">${ini}</div><div><div class="candidate-name">${candidateName}</div><div class="candidate-meta">${institution ? institution + " &mdash; " : ""}${mandate || "EP Portability Assessment"}</div></div></div>`;
        }
      }
    })
    .catch(() => {});

  function buildProgress() {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    bar.innerHTML = LABELS.map((l, i) => `
      <div class="step-dot ${i === 0 ? "active" : ""}" id="dot-${i}">
        <div class="dot">${i + 1}</div>
        <div class="step-label">${l}</div>
      </div>`).join("");
  }

  function updateProgress() {
    for (let i = 0; i < TOTAL; i++) {
      const d = document.getElementById(`dot-${i}`);
      if (!d) continue;
      d.className = "step-dot" + (i < cur ? " done" : i === cur ? " active" : "");
      const dot = d.querySelector(".dot");
      if (dot) dot.textContent = i < cur ? "✓" : String(i + 1);
    }
  }

  function go(n: number) {
    document.getElementById(`block-${cur}`)?.classList.remove("active");
    cur = n;
    document.getElementById(`block-${cur}`)?.classList.add("active");
    updateProgress();
    updateBanner();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateBanner() {
    const name = ((document.getElementById("f-name") as HTMLInputElement)?.value || "") + " " +
      ((document.getElementById("f-surname") as HTMLInputElement)?.value || "");
    const inst = (document.getElementById("f-institution") as HTMLInputElement)?.value || "";
    const el = document.getElementById("candidate-banner");
    if (!el) return;
    const trimmed = name.trim();
    if (trimmed.length > 1 && cur > 0) {
      const ini = trimmed.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
      el.innerHTML = `<div class="candidate-card"><div class="candidate-avatar">${ini}</div><div><div class="candidate-name">${trimmed}</div><div class="candidate-meta">${inst ? inst + " — " : ""}EP Portability Assessment</div></div></div>`;
    } else { el.innerHTML = ""; }
  }

  function toggleCheck(cb: HTMLInputElement) {
    cb.closest(".check-item")?.classList.toggle("checked", cb.checked);
  }

  function toggleProd(cb: HTMLInputElement) {
    const item = document.getElementById("prod-" + cb.value);
    const pct = document.getElementById("pct-" + cb.value) as HTMLInputElement;
    if (cb.checked) { item?.classList.add("active-prod"); if (pct) { pct.disabled = false; pct.focus(); } }
    else { item?.classList.remove("active-prod"); if (pct) { pct.disabled = true; pct.value = ""; } }
  }

  function selectRadio(el: HTMLElement, group: string) {
    document.querySelectorAll(`input[name="${group}"]`).forEach(r => r.closest(".radio-item")?.classList.remove("selected"));
    el.classList.add("selected");
  }

  function setQS(fieldId: string, groupId: string, btn: HTMLElement, val: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field) field.value = val;
    document.querySelectorAll(`#${groupId} .qs-btn`).forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  function calcROA() {
    const aum = parseFloat((document.getElementById("f-aum") as HTMLInputElement)?.value) || 0;
    const rev = parseFloat((document.getElementById("f-revenue") as HTMLInputElement)?.value) || 0;
    const box = document.getElementById("roa-box");
    if (!box) return;
    if (aum > 0 && rev > 0) {
      const roa = Math.round((rev / aum) * 10000);
      let cls = "roa-ok", label = "Within benchmark range";
      if (roa < 50) { cls = "roa-low"; label = "Below benchmark"; }
      else if (roa > 130) { cls = "roa-high"; label = "Above benchmark"; }
      box.innerHTML = `<div><div class="roa-figure">${roa} <span style="font-size:14px;font-weight:400;color:#6B6B7A">bps</span></div><div class="roa-label">Return on Assets</div></div><span class="roa-badge ${cls}">${label}</span>`;
    } else { box.innerHTML = `<span style="font-size:13px;color:#6B6B7A">Enter AUM and revenue above</span>`; }
  }

  function calcBP() {
    const aum = parseFloat((document.getElementById("f-aum") as HTMLInputElement)?.value) || 0;
    const port = parseFloat((document.getElementById("f-portability") as HTMLInputElement)?.value) || 40;
    const nnm1 = parseFloat((document.getElementById("f-nnm1") as HTMLInputElement)?.value) || 0;
    const nnm2 = parseFloat((document.getElementById("f-nnm2") as HTMLInputElement)?.value) || 0;
    const nnm3 = parseFloat((document.getElementById("f-nnm3") as HTMLInputElement)?.value) || 0;
    const roa = parseFloat((document.getElementById("f-target-roa") as HTMLInputElement)?.value) || 0;
    const pv = document.getElementById("portability-val");
    if (pv) pv.textContent = port + "%";
    const preview = document.getElementById("bp-preview");
    if (aum > 0 && roa > 0) {
      const tr = Math.round(aum * (port / 100));
      const y1 = tr + nnm1, y2 = y1 + nnm2, y3 = y2 + nnm3;
      const r1 = (y1 * (roa / 10000)).toFixed(2), r2 = (y2 * (roa / 10000)).toFixed(2), r3 = (y3 * (roa / 10000)).toFixed(2);
      const ds = Math.round(aum * (port / 100) * 0.6);
      const grid = document.getElementById("bp-grid");
      const downside = document.getElementById("bp-downside");
      if (grid) grid.innerHTML = `
        <div class="bp-cell"><div class="bp-year">Year 1</div><div class="bp-aum">CHF ${y1}M</div><div class="bp-rev">CHF ${r1}M revenue</div></div>
        <div class="bp-cell"><div class="bp-year">Year 2</div><div class="bp-aum">CHF ${y2}M</div><div class="bp-rev">CHF ${r2}M revenue</div></div>
        <div class="bp-cell"><div class="bp-year">Year 3</div><div class="bp-aum">CHF ${y3}M</div><div class="bp-rev">CHF ${r3}M revenue</div></div>`;
      if (downside) downside.innerHTML = `Downside (60%): <strong>CHF ${ds}M transferred</strong> → Year 1 revenue CHF ${(ds * (roa / 10000)).toFixed(2)}M`;
      if (preview) preview.style.display = "block";
    } else { if (preview) preview.style.display = "none"; }
  }

  function getProductMix() {
    const prods = ["dpm", "advisory", "lending", "alts", "structured", "execution"];
    const names: Record<string, string> = { dpm: "DPM", advisory: "Advisory", lending: "Lending", alts: "PE/Alts", structured: "Structured", execution: "Execution" };
    return prods.filter(p => (document.querySelector(`input[name="products"][value="${p}"]`) as HTMLInputElement)?.checked)
      .map(p => { const pct = (document.getElementById("pct-" + p) as HTMLInputElement)?.value; return pct ? `${names[p]} ${pct}%` : names[p]; })
      .join(", ") || "not specified";
  }

  function v(id: string) { return (document.getElementById(id) as HTMLInputElement)?.value || ""; }
  function cb(name: string) { return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((c: Element) => (c as HTMLInputElement).value); }
  function rb(name: string) { const r = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement; return r ? r.value : "not specified"; }

  function gatherData() {
    return {
      name: (v("f-name") + " " + v("f-surname")).trim(),
      email: v("f-email"),
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
    if ((window as any).__epSubmitting) return;
    (window as any).__epSubmitting = true;
    const btn = document.getElementById("submit-btn") as HTMLButtonElement;
    if (btn) { btn.disabled = true; btn.textContent = "Submitting…"; }
    const data = gatherData();
    try {
      const res = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data })
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || "Submission failed"); }
      document.querySelectorAll(".block").forEach(b => b.classList.remove("active"));
      const banner = document.getElementById("candidate-banner");
      if (banner) banner.innerHTML = "";
      const pw = document.getElementById("progress-bar")?.parentElement;
      if (pw) pw.style.display = "none";
      const ty = document.getElementById("thank-you");
      if (ty) ty.classList.add("visible");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      alert("Submission error: " + msg + "\n\nPlease try again or contact gil.chalem@execpartners.ch");
      if (btn) { btn.disabled = false; btn.textContent = "Submit Assessment →"; }
      (window as any).__epSubmitting = false;
    }
  }

  // Wire up global event handlers
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.id === "btn-go-1") go(1);
    else if (target.id === "btn-go-0") go(0);
    else if (target.id === "btn-go-2") go(2);
    else if (target.id === "btn-go-1b") go(1);
    else if (target.id === "btn-go-3") go(3);
    else if (target.id === "btn-go-2b") go(2);
    else if (target.id === "btn-go-4") go(4);
    else if (target.id === "btn-go-3b") go(3);
    else if (target.id === "btn-go-5") go(5);
    else if (target.id === "btn-go-4b") go(4);
    else if (target.id === "btn-submit") submitAssessment();
    else if (target.classList.contains("qs-btn")) {
      const fieldId = target.getAttribute("data-field") || "";
      const groupId = target.getAttribute("data-group") || "";
      const val = target.getAttribute("data-val") || "";
      setQS(fieldId, groupId, target, val);
      if (fieldId === "f-target-roa") calcBP();
    } else if (target.classList.contains("radio-item") || target.closest(".radio-item")) {
      const item = (target.classList.contains("radio-item") ? target : target.closest(".radio-item")) as HTMLElement;
      const radio = item.querySelector("input[type=radio]") as HTMLInputElement;
      if (radio) { radio.checked = true; selectRadio(item, radio.name); }
    }
  });

  document.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "anchors" || target.name === "kyc") toggleCheck(target);
    else if (target.name === "products") toggleProd(target);
  });

  document.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.id === "f-aum" || target.id === "f-revenue") { calcROA(); calcBP(); }
    else if (target.id === "f-portability") { const pv = document.getElementById("portability-val"); if (pv) pv.textContent = target.value + "%"; calcBP(); }
    else if (["f-nnm1", "f-nnm2", "f-nnm3", "f-target-roa"].includes(target.id)) calcBP();
    else if (target.id === "f-name" || target.id === "f-surname" || target.id === "f-institution") updateBanner();
  });

  buildProgress();
}

function getFormHTML(): string {
  return `<style>
:root{--navy:#0B0F1A;--gold:#C9A84C;--gold-light:#F5EDD6;--gold-mid:#E8D5A3;--bg:#F8F6F1;--surface:#FFFFFF;--surface2:#F2EFE8;--text:#1A1A2E;--muted:#6B6B7A;--border:#DDD8CC;--red:#C62828;--green:#2E7D32;--amber:#E65100}
*{margin:0;padding:0;box-sizing:border-box}
#ep-app{max-width:780px;margin:0 auto;padding:24px 20px 80px;font-family:"DM Sans",sans-serif}
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
.thank-you{text-align:center;padding:80px 20px;display:none}
.thank-you.visible{display:block}
.thank-you-icon{width:64px;height:64px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:#fff}
.thank-you h2{font-family:"Cormorant Garamond",serif;font-size:30px;color:var(--navy);margin-bottom:10px}
.thank-you p{font-size:14px;color:var(--muted);max-width:400px;margin:0 auto;line-height:1.7}
@media(max-width:560px){.field-row,.field-row.thirds{grid-template-columns:1fr}.product-grid{grid-template-columns:1fr}.bp-grid{grid-template-columns:1fr}}
</style>

<div id="ep-app">
<div class="ep-header">
  <div class="ep-logo">Executive Partners</div>
  <div class="ep-title">AUM Portability &amp;<br>Business Case Assessment</div>
  <div class="ep-subtitle">A confidential evaluation prepared exclusively for your EP mandate process</div>
</div>
<div class="intro-panel"><p>This assessment takes approximately <strong>15&#8211;20 minutes</strong>. Your answers are processed confidentially. Be as specific as possible.<br><br><strong>Important:</strong> Do not share client names. Use descriptive references (e.g. "Swiss family office, CHF 45M, Geneva") throughout.</p></div>
<div class="progress-wrap"><div class="progress-bar" id="progress-bar"></div></div>
<div id="candidate-banner"></div>

<div class="block active" id="block-0">
  <div class="block-header"><div class="block-tag">Introduction</div><div class="block-title">Candidate Profile</div><div class="block-purpose">Basic information to personalise your analysis and calibrate benchmarks.</div></div>
  <div class="q-card">
    <div class="field-row"><div class="field-group"><label>First name *</label><input type="text" id="f-name" placeholder="First name"></div><div class="field-group"><label>Last name *</label><input type="text" id="f-surname" placeholder="Last name"></div></div>
    <div class="field-row"><div class="field-group"><label>Email address *</label><input type="text" id="f-email" placeholder="you@example.com"></div><div></div></div>
    <div class="field-row"><div class="field-group"><label>Current institution *</label><input type="text" id="f-institution" placeholder="e.g. Julius Baer, UBS, Pictet"></div><div class="field-group"><label>Years at current institution *</label><input type="number" id="f-tenure" placeholder="e.g. 7" min="0" max="45"></div></div>
    <div class="field-row">
      <div class="field-group"><label>Seniority level</label><select id="f-seniority"><option value="">Select</option><option>Associate Director</option><option>Director</option><option>Executive Director</option><option>Managing Director</option><option>Team Head / Market Head</option><option>Other senior RM</option></select></div>
      <div class="field-group"><label>Primary market coverage *</label><input type="text" id="f-market" placeholder="e.g. Italian offshore, LATAM, Swiss HNW"></div>
    </div>
    <div class="field-group"><label>Current booking centre(s)</label><input type="text" id="f-booking" placeholder="e.g. Geneva, Zurich, Dubai"></div>
  </div>
  <div class="nav-bar"><div></div><button class="btn btn-primary" id="btn-go-1">Continue &#8594;</button></div>
</div>

<div class="block" id="block-1">
  <div class="block-header"><div class="block-tag">Block 1 of 5</div><div class="block-title">AUM Composition &amp; Book Structure</div><div class="block-purpose">The foundation. We rebuild your book from the ground up.</div></div>
  <div class="q-card">
    <div class="flag-badge flag-red">&#9888; Critical input</div>
    <div class="q-label">Q1 &#8212; Book Size &amp; Structure</div>
    <div class="q-text">What is the total AUM of your book, and how is it structured?</div>
    <div class="q-hint"><strong>Enter AUM in CHF millions.</strong> Type 280 for CHF 280 million. Concentration matters more than the headline number.</div>
    <div class="field-row">
      <div class="field-group"><label>Total AUM (CHF millions) *</label><div class="input-with-unit"><input type="number" id="f-aum" placeholder="e.g. 280" min="0"><span class="unit-badge">CHF millions</span></div></div>
      <div class="field-group"><label>Number of active client relationships *</label><input type="number" id="f-clients" placeholder="e.g. 35" min="1"></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Largest single relationship (% of AUM, max 99%)</label><input type="number" id="f-concentration" placeholder="e.g. 18" min="0" max="99"></div>
      <div class="field-group"><label>% of AUM self-originated</label>
        <div class="quick-select" id="qs-originated">
          <button class="qs-btn" data-field="f-originated" data-group="qs-originated" data-val="25">25%</button>
          <button class="qs-btn" data-field="f-originated" data-group="qs-originated" data-val="50">50%</button>
          <button class="qs-btn" data-field="f-originated" data-group="qs-originated" data-val="75">75%</button>
          <button class="qs-btn" data-field="f-originated" data-group="qs-originated" data-val="90">90%</button>
          <button class="qs-btn" data-field="f-originated" data-group="qs-originated" data-val="100">100%</button>
        </div>
        <input type="number" id="f-originated" placeholder="Or enter % manually" min="0" max="100">
      </div>
    </div>
    <div class="field-group"><label>Client domicile distribution</label><textarea id="f-domicile" placeholder="e.g. 60% French residents, 25% Swiss, 15% Italian cross-border"></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q2 &#8212; Portability Estimate</div>
    <div class="q-text">What % of your AUM do you honestly expect to transfer within 12 months?</div>
    <div class="q-hint"><strong>EP baseline: 40%.</strong> Be honest &#8212; optimistic inputs produce misleading outputs.</div>
    <div class="slider-wrap">
      <div class="slider-row"><input type="range" id="f-portability" min="0" max="100" value="40" step="5"><div class="slider-val" id="portability-val">40%</div></div>
      <div class="slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
      <div class="slider-marker"><span>&#8593; EP baseline at 40%</span></div>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Main reason for your estimate</label><textarea id="f-portability-reason" placeholder="e.g. Spoken with top 8 clients. 6 confirmed intention to follow."></textarea></div>
    <div class="field-group"><label>Have you moved before? If yes &#8212; what % followed and over what timeframe?</label><input type="text" id="f-prior-move" placeholder="e.g. Yes &#8212; moved from CS in 2019, ~55% within 18 months  /  No prior move"></div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-amber">~ Probe carefully</div>
    <div class="q-label">Q3 &#8212; Institutional Anchors</div>
    <div class="q-text">Which clients have services anchored at your current institution beyond your personal relationship?</div>
    <div class="q-hint"><strong>Tick all that apply.</strong> Clients with lending or trust structures are less likely to move regardless of personal loyalty.</div>
    <div class="checklist">
      <label class="check-item"><input type="checkbox" name="anchors" value="lending"> <span>Lending / Lombard credit facilities</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="trust"> <span>Trust or fiduciary structures held at the bank</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="custody"> <span>Long-standing custody / safe deposit arrangements</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="multigenerational"> <span>Multi-generational family relationships with the institution</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="multi-contact"> <span>Clients with contacts in other departments</span></label>
      <label class="check-item"><input type="checkbox" name="anchors" value="eam"> <span>Assets via external asset managers (&gt;25% of AUM)</span></label>
    </div>
    <div class="field-group" style="margin-top:12px"><label>Estimated % of AUM affected by anchors</label>
      <div class="quick-select" id="qs-anchor">
        <button class="qs-btn" data-field="f-anchor-pct" data-group="qs-anchor" data-val="0">None</button>
        <button class="qs-btn" data-field="f-anchor-pct" data-group="qs-anchor" data-val="10">~10%</button>
        <button class="qs-btn" data-field="f-anchor-pct" data-group="qs-anchor" data-val="25">~25%</button>
        <button class="qs-btn" data-field="f-anchor-pct" data-group="qs-anchor" data-val="40">~40%</button>
        <button class="qs-btn" data-field="f-anchor-pct" data-group="qs-anchor" data-val="60">~60%</button>
      </div>
      <input type="number" id="f-anchor-pct" placeholder="Or enter % manually" min="0" max="100">
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" id="btn-go-0">&#8592; Previous</button><button class="btn btn-primary" id="btn-go-2">Continue &#8594;</button></div>
</div>

<div class="block" id="block-2">
  <div class="block-header"><div class="block-tag">Block 2 of 5</div><div class="block-title">Revenue Quality &amp; Wallet Share</div><div class="block-purpose">AUM size alone is incomplete. Revenue and margin quality define the real value of the hire.</div></div>
  <div class="q-card">
    <div class="flag-badge flag-red">&#9888; Critical input</div>
    <div class="q-label">Q4 &#8212; Revenue Production</div>
    <div class="q-text">What is your annual revenue production and how does it break down?</div>
    <div class="q-hint"><strong>Enter revenue in CHF millions</strong> &#8212; the same unit as AUM. Example: type 2.8 for CHF 2.8 million per year.<br><br><strong>Benchmarks:</strong> Swiss onshore 65&#8211;90 bps. International 90&#8211;130 bps. Below 50 bps requires explanation.</div>
    <div class="field-row">
      <div class="field-group"><label>Annual revenue (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-revenue" placeholder="e.g. 2.8" min="0" step="0.1"><span class="unit-badge">CHF millions</span></div></div>
      <div class="field-group"><label>Implied ROA &#8212; auto-calculated</label><div class="roa-box" id="roa-box"><span style="font-size:13px;color:#6B6B7A">Enter AUM and revenue above</span></div></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>% recurring revenue</label>
        <div class="quick-select" id="qs-recurring">
          <button class="qs-btn" data-field="f-recurring" data-group="qs-recurring" data-val="20">20%</button>
          <button class="qs-btn" data-field="f-recurring" data-group="qs-recurring" data-val="40">40%</button>
          <button class="qs-btn" data-field="f-recurring" data-group="qs-recurring" data-val="60">60%</button>
          <button class="qs-btn" data-field="f-recurring" data-group="qs-recurring" data-val="80">80%</button>
        </div>
        <input type="number" id="f-recurring" placeholder="% recurring" min="0" max="100">
      </div>
      <div class="field-group"><label>% transactional revenue</label>
        <div class="quick-select" id="qs-transactional">
          <button class="qs-btn" data-field="f-transactional" data-group="qs-transactional" data-val="20">20%</button>
          <button class="qs-btn" data-field="f-transactional" data-group="qs-transactional" data-val="40">40%</button>
          <button class="qs-btn" data-field="f-transactional" data-group="qs-transactional" data-val="60">60%</button>
          <button class="qs-btn" data-field="f-transactional" data-group="qs-transactional" data-val="80">80%</button>
        </div>
        <input type="number" id="f-transactional" placeholder="% transactional" min="0" max="100">
      </div>
    </div>
    <div class="field-group"><label>Co-management note</label><textarea id="f-co-manage" placeholder="e.g. Personal book, no co-management.  /  Co-manage 3 relationships with Fixed Income, 70/30 split, CHF 45M combined."></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q5 &#8212; Wallet Share &amp; Product Mix</div>
    <div class="q-text">How much of your clients&#39; total wealth are you managing, and what products make up your book?</div>
    <div class="q-hint">Managing 100% of a client&#39;s CHF 20M is a deeper relationship than managing 15% of a CHF 200M portfolio.</div>
    <div class="radio-group">
      <label class="radio-item"><input type="radio" name="wallet" value="high"> <span>High &#8212; I manage the majority (&gt;60%) of most clients&#39; total investable wealth</span></label>
      <label class="radio-item"><input type="radio" name="wallet" value="mid"> <span>Medium &#8212; I manage 30&#8211;60% of most clients&#39; total wealth</span></label>
      <label class="radio-item"><input type="radio" name="wallet" value="low"> <span>Low &#8212; less than 30%; significant share remains elsewhere</span></label>
      <label class="radio-item"><input type="radio" name="wallet" value="unknown"> <span>Unknown &#8212; I do not have full visibility into clients&#39; total wealth</span></label>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Product mix &#8212; tick each product and enter approximate % of AUM</label>
      <div class="product-grid">
        <div class="product-item" id="prod-dpm"><input type="checkbox" name="products" value="dpm"><span class="prod-name">Discretionary (DPM)</span><input type="number" class="prod-pct" placeholder="%" id="pct-dpm" disabled></div>
        <div class="product-item" id="prod-advisory"><input type="checkbox" name="products" value="advisory"><span class="prod-name">Advisory mandates</span><input type="number" class="prod-pct" placeholder="%" id="pct-advisory" disabled></div>
        <div class="product-item" id="prod-lending"><input type="checkbox" name="products" value="lending"><span class="prod-name">Lombard / lending</span><input type="number" class="prod-pct" placeholder="%" id="pct-lending" disabled></div>
        <div class="product-item" id="prod-alts"><input type="checkbox" name="products" value="alts"><span class="prod-name">Private equity / alts</span><input type="number" class="prod-pct" placeholder="%" id="pct-alts" disabled></div>
        <div class="product-item" id="prod-structured"><input type="checkbox" name="products" value="structured"><span class="prod-name">Structured products</span><input type="number" class="prod-pct" placeholder="%" id="pct-structured" disabled></div>
        <div class="product-item" id="prod-execution"><input type="checkbox" name="products" value="execution"><span class="prod-name">Execution / custody</span><input type="number" class="prod-pct" placeholder="%" id="pct-execution" disabled></div>
      </div>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" id="btn-go-1b">&#8592; Previous</button><button class="btn btn-primary" id="btn-go-3">Continue &#8594;</button></div>
</div>

<div class="block" id="block-3">
  <div class="block-header"><div class="block-tag">Block 3 of 5</div><div class="block-title">Legal Constraints &amp; Compliance Position</div><div class="block-purpose">Legal friction is the most underestimated portability killer.</div></div>
  <div class="q-card">
    <div class="flag-badge flag-red">&#9888; Disqualifier risk</div>
    <div class="q-label">Q6 &#8212; Notice, Garden Leave &amp; Non-Solicitation</div>
    <div class="q-text">What are your current contractual constraints on departure and client contact?</div>
    <div class="q-hint"><strong>Why this matters:</strong> Garden leave directly reduces your transfer window. 3m notice + 3m garden leave = first client contact at month 6.</div>
    <div class="field-row">
      <div class="field-group"><label>Notice period (months)</label>
        <div class="quick-select" id="qs-notice">
          <button class="qs-btn" data-field="f-notice" data-group="qs-notice" data-val="1">1m</button>
          <button class="qs-btn" data-field="f-notice" data-group="qs-notice" data-val="2">2m</button>
          <button class="qs-btn" data-field="f-notice" data-group="qs-notice" data-val="3">3m</button>
          <button class="qs-btn" data-field="f-notice" data-group="qs-notice" data-val="6">6m</button>
          <button class="qs-btn" data-field="f-notice" data-group="qs-notice" data-val="12">12m</button>
        </div>
        <input type="number" id="f-notice" placeholder="Or enter manually" min="0" max="24">
      </div>
      <div class="field-group"><label>Garden leave if enforced (months)</label>
        <div class="quick-select" id="qs-garden">
          <button class="qs-btn" data-field="f-garden" data-group="qs-garden" data-val="0">None</button>
          <button class="qs-btn" data-field="f-garden" data-group="qs-garden" data-val="1">1m</button>
          <button class="qs-btn" data-field="f-garden" data-group="qs-garden" data-val="3">3m</button>
          <button class="qs-btn" data-field="f-garden" data-group="qs-garden" data-val="6">6m</button>
        </div>
        <input type="number" id="f-garden" placeholder="Or enter manually" min="0" max="12">
      </div>
    </div>
    <div class="field-group"><label>Non-solicitation clause</label>
      <select id="f-nonsolicit"><option value="none">No non-solicitation clause</option><option value="expired">Was present but has expired</option><option value="short">Up to 12 months</option><option value="medium">12&#8211;24 months</option><option value="long">Over 24 months</option><option value="unknown">Exists &#8212; scope under legal review</option></select>
    </div>
    <div class="field-group"><label>Compliance and regulatory record</label>
      <select id="f-compliance"><option value="none">Clean &#8212; no disciplinary matters</option><option value="minor">Minor matter, fully resolved</option><option value="pending">Pending matter &#8212; details below</option></select>
    </div>
    <div class="field-group"><label>Additional legal notes (optional)</label><textarea id="f-legal-notes" placeholder="e.g. Reviewed with a lawyer &#8212; non-solicit covers current clients only for 12 months from departure"></textarea></div>
  </div>
  <div class="q-card">
    <div class="flag-badge flag-red">&#9888; Disqualifier risk</div>
    <div class="q-label">Q7 &#8212; Client Onboarding Risk</div>
    <div class="q-text">Do any clients present KYC or onboarding complexity at a new institution?</div>
    <div class="q-hint"><strong>Why this matters:</strong> A client who cleared KYC at your current bank may not clear it elsewhere. Standards have tightened since 2022.</div>
    <div class="field-group"><label>Estimated % of AUM with potential onboarding complexity</label>
      <div class="quick-select" id="qs-kyc">
        <button class="qs-btn" data-field="f-kyc-risk" data-group="qs-kyc" data-val="0">None</button>
        <button class="qs-btn" data-field="f-kyc-risk" data-group="qs-kyc" data-val="10">~10%</button>
        <button class="qs-btn" data-field="f-kyc-risk" data-group="qs-kyc" data-val="20">~20%</button>
        <button class="qs-btn" data-field="f-kyc-risk" data-group="qs-kyc" data-val="35">~35%</button>
        <button class="qs-btn" data-field="f-kyc-risk" data-group="qs-kyc" data-val="50">~50%+</button>
      </div>
      <input type="number" id="f-kyc-risk" placeholder="Or enter % manually" min="0" max="100">
    </div>
    <div class="checklist" style="margin-top:8px">
      <label class="check-item"><input type="checkbox" name="kyc" value="pep"> <span>Politically exposed persons (PEP) or PEP-adjacent</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="complex-sow"> <span>Complex source-of-wealth (business proceeds, real estate, inheritance)</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="offshore"> <span>Clients in higher-risk or restricted jurisdictions</span></label>
      <label class="check-item"><input type="checkbox" name="kyc" value="eam"> <span>Assets via external asset managers requiring intermediary onboarding</span></label>
    </div>
    <div class="field-group" style="margin-top:12px"><label>Realistic onboarding timeline for top 10 clients</label>
      <select id="f-onboarding-time"><option value="fast">Under 60 days &#8212; straightforward profiles</option><option value="medium">60&#8211;120 days &#8212; some complexity</option><option value="slow">120&#8211;180 days &#8212; significant EDD likely</option><option value="uncertain">Uncertain &#8212; not fully assessed</option></select>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" id="btn-go-2b">&#8592; Previous</button><button class="btn btn-primary" id="btn-go-4">Continue &#8594;</button></div>
</div>

<div class="block" id="block-4">
  <div class="block-header"><div class="block-tag">Block 4 of 5</div><div class="block-title">Business Plan &amp; Revenue Trajectory</div><div class="block-purpose">Model the economics as a hiring committee would. Every assumption must survive a downside scenario.</div></div>
  <div class="q-card">
    <div class="q-label">Q8 &#8212; Three-Year AUM &amp; Revenue Build</div>
    <div class="q-text">What is your projected NNM and AUM trajectory over three years?</div>
    <div class="q-hint"><strong>Enter NNM in CHF millions per year.</strong> The model calculates cumulative AUM and applies your target ROA to get annual revenue.<br><br><strong>Realistic guidance:</strong> Year 1 typically 30&#8211;50% of transferred book. Year 2 slows. Year 3 reflects new business. Be conservative.</div>
    <div class="field-row thirds">
      <div class="field-group"><label>Year 1 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm1" placeholder="e.g. 90" min="0"><span class="unit-badge">CHF M</span></div></div>
      <div class="field-group"><label>Year 2 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm2" placeholder="e.g. 45" min="0"><span class="unit-badge">CHF M</span></div></div>
      <div class="field-group"><label>Year 3 NNM (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-nnm3" placeholder="e.g. 30" min="0"><span class="unit-badge">CHF M</span></div></div>
    </div>
    <div class="field-row">
      <div class="field-group"><label>Target ROA at new institution (basis points)</label>
        <div class="quick-select" id="qs-roa">
          <button class="qs-btn" data-field="f-target-roa" data-group="qs-roa" data-val="65">65 bps</button>
          <button class="qs-btn" data-field="f-target-roa" data-group="qs-roa" data-val="80">80 bps</button>
          <button class="qs-btn" data-field="f-target-roa" data-group="qs-roa" data-val="100">100 bps</button>
          <button class="qs-btn" data-field="f-target-roa" data-group="qs-roa" data-val="120">120 bps</button>
        </div>
        <input type="number" id="f-target-roa" placeholder="e.g. 80" min="0" max="300">
      </div>
      <div class="field-group"><label>New prospect pipeline by Year 3 (CHF millions)</label><div class="input-with-unit"><input type="number" id="f-prospects" placeholder="e.g. 40" min="0"><span class="unit-badge">CHF M</span></div></div>
    </div>
    <div class="bp-preview" id="bp-preview">
      <div class="bp-preview-title">Business Plan Preview &#8212; Cumulative AUM Model</div>
      <div class="bp-grid" id="bp-grid"></div>
      <div class="bp-divider"></div>
      <div class="bp-downside" id="bp-downside"></div>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Key assumptions and risks</label><textarea id="f-bp-assumptions" placeholder="e.g. Year 1 NNM assumes 45% of current book transfers by month 12. Main risk: 2 large clients in succession planning may delay to Year 2."></textarea></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q9 &#8212; Compensation Expectations</div>
    <div class="q-text">What compensation structure are you expecting?</div>
    <div class="q-hint"><strong>EP rule:</strong> The hire must break even within 36 months in the base scenario. Enter base salary and total Year 1 comp in CHF thousands (e.g. 280 for CHF 280,000).</div>
    <div class="field-row">
      <div class="field-group"><label>Expected base salary (CHF thousands / year)</label><div class="input-with-unit"><input type="number" id="f-base" placeholder="e.g. 280" min="0"><span class="unit-badge">CHF 000s</span></div></div>
      <div class="field-group"><label>Expected total comp Year 1 (CHF thousands)</label><div class="input-with-unit"><input type="number" id="f-total-comp" placeholder="e.g. 420" min="0"><span class="unit-badge">CHF 000s</span></div></div>
    </div>
    <div class="field-group"><label>Year 1 guarantee expectation</label>
      <select id="f-guarantee"><option value="no">No guarantee &#8212; willing to be assessed on transferred book</option><option value="partial">Partial guarantee &#8212; cover transition risk (3&#8211;6 months)</option><option value="full">Full Year 1 guarantee requested</option></select>
    </div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" id="btn-go-3b">&#8592; Previous</button><button class="btn btn-primary" id="btn-go-5">Continue &#8594;</button></div>
</div>

<div class="block" id="block-5">
  <div class="block-header"><div class="block-tag">Block 5 of 5</div><div class="block-title">Motivation &amp; Platform Fit</div><div class="block-purpose">A strong book with weak motivation is a retention risk.</div></div>
  <div class="q-card">
    <div class="q-label">Q10 &#8212; Primary Motivation</div>
    <div class="q-text">What is driving your decision to move now, and why this institution specifically?</div>
    <div class="q-hint"><strong>Push vs pull:</strong> Push-only motivation correlates with shorter tenure at the new institution.</div>
    <div class="field-group"><label>Push factors &#8212; what has changed at your current institution?</label><textarea id="f-push" placeholder="e.g. Change in management, reduction in product shelf, shift in risk appetite, compensation ceiling"></textarea></div>
    <div class="field-group"><label>Pull factors &#8212; what does the target platform offer that your current one does not?</label><textarea id="f-pull" placeholder="e.g. Stronger alternatives shelf, better booking infrastructure, more entrepreneurial culture"></textarea></div>
    <div class="field-group"><label>Where else are you currently in conversation?</label><input type="text" id="f-competitors" placeholder="e.g. Early conversation with Lombard Odier. Nothing advanced.  /  This is the only active conversation."></div>
  </div>
  <div class="q-card">
    <div class="q-label">Q11 &#8212; Platform Knowledge &amp; Additional Context</div>
    <div class="q-text">How well do you know the target institution&#39;s infrastructure and product shelf?</div>
    <div class="q-hint">Candidates who have not investigated the platform often discover mismatches post-hire.</div>
    <div class="radio-group">
      <label class="radio-item"><input type="radio" name="platform" value="strong"> <span>Strong &#8212; spoken with people inside, clear view of product shelf and culture</span></label>
      <label class="radio-item"><input type="radio" name="platform" value="moderate"> <span>Moderate &#8212; know from market reputation, had initial conversations</span></label>
      <label class="radio-item"><input type="radio" name="platform" value="limited"> <span>Limited &#8212; early stage, not yet investigated in depth</span></label>
    </div>
    <div class="field-group" style="margin-top:14px"><label>Any additional context not captured above</label><textarea id="f-additional" placeholder="e.g. Strong referral network in the Franco-Swiss frontalier market not reflected in current AUM"></textarea></div>
  </div>
  <div class="nav-bar"><button class="btn btn-ghost" id="btn-go-4b">&#8592; Previous</button><button class="btn btn-submit" id="btn-submit">Submit Assessment &#8594;</button></div>
</div>

<div class="thank-you" id="thank-you">
  <div class="thank-you-icon">&#10003;</div>
  <h2>Assessment submitted</h2>
  <p>Thank you. Your assessment has been received and is being processed confidentially. A copy of your responses has been sent to the email address you provided for your own records.</p>
  <p style="margin-top:14px">Your information is treated as strictly confidential and shared only with Gil M. Chalem. Gil will be in touch within 24 hours to discuss the analysis and next steps.</p>
</div>
</div>`;
}
