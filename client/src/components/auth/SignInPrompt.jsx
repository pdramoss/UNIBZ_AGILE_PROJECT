import React, { useEffect, useState } from "react";
import { ArrowRight, UserRound } from "lucide-react";

export default function SignInPrompt({open}) {
  return <section className="section sign-prompt"><UserRound size={40}/><h2>Sign in to view your profile.</h2><p>Your profile is available only after you sign in to your OuterHeaven account.</p><button className="btn btn-primary" onClick={open}>Sign in <ArrowRight size={16}/></button></section>;
}
