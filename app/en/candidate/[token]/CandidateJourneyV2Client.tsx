'use client';

import { useState, useMemo, useEffect } from 'react';

const MARKETS = ["CH Onshore","French Market","Italian Market","UK","UAE","Singapore","Hong Kong","LATAM","Israel","Turkey","Nordics","CEE","Other"];
const TENURE_OPTIONS = [
  {key:"lt1",label:"< 1 year",mult:0.80},{key:"1to2",label:"1–2 yrs",mult:0.88},
  {key:"2to4",label:"2–4 yrs",mult:0.96},{key:"4to8",label:"4–8 yrs",mult:1.00},
  {key:"8to12",label:"8–12 yrs",mult:1.04},{key:"gt12",label:"> 12 yrs",mult:1.08},
];
const WALLET_OPTIONS = [
  {label:"< 15%",score:1,mult:0.88},{label:"15–35%",score:2,mult:0.94},
  {label:"35–50%",score:3,mult:1.00},{label:"50–70%",score:4,mult:1.06},{label:"> 70%",score:5,mult:1.12},
];
const BOOKING_CENTRES = ["Geneva","Zurich","Lugano","London","Luxembourg","Monaco","Dubai (DIFC)","Abu Dhabi (ADGM)","Singapore","Hong Kong","New York","Miami"];
const PERMISSIONS = ["FINMA outbound (CH)","FCA (UK)","DFSA / FSRA (UAE)","MAS (Singapore)","SFC (Hong Kong)","MiFID / EU passport"];
const JURISDICTION_DATA: Record<string,{base:number;label:string}> = {
  swiss:{base:72,label:"Switzerland"},uk:{base:58,label:"United Kingdom"},
  eu:{base:65,label:"EU / Luxembourg"},uae:{base:70,label:"UAE (DIFC/ADGM)"},
  singapore:{base:70,label:"Singapore"},other:{base:62,label:"Other"},
};
const GARDEN_LEAVE_OPTS = [
  {key:"none",label:"No clause",mod:12,months:0},{key:"1mo",label:"1 month",mod:8,months:1},
  {key:"2mo",label:"2 months",mod:2,months:2},{key:"3mo",label:"3 months",mod:-5,months:3},
  {key:"6mo",label:"6 months",mod:-14,months:6},{key:"6plus",label:"6+ months",mod:-22,months:9},
];
const INSTITUTION_TYPES = [
  {key:"tier1_swiss",label:"Tier-1 Swiss bank",note:"UBS, Julius Baer, Pictet, Lombard Odier",mult:1.65},
  {key:"international",label:"International platform",note:"HSBC, BNP, Citi, Deutsche WM",mult:1.70},
  {key:"boutique",label:"Swiss boutique / family office",note:"Bergos, Maerki Baumann, VP Bank",mult:1.45},
  {key:"eam",label:"EAM / External Asset Manager",note:"Revenue-share model",mult:1.30},
];
const PUSH_OPTIONS = [
  "Management or ownership change","Reduction in product shelf",
  "Shift in risk appetite / compliance","Compensation ceiling or structural change",
  "Strategic repositioning — exiting my segment","Post-M&A integration and cultural shift",
  "Exploring proactively",
];

type PS = {
  market:string;tenureKey:string;roaBps:number;walletScore:number;
  custodian:number;aumMix:number;crossBorder:number;productScope:number;clientConc:number;kycReuse:number;
  jurisdiction:string;gardenLeave:string;hasClawback:boolean;clawbackPct:number;eamExposure:number;
  aumDiv:number;alternatives:number;kycAdv:number;trackRecord:number;relDepth:number;teamDep:number;tierFit:number;
  bookingCentres:string[];permissions:string[];
};
type BS = {
  currentAUM:number;yearsExp:number;baseSalary:number;email:string;
  nnm1:number;nnm2:number;nnm3:number;roa:number;
  portPct:number;glMonths:number;instType:string;signOn:number;market:string;
};
type MS = {
  pushFactors:string[];pullFactors:string;competing:string;
  baseSalary:string;totalComp:string;guarantee:string;clawback:string;timeline:string;extra:string;
};

function computePort(s:PS) {
  const coreVals=[s.custodian,s.aumMix,s.crossBorder,s.productScope,s.clientConc,s.kycReuse];
  const corePct=Math.round((coreVals.reduce((a,v)=>a+v,0)/(coreVals.length*5))*100);
  const jurBase=JURISDICTION_DATA[s.jurisdiction]?.base??55;
  const glMod=GARDEN_LEAVE_OPTS.find(g=>g.key===s.gardenLeave)?.mod??0;
  const clMod=!s.hasClawback?5:s.clawbackPct>80?-18:s.clawbackPct>50?-8:s.clawbackPct>20?-3:2;
  const eaMod=s.eamExposure===1?5:s.eamExposure===2?0:s.eamExposure===3?-8:s.eamExposure===4?-18:-30;
  const legalPct=Math.min(100,Math.max(0,jurBase+glMod+clMod+eaMod));
  const advVals=[s.aumDiv,s.alternatives,s.kycAdv,s.trackRecord,s.relDepth,s.teamDep,s.tierFit];
  const advBase=(advVals.reduce((a,v)=>a+v,0)/(advVals.length*5))*100;
  const bcF=s.bookingCentres.length===0?0.85:s.bookingCentres.length===1?0.90:s.bookingCentres.length<=3?1.0:s.bookingCentres.length<=6?1.05:1.10;
  const pmF=s.permissions.length===0?0.90:s.permissions.length<=2?1.0:s.permissions.length<=4?1.05:1.10;
  const advPct=Math.round(Math.min(100,advBase*bcF*pmF));
  const wM=WALLET_OPTIONS.find(w=>w.score===s.walletScore)?.mult??1.0;
  const tM=TENURE_OPTIONS.find(t=>t.key===s.tenureKey)?.mult??1.0;
  const overall=Math.round(Math.min(100,Math.max(0,(corePct*0.25+legalPct*0.20+advPct*0.55)*wM*tM)));
  const level=overall>=85?"Tier-1 portability profile":overall>=72?"Strong portability profile":overall>=58?"Workable portability with conditions":overall>=42?"Challenging, targeted preparation required":"High-friction, significant remediation needed";
  const transferRange=overall>=85?"55–75% of bankable AUM":overall>=72?"40–60% of bankable AUM":overall>=58?"25–40% of bankable AUM":"10–25% of bankable AUM";
  const onboarding=overall>=85?"4–6 months":overall>=72?"6–9 months":overall>=58?"9–12 months":"12+ months";
  return {overall,level,corePct,legalPct,advPct,transferRange,onboarding};
}

