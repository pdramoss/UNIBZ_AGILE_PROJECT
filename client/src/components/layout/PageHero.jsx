import React, { useEffect, useState } from "react";

export default function PageHero({kicker,title,subtitle}) {
  return <section className="page-hero"><div className="page-hero-inner"><div className="section-kicker light">{kicker}</div><h1>{title}</h1><p>{subtitle}</p></div></section>;
}
