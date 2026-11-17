import React, { useEffect, useState } from "react";
import { ArrowUpRight, House, ShieldCheck, MapPin } from "lucide-react";
import PageHero from "../components/layout/PageHero";

export default function Housing({items = []}) {
  return <>
    <PageHero kicker="SETTLE INTO SOUTH TYROL" title={<>Find a place to call <em>your own.</em></>} subtitle="Explore accommodation examples and remember to verify availability, contracts and prices directly with each provider."/>
    <section className="section content-section">
      <div className="housing-alert"><ShieldCheck size={20}/><div><b>Important: verify every offer independently</b><p>Accommodation availability and prices change frequently. Listings currently shown are illustrative Sprint 1 demo records, not verified or bookable offers.</p></div></div>
      <div className="section-heading-row"><div><div className="section-kicker">BROWSE ACCOMMODATION</div><h2>Accommodation <em>around unibz.</em></h2></div><span className="count-pill">{items.length} LISTINGS</span></div>
      <div className="housing-grid">
        {items.length === 0 ? (
          <div className="housing-empty"><House size={30}/><h3>No accommodation listings available</h3><p>There are currently no listings to display. Please check again later.</p></div>
        ) : items.map((item,i)=>(
          <article className="housing-card" key={item.id}>
            <div className={`housing-image housing-${(i%3)+1}`}>
              <span>DEMO LISTING</span><House size={46}/>
              <small className="housing-photo-caption">Illustrative accommodation image</small>
            </div>
            <div className="housing-body">
              <div className="housing-meta"><span className="housing-type">{item.type || "Accommodation"}</span><span><MapPin size={13}/>{item.location}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="housing-bottom"><strong>{item.price}</strong><span>Per month*</span></div>
              <p className="housing-demo-note">{item.sourceNote || "Demo data — availability and price have not been verified."}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="official-housing"><div><div className="section-kicker light">USEFUL RESOURCES</div><h2>Start with the <em>right sources.</em></h2><p>Use official university information to understand student services and accommodation guidance. The listings above are examples only.</p></div><div className="official-links"><a href="https://www.unibz.it/en/" target="_blank" rel="noreferrer">unibz official website <ArrowUpRight size={16}/></a><a href="https://www.unibz.it/en/applicants/international/" target="_blank" rel="noreferrer">International student information <ArrowUpRight size={16}/></a></div></div>
    </section>
  </>;
}