function computeBP(s:BS) {
  const n=(v:unknown)=>{const x=Number(v??0);return isFinite(x)?x:0;};
  const fmt=new Intl.NumberFormat('en-CH',{maximumFractionDigits:0});
  const aum=n(s.currentAUM),portPct=n(s.portPct)||60,gl=n(s.glMonths),signOn=n(s.signOn),base=n(s.baseSalary);
  const nnm1=n(s.nnm1),nnm2=n(s.nnm2),nnm3=n(s.nnm3),roa=n(s.roa)||0.80;
  const inst=INSTITUTION_TYPES.find(t=>t.key===s.instType)??INSTITUTION_TYPES[0];
  // NNM figures represent cumulative projected book at new bank
  // Y1=NNM1, Y2=NNM1+NNM2, Y3=NNM1+NNM2+NNM3
  // Current AUM and portability are used for committee score only, not revenue
  const portAUM=aum*(portPct/100),glF=Math.max(0,Math.min(1,(12-gl)/12));
  const a1=nnm1,a2=nnm1+nnm2,a3=nnm1+nnm2+nnm3;
  const r1=a1*1_000_000*(roa/100),r2=a2*1_000_000*(roa/100),r3=a3*1_000_000*(roa/100);
  const cost=base*inst.mult+signOn/3;
  const nm1=r1-cost,nm2=r2-cost,nm3=r3-cost;
  let beMo:number|null=null,cum=0;
  for(let m=1;m<=36;m++){
    const yr=m<=12?1:m<=24?2:3;
    const aM=yr===1?Math.max(1,12-gl):12;
    cum+=(m<=gl?0:[r1,r2,r3][yr-1]/aM)-cost/12;
    if(cum>=0&&!beMo)beMo=m;
  }
  const aumMin=s.market==='CH Onshore'?250:200;
  const ratio=r3/Math.max(cost,1);
  const cs=Math.min(100,Math.round((
    (aum>=aumMin?20:aum>=aumMin*0.8?14:aum>=aumMin*0.6?8:3)+
    (roa>0.90?15:roa>=0.70?12:roa>=0.55?8:4)+
    (ratio>=3?20:ratio>=2?16:ratio>=1.5?12:ratio>=1?6:0)+
    (portPct>=60?10:portPct>=45?8:portPct>=30?5:2)+
    (n(s.yearsExp)>=10?10:n(s.yearsExp)>=7?8:n(s.yearsExp)>=5?5:2)+
    (nnm1+nnm2+nnm3>=100?10:nnm1+nnm2+nnm3>=50?6:2)+
    (!beMo?0:beMo<=12?15:beMo<=24?10:5)
  )/92*100));
  return {a1,a2,a3,r1,r2,r3,gross:r1+r2+r3,cost,nm1,nm2,nm3,nmTotal:nm1+nm2+nm3,beMo,cs,portAUM,fmt};
}

function Arc({pct,sz=100,color="#D4AF37"}:{pct:number;sz?:number;color?:string}) {
  const r=sz*0.38,c=2*Math.PI*r,d=(pct/100)*c;
  return (
    <div className="relative shrink-0" style={{width:sz,height:sz}}>
      <svg viewBox={`0 0 ${sz} ${sz}`} style={{width:sz,height:sz}} className="-rotate-90">
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={sz*0.065}/>
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={sz*0.065}
          strokeDasharray={`${d} ${c}`} strokeLinecap="round" style={{transition:"stroke-dasharray 0.5s ease"}}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold text-white leading-none" style={{fontSize:sz*0.22}}>{pct}</span>
        <span style={{fontSize:sz*0.10,color:"rgba(255,255,255,0.35)"}}>/100</span>
      </div>
    </div>
  );
}

function Sl({label,value,onChange,desc}:{label:string;value:number;onChange:(v:number)=>void;desc?:string}) {
  const pct=((value-1)/4)*100;
  const col=pct>=60?"#22c55e":pct>=30?"#eab308":"#ef4444";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{color:col}}>{value}/5</span>
      </div>
      {desc&&<p className="text-[11px] text-white/30 leading-relaxed">{desc}</p>}
      <div className="relative h-2 rounded-full bg-white/10">
        <div className="absolute h-full rounded-full transition-all duration-300" style={{width:`${pct}%`,backgroundColor:col}}/>
        <input type="range" min={1} max={5} step={1} value={value} onChange={e=>onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
      </div>
      <div className="flex justify-between text-[10px] text-white/20"><span>Weak</span><span>Strong</span></div>
    </div>
  );
}

const INP="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/50 transition";

