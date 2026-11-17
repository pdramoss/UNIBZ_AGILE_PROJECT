import React, { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import { request } from "../api";
import { formatPersonName, formatProgramme } from "../utils/formatters";

export default function Profile({user,onSaved}) {
  const [form,setForm] = useState({name:user.name,programme:user.programme||"",campus:user.campus||"",bio:user.bio||""});
  const [busy,setBusy] = useState(false); const [error,setError] = useState(""); const [editing,setEditing] = useState(false);
  useEffect(()=>setForm({name:user.name,programme:user.programme||"",campus:user.campus||"",bio:user.bio||""}),[user]);
  async function save(e) { e.preventDefault();setBusy(true);setError("");try{const d=await request("/profile",{method:"PUT",body:JSON.stringify(form)});onSaved(d.user);setEditing(false);}catch(err){setError(err.message);}finally{setBusy(false);}}
  return <><PageHero kicker="YOUR OUTERHEAVEN ACCOUNT" title={<>Your student profile.<br/><em>Your details, in one place.</em></>} subtitle="View and update the basic information connected to your OuterHeaven account."/>
    <section className="section profile-section"><div className="profile-card"><div className="profile-head"><div className="profile-avatar">{user.name[0].toUpperCase()}</div><div><span className="section-kicker">ACCOUNT DETAILS</span><h2>{user.name}</h2><p>{user.email} · <span className="role-tag">{user.role}</span></p></div></div>
      {!editing ? <div className="profile-summary"><div><span>FULL NAME</span><strong>{user.name}</strong></div><div><span>STUDY PROGRAMME</span><strong>{user.programme || "Not added yet"}</strong></div><div><span>PREFERRED CAMPUS</span><strong>{user.campus || "Not selected"}</strong></div><div className="summary-bio"><span>SHORT INTRODUCTION</span><p>{user.bio || "You have not added an introduction yet."}</p></div><button className="btn btn-primary edit-profile-btn" onClick={()=>setEditing(true)}><UserRound size={16}/> Edit profile</button></div> : <form onSubmit={save} className="profile-form"><label>Full name<input value={form.name} onChange={e=>setForm({...form,name:formatPersonName(e.target.value)})} required/><small className="field-hint">Start with a capital letter.</small></label><label>Study programme
  <input list="study-programmes" value={form.programme} onChange={e=>setForm({...form,programme:formatProgramme(e.target.value)})} placeholder="e.g. Computer Science"/>
  <datalist id="study-programmes">
    <option value="Computer Science"/>
    <option value="Software Engineering"/>
    <option value="Data Science"/>
    <option value="Data Analytics for Economics and Management"/>
    <option value="Tourism Management"/>
    <option value="Tourism, Sport and Event Management"/>
    <option value="Accounting and Finance"/>
    <option value="Entrepreneurship and Innovation"/>
    <option value="Public Policy and Innovative Governance"/>
    <option value="Design and Art"/>
  </datalist>
</label><label>Preferred campus<select value={form.campus} onChange={e=>setForm({...form,campus:e.target.value})}><option value="">Select a campus</option><option>Bolzano / Bozen</option><option>NOI Techpark</option><option>Bressanone / Brixen</option><option>Brunico / Bruneck</option></select></label><label className="full-field">Short introduction<textarea rows="4" maxLength="500" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="A few words about your student journey..."/></label>
        {error && <div className="form-error full-field">{error}</div>}<div className="profile-edit-actions full-field"><button type="button" className="btn btn-outline" onClick={()=>{setForm({name:user.name,programme:user.programme||"",campus:user.campus||"",bio:user.bio||""});setError("");setEditing(false);}}>Cancel</button><button className="btn btn-primary" disabled={busy}>{busy?"Saving...":"Save profile"} <ArrowRight size={16}/></button></div></form>}
      <p className="privacy-note"><ShieldCheck size={16}/> Your profile is private. This page only loads and updates the profile belonging to your signed-in account.</p>
    </div></section>
  </>;
}
