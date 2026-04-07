import { useState, useEffect, useRef } from "react";

const AEKOVERA_BRIEF = { name: "Aekovera", site: "aekovera.com", desc: "Aekovera is a food & beverage operations company that helps CPG brands scale — from product development to co-manufacturing sourcing. Study their website to understand their services, audience, and tone before answering." };
const FICTIONAL_BRIEF = { name: "Zorah & Co.", site: "[THIS IS A FICTIONAL BRAND — NO WEBSITE EXISTS]", tagline: "Mediterranean Finishing Oils, Rooted in Family", desc: `Zorah & Co. is a fictional CPG brand created for this talent test. It does NOT exist — do not search for it online. Use the brief below as your only source of truth.\n\nBrand story: Zorah & Co. was founded by a first-generation Lebanese-American woman named Zorah Karam who grew up watching her grandmother finish every dish with a drizzle of hand-infused herbed olive oil. After years in corporate food marketing, Zorah left to create her own line of Mediterranean finishing oils — small-batch, herb-infused extra virgin olive oils designed to be the last thing you add to a dish, not the first.\n\nProduct line: Three finishing oils — Lemon & Zaatar, Roasted Garlic & Rosemary, and Aleppo Pepper & Mint. Each is cold-pressed EVOO infused with real herbs (not extracts). 250ml glass bottles, $14.99 each. Sold DTC and at specialty grocers.\n\nTarget customer: Home cooks aged 25–42 who care about ingredient quality, follow food creators on Instagram/TikTok, shop at Whole Foods or local specialty stores, and see cooking as a creative act — not a chore. They're the person who brings the "good olive oil" to a dinner party.\n\nBrand personality: Warm but elevated. Heritage-rooted but modern. Artisanal without being pretentious. Think: the sophistication of Brightland meets the cultural warmth of a family kitchen. Colors: deep olive green, warm cream, terracotta accents. Typography: clean serif.\n\nIMPORTANT: The content you create should be for a NEW PRODUCT LAUNCH — the "Aleppo Pepper & Mint" finishing oil. This is the brand's boldest, most unexpected flavor. Your job is to create launch content that makes people stop scrolling and want to try it.` };

const SECTIONS = [
  { id: "welcome", title: "Welcome", icon: "◆" },
  { id: "profile", title: "Your Profile", icon: "①" },
  { id: "aekovera", title: "Aekovera Brief", icon: "②" },
  { id: "fictional_brand", title: "Zorah & Co. Brief", icon: "③" },
  { id: "strategy", title: "Campaign Strategy", icon: "④" },
  { id: "platform", title: "Platform Fluency", icon: "⑤" },
  { id: "professionalism", title: "Professionalism", icon: "⑥" },
  { id: "portfolio", title: "Portfolio & Links", icon: "⑦" },
  { id: "rights", title: "Rights & Consent", icon: "⑧" },
  { id: "review", title: "Review & Submit", icon: "✓" },
];

const MC = { brand_customer: 80, brand_emotion: 60, brand_competitors: 150, brand_hook: 60, brand_avoid: 80, aekovera_creative_intention: 100, fictional_brand_concept: 250, fictional_brand_hook: 60, fictional_brand_visual: 150, fictional_brand_why: 100, campaign_post1: 150, campaign_post2: 150, campaign_post3: 150, campaign_rationale: 100, unhappy_client: 80 };

const PLAT = ["TikTok","Instagram Reels","YouTube Shorts","LinkedIn","Pinterest","Twitter/X","Other"];
const SW = ["CapCut","Adobe Premiere Pro","DaVinci Resolve","Final Cut Pro","After Effects","Canva Video","Other"];
const STY = ["On-camera (I appear in videos)","UGC / Faceless","Both"];
const TURN = ["24 hours","48 hours","3–5 days","1 week","2+ weeks"];
const CAT = ["Food & Beverage","Health & Wellness","Beauty & Skincare","Lifestyle","Fitness","Tech & SaaS","Fashion","Home & Living","Other"];
const PV_RATE = ["Under $100/video","$100–$250/video","$250–$500/video","$500–$1,000/video","$1,000+/video","Hourly rate","Package deals"];
const REV = ["1 revision included","2 revisions included","3+ revisions included","Unlimited revisions","No revisions — final delivery only"];
const BEXP = ["Yes — I've worked with formal brand briefs","Somewhat — I've had guidelines but not full briefs","No — only self-directed content"];
const COMM = ["Email","Slack","WhatsApp","iMessage","Zoom/Google Meet for kickoff, then async"];
const LTYPES = ["Portfolio website","TikTok profile","Instagram profile","YouTube channel","Behance","Dribbble","Vimeo","LinkedIn","Brand collaboration example","Case study","Demo reel","Other"];

const init = {
  full_name:"",email:"",primary_handle:"",other_socials:"",location:"",experience_years:"",
  brand_customer:"",brand_emotion:"",brand_competitors:"",brand_hook:"",brand_avoid:"",
  aekovera_video_link:"",aekovera_creative_intention:"",
  fictional_brand_concept:"",fictional_brand_hook:"",fictional_brand_visual:"",fictional_brand_platform:"",fictional_brand_cta:"",fictional_brand_why:"",
  campaign_post1:"",campaign_post2:"",campaign_post3:"",campaign_rationale:"",
  platforms:[],editing_software:"",content_style:"",turnaround:"",strongest_category:[],
  rate_range:"",rate_notes:"",revision_policy:"",brand_brief_experience:"",communication_pref:"",unhappy_client:"",anything_else:"",
  hourly_min:10,hourly_max:25,
  portfolio_links:[{type:"Portfolio website",url:"",label:""}],
  rights_aekovera:false,rights_fictional_brand:false,rights_general:false,rights_moral:false,
};

const CC = ({value,min}) => { const c=(value||"").length; return <div style={{display:"flex",justifyContent:"flex-end",marginTop:4,fontSize:11,fontFamily:"var(--mono)",color:c>=min?"#2d6a4f":"#999"}}>{c}/{min} {c>=min?"✓":"min"}</div>; };
function F({label,hint,error,children}){ return <div style={{marginBottom:26}}><label style={S.label}>{label}</label>{hint&&<div style={S.hint}>{hint}</div>}{children}{error&&<div style={S.error}>{error}</div>}</div>; }
function RB({title,children}){ return <div style={{marginBottom:24,borderBottom:"1px solid #e0ddd8",paddingBottom:18}}><div style={{fontFamily:"var(--mono)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",color:"#1b5e3b",marginBottom:10,textTransform:"uppercase"}}>{title}</div>{children}</div>; }
function RI({label,value,long}){ return <div style={{marginBottom:10}}><div style={{fontSize:11,fontWeight:600,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:2}}>{label}</div><div style={{fontSize:13,color:"#1a1a18",lineHeight:1.5,...(long?{whiteSpace:"pre-wrap"}:{})}}>{value||<span style={{color:"#bbb",fontStyle:"italic"}}>Not provided</span>}</div></div>; }

