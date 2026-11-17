import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Building2, Compass, GraduationCap, Globe2, House, MapPin } from "lucide-react";

export default function Home({navigate, openAuth}) {
  return <>
    <section className="hero">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="eyebrow-dot"/> YOUR STUDENT JOURNEY STARTS HERE</div>
          <h1>Make your next chapter <em>feel closer.</em></h1>
          <p className="hero-lead">A practical starting point for discovering the Free University of Bozen-Bolzano and preparing for student life in South Tyrol.</p>
          <div className="hero-buttons"><button className="btn btn-bright" onClick={() => navigate("university")}>Explore unibz <ArrowRight size={17}/></button><button className="btn btn-glass" onClick={openAuth}>Create your account</button></div>
          <div className="hero-proof"><div className="proof-avatars"><b>U</b><b>O</b><b>H</b></div><span>University information · Student essentials · One place</span></div>
        </div>
        <div className="hero-visual">
          <div className="visual-card visual-main">
            <div className="visual-top"><span className="mini-label">SOUTH TYROL · ITALY</span><span className="live-dot"/></div>
            <div className="mountain-art"><div className="sun"/><div className="mountain m1"/><div className="mountain m2"/><div className="mountain m3"/></div>
            <div className="visual-caption"><div><strong>Study in a multilingual region</strong><span>German · Italian · English</span></div><Globe2 size={23}/></div>
          </div>
          <div className="floating-note"><span className="note-icon"><GraduationCap size={19}/></span><div><b>5 faculties</b><small>Explore your study area</small></div></div>
          <div className="floating-tag"><MapPin size={15}/> Bolzano · Bressanone · Brunico</div>
        </div>
      </div>
      <div className="hero-bottom"><span>01 / DISCOVER</span><span>SCROLL TO EXPLORE ↓</span><span>OUTERHEAVEN STUDENT HUB</span></div>
    </section>

    <section className="stats-strip">
      <div><strong>5</strong><span>Faculties</span></div><div><strong>4</strong><span>Campus locations</span></div><div><strong>3</strong><span>Official teaching languages</span></div><div><strong>1</strong><span>Student starting point</span></div>
    </section>

    <section className="section intro-section">
      <div className="section-kicker">A GOOD PLACE TO BEGIN</div>
      <div className="intro-grid"><h2>University life is more than <em>choosing a course.</em></h2><div><p>Moving to a new university means finding your way around a new place, understanding how things work and making everyday decisions. OuterHeaven brings the first useful information together so you can take the next step with more confidence.</p><button className="text-link" onClick={() => navigate("guide")}>Explore the student guide <ArrowUpRight size={17}/></button></div></div>
      <div className="feature-grid">
        <Feature icon={<Building2/>} number="01" title="Discover unibz" text="Get to know the faculties, campuses and multilingual character of the university." onClick={() => navigate("university")}/>
        <Feature icon={<Compass/>} number="02" title="Prepare your move" text="A practical overview of the first things to check before arriving in South Tyrol." onClick={() => navigate("guide")}/>
        <Feature icon={<House/>} number="03" title="Explore housing" text="Browse example accommodation cards and follow official housing information." onClick={() => navigate("housing")}/>
      </div>
    </section>
    <section className="cta-band"><div><span className="section-kicker light">YOUR NEXT STEP</span><h2>Start building your student journey.</h2><p>Create a profile to keep your basic student information in one place.</p></div><button className="btn btn-bright" onClick={openAuth}>Join OuterHeaven <ArrowRight size={17}/></button></section>
  </>;
}

function Feature({icon,number,title,text,onClick}) {
  return <button className="feature-card" onClick={onClick}><div className="feature-visual"><span className="feature-number">{number}</span><span className="feature-icon">{icon}</span></div><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><ArrowUpRight size={18}/></span></button>;
}