function GBtn({onClick,children,disabled=false,full=false}:{onClick?:()=>void;children:React.ReactNode;disabled?:boolean;full?:boolean}) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`${full?"w-full":""} rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg transition-all hover:brightness-110 disabled:opacity-40`}
      style={{background:"linear-gradient(135deg,#C9A14A 0%,#E8C46A 100%)",color:"#000"}}>
      {children}
    </button>
  );
}

function Chip({label,active,onClick}:{label:string;active:boolean;onClick:()=>void}) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${active?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/60"}`}>
      {label}
    </button>
  );
}

function Card({children,gold=false}:{children:React.ReactNode;gold?:boolean}) {
  return (
    <div className="rounded-2xl border p-6" style={{borderColor:gold?"rgba(212,175,55,0.25)":"rgba(255,255,255,0.08)",background:gold?"rgba(212,175,55,0.03)":"rgba(0,0,0,0.35)"}}>
      {children}
    </div>
  );
}

function SectionHeader({num,title,desc}:{num:string;title:string;desc:string}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{background:"rgba(212,175,55,0.15)",color:"#D4AF37",border:"1px solid rgba(212,175,55,0.3)"}}>
          {num}
        </div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <p className="text-xs text-white/35 ml-10">{desc}</p>
    </div>
  );
}