export default function TalentTest() {
  const [step,setStep]=useState(0);
  const [form,setForm]=useState(init);
  const [errors,setErrors]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const [wc,setWc]=useState([false,false,false,false,false,false]);
  const ref=useRef(null);

  useEffect(()=>{ref.current?.scrollTo({top:0,behavior:"smooth"});},[step]);

  const set=(k,v)=>{setForm(p=>({...p,[k]:v}));if(errors[k])setErrors(p=>{const n={...p};delete n[k];return n;});};
  const tog=(k,v)=>setForm(p=>({...p,[k]:(p[k]||[]).includes(v)?p[k].filter(x=>x!==v):[...(p[k]||[]),v]}));
  const addL=()=>set("portfolio_links",[...form.portfolio_links,{type:"Other",url:"",label:""}]);
  const rmL=(i)=>set("portfolio_links",form.portfolio_links.filter((_,idx)=>idx!==i));
  const upL=(i,f,v)=>{const l=[...form.portfolio_links];l[i]={...l[i],[f]:v};set("portfolio_links",l);};

  const validate=()=>{
    const e={};
    if(step===0&&!wc.every(Boolean))e.welcome="Please confirm all items to proceed.";
    if(step===1){if(!form.full_name.trim())e.full_name="Required";if(!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email))e.email="Valid email required";if(!form.primary_handle.trim())e.primary_handle="Required";if(!form.location.trim())e.location="Required";if(!form.experience_years)e.experience_years="Required";}
    if(step===2){["brand_customer","brand_emotion","brand_competitors","brand_hook","brand_avoid"].forEach(k=>{if((form[k]||"").length<MC[k])e[k]=`Minimum ${MC[k]} characters`;});if(!form.aekovera_video_link.trim())e.aekovera_video_link="Required";if((form.aekovera_creative_intention||"").length<MC.aekovera_creative_intention)e.aekovera_creative_intention=`Minimum ${MC.aekovera_creative_intention} characters`;}
    if(step===3){if((form.fictional_brand_concept||"").length<MC.fictional_brand_concept)e.fictional_brand_concept=`Minimum ${MC.fictional_brand_concept} characters`;if((form.fictional_brand_hook||"").length<MC.fictional_brand_hook)e.fictional_brand_hook=`Minimum ${MC.fictional_brand_hook} characters`;if((form.fictional_brand_visual||"").length<MC.fictional_brand_visual)e.fictional_brand_visual=`Minimum ${MC.fictional_brand_visual} characters`;if(!form.fictional_brand_platform.trim())e.fictional_brand_platform="Required";if((form.fictional_brand_why||"").length<MC.fictional_brand_why)e.fictional_brand_why=`Minimum ${MC.fictional_brand_why} characters`;}
    if(step===4){["campaign_post1","campaign_post2","campaign_post3","campaign_rationale"].forEach(k=>{if((form[k]||"").length<MC[k])e[k]=`Minimum ${MC[k]} characters`;});}
    if(step===5){if(form.platforms.length===0)e.platforms="Select at least one";if(!form.editing_software)e.editing_software="Required";if(!form.content_style)e.content_style="Required";if(!form.turnaround)e.turnaround="Required";if(form.strongest_category.length===0)e.strongest_category="Select at least one";}
    if(step===6){if(!form.rate_range)e.rate_range="Required";if(!form.revision_policy)e.revision_policy="Required";if(!form.brand_brief_experience)e.brand_brief_experience="Required";if(!form.communication_pref)e.communication_pref="Required";if((form.unhappy_client||"").length<MC.unhappy_client)e.unhappy_client=`Minimum ${MC.unhappy_client} characters`;if(form.hourly_min>form.hourly_max)e.hourly_range="Minimum must be less than maximum";}
    if(step===7){if(!form.portfolio_links.some(l=>l.url.trim()))e.portfolio_links="Add at least one link";}
    if(step===8){if(!form.rights_aekovera)e.rights_aekovera="Required";if(!form.rights_fictional_brand)e.rights_fictional_brand="Required";if(!form.rights_general)e.rights_general="Required";if(!form.rights_moral)e.rights_moral="Required";}
    setErrors(e);return Object.keys(e).length===0;
  };

  const next=()=>{if(validate())setStep(s=>Math.min(s+1,SECTIONS.length-1));};
  const prev=()=>setStep(s=>Math.max(s-1,0));
  const [submitting,setSubmitting]=useState(false);
  const [submitError,setSubmitError]=useState("");

  const submit=async()=>{
    setSubmitting(true);setSubmitError("");
    // ─── WEBHOOK URL ───
    // Replace this with your Make.com (or Zapier) webhook URL
    const WEBHOOK_URL = "https://hook.us2.make.com/gkle1i7krgsqn938nqfnpufjr4ufz10z";

    const payload = {
      ...form,
      platforms: form.platforms.join(", "),
      strongest_category: form.strongest_category.join(", "),
      portfolio_links: form.portfolio_links.filter(l=>l.url.trim()).map(l=>`[${l.type}] ${l.url}${l.label?` — ${l.label}`:""}`).join(" | "),
      rights_aekovera: form.rights_aekovera ? "Agreed" : "Not agreed",
      rights_fictional_brand: form.rights_fictional_brand ? "Agreed" : "Not agreed",
      rights_moral: form.rights_moral ? "Agreed" : "Not agreed",
      rights_general: form.rights_general ? "Agreed" : "Not agreed",
      submitted_at: new Date().toISOString(),
      application_id: "AEK-" + Date.now().toString(36).toUpperCase(),
    };

    if (WEBHOOK_URL === "YOUR_WEBHOOK_URL_HERE") {
      console.log("SUBMISSION (no webhook yet):", JSON.stringify(payload, null, 2));
      setSubmitting(false);setSubmitted(true);return;
    }

    try {
      const res = await fetch(WEBHOOK_URL, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } finally { setSubmitting(false); }
  };
  const progress=(step/(SECTIONS.length-1))*100;

  if(submitted) return (
    <div style={S.root}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 24px",textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:16,color:"#1b5e3b"}}>✦</div>
        <h1 style={{fontSize:28,fontWeight:800,margin:"0 0 12px",fontFamily:"var(--display)"}}>Application Submitted</h1>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,maxWidth:500,margin:"0 0 12px"}}>Thank you, {form.full_name}. Your talent test has been received by the <strong>Aekovera</strong> team. We review every submission personally and will be in touch within <strong>5–7 business days</strong>.</p>
        <p style={{fontSize:14,color:"#888",maxWidth:440,margin:"0 0 28px",lineHeight:1.5}}>Make sure your video and portfolio links are accessible — our team will be reviewing them.</p>
        <div style={{fontFamily:"var(--mono)",fontSize:13,color:"#1b5e3b",background:"#e8f5ef",padding:"10px 24px",borderRadius:24,fontWeight:600}}>Application ID: AEK-{Date.now().toString(36).toUpperCase()}</div>
      </div>
    </div>
  );

  return (
    <div style={S.root}>
      <div style={S.topBar}><div style={S.logoRow}><span style={S.logoMark}>◈</span><span style={S.logoText}>AEKOVERA</span><span style={S.logoDivider}>×</span><span style={S.logoSub}>Talent Network</span></div></div>
      <div style={S.progressTrack}><div style={{...S.progressFill,width:`${progress}%`}}/></div>
      <div style={S.dotRow}>{SECTIONS.map((s,i)=>(<div key={s.id} onClick={()=>i<step&&setStep(i)} title={s.title} style={{...S.dot,background:i===step?"#1b5e3b":i<step?"#6aba8e":"#ddd8d0",color:i<=step?"#fff":"#aaa",cursor:i<step?"pointer":"default",transform:i===step?"scale(1.15)":"scale(1)"}}><span style={{fontSize:9,fontWeight:800}}>{s.icon}</span></div>))}</div>
      <div ref={ref} style={S.body}>
        <div style={S.stepLabel}>{SECTIONS[step].title}</div>

{/* ═══════ WELCOME ═══════ */}
{step===0&&(<div>
  <h1 style={S.heroTitle}>Freelancer Talent Test</h1>
  <div style={S.heroBanner}><div style={S.heroBannerInner}>This form is intensive — but completing it judiciously will ensure you get matched with <strong>USA-based CPG clients</strong> actively looking for freelancers for social media content creation, video editing, campaign strategy, and brand storytelling.</div></div>
  <p style={S.heroSub}>You're applying to join <strong>Aekovera's curated talent network</strong> — a handpicked roster of content creators who work directly with emerging and established CPG brands. This is not a marketplace. We match top talent with real clients and real briefs.</p>

  <div style={S.infoCard}>
    <div style={{fontWeight:700,fontSize:15,marginBottom:10,color:"#1b5e3b"}}>What to expect</div>
    <div style={{fontSize:14,lineHeight:1.8,color:"#555"}}>
      <p style={{margin:"0 0 6px"}}>⏱ This test takes <strong>45–60 minutes</strong> to complete properly</p>
      <p style={{margin:"0 0 6px"}}>📹 You'll submit a <strong>60-second video</strong> for Aekovera (hosted on Google Drive / YouTube — paste the link)</p>
      <p style={{margin:"0 0 6px"}}>📝 You'll create a written content concept for <strong>Zorah & Co.</strong>, a fictional Mediterranean finishing oil brand</p>
      <p style={{margin:"0 0 6px"}}>📊 You'll design a <strong>3-post campaign</strong> for a product launch</p>
      <p style={{margin:"0 0 6px"}}>🔗 You can add <strong>unlimited portfolio links</strong> at the end</p>
      <p style={{margin:"0 0 0"}}>🏆 Top scorers get <strong>priority placement</strong> with our CPG clients</p>
    </div>
  </div>

  {/* ── IP NOTICE (FULL LEGAL) ── */}
  <div style={{background:"#fff8f0",border:"2px solid #d4900a",borderRadius:12,padding:"20px 24px",marginTop:24}}>
    <div style={{fontFamily:"var(--mono)",fontSize:12,fontWeight:800,letterSpacing:"0.08em",color:"#b37a00",marginBottom:12}}>⚖️ IMPORTANT — INTELLECTUAL PROPERTY & CONTENT RIGHTS NOTICE</div>
    <p style={{fontSize:14,lineHeight:1.7,color:"#555",margin:"0 0 12px"}}>Please read this carefully before proceeding. By submitting this talent test, you agree to the following content rights terms:</p>
    <div style={{fontSize:13,lineHeight:1.75,color:"#444"}}>
      <p style={{margin:"0 0 10px"}}><strong>1. IP Assignment for Test Submissions:</strong> All content you create and submit as part of this talent test — including but not limited to videos, written concepts, campaign strategies, and creative briefs — shall become the intellectual property of <strong>Aekovera</strong> and/or the respective brand (<strong>Zorah & Co.</strong>) referenced in the brief. By submitting, you irrevocably assign all rights, title, and interest (including copyright, reproduction rights, distribution rights, and the right to create derivative works) in the submitted content to Aekovera and its partner brands.</p>
      <p style={{margin:"0 0 10px"}}><strong>2. Scope of Usage:</strong> Aekovera and its partner brands may use, modify, adapt, publish, distribute, and display your submitted content across any medium — including but not limited to social media, websites, paid advertising, client presentations, pitch decks, email marketing, and print materials — without limitation on time, territory, or format, and without additional compensation to you beyond what is agreed upon if you are selected for the talent network.</p>
      <p style={{margin:"0 0 10px"}}><strong>3. No Copyright Claims:</strong> You agree that you will not assert any copyright or intellectual property claims against Aekovera or its partner brands for any content submitted through this test. You acknowledge that Aekovera and its partners are free to use, sublicense, or transfer the submitted content at their sole discretion.</p>
      <p style={{margin:"0 0 10px"}}><strong>4. Moral Rights Waiver:</strong> To the fullest extent permitted by applicable law, you waive any moral rights in the submitted works, including the right to be identified as the author and the right to object to derogatory treatment, modification, or adaptation of the works.</p>
      <p style={{margin:"0 0 10px"}}><strong>5. Portfolio Retention:</strong> You retain the right to display the content you created in your personal portfolio, showreel, or case studies for the sole purpose of demonstrating your creative abilities to prospective clients — provided that such display does not compete with or undermine the commercial use of the content by Aekovera or its partner brands.</p>
      <p style={{margin:"0 0 10px"}}><strong>6. Originality & Non-Infringement Warranty:</strong> You represent and warrant that all content you submit is your own original work, does not infringe on any third-party intellectual property rights, and has not been previously assigned, licensed, or encumbered in any way that would conflict with this assignment. You shall indemnify and hold harmless Aekovera and its partner brands from any claims arising from a breach of this warranty.</p>
      <p style={{margin:"0 0 0"}}><strong>7. Commission Structure:</strong> You acknowledge that Aekovera operates as a talent network and that a <strong>20% commission</strong> will apply to all projects, engagements, and compensation sourced through the Aekovera Talent Network for a period of 12 months following your most recent placement through the network.</p>
    </div>
  </div>

  <div style={{marginTop:28,marginBottom:8}}>
    <div style={{fontFamily:"var(--mono)",fontSize:11,fontWeight:700,letterSpacing:"0.08em",color:"#1b5e3b",marginBottom:14,textTransform:"uppercase"}}>Confirm each item to proceed</div>
    {[
      "I understand this test takes 45–60 minutes and I'm ready to commit the time",
      "I will provide thoughtful, detailed answers — not one-liners",
      "My video will be hosted externally (Google Drive / YouTube / Vimeo) and linked, not uploaded directly",
      "I have read and understand the Intellectual Property & Content Rights Notice above, and I agree that all content I submit becomes the property of Aekovera and/or the respective partner brand",
      "I understand and accept that Aekovera and its partner brands may use, modify, and distribute my submitted content without additional compensation and without limitation on medium, territory, or time — and I waive any moral rights to the extent permitted by law",
      "I acknowledge the 20% commission structure for all projects sourced through the Aekovera Talent Network for 12 months following my most recent placement",
    ].map((label,i)=>(
      <label key={i} style={{...S.checkItem,...(i>=3?{borderColor:"#d4900a",background:"#fffdf8"}:{})}}>
        <input type="checkbox" checked={wc[i]} onChange={()=>{const n=[...wc];n[i]=!n[i];setWc(n);}} style={S.cb}/>
        <span style={{fontSize:14,lineHeight:1.4}}>{label}</span>
      </label>
    ))}
  </div>
  {errors.welcome&&<div style={S.error}>{errors.welcome}</div>}
</div>)}

{/* ═══════ PROFILE ═══════ */}
{step===1&&(<div>
  <h2 style={S.secTitle}>Tell us about yourself</h2>
  <p style={S.secDesc}>Basic info so the Aekovera team knows who you are and how to reach you.</p>
  <F label="Full Name *" error={errors.full_name}><input style={S.input} value={form.full_name} onChange={e=>set("full_name",e.target.value)} placeholder="Your full name"/></F>
  <F label="Email Address *" error={errors.email}><input style={S.input} type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com"/></F>
  <F label="Primary Social Handle *" error={errors.primary_handle} hint="Your main TikTok, Instagram, or YouTube handle"><input style={S.input} value={form.primary_handle} onChange={e=>set("primary_handle",e.target.value)} placeholder="@yourhandle"/></F>
  <F label="Other Social Links" hint="Any additional profiles (comma-separated)"><input style={S.input} value={form.other_socials} onChange={e=>set("other_socials",e.target.value)} placeholder="https://youtube.com/... , https://linkedin.com/..."/></F>
  <F label="Location *" error={errors.location}><input style={S.input} value={form.location} onChange={e=>set("location",e.target.value)} placeholder="City, State/Country"/></F>
  <F label="Years of Content Creation Experience *" error={errors.experience_years}>
    <div style={S.rGroup}>{["Less than 1 year","1–2 years","3–5 years","5+ years"].map(o=><label key={o} style={S.rLabel}><input type="radio" name="exp" checked={form.experience_years===o} onChange={()=>set("experience_years",o)} style={S.radio}/><span>{o}</span></label>)}</div>
  </F>
</div>)}

{/* ═══════ AEKOVERA BRIEF ═══════ */}
{step===2&&(<div>
  <h2 style={S.secTitle}>Pillar 1 & 2 — Aekovera: Brand Study + Video</h2>
  <p style={S.secDesc}>Visit <a href="https://aekovera.com" target="_blank" rel="noopener" style={S.link}>aekovera.com</a> and study the brand thoroughly. Then answer the brand comprehension questions AND submit a test video.</p>
  <div style={S.badge}>40 points total</div>
  <div style={S.briefCard}><div style={S.briefLabel}>📋 ABOUT AEKOVERA</div><p style={{fontSize:14,lineHeight:1.7,color:"#555",margin:0}}>{AEKOVERA_BRIEF.desc}</p></div>
  <div style={{fontFamily:"var(--mono)",fontSize:12,fontWeight:700,letterSpacing:"0.06em",color:"#1b5e3b",marginTop:28,marginBottom:16}}>BRAND COMPREHENSION (20 pts)</div>
  <F label="Q1: In 2 sentences, describe who Aekovera's ideal customer is. *" error={errors.brand_customer}><textarea style={S.ta} rows={3} value={form.brand_customer} onChange={e=>set("brand_customer",e.target.value)} placeholder="Think about who would actually buy their services and why..."/><CC value={form.brand_customer} min={MC.brand_customer}/></F>
  <F label="Q2: What emotion or feeling should Aekovera's content always leave the viewer with? *" error={errors.brand_emotion}><textarea style={S.ta} rows={3} value={form.brand_emotion} onChange={e=>set("brand_emotion",e.target.value)} placeholder="Go beyond 'trust' — be specific about the feeling..."/><CC value={form.brand_emotion} min={MC.brand_emotion}/></F>
  <F label="Q3: Name 3 competitors and explain in one sentence how Aekovera is different from each. *" error={errors.brand_competitors}><textarea style={S.ta} rows={5} value={form.brand_competitors} onChange={e=>set("brand_competitors",e.target.value)} placeholder={"Competitor 1: ... — Aekovera differs because...\nCompetitor 2: ...\nCompetitor 3: ..."}/><CC value={form.brand_competitors} min={MC.brand_competitors}/></F>
  <F label="Q4: What's one content hook that would work on TikTok for Aekovera? *" error={errors.brand_hook}><textarea style={S.ta} rows={3} value={form.brand_hook} onChange={e=>set("brand_hook",e.target.value)} placeholder="Describe the hook — what grabs them in the first 3 seconds?"/><CC value={form.brand_hook} min={MC.brand_hook}/></F>
  <F label="Q5: What's one thing you would NOT do in content for Aekovera, and why? *" error={errors.brand_avoid}><textarea style={S.ta} rows={3} value={form.brand_avoid} onChange={e=>set("brand_avoid",e.target.value)} placeholder="Show us you understand brand boundaries..."/><CC value={form.brand_avoid} min={MC.brand_avoid}/></F>
  <div style={{fontFamily:"var(--mono)",fontSize:12,fontWeight:700,letterSpacing:"0.06em",color:"#1b5e3b",marginTop:32,marginBottom:16}}>VIDEO SUBMISSION (20 pts)</div>
  <div style={S.taskBox}><div style={S.taskTag}>TASK — Aekovera Video (60 sec max)</div><p style={{fontSize:14,color:"#555",lineHeight:1.6,margin:"0 0 8px"}}>Create a <strong>60-second max video</strong> that could be posted on Instagram or TikTok promoting what Aekovera does. Full creative control. Study the website before you shoot.</p><p style={{fontSize:13,color:"#888",fontStyle:"italic",margin:0}}>Upload to Google Drive (set to "Anyone with link"), YouTube (unlisted), or Vimeo — paste the link below.</p></div>
  <F label="Video Link *" error={errors.aekovera_video_link}><input style={S.input} value={form.aekovera_video_link} onChange={e=>set("aekovera_video_link",e.target.value)} placeholder="https://drive.google.com/... or https://youtu.be/..."/></F>
  <F label="Describe your creative intention for this video *" error={errors.aekovera_creative_intention} hint="What was your strategy? Why these choices?"><textarea style={S.ta} rows={4} value={form.aekovera_creative_intention} onChange={e=>set("aekovera_creative_intention",e.target.value)} placeholder="Explain your hook, visual style, and what you wanted the viewer to feel..."/><CC value={form.aekovera_creative_intention} min={MC.aekovera_creative_intention}/></F>
</div>)}

{/* ═══════ ZORAH & CO. BRIEF ═══════ */}
{step===3&&(<div>
  <h2 style={S.secTitle}>Pillar 3 — Zorah & Co.: Written Content Concept</h2>
  <p style={S.secDesc}>Read the brand brief below carefully. Then create a content concept for Zorah & Co.'s <strong>new Aleppo Pepper & Mint Finishing Oil</strong>. You do NOT need to film anything — this is a written concept only.</p>
  <div style={S.badge}>20 points</div>
  <div style={{...S.briefCard,borderColor:"#c17d24"}}><div style={{...S.briefLabel,color:"#9a6319"}}>📋 THE BRIEF — ZORAH & CO.</div><div style={{fontSize:12,fontFamily:"var(--mono)",color:"#9a6319",marginBottom:8,fontWeight:600}}>"{FICTIONAL_BRIEF.tagline}" — <a href={`https://${FICTIONAL_BRIEF.site}`} target="_blank" rel="noopener" style={{color:"#9a6319"}}>{FICTIONAL_BRIEF.site}</a></div><p style={{fontSize:14,lineHeight:1.7,color:"#555",margin:0,whiteSpace:"pre-line"}}>{FICTIONAL_BRIEF.desc}</p></div>
  <F label="Your full content concept for Zorah & Co.'s Aleppo Pepper & Mint Finishing Oil *" error={errors.fictional_brand_concept} hint="Describe the full piece — format, narrative arc, tone, key messaging"><textarea style={S.ta} rows={8} value={form.fictional_brand_concept} onChange={e=>set("fictional_brand_concept",e.target.value)} placeholder="Describe the full content piece from start to finish..."/><CC value={form.fictional_brand_concept} min={MC.fictional_brand_concept}/></F>
  <F label="The hook — what are the first 3 seconds? *" error={errors.fictional_brand_hook}><textarea style={S.ta} rows={3} value={form.fictional_brand_hook} onChange={e=>set("fictional_brand_hook",e.target.value)} placeholder="Write the exact opening — what does the viewer see and hear?"/><CC value={form.fictional_brand_hook} min={MC.fictional_brand_hook}/></F>
  <F label="Visual description *" error={errors.fictional_brand_visual} hint="Describe what the viewer sees — shots, transitions, text overlays"><textarea style={S.ta} rows={5} value={form.fictional_brand_visual} onChange={e=>set("fictional_brand_visual",e.target.value)} placeholder={"Shot 1: Close-up of the Aleppo Pepper & Mint oil being drizzled over a dish...\nShot 2: ...\nText overlay: ..."}/><CC value={form.fictional_brand_visual} min={MC.fictional_brand_visual}/></F>
  <F label="Target platform *" error={errors.fictional_brand_platform}><input style={S.input} value={form.fictional_brand_platform} onChange={e=>set("fictional_brand_platform",e.target.value)} placeholder="e.g., Instagram Reels, TikTok"/></F>
  <F label="CTA (call to action)"><input style={S.input} value={form.fictional_brand_cta} onChange={e=>set("fictional_brand_cta",e.target.value)} placeholder="e.g., 'Link in bio for 15% off'"/></F>
  <F label="Why would this content work for Zorah & Co.'s audience? *" error={errors.fictional_brand_why}><textarea style={S.ta} rows={4} value={form.fictional_brand_why} onChange={e=>set("fictional_brand_why",e.target.value)} placeholder="Explain your strategic thinking..."/><CC value={form.fictional_brand_why} min={MC.fictional_brand_why}/></F>
</div>)}

{/* ═══════ CAMPAIGN STRATEGY ═══════ */}
{step===4&&(<div>
  <h2 style={S.secTitle}>Pillar 4 — Campaign Strategy</h2>
  <p style={S.secDesc}>A new oat-based protein bar is launching next month targeting gym-going 25–35 year olds. Design a 3-post campaign: awareness → social proof → conversion.</p>
  <div style={S.badge}>20 points</div>
  {[{key:"campaign_post1",label:"Post 1 — Awareness",hint:"Introduce the product. Platform, format, hook, visuals, CTA."},{key:"campaign_post2",label:"Post 2 — Social Proof",hint:"Build credibility. How do you prove it works?"},{key:"campaign_post3",label:"Post 3 — Conversion",hint:"Drive the purchase. What's the final push?"}].map(({key,label,hint})=>(<F key={key} label={`${label} *`} error={errors[key]} hint={hint}><textarea style={S.ta} rows={5} value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={"Platform: ...\nFormat: ...\nHook: ...\nVisuals: ...\nCTA: ..."}/><CC value={form[key]} min={MC[key]}/></F>))}
  <F label="Why did you structure the campaign this way? *" error={errors.campaign_rationale}><textarea style={S.ta} rows={4} value={form.campaign_rationale} onChange={e=>set("campaign_rationale",e.target.value)} placeholder="Explain your strategic reasoning..."/><CC value={form.campaign_rationale} min={MC.campaign_rationale}/></F>
</div>)}

{/* ═══════ PLATFORM FLUENCY ═══════ */}
{step===5&&(<div>
  <h2 style={S.secTitle}>Pillar 5 — Platform Fluency</h2>
  <p style={S.secDesc}>Your tools, platforms, and strengths — so we can match you with the right CPG clients.</p>
  <F label="Which platforms do you create for? *" error={errors.platforms}><div style={S.checkGrid}>{PLAT.map(o=><label key={o} style={S.checkItem}><input type="checkbox" checked={form.platforms.includes(o)} onChange={()=>tog("platforms",o)} style={S.cb}/><span>{o}</span></label>)}</div></F>
  <F label="Primary editing software *" error={errors.editing_software}><div style={S.rGroup}>{SW.map(o=><label key={o} style={S.rLabel}><input type="radio" name="sw" checked={form.editing_software===o} onChange={()=>set("editing_software",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="Content style *" error={errors.content_style}><div style={S.rGroup}>{STY.map(o=><label key={o} style={S.rLabel}><input type="radio" name="sty" checked={form.content_style===o} onChange={()=>set("content_style",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="Average turnaround time per video *" error={errors.turnaround}><div style={S.rGroup}>{TURN.map(o=><label key={o} style={S.rLabel}><input type="radio" name="turn" checked={form.turnaround===o} onChange={()=>set("turnaround",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="Strongest content categories *" error={errors.strongest_category} hint="Select all that apply"><div style={S.checkGrid}>{CAT.map(o=><label key={o} style={S.checkItem}><input type="checkbox" checked={form.strongest_category.includes(o)} onChange={()=>tog("strongest_category",o)} style={S.cb}/><span>{o}</span></label>)}</div></F>
</div>)}

{/* ═══════ PROFESSIONALISM + HOURLY RATE ═══════ */}
{step===6&&(<div>
  <h2 style={S.secTitle}>Pillar 6 — Professionalism</h2>
  <p style={S.secDesc}>The business side. Our CPG clients care about reliability as much as creativity.</p>
  <F label="Your rate per short-form video *" error={errors.rate_range}><div style={S.rGroup}>{PV_RATE.map(o=><label key={o} style={S.rLabel}><input type="radio" name="rate" checked={form.rate_range===o} onChange={()=>set("rate_range",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>

  {/* ── HOURLY RATE RANGE SLIDER ── */}
  <div style={{marginBottom:26}}>
    <label style={S.label}>Acceptable Hourly Rate Range *</label>
    <div style={S.hint}>We work with CPG brands of all sizes. Setting a wider range means more opportunities. Most current projects pay <strong style={{color:"#1b5e3b"}}>$10–$25/hr</strong>, with premium projects going higher.</div>
    <div style={{background:"#fff",border:"1.5px solid #ddd9d3",borderRadius:12,padding:"20px 24px",marginTop:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"var(--mono)",fontSize:11,color:"#888",marginBottom:4}}>MINIMUM</div>
          <div style={{fontSize:28,fontWeight:800,color:"#1b5e3b",fontFamily:"var(--mono)"}}>${form.hourly_min}</div>
          <div style={{fontFamily:"var(--mono)",fontSize:11,color:"#888"}}>/hr</div>
        </div>
        <div style={{fontSize:24,color:"#ccc",fontWeight:300}}>—</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"var(--mono)",fontSize:11,color:"#888",marginBottom:4}}>MAXIMUM</div>
          <div style={{fontSize:28,fontWeight:800,color:"#1b5e3b",fontFamily:"var(--mono)"}}>${form.hourly_max}</div>
          <div style={{fontFamily:"var(--mono)",fontSize:11,color:"#888"}}>/hr</div>
        </div>
      </div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#888",marginBottom:4}}><span>Min: ${form.hourly_min}/hr</span><span>$5 — $100</span></div>
        <input type="range" min={5} max={100} step={5} value={form.hourly_min} onChange={e=>{const v=Number(e.target.value);set("hourly_min",Math.min(v,form.hourly_max));}} style={{width:"100%",accentColor:"#1b5e3b"}}/>
      </div>
      <div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#888",marginBottom:4}}><span>Max: ${form.hourly_max}/hr</span><span>$5 — $100</span></div>
        <input type="range" min={5} max={100} step={5} value={form.hourly_max} onChange={e=>{const v=Number(e.target.value);set("hourly_max",Math.max(v,form.hourly_min));}} style={{width:"100%",accentColor:"#1b5e3b"}}/>
      </div>
      {/* Sweet spot indicator */}
      <div style={{background:form.hourly_min<=25&&form.hourly_max>=10?"#e8f5ef":"#fff3e0",borderRadius:8,padding:"10px 14px",marginTop:12,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16}}>{form.hourly_min<=25&&form.hourly_max>=10?"✓":"⚠️"}</span>
        <span style={{fontSize:13,color:form.hourly_min<=25&&form.hourly_max>=10?"#1b5e3b":"#b37a00",lineHeight:1.4}}>
          {form.hourly_min<=25&&form.hourly_max>=10
            ?"Your range covers the $10–$25/hr sweet spot where most current projects land. You'll also be considered for higher-paying projects within your max."
            :form.hourly_min>25
            ?"Your minimum is above the $10–$25/hr range where most current projects land. This will reduce your match opportunities, but you'll be prioritized for premium projects."
            :"Tip: Expanding your range to include $10–$25/hr will significantly increase your match opportunities."}
        </span>
      </div>
    </div>
    {errors.hourly_range&&<div style={S.error}>{errors.hourly_range}</div>}
  </div>

  <F label="Rate notes (optional)" hint="Packages, bulk discounts, etc."><textarea style={S.ta} rows={2} value={form.rate_notes} onChange={e=>set("rate_notes",e.target.value)} placeholder="E.g., 3-video package at $600..."/></F>
  <F label="Revision policy *" error={errors.revision_policy}><div style={S.rGroup}>{REV.map(o=><label key={o} style={S.rLabel}><input type="radio" name="rev" checked={form.revision_policy===o} onChange={()=>set("revision_policy",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="Experience with brand briefs *" error={errors.brand_brief_experience}><div style={S.rGroup}>{BEXP.map(o=><label key={o} style={S.rLabel}><input type="radio" name="br" checked={form.brand_brief_experience===o} onChange={()=>set("brand_brief_experience",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="Preferred communication method *" error={errors.communication_pref}><div style={S.rGroup}>{COMM.map(o=><label key={o} style={S.rLabel}><input type="radio" name="cm" checked={form.communication_pref===o} onChange={()=>set("communication_pref",o)} style={S.radio}/><span>{o}</span></label>)}</div></F>
  <F label="What happens if a client is unhappy with a deliverable? *" error={errors.unhappy_client}><textarea style={S.ta} rows={4} value={form.unhappy_client} onChange={e=>set("unhappy_client",e.target.value)} placeholder="How do you handle feedback, disagreements, or rework?"/><CC value={form.unhappy_client} min={MC.unhappy_client}/></F>
  <F label="Anything else you'd like us to know?"><textarea style={S.ta} rows={3} value={form.anything_else} onChange={e=>set("anything_else",e.target.value)} placeholder="Optional — awards, notable clients, unique skills..."/></F>
</div>)}

{/* ═══════ PORTFOLIO ═══════ */}
{step===7&&(<div>
  <h2 style={S.secTitle}>Portfolio & Additional Links</h2>
  <p style={S.secDesc}>Add as many links as you'd like — portfolio sites, social profiles, past brand work, case studies, demo reels. The more we can see, the better we can match you.</p>
  {errors.portfolio_links&&<div style={S.error}>{errors.portfolio_links}</div>}
  {form.portfolio_links.map((lnk,i)=>(
    <div key={i} style={S.linkCard}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontFamily:"var(--mono)",fontSize:11,fontWeight:700,color:"#1b5e3b"}}>LINK {i+1}</span>
        {form.portfolio_links.length>1&&<button onClick={()=>rmL(i)} style={S.removeBtn}>✕ Remove</button>}
      </div>
      <div style={{marginBottom:10}}><label style={{fontSize:12,fontWeight:600,color:"#666",marginBottom:4,display:"block"}}>Type</label><select style={S.select} value={lnk.type} onChange={e=>upL(i,"type",e.target.value)}>{LTYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
      <div style={{marginBottom:10}}><label style={{fontSize:12,fontWeight:600,color:"#666",marginBottom:4,display:"block"}}>URL *</label><input style={S.input} value={lnk.url} onChange={e=>upL(i,"url",e.target.value)} placeholder="https://..."/></div>
      <div><label style={{fontSize:12,fontWeight:600,color:"#666",marginBottom:4,display:"block"}}>Description (optional)</label><input style={S.input} value={lnk.label} onChange={e=>upL(i,"label",e.target.value)} placeholder="e.g., 'Brand campaign for XYZ Snacks'"/></div>
    </div>
  ))}
  <button onClick={addL} style={S.addLinkBtn}>＋ Add another link</button>
</div>)}

{/* ═══════ RIGHTS & CONSENT (FULL LEGAL) ═══════ */}
{step===8&&(<div>
  <h2 style={S.secTitle}>Content Rights & Legal Consent</h2>
  <p style={S.secDesc}>These are binding agreements. Please read each section carefully and consent individually. These terms were outlined in the IP Notice on the welcome page — here you formally consent to each.</p>

  <div style={S.consentCard}>
    <div style={{...S.consentLabel,color:"#1b5e3b"}}>1. AEKOVERA — INTELLECTUAL PROPERTY ASSIGNMENT</div>
    <p style={S.consentText}>I hereby irrevocably assign to <strong>Aekovera</strong> all rights, title, and interest — including but not limited to copyright, reproduction rights, distribution rights, the right to create derivative works, and the right to sublicense — in any and all content I submit as part of this talent test, including video submissions, written answers, and strategic concepts. I acknowledge that Aekovera may use, modify, adapt, publish, distribute, and display this content across any medium (including social media, websites, paid advertising, client presentations, pitch decks, email marketing, and print) without limitation on time, territory, or format, and without additional compensation beyond any fees agreed upon if I am selected for the talent network. I will not assert any copyright or intellectual property claims against Aekovera for content submitted through this test.</p>
    <label style={S.consentCheck}><input type="checkbox" checked={form.rights_aekovera} onChange={()=>set("rights_aekovera",!form.rights_aekovera)} style={S.cb}/><span>I agree to assign all IP rights to Aekovera as described above *</span></label>
    {errors.rights_aekovera&&<div style={S.error}>{errors.rights_aekovera}</div>}
  </div>

  <div style={{...S.consentCard,borderColor:"#c17d24"}}>
    <div style={{...S.consentLabel,color:"#9a6319"}}>2. ZORAH & CO. (FICTIONAL BRAND) — CONTENT RIGHTS</div>
    <p style={S.consentText}>I hereby irrevocably assign to <strong>Zorah & Co.</strong> (a fictional brand owned and operated by Aekovera for talent evaluation purposes) all rights, title, and interest in any written content concepts, campaign ideas, hook copy, visual descriptions, and strategic materials I submit for the Zorah & Co. brand as part of this talent test. Since Zorah & Co. is a fictional brand created by Aekovera, all IP rights in submitted content transfer to and are held by <strong>Aekovera</strong>. Aekovera may use, modify, adapt, and build upon my submitted concepts for marketing, product launches, advertising, talent evaluation, and any other commercial purposes without limitation and without additional compensation. I will not assert any copyright or intellectual property claims against Aekovera for content submitted through this test.</p>
    <label style={S.consentCheck}><input type="checkbox" checked={form.rights_fictional_brand} onChange={()=>set("rights_fictional_brand",!form.rights_fictional_brand)} style={S.cb}/><span>I agree to assign all IP rights to Zorah & Co. as described above *</span></label>
    {errors.rights_fictional_brand&&<div style={S.error}>{errors.rights_fictional_brand}</div>}
  </div>

  <div style={S.consentCard}>
    <div style={{...S.consentLabel,color:"#555"}}>3. MORAL RIGHTS WAIVER & PORTFOLIO RETENTION</div>
    <p style={S.consentText}>To the fullest extent permitted by applicable law, I waive any and all moral rights in the submitted works, including but not limited to: the right to be identified as the author of the works; the right to object to derogatory treatment, modification, or adaptation of the works; and the right to object to the works being attributed to another party. I understand that Aekovera and its partner brands may publish the content under their own brand names without crediting me as the creator.</p>
    <p style={S.consentText}><strong>Portfolio exception:</strong> I retain a non-exclusive, non-transferable right to display the content I created in my personal portfolio, showreel, or case studies solely for the purpose of demonstrating my creative abilities — provided that such display does not compete with or undermine any commercial use by Aekovera or its partner brands, and provided I do not represent the content as being exclusively my property.</p>
    <label style={S.consentCheck}><input type="checkbox" checked={form.rights_moral} onChange={()=>set("rights_moral",!form.rights_moral)} style={S.cb}/><span>I agree to waive moral rights and understand the portfolio retention terms *</span></label>
    {errors.rights_moral&&<div style={S.error}>{errors.rights_moral}</div>}
  </div>

  <div style={S.consentCard}>
    <div style={{...S.consentLabel,color:"#555"}}>4. ORIGINALITY WARRANTY, COMMISSION & GENERAL TERMS</div>
    <p style={S.consentText}>I represent and warrant that: (a) all content submitted in this application is my own original work; (b) the content does not infringe on any third-party intellectual property rights, privacy rights, or any other rights; (c) the content has not been previously assigned, licensed, or encumbered in any way that would conflict with the assignments above; and (d) I have the full legal authority to make these assignments. I shall indemnify and hold harmless Aekovera and its partner brands from and against any claims, damages, losses, or expenses arising from a breach of this warranty.</p>
    <p style={S.consentText}>I acknowledge that <strong>Aekovera</strong> operates as a talent network connecting freelancers with CPG brand clients, and that a <strong>20% commission</strong> applies to all projects, engagements, and compensation sourced through the Aekovera Talent Network for a period of <strong>12 months</strong> following my most recent placement through the network. I agree to be contacted regarding potential client opportunities if accepted.</p>
    <label style={S.consentCheck}><input type="checkbox" checked={form.rights_general} onChange={()=>set("rights_general",!form.rights_general)} style={S.cb}/><span>I agree to the originality warranty, commission structure, and general terms *</span></label>
    {errors.rights_general&&<div style={S.error}>{errors.rights_general}</div>}
  </div>
</div>)}

{/* ═══════ REVIEW ═══════ */}
{step===9&&(<div>
  <h2 style={S.secTitle}>Review Your Application</h2>
  <p style={S.secDesc}>Double-check everything before submitting. You cannot edit after submission.</p>
  <RB title="Profile"><RI label="Name" value={form.full_name}/><RI label="Email" value={form.email}/><RI label="Handle" value={form.primary_handle}/><RI label="Location" value={form.location}/><RI label="Experience" value={form.experience_years}/></RB>
  <RB title="Aekovera — Brand Comprehension & Video"><RI label="Ideal Customer" value={form.brand_customer} long/><RI label="Brand Emotion" value={form.brand_emotion} long/><RI label="Competitors" value={form.brand_competitors} long/><RI label="Hook Idea" value={form.brand_hook} long/><RI label="What to Avoid" value={form.brand_avoid} long/><RI label="Video Link" value={form.aekovera_video_link}/><RI label="Creative Intention" value={form.aekovera_creative_intention} long/></RB>
  <RB title="Zorah & Co. — Content Concept"><RI label="Full Concept" value={form.fictional_brand_concept} long/><RI label="Hook" value={form.fictional_brand_hook} long/><RI label="Visuals" value={form.fictional_brand_visual} long/><RI label="Platform" value={form.fictional_brand_platform}/><RI label="CTA" value={form.fictional_brand_cta}/><RI label="Strategic Rationale" value={form.fictional_brand_why} long/></RB>
  <RB title="Campaign Strategy"><RI label="Post 1" value={form.campaign_post1} long/><RI label="Post 2" value={form.campaign_post2} long/><RI label="Post 3" value={form.campaign_post3} long/><RI label="Rationale" value={form.campaign_rationale} long/></RB>
  <RB title="Platform & Professionalism"><RI label="Platforms" value={form.platforms.join(", ")}/><RI label="Software" value={form.editing_software}/><RI label="Style" value={form.content_style}/><RI label="Turnaround" value={form.turnaround}/><RI label="Per-Video Rate" value={form.rate_range}/><RI label="Hourly Range" value={`$${form.hourly_min}/hr — $${form.hourly_max}/hr`}/><RI label="Revisions" value={form.revision_policy}/><RI label="Brief Experience" value={form.brand_brief_experience}/><RI label="Communication" value={form.communication_pref}/></RB>
  <RB title="Portfolio Links">{form.portfolio_links.filter(l=>l.url.trim()).map((l,i)=><RI key={i} label={l.type} value={`${l.url}${l.label?` — ${l.label}`:""}`}/>)}</RB>
  <RB title="Rights & Consent"><RI label="Aekovera IP Assignment" value={form.rights_aekovera?"✓ Agreed":"✗ Not agreed"}/><RI label="Zorah & Co. IP Assignment" value={form.rights_fictional_brand?"✓ Agreed":"✗ Not agreed"}/><RI label="Moral Rights Waiver" value={form.rights_moral?"✓ Agreed":"✗ Not agreed"}/><RI label="General Terms & Commission" value={form.rights_general?"✓ Agreed":"✗ Not agreed"}/></RB>
  <div style={{background:"#e8f5ef",border:"2px solid #1b5e3b",borderRadius:14,padding:28,textAlign:"center",marginTop:32}}>
    <p style={{fontSize:14,color:"#555",marginBottom:20,lineHeight:1.6}}>By submitting, you confirm all work is original, all links are accessible, and you have formally consented to the IP assignment, moral rights waiver, and commission terms above.</p>
    {submitError&&<p style={{color:"#c4392d",fontWeight:600,fontSize:14,marginBottom:16}}>{submitError}</p>}
    <button style={{...S.submitBtn,opacity:submitting?0.6:1,cursor:submitting?"wait":"pointer"}} onClick={submit} disabled={submitting}>{submitting?"Submitting...":"Submit Application to Aekovera ✦"}</button>
  </div>
</div>)}

      </div>
      <div style={S.nav}>
        {step>0&&<button style={S.backBtn} onClick={prev}>← Back</button>}
        <div style={{flex:1}}/>
        <div style={{fontFamily:"var(--mono)",fontSize:11,color:"#999",alignSelf:"center",marginRight:12}}>{step+1}/{SECTIONS.length}</div>
        {step<SECTIONS.length-1&&<button style={S.nextBtn} onClick={next}>{step===0?"Begin Test →":"Continue →"}</button>}
      </div>
    </div>
  );
}

const S = {
  root:{"--display":"'Playfair Display','Georgia',serif","--body":"'Source Sans 3','Segoe UI',sans-serif","--mono":"'DM Mono','SF Mono','Consolas',monospace",fontFamily:"var(--body)",background:"#faf9f7",color:"#1a1a18",minHeight:"100vh",display:"flex",flexDirection:"column"},
  topBar:{padding:"16px 24px 8px",borderBottom:"1px solid #e8e5e0"},
  logoRow:{display:"flex",alignItems:"center",gap:8},
  logoMark:{fontSize:20,color:"#1b5e3b",fontWeight:800},
  logoText:{fontFamily:"var(--mono)",fontSize:14,fontWeight:800,letterSpacing:"0.12em",color:"#1b5e3b"},
  logoDivider:{color:"#ccc",fontSize:14},
  logoSub:{fontFamily:"var(--mono)",fontSize:12,color:"#888",fontWeight:500},
  progressTrack:{height:3,background:"#e8e5e0"},
  progressFill:{height:"100%",background:"linear-gradient(90deg,#1b5e3b,#2d9d72)",transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"},
  dotRow:{display:"flex",justifyContent:"center",gap:6,padding:"14px 16px 6px",flexWrap:"wrap"},
  dot:{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s ease",flexShrink:0},
  body:{flex:1,padding:"8px 24px 120px",maxWidth:660,margin:"0 auto",width:"100%",boxSizing:"border-box"},
  stepLabel:{fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"#1b5e3b",marginBottom:8,fontWeight:600},
  heroTitle:{fontFamily:"var(--display)",fontSize:34,fontWeight:800,lineHeight:1.15,margin:"0 0 16px",letterSpacing:"-0.02em"},
  heroBanner:{background:"linear-gradient(135deg,#1b5e3b 0%,#2d8a5e 100%)",borderRadius:12,padding:3,marginBottom:20},
  heroBannerInner:{background:"rgba(255,255,255,0.95)",borderRadius:10,padding:"16px 20px",fontSize:15,lineHeight:1.65,color:"#333"},
  heroSub:{fontSize:15,color:"#555",lineHeight:1.7,margin:"0 0 24px"},
  infoCard:{background:"#f4f2ee",border:"1px solid #ddd9d3",borderRadius:12,padding:"20px 24px"},
  secTitle:{fontFamily:"var(--display)",fontSize:24,fontWeight:800,margin:"0 0 8px",letterSpacing:"-0.01em"},
  secDesc:{fontSize:15,color:"#555",lineHeight:1.65,margin:"0 0 20px"},
  badge:{display:"inline-block",fontFamily:"var(--mono)",fontSize:11,fontWeight:700,color:"#1b5e3b",background:"#e8f5ef",padding:"5px 14px",borderRadius:20,marginBottom:24,letterSpacing:"0.05em"},
  briefCard:{background:"#fff",border:"2px solid #1b5e3b",borderRadius:12,padding:"20px 24px",marginBottom:24},
  briefLabel:{fontFamily:"var(--mono)",fontSize:12,fontWeight:800,letterSpacing:"0.08em",color:"#1b5e3b",marginBottom:10},
  taskBox:{background:"#f4f2ee",border:"1px solid #ddd9d3",borderRadius:12,padding:"20px 24px",marginBottom:20},
  taskTag:{fontFamily:"var(--mono)",fontSize:12,fontWeight:700,letterSpacing:"0.06em",color:"#1b5e3b",marginBottom:10},
  label:{display:"block",fontSize:14,fontWeight:600,marginBottom:6,color:"#1a1a18"},
  hint:{fontSize:13,color:"#888",marginBottom:8,lineHeight:1.4},
  input:{width:"100%",padding:"12px 14px",fontSize:15,fontFamily:"var(--body)",border:"1.5px solid #ddd9d3",borderRadius:8,background:"#fff",color:"#1a1a18",outline:"none",boxSizing:"border-box"},
  select:{width:"100%",padding:"12px 14px",fontSize:15,fontFamily:"var(--body)",border:"1.5px solid #ddd9d3",borderRadius:8,background:"#fff",color:"#1a1a18",outline:"none",boxSizing:"border-box"},
  ta:{width:"100%",padding:"12px 14px",fontSize:15,fontFamily:"var(--body)",border:"1.5px solid #ddd9d3",borderRadius:8,background:"#fff",color:"#1a1a18",outline:"none",resize:"vertical",lineHeight:1.6,boxSizing:"border-box"},
  checkGrid:{display:"flex",flexWrap:"wrap",gap:8},
  checkItem:{display:"flex",alignItems:"flex-start",gap:8,fontSize:14,color:"#555",padding:"10px 14px",borderRadius:8,border:"1px solid #ddd9d3",background:"#fff",cursor:"pointer",lineHeight:1.4,minWidth:"fit-content",marginBottom:6},
  cb:{marginTop:2,accentColor:"#1b5e3b",flexShrink:0},
  rGroup:{display:"flex",flexDirection:"column",gap:6},
  rLabel:{display:"flex",alignItems:"center",gap:8,fontSize:14,color:"#555",padding:"10px 14px",borderRadius:8,border:"1px solid #ddd9d3",background:"#fff",cursor:"pointer"},
  radio:{accentColor:"#1b5e3b",flexShrink:0},
  error:{color:"#c4392d",fontSize:13,marginTop:6,fontWeight:600},
  link:{color:"#1b5e3b",fontWeight:600,textDecoration:"underline"},
  linkCard:{background:"#fff",border:"1.5px solid #ddd9d3",borderRadius:12,padding:"18px 20px",marginBottom:14},
  removeBtn:{background:"none",border:"none",color:"#c4392d",fontSize:12,fontFamily:"var(--mono)",fontWeight:600,cursor:"pointer",padding:"4px 8px"},
  addLinkBtn:{display:"block",width:"100%",padding:"14px",fontSize:15,fontWeight:700,color:"#1b5e3b",background:"#e8f5ef",border:"2px dashed #6aba8e",borderRadius:12,cursor:"pointer",fontFamily:"var(--body)",marginTop:8},
  consentCard:{background:"#fff",border:"2px solid #1b5e3b",borderRadius:12,padding:"24px",marginBottom:20},
  consentLabel:{fontFamily:"var(--mono)",fontSize:12,fontWeight:800,letterSpacing:"0.08em",marginBottom:10},
  consentText:{fontSize:14,lineHeight:1.7,color:"#555",margin:"0 0 16px"},
  consentCheck:{display:"flex",alignItems:"flex-start",gap:10,fontSize:14,fontWeight:600,color:"#333",cursor:"pointer",padding:"10px 14px",borderRadius:8,background:"#f4f2ee"},
  submitBtn:{background:"#1b5e3b",color:"#fff",border:"none",padding:"16px 44px",fontSize:17,fontFamily:"var(--display)",fontWeight:800,borderRadius:10,cursor:"pointer",letterSpacing:"0.02em"},
  nav:{position:"fixed",bottom:0,left:0,right:0,display:"flex",padding:"12px 24px",background:"rgba(250,249,247,0.96)",backdropFilter:"blur(10px)",borderTop:"1px solid #ddd9d3",zIndex:20},
  backBtn:{background:"none",border:"1.5px solid #ddd9d3",padding:"10px 20px",fontSize:14,fontFamily:"var(--body)",fontWeight:600,borderRadius:8,cursor:"pointer",color:"#555"},
  nextBtn:{background:"#1b5e3b",color:"#fff",border:"none",padding:"10px 28px",fontSize:14,fontFamily:"var(--body)",fontWeight:700,borderRadius:8,cursor:"pointer"},
};
