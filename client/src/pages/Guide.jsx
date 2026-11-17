import React, { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import PageHero from "../components/layout/PageHero";

export default function Guide() {
  const steps = [
    ["Before applying","Check the programme page, admission requirements, deadlines and language requirements for your chosen course."],
    ["Understand the languages","Review the language requirements of your specific programme. Teaching language can differ between courses."],
    ["Plan accommodation early","Student housing in South Tyrol can be limited. Start researching early and confirm current availability directly."],
    ["Plan your arrival","Check transport connections, travel documents, insurance and the dates of any welcome or orientation activities."],
    ["Ask the right office","Use the official unibz contact pages for admissions, student services and international mobility questions."]
  ];
  return <><PageHero kicker="A PRACTICAL STARTING POINT" title={<>A little preparation.<br/><em>A smoother arrival.</em></>} subtitle="A simple checklist for students who are considering unibz or preparing to move to South Tyrol."/>
    <section className="section content-section">
      <div className="guide-layout"><div><div className="section-kicker">YOUR FIRST CHECKLIST</div><h2>Take it one <em>step at a time.</em></h2><p className="muted large">You do not need to figure everything out in one day. Start with the essentials and use official university pages to confirm details.</p><a className="btn btn-primary" href="https://www.unibz.it/en/applicants/" target="_blank" rel="noreferrer">Official applicant information <ExternalLink size={16}/></a></div>
        <div className="checklist">{steps.map(([title,desc],i)=><div className="check-row" key={title}><span className="check-index">0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div><CheckCircle2 size={19}/></div>)}</div></div>
      <div className="help-card"><div className="help-icon"><Mail size={23}/></div><div><h3>Not sure where to ask?</h3><p>For programme and application questions, start with the official unibz applicant and advisory-service pages. For exchange mobility, consult the International Relations Office.</p></div><a href="https://www.unibz.it/en/applicants/international/" target="_blank" rel="noreferrer">Find official contacts <ArrowUpRight size={16}/></a></div>
    </section>
  </>;
}