export default function CandidateJourneyV2Client({token,candidateName,institution,mandate,market,hub}:{
  token:string;candidateName:string;institution:string;mandate:string;market?:string;hub?:string;
}) {
  const firstName=candidateName.trim().split(" ")[0];
  type Phase="port"|"bp"|"motiv"|"done";
  const [phase,setPhase]=useState<Phase>("port");
  const [done,setDone]=useState<number[]>([]);
  const [submitting,setSubmitting]=useState(false);
  const [showCapture,setShowCapture]=useState(false);
  const [capEmail,setCapEmail]=useState("");
  const [capName,setCapName]=useState(candidateName);
  const [pdfDone,setPdfDone]=useState(false);
  const [bpConfirmed,setBpConfirmed]=useState(false);

  const [port,setPort]=useState<PS>({
    market:market||"CH Onshore",tenureKey:"4to8",roaBps:80,walletScore:3,
    custodian:3,aumMix:3,crossBorder:3,productScope:3,clientConc:3,kycReuse:3,
    jurisdiction:"swiss",gardenLeave:"3mo",hasClawback:false,clawbackPct:0,eamExposure:1,
    aumDiv:3,alternatives:3,kycAdv:3,trackRecord:3,relDepth:3,teamDep:3,tierFit:3,
    bookingCentres:["Geneva"],permissions:["FINMA outbound (CH)"],
  });
  const pp=(p:Partial<PS>)=>setPort(s=>({...s,...p}));

  const [bp,setBp]=useState<BS>({
    currentAUM:0,yearsExp:0,baseSalary:0,email:"",
    nnm1:0,nnm2:0,nnm3:0,roa:0.80,portPct:60,glMonths:3,instType:"tier1_swiss",signOn:0,market:market||"CH Onshore",
  });
  const pb=(p:Partial<BS>)=>setBp(s=>({...s,...p}));

  const [motiv,setMotiv]=useState<MS>({
    pushFactors:[],pullFactors:"",competing:"",
    baseSalary:"",totalComp:"",guarantee:"",clawback:"",timeline:"",extra:"",
  });
  const pm=(p:Partial<MS>)=>setMotiv(s=>({...s,...p}));

  const ps=useMemo(()=>computePort(port),[port]);
  const bc=useMemo(()=>computeBP({...bp,market:port.market}),[bp,port.market]);

  const scroll=()=>window.scrollTo({top:0,behavior:"smooth"});

  const handlePortDownload=async()=>{
    try{await fetch("/api/capture-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:capName,email:capEmail,tool:"portability_v2",score:ps.overall})});}catch{}
    setPdfDone(true);setShowCapture(false);
  };

  const goToBP=()=>{
    pb({portPct:Math.max(30,Math.round(ps.overall*0.7)),roa:port.roaBps/100});
    setDone(d=>[...d,0]);setPhase("bp");scroll();
  };

  useEffect(()=>{
    if(bpConfirmed){const t=setTimeout(()=>{setDone(d=>[...d,1]);setPhase("motiv");scroll();},3000);return()=>clearTimeout(t);}
  },[bpConfirmed]);

  const handleSubmit=async()=>{
    setSubmitting(true);
    try{
      await fetch("/api/candidate-journey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        token,candidateName,institution,mandate,
        portabilityResult:{overallPct:ps.overall,overallLevel:ps.level,expectedTransferRange:ps.transferRange,onboardingSpeed:ps.onboarding,corePct:ps.corePct,legalPct:ps.legalPct,advancedPct:ps.advPct,roaBps:port.roaBps,market:port.market,hub:hub||"Geneva"},
        bpResult:{committeeScore:bc.cs,breakEvenMonth:bc.beMo,grossTotal:bc.gross,nmTotal:bc.nmTotal},
        motivation:motiv,
      })});
      setDone(d=>[...d,2]);setPhase("done");scroll();
    }catch{alert("Submission failed. Please try again.");}
    finally{setSubmitting(false);}
  };

  const STEPS=["Portability","Business Plan","Motivation & Fit"];
  const cur=phase==="port"?0:phase==="bp"?1:2;
  const sc=(n:number)=>n>=72?"#86efac":n>=58?"#fcd34d":"#fca5a5";

  return (
    <div className="min-h-screen" style={{background:"#080C18"}}>

      {/* Nav */}
      <div className="sticky top-0 z-40 border-b border-white/8 backdrop-blur-xl" style={{background:"rgba(8,12,24,0.96)"}}>
        <div className="mx-auto max-w-5xl px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            {STEPS.map((s,i)=>(
              <div key={s} className="flex items-center gap-1.5 sm:gap-2">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${done.includes(i)?"bg-emerald-500 text-white":i===cur?"bg-[#D4AF37] text-black":"border border-white/15 text-white/25"}`}>
                  {done.includes(i)?"✓":i+1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i===cur?"text-white":done.includes(i)?"text-emerald-400":"text-white/25"}`}>{s}</span>
                {i<2&&<div className={`w-5 sm:w-10 h-px mx-1 ${done.includes(i)?"bg-emerald-500/40":"bg-white/8"}`}/>}
              </div>
            ))}
          </div>
          {phase!=="done"&&(
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-white/25">{phase==="port"?"Portability Score":phase==="bp"?"Committee Score":""}</p>
              <p className="text-base font-bold" style={{color:sc(phase==="port"?ps.overall:bc.cs)}}>
                {phase==="port"?`${ps.overall}%`:phase==="bp"?`${bc.cs}/100`:""}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Banner */}
      {phase!=="done"&&(
        <div className="mx-auto max-w-5xl px-6 pt-10 pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-2" style={{color:"rgba(212,175,55,0.65)"}}>
            Executive Partners · Confidential · {mandate}
          </p>
          <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">
            {firstName}, your EP assessment
            {institution&&<span className="text-white/30 font-normal"> · {institution}</span>}
          </h1>
          <div className="mt-3 flex gap-2 flex-wrap">
            {["200+ placements tested","Strictly confidential","Not shared without consent"].map(t=>(
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/8 px-3 py-0.5 text-[10px] text-white/30">
                <span style={{color:"#D4AF37"}}>✓</span> {t}
              </span>
            ))}
          </div>
          <div className="h-px mt-6" style={{background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.18),transparent)"}}/>
        </div>
      )}

      {/* ── PORTABILITY ── */}
      {phase==="port"&&(
        <div className="mx-auto max-w-5xl px-6 pb-20 space-y-4">

          {/* Live score */}
          <Card gold>
            <div className="flex items-center gap-5">
              <Arc pct={ps.overall} sz={88} color={sc(ps.overall)}/>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{color:"rgba(212,175,55,0.65)"}}>Step 1 of 3 · Portability Score™</p>
                <p className="text-lg font-bold text-white leading-tight">{ps.level}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="text-xs text-white/40">Transfer: <strong className="text-white/70">{ps.transferRange}</strong></span>
                  <span className="text-xs text-white/40">Onboarding: <strong className="text-white/70">{ps.onboarding}</strong></span>
                </div>
              </div>
              <div className="hidden sm:flex gap-3 shrink-0">
                {[{l:"Core",v:ps.corePct},{l:"Legal",v:ps.legalPct},{l:"Adv",v:ps.advPct}].map(m=>(
                  <div key={m.l} className="flex flex-col items-center gap-1">
                    <div className="h-12 w-2 rounded-full bg-white/10 relative">
                      <div className="absolute bottom-0 w-full rounded-full transition-all" style={{height:`${m.v}%`,backgroundColor:sc(m.v)}}/>
                    </div>
                    <p className="text-[10px] text-white/30">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* A: Profile */}
          <Card>
            <SectionHeader num="A" title="Profile & Revenue" desc="Your current position, tenure, and book quality metrics."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Primary market</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">Select the market that describes the majority of your client base — not your personal location. A Geneva-based banker whose clients are French should select French Market, not CH Onshore.</p>
                <select value={port.market} onChange={e=>pp({market:e.target.value})} className={INP+" bg-black/40"}>
                  {MARKETS.map(m=><option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">ROA (bps, last 12 months)</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">Your total annual revenue ÷ total AUM in basis points. Example: CHF 1.5M on CHF 200M AUM = 75 bps. Do not include one-off items. CH onshore typical: 65–90 bps.</p>
                <input type="number" value={port.roaBps||""} onChange={e=>pp({roaBps:Number(e.target.value)})} className={INP} placeholder="80"/>
                <p className="text-[11px] text-white/20 mt-1">CH onshore typical: 65–90 bps</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Time at current institution</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">Banks apply an informal minimum of 2–3 years before treating a senior RM move as commercially credible. Short tenure raises questions about client bonding and stability.</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {TENURE_OPTIONS.map(t=>(
                    <button key={t.key} type="button" onClick={()=>pp({tenureKey:t.key})}
                      className={`rounded-lg border px-2 py-2 text-xs text-center transition ${port.tenureKey===t.key?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Wallet share depth</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">What proportion of your clients' total investable wealth do you manage? Example: client with CHF 20M total, you manage CHF 5M = 25% wallet share. High share means they depend primarily on you.</p>
                <div className="grid grid-cols-5 gap-1">
                  {WALLET_OPTIONS.map(w=>(
                    <button key={w.score} type="button" onClick={()=>pp({walletScore:w.score})}
                      className={`rounded-lg border py-2 text-[10px] text-center transition ${port.walletScore===w.score?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/35 hover:border-white/20"}`}>
                      {w.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-white/20 mt-1">% of client total wealth you manage</p>
              </div>
            </div>
          </Card>

          {/* B: Core dims */}
          <Card>
            <SectionHeader num="B" title="Core Portability Dimensions" desc="Score 1 (weak) to 5 (very strong). Score conservatively — banks calibrate this at interview."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Sl label="Custodian / Booking Footprint" value={port.custodian} onChange={v=>pp({custodian:v})} desc="Centres where clients can follow you"/>
              <Sl label="AUM Mix & Diversification" value={port.aumMix} onChange={v=>pp({aumMix:v})} desc="DPM, advisory, lending spread"/>
              <Sl label="Cross-Border Licences" value={port.crossBorder} onChange={v=>pp({crossBorder:v})} desc="Active: FINMA, FCA, DFSA, MAS, SFC"/>
              <Sl label="Product Scope Breadth" value={port.productScope} onChange={v=>pp({productScope:v})} desc="Alternatives, structured notes, Lombard"/>
              <Sl label="Client Concentration" value={port.clientConc} onChange={v=>pp({clientConc:v})} desc="Score 5 if no client > 8–10% AUM"/>
              <Sl label="KYC / Documentation Reusability" value={port.kycReuse} onChange={v=>pp({kycReuse:v})} desc="Current KYC for top 30 clients"/>
            </div>
          </Card>

          {/* C: Legal */}
          <Card>
            <SectionHeader num="C" title="Legal & Structural Risk" desc="The most underestimated dimension. Each element can be a standalone disqualifier."/>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Governing law</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">Check your contract — the clause titled Governing Law or Applicable Law, usually in the final pages. Swiss vs English law can change your score by 15–20 points.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(JURISDICTION_DATA).map(([k,v])=>(
                    <button key={k} type="button" onClick={()=>pp({jurisdiction:k})}
                      className={`rounded-xl border px-3 py-2.5 text-xs text-center transition ${port.jurisdiction===k?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Garden leave</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">Your employer keeps you on salary but prohibits client contact. Begins from your resignation date. Select No clause only if your contract explicitly contains none.</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {GARDEN_LEAVE_OPTS.map(g=>(
                    <button key={g.key} type="button" onClick={()=>pp({gardenLeave:g.key})}
                      className={`rounded-xl border px-2 py-2.5 text-xs text-center transition ${port.gardenLeave===g.key?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Clawback</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">Must you repay a bonus if you leave before a specified date? Most receiving banks will cover this in their sign-on — but only if you disclose it upfront and quantify it precisely.</p>
                  <div className="flex gap-2">
                    {[{k:false,l:"No clawback"},{k:true,l:"Clawback applies"}].map(o=>(
                      <button key={String(o.k)} type="button" onClick={()=>pp({hasClawback:o.k as boolean})}
                        className={`flex-1 rounded-xl border px-3 py-2.5 text-xs transition ${port.hasClawback===o.k?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                  {port.hasClawback&&<input type="number" value={port.clawbackPct||""} onChange={e=>pp({clawbackPct:Number(e.target.value)})} className={INP+" mt-3"} placeholder="Clawback % exposure"/>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">EAM co-management</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">If an EAM manages a portion of your clients' portfolios, those assets are legally ambiguous at transfer. The receiving bank cannot onboard EAM-managed AUM without the EAM's active cooperation.</p>
                  <div className="grid grid-cols-5 gap-1">
                    {[{v:1,l:"< 5%"},{v:2,l:"5–10%"},{v:3,l:"10–20%"},{v:4,l:"20–35%"},{v:5,l:"> 35%"}].map(o=>(
                      <button key={o.v} type="button" onClick={()=>pp({eamExposure:o.v})}
                        className={`rounded-lg border py-2 text-[10px] text-center transition ${port.eamExposure===o.v?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/35 hover:border-white/20"}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* D: Advanced */}
          <Card>
            <SectionHeader num="D" title="Advanced Portability Factors" desc="Score what you can evidence, not what feels true. Committees verify these directly."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Sl label="AUM Diversification (DPM / Advisory / Lending)" value={port.aumDiv} onChange={v=>pp({aumDiv:v})}/>
              <Sl label="Alternatives & Structured Products" value={port.alternatives} onChange={v=>pp({alternatives:v})} desc="In active, evidenced use with clients"/>
              <Sl label="KYC / Documentation Reusability" value={port.kycAdv} onChange={v=>pp({kycAdv:v})}/>
              <Sl label="Past Portability Track Record" value={port.trackRecord} onChange={v=>pp({trackRecord:v})} desc="Have clients followed you before?"/>
              <Sl label="Relationship Depth & Contact Frequency" value={port.relDepth} onChange={v=>pp({relDepth:v})} desc="Do clients call you, or do you call them?"/>
              <Sl label="Team Dependency" value={port.teamDep} onChange={v=>pp({teamDep:v})} desc="Score 5 if you are the singular point of contact"/>
              <Sl label="Fit with Tier-1 Private Banking Platform" value={port.tierFit} onChange={v=>pp({tierFit:v})}/>
            </div>
          </Card>

          {/* E: Geographic */}
          <Card>
            <SectionHeader num="E" title="Geographic Reach & Regulatory Permissions" desc="Select only centres where your specific clients could realistically be onboarded."/>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">Booking centres</label>
                <div className="flex flex-wrap gap-2">
                  {BOOKING_CENTRES.map(bc=>(
                    <Chip key={bc} label={bc} active={port.bookingCentres.includes(bc)}
                      onClick={()=>pp({bookingCentres:port.bookingCentres.includes(bc)?port.bookingCentres.filter(x=>x!==bc):[...port.bookingCentres,bc]})}/>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-3">Active regulatory permissions</label>
                <div className="flex flex-wrap gap-2">
                  {PERMISSIONS.map(p=>(
                    <Chip key={p} label={p} active={port.permissions.includes(p)}
                      onClick={()=>pp({permissions:port.permissions.includes(p)?port.permissions.filter(x=>x!==p):[...port.permissions,p]})}/>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Final score + CTA */}
          <Card gold>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Arc pct={ps.overall} sz={96} color={sc(ps.overall)}/>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{color:"rgba(212,175,55,0.65)"}}>Your Portability Score™</p>
                <p className="text-xl font-bold text-white">{ps.level}</p>
                <div className="flex flex-wrap gap-4 mt-2 justify-center sm:justify-start">
                  <span className="text-xs text-white/40">Transfer: <strong className="text-white/70">{ps.transferRange}</strong></span>
                  <span className="text-xs text-white/40">Onboarding: <strong className="text-white/70">{ps.onboarding}</strong></span>
                </div>
              </div>
              <div className="shrink-0">
                {!pdfDone
                  ?<GBtn onClick={()=>setShowCapture(true)}>Download PDF & Continue →</GBtn>
                  :<GBtn onClick={goToBP}>Continue to Business Plan →</GBtn>
                }
              </div>
            </div>
          </Card>

          {/* Capture modal */}
          {showCapture&&(
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{background:"rgba(0,0,0,0.80)",backdropFilter:"blur(8px)"}}>
              <div className="w-full max-w-md rounded-2xl border border-white/15 p-8 shadow-2xl" style={{background:"#0D1120"}}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color:"#D4AF37"}}>Download your EP Dossier</p>
                <p className="text-sm text-white/50 mb-6">Your portability diagnostic as a bank-ready PDF. Downloads immediately to your device.</p>
                <div className="space-y-3 mb-5">
                  <input type="text" value={capName} onChange={e=>setCapName(e.target.value)} placeholder="Your name" className={INP}/>
                  <input type="email" value={capEmail} onChange={e=>setCapEmail(e.target.value)} placeholder="your@email.com" className={INP}/>
                </div>
                <div className="flex gap-3">
                  <GBtn onClick={handlePortDownload} disabled={!capEmail.includes("@")}>Download PDF →</GBtn>
                  <button type="button" onClick={()=>setShowCapture(false)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/40 hover:text-white/70 transition">Cancel</button>
                </div>
                <p className="text-[11px] text-white/20 mt-4">Handled confidentially by Executive Partners.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── BUSINESS PLAN ── */}
      {phase==="bp"&&(
        <div className="mx-auto max-w-5xl px-6 pb-20 space-y-4">

          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-5 py-4 flex items-center gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">✓</div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Portability complete — {ps.overall}% · {ps.level}</p>
              <p className="text-xs text-white/35 mt-0.5">AUM portability pre-filled at {bp.portPct}% · Expected transfer: {ps.transferRange}</p>
            </div>
          </div>

          {/* 1 */}
          <Card>
            <SectionHeader num="1" title="Candidate Profile" desc="Basic inputs for the committee readiness model."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {k:"currentAUM",l:"Current AUM (M CHF)",p:"e.g. 350"},
                {k:"yearsExp",l:"Years of experience",p:"e.g. 12"},
                {k:"baseSalary",l:"Current base salary (CHF/year)",p:"e.g. 280000"},
                {k:"email",l:"Email address",p:"your@email.com",t:"email"},
              ].map(f=>(
                <div key={f.k}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-2">{f.l}</label>
                  <input type={f.t||"number"} value={(bp as any)[f.k]||""} onChange={e=>pb({[f.k]:f.t==="email"?e.target.value:Number(e.target.value)} as any)} className={INP} placeholder={f.p}/>
                </div>
              ))}
            </div>
          </Card>

          {/* 2 */}
          <Card>
            <SectionHeader num="2" title="Net New Money Projection" desc="Committees prefer a growing ramp. Avoid front-loading Y1 — it raises portability questions."/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[{k:"nnm1",l:"NNM Year 1 (M CHF)"},{k:"nnm2",l:"NNM Year 2 (M CHF)"},{k:"nnm3",l:"NNM Year 3 (M CHF)"}].map(f=>(
                <div key={f.k}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-2">{f.l}</label>
                  <input type="number" value={(bp as any)[f.k]||""} onChange={e=>pb({[f.k]:Number(e.target.value)} as any)} className={INP} placeholder="e.g. 50"/>
                </div>
              ))}
            </div>
            {(bp.nnm1+bp.nnm2+bp.nnm3)>0&&(
              <div className="mt-4 rounded-xl border border-white/8 bg-white/5 px-4 py-3 flex flex-wrap gap-5 text-sm">
                <span className="text-white/45">3Y Total: <strong className="text-white">{(bp.nnm1+bp.nnm2+bp.nnm3).toFixed(0)}M</strong></span>
                {bp.nnm3<bp.nnm2*0.75&&bp.nnm2>0&&<span className="text-amber-300 text-xs">⚠ Y3 declines — prepare explanation for committee</span>}
                {bp.nnm2>=bp.nnm1&&bp.nnm3>=bp.nnm2&&bp.nnm1>0&&<span className="text-emerald-300 text-xs">✓ Growing ramp — strong committee signal</span>}
              </div>
            )}
          </Card>

          {/* 3 */}
          <Card>
            <SectionHeader num="3" title="Revenue & Cost Assumptions" desc="Parameters that drive the P&L model and breakeven calculation."/>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">ROA % (e.g. 0.80 = 80 bps)</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">Applied to your cumulative AUM each year. CH onshore: 0.65–0.90% · International: 0.80–1.20% · MEA/APAC: 0.90–1.30%.</p>
                  <input type="number" step="0.05" value={bp.roa||""} onChange={e=>pb({roa:Number(e.target.value)})} className={INP} placeholder="0.80"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-2">Portability % <span style={{color:"rgba(212,175,55,0.6)"}}>↑ pre-filled</span></label>
                  <input type="number" min={10} max={100} value={bp.portPct} onChange={e=>pb({portPct:Number(e.target.value)})} className={INP}/>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Sign-on bonus (CHF)</label><p className="text-[11px] text-white/25 mb-2 leading-relaxed">From the receiving bank — typically covers garden leave income loss or outstanding clawback. Amortised over 3 years in the cost model.</p>
                  <input type="number" value={bp.signOn||""} onChange={e=>pb({signOn:Number(e.target.value)})} className={INP} placeholder="0"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Garden leave</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">Months before you can start generating revenue. During this period costs accrue but your NNM contribution is zero.</p>
                <div className="flex flex-wrap gap-2">
                  {[{m:0,l:"None"},{m:1,l:"1 month"},{m:2,l:"2 months"},{m:3,l:"3 months"},{m:6,l:"6 months"}].map(g=>(
                    <Chip key={g.m} label={g.l} active={bp.glMonths===g.m} onClick={()=>pb({glMonths:g.m})}/>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/35 mb-1">Target institution</label><p className="text-[11px] text-white/25 mb-3 leading-relaxed">Determines the all-in cost multiplier applied to your base salary — covers employer social charges (~18% CH), bonus provision, and overhead.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INSTITUTION_TYPES.map(inst=>(
                    <button key={inst.key} type="button" onClick={()=>pb({instType:inst.key})}
                      className={`rounded-xl border px-4 py-3 text-left text-xs transition ${bp.instType===inst.key?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                      <span className="font-semibold block text-sm mb-0.5">{inst.label}</span>
                      <span className="opacity-60">{inst.note} · {inst.mult}× base</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 4: Results */}
          <Card gold>
            <SectionHeader num="4" title="Committee Readiness Analysis" desc="Live P&L model based on your inputs above. Confirm to advance to Motivation & Fit."/>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                {l:"Committee Score",v:`${bc.cs}`,u:"/100",c:sc(bc.cs)},
                {l:"Breakeven",v:bc.beMo?`Month ${bc.beMo}`:"Beyond 36mo",u:bc.beMo&&bc.beMo<=12?"Year 1 ✓":bc.beMo&&bc.beMo<=24?"Year 2":"—",c:"#ffffff"},
                {l:"3Y Net Margin",v:bc.nmTotal!==0?bc.fmt.format(bc.nmTotal):"—",u:bc.nmTotal>=0?"positive":"negative",c:bc.nmTotal>=0?"#86efac":"#fca5a5"},
              ].map(m=>(
                <div key={m.l} className="rounded-xl border border-white/10 bg-black/40 p-4 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{m.l}</p>
                  <p className="text-2xl font-bold" style={{color:m.c}}>{m.v}</p>
                  <p className="text-[11px] text-white/25 mt-0.5">{m.u}</p>
                </div>
              ))}
            </div>
            {bp.currentAUM>0&&bp.roa>0&&(
              <div className="overflow-x-auto rounded-xl border border-white/10 mb-5">
                <table className="min-w-full text-xs">
                  <thead style={{background:"rgba(255,255,255,0.04)"}}>
                    <tr>
                      {["Year","AUM (M)","Revenue","All-in Cost","Net Margin"].map(h=>(
                        <th key={h} className={`px-4 py-2.5 text-white/30 font-medium ${h==="Year"?"text-left":"text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[{yr:"Y1",aum:bc.a1,rev:bc.r1,nm:bc.nm1},{yr:"Y2",aum:bc.a2,rev:bc.r2,nm:bc.nm2},{yr:"Y3",aum:bc.a3,rev:bc.r3,nm:bc.nm3}].map((r,i)=>(
                      <tr key={r.yr} className={i>0?"border-t border-white/5":""}>
                        <td className="px-4 py-2.5 text-white/55">{r.yr}</td>
                        <td className="px-4 py-2.5 text-right text-amber-300">{r.aum.toFixed(1)}M</td>
                        <td className="px-4 py-2.5 text-right text-emerald-300">{bc.fmt.format(r.rev)}</td>
                        <td className="px-4 py-2.5 text-right text-white/35">{bc.fmt.format(bc.cost)}</td>
                        <td className={`px-4 py-2.5 text-right font-semibold ${r.nm>=0?"text-emerald-300":"text-rose-300"}`}>{bc.fmt.format(r.nm)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!bpConfirmed
              ?<GBtn onClick={()=>setBpConfirmed(true)} full>Confirm Business Plan & Continue →</GBtn>
              :(
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">✓</div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">Business Plan confirmed — advancing to Motivation & Fit in 3 seconds…</p>
                    <p className="text-xs text-white/35 mt-0.5">Score: {bc.cs}/100 · Breakeven: {bc.beMo?`Month ${bc.beMo}`:"—"} · 3Y revenue: {bc.fmt.format(bc.gross)}</p>
                  </div>
                </div>
              )
            }
          </Card>
        </div>
      )}

      {/* ── MOTIVATION ── */}
      {phase==="motiv"&&(
        <div className="mx-auto max-w-3xl px-6 pb-20 space-y-4">
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-5 py-4 flex items-center gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">✓</div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">Business Plan complete — Committee score: {bc.cs}/100</p>
              <p className="text-xs text-white/35 mt-0.5">Breakeven {bc.beMo?`Month ${bc.beMo}`:"—"} · 3Y revenue: {bc.fmt.format(bc.gross)}</p>
            </div>
          </div>
          <div className="pt-2 pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{color:"rgba(212,175,55,0.65)"}}>Step 3 of 3 · Motivation & Fit</p>
            <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">Context behind the move</h2>
            <p className="mt-2 text-sm text-white/40 max-w-xl leading-relaxed">A strong book with unclear motivation is a retention risk. These questions give Gil M. Chalem the full picture before any introduction to {institution||"the institution"}.</p>
          </div>

          <Card>
            <SectionHeader num="1" title="Why are you considering a move now?" desc="Select all that apply. Push-only motivation with no pull correlates with shorter tenure."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PUSH_OPTIONS.map(o=>(
                <button key={o} type="button"
                  onClick={()=>pm({pushFactors:motiv.pushFactors.includes(o)?motiv.pushFactors.filter(x=>x!==o):[...motiv.pushFactors,o]})}
                  className={`rounded-xl border px-3 py-2.5 text-xs text-left transition ${motiv.pushFactors.includes(o)?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20"}`}>
                  {o}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader num="2" title={`What specifically attracts you to ${institution||"this institution"}?`} desc="Be specific. Generic answers are a red flag at interview."/>
            <textarea value={motiv.pullFactors} onChange={e=>pm({pullFactors:e.target.value})} rows={3}
              placeholder="Product shelf, booking infrastructure, cultural fit, market capabilities…" className={INP+" resize-none"}/>
          </Card>

          <Card>
            <SectionHeader num="3" title="Active conversations elsewhere?" desc="EP manages sequencing to protect your reputation. Strictly confidential."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {k:"only",l:"This is the only active process"},
                {k:"1early",l:"1 early-stage conversation"},
                {k:"2to3",l:"2–3 active at similar stage"},
                {k:"4plus",l:"Running a broad search (4+)"},
              ].map(o=>(
                <button key={o.k} type="button" onClick={()=>pm({competing:o.k})}
                  className={`rounded-xl border px-4 py-3 text-xs text-left transition ${motiv.competing===o.k?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/45 hover:border-white/20"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader num="4" title="Compensation expectations" desc="EP rule: the hire must break even within 36 months in the base scenario."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs text-white/35 mb-2">Expected base salary (CHF/year)</label>
                <input type="number" value={motiv.baseSalary} onChange={e=>pm({baseSalary:e.target.value})} className={INP} placeholder="e.g. 300000"/>
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-2">Expected total year 1 comp (CHF)</label>
                <input type="number" value={motiv.totalComp} onChange={e=>pm({totalComp:e.target.value})} className={INP} placeholder="e.g. 480000"/>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {[{k:"none",l:"No guarantee",d:"Assessed on transferred book"},{k:"partial",l:"Partial guarantee",d:"3–6 months cover"},{k:"full",l:"Full year 1 guarantee",d:"Requested"}].map(o=>(
                <button key={o.k} type="button" onClick={()=>pm({guarantee:o.k})}
                  className={`rounded-xl border px-3 py-3 text-xs text-left transition ${motiv.guarantee===o.k?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                  <span className="font-semibold block mb-0.5">{o.l}</span><span className="opacity-60">{o.d}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["None","Yes — receiving bank to cover"].map(o=>(
                <button key={o} type="button" onClick={()=>pm({clawback:o})}
                  className={`rounded-full border px-4 py-2 text-xs transition ${motiv.clawback===o?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                  {o}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader num="5" title="Availability timeline" desc="Notice period plus any garden leave."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                {k:"immediate",l:"Available immediately"},{k:"1mo",l:"After 1 month"},
                {k:"2to3mo",l:"After 2–3 months"},{k:"3to6mo",l:"After 3–6 months (garden leave)"},
                {k:"6plus",l:"After 6+ months"},{k:"flexible",l:"Flexible — depends on offer"},
              ].map(o=>(
                <button key={o.k} type="button" onClick={()=>pm({timeline:o.k})}
                  className={`rounded-xl border px-4 py-2.5 text-xs text-left transition ${motiv.timeline===o.k?"border-[#D4AF37]/60 bg-[#D4AF37]/12 text-[#D4AF37]":"border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"}`}>
                  {o.l}
                </button>
              ))}
            </div>
            <textarea value={motiv.extra} onChange={e=>pm({extra:e.target.value})} rows={2}
              placeholder="Additional context (optional)…" className={INP+" resize-none"}/>
          </Card>

          <GBtn onClick={handleSubmit} disabled={submitting} full>
            {submitting?"Submitting your assessment…":"Submit complete assessment →"}
          </GBtn>
          <p className="text-[11px] text-white/20 text-center pb-4">Handled strictly confidentially by Gil M. Chalem at Executive Partners. Not shared without your explicit consent.</p>
        </div>
      )}

      {/* ── DONE ── */}
      {phase==="done"&&(
        <div className="mx-auto max-w-2xl px-6 py-20 flex flex-col items-center text-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{background:"rgba(34,197,94,0.15)",color:"#4ade80"}}>✓</div>
          <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">Assessment submitted</h2>
          <p className="text-white/45 text-sm max-w-md leading-relaxed">Thank you, {firstName}. Your complete assessment has been received by Gil M. Chalem at Executive Partners.</p>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {l:"Portability Score",v:`${ps.overall}%`,s:ps.level},
              {l:"Committee Score",v:`${bc.cs}/100`,s:`Breakeven Month ${bc.beMo||"—"}`},
              {l:"Transfer Range",v:ps.transferRange,s:ps.onboarding},
            ].map(m=>(
              <div key={m.l} className="rounded-xl border border-white/10 bg-black/40 p-4 text-center">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{m.l}</p>
                <p className="text-sm font-bold" style={{color:"#D4AF37"}}>{m.v}</p>
                <p className="text-[11px] text-white/25 mt-0.5">{m.s}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 w-full text-left space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{color:"#D4AF37"}}>What happens next</p>
            <p className="text-sm text-white/50">Gil will review your complete profile within 24 hours and contact you directly to discuss the analysis, positioning, and next steps.</p>
            <p className="text-sm text-white/50">Your information is strictly confidential and shared only with {institution||"the target institution"} with your explicit agreement.</p>
          </div>
          <p className="text-xs text-white/20">Executive Partners · Geneva · recruiter@execpartners.ch</p>
        </div>
      )}
    </div>
  );
}
