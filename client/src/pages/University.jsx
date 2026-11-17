import React, { useEffect, useState } from "react";
import { ShieldCheck, MapPin, Languages, ExternalLink } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import { campusCatalog } from "../data/campusCatalog";

export default function University({data}) {
  const faculties = data?.faculties || [
    {name:"Economics and Management",campus:"Bolzano",focus:"Economics, management and business."},
    {name:"Design and Art",campus:"Bolzano",focus:"Design, visual communication and art."},
    {name:"Agricultural, Environmental and Food Sciences",campus:"Bolzano",focus:"Food, agriculture, environment and sustainability."},
    {name:"Engineering",campus:"NOI Techpark, Bolzano",focus:"Engineering and applied technology."},
    {name:"Education",campus:"Bressanone",focus:"Education and pedagogical fields."}
  ];
  return <><PageHero kicker="GET TO KNOW YOUR UNIVERSITY" title={<>Small enough to connect.<br/><em>International by nature.</em></>} subtitle="Discover the Free University of Bozen-Bolzano (unibz), its faculties and the places where its academic community comes together."/>
    <section className="section content-section">
      <div className="university-intro"><div><div className="section-kicker">THE UNIVERSITY</div><h2>One university.<br/><em>Different perspectives.</em></h2></div><p>The Free University of Bozen-Bolzano is based in South Tyrol, a multilingual region in northern Italy. Its academic environment brings together German, Italian and English, with an international outlook across its study and research community.</p></div>
      <div className="language-banner"><Languages size={25}/><div><b>A multilingual learning environment</b><span>German · Italian · English are the university's three main official languages.</span></div><span className="language-mark">DE / IT / EN</span></div>
      <div className="section-heading-row"><div><div className="section-kicker">ACADEMIC AREAS</div><h2>Explore the <em>five faculties.</em></h2></div><span className="count-pill">05 FACULTIES</span></div>
      <div className="faculty-grid">{faculties.map((f,i)=><article className="faculty-card" key={f.name}><span className="faculty-number">0{i+1}</span><h3>{f.name}</h3><p>{f.focus}</p><div className="faculty-location"><MapPin size={14}/>{f.campus}</div></article>)}</div>
      <div className="section-heading-row campus-heading"><div><div className="section-kicker">FIND YOUR WAY</div><h2>Four places to <em>learn and connect.</em></h2></div></div>
      <div className="campus-grid">{campusCatalog.map((c,i)=><article className="campus-card" key={c.name}>
        <div className="campus-photo-link" aria-label={`${c.name} campus`}>
          <div className="campus-visual">
            <img src={c.image} alt={`${c.name} campus`} loading="lazy" />
            <span>0{i+1}</span><small>{c.label}</small>
          </div>
        </div>
        <div className="campus-info"><h3>{c.name}</h3><p>{c.detail}</p><div className="campus-tags">{c.tags}</div>
          <a className="campus-source" href={c.officialUrl} target="_blank" rel="noreferrer">Campus details <ExternalLink size={12}/></a>
        </div>
      </article>)}</div>
      <div className="section-heading-row campus-heading"><div><div className="section-kicker">INTERNATIONAL STUDENTS</div><h2>Starting at <em>unibz.</em></h2></div></div>
      <div className="faculty-grid university-extra-grid">
        <article className="faculty-card"><span className="faculty-number">01 · BEFORE ARRIVAL</span><h3>Admissions and applications</h3><p>Find programme-specific admission requirements, application deadlines and information for international applicants.</p><a className="campus-source" href="https://www.unibz.it/en/applicants/" target="_blank" rel="noreferrer">Applicant information <ExternalLink size={12}/></a></article>
        <article className="faculty-card"><span className="faculty-number">02 · STUDENT SUPPORT</span><h3>Services for students</h3><p>Explore student services and practical information that can help with the transition to university life.</p><a className="campus-source" href="https://www.unibz.it/en/" target="_blank" rel="noreferrer">University services <ExternalLink size={12}/></a></article>
        <article className="faculty-card"><span className="faculty-number">03 · USEFUL RESOURCES</span><h3>Study and campus resources</h3><p>Use the official university website for current study information, campus contacts and procedures.</p><a className="campus-source" href="https://www.unibz.it/en/" target="_blank" rel="noreferrer">Official unibz website <ExternalLink size={12}/></a></article>
      </div>
      <div className="source-note"><ShieldCheck size={18}/><p>University information is provided as a student-facing overview. Programme availability, admission requirements, services and course languages may change; always confirm details on the official university website.</p><a href="https://www.unibz.it/en/applicants/our-four-campuses" target="_blank" rel="noreferrer">Official four-campus guide <ExternalLink size={13}/></a></div>
    </section>
  </>;
}
