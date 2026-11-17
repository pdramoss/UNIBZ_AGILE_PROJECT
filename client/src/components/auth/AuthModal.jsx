import React, { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { request } from "../../api";
import { formatPersonName } from "../../utils/formatters";
import { passwordRules } from "../../constants/auth";

export default function AuthModal({mode,close,onAuth,switchMode}) {
  const [values,setValues]=useState({name:"",email:"",password:"",confirmPassword:""});
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const register=mode==="register";

  const passwordValid = passwordRules.every(rule => rule.test(values.password));
  const passwordsMatch = values.password.length > 0 && values.password === values.confirmPassword;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
  const nameValid = /^[A-ZÀ-ÖØ-Ý][A-Za-zÀ-ÖØ-öø-ÿ' -]*$/.test(values.name.trim());

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!emailValid) return setError("Enter a valid email address.");
    if (register) {
      if (!nameValid) return setError("Full name must start with an uppercase letter.");
      if (!passwordValid) return setError("Password must contain 8+ characters, an uppercase letter, a number and a symbol.");
      if (!passwordsMatch) return setError("Passwords do not match.");
    }
    setBusy(true);
    try {
      const payload = register
        ? {...values, name: formatPersonName(values.name).trim()}
        : {email: values.email, password: values.password};
      const d=await request(register?"/auth/register":"/auth/login",{method:"POST",body:JSON.stringify(payload)});
      localStorage.setItem("oh_token",d.token);
      onAuth(d.user);
    } catch(err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close();}}>
    <div className="auth-modal">
      <button className="modal-close" onClick={close}><X size={20}/></button>
      <div className="modal-logo"><img src="/assets/outerheaven-logo.jpeg" alt="OuterHeaven"/></div>
      <div className="section-kicker">{register?"CREATE YOUR ACCOUNT":"WELCOME BACK"}</div>
      <h2>{register?"Your journey starts here.":"Good to see you again."}</h2>
      <p>{register?"Create a student account to keep your profile details together.":"Sign in to continue to your student profile."}</p>

      <form onSubmit={submit} className="auth-form">
        {register && <label>
          <span><User size={15}/> Full name</span>
          <input
            value={values.name}
            onChange={e=>setValues({...values,name:formatPersonName(e.target.value)})}
            placeholder="Your full name"
            autoComplete="name"
            required
          />
          <small className="field-hint">Start with a capital letter.</small>
        </label>}

        <label>
          <span><Mail size={15}/> Email address</span>
          <input
            type="email"
            value={values.email}
            onChange={e=>setValues({...values,email:e.target.value.toLowerCase()})}
            placeholder="you@example.com"
            autoComplete="email"
            required
            aria-invalid={values.email.length > 0 && !emailValid}
          />
          {values.email && <small className={emailValid ? "field-hint valid-text" : "field-hint error-text"}>{emailValid ? "Email format looks good." : "Enter a valid email address."}</small>}
        </label>

        <label>
          <span><Lock size={15}/> Password</span>
          <div className="password-input-wrap">
          <input
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={e=>setValues({...values,password:e.target.value})}
            placeholder={register?"Create a strong password":"Your password"}
            autoComplete={register?"new-password":"current-password"}
            minLength={register?8:1}
            required
          />
          <button type="button" className="password-toggle" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
          </div>
          {register && <div className="password-rules">
            {passwordRules.map(rule => {
              const ok = rule.test(values.password);
              return <div className={ok ? "password-rule valid" : "password-rule"} key={rule.key}>
                <span>{ok ? "✓" : "•"}</span>{rule.label}
              </div>;
            })}
          </div>}
        </label>

        {register && <label>
          <span><Lock size={15}/> Confirm password</span>
          <div className="password-input-wrap">
          <input
            type={showConfirm ? "text" : "password"}
            value={values.confirmPassword}
            onChange={e=>setValues({...values,confirmPassword:e.target.value})}
            placeholder="Repeat your password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <button type="button" className="password-toggle confirm-toggle" onClick={()=>setShowConfirm(v=>!v)} aria-label={showConfirm ? "Hide password" : "Show password"}>{showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}</button>
          </div>
          {values.confirmPassword && <small className={passwordsMatch ? "field-hint valid-text" : "field-hint error-text"}>
            {passwordsMatch ? "Passwords match." : "Passwords do not match."}
          </small>}
        </label>}

        {error&&<div className="form-error">{error}</div>}
        <button className="btn btn-primary auth-submit" disabled={busy}>
          {busy?"Please wait...":register?"Create account":"Sign in"} <ArrowRight size={16}/>
        </button>
      </form>

      <div className="auth-switch">{register?"Already have an account?":"New to OuterHeaven?"}
        <button onClick={()=>{setError("");switchMode(register?"login":"register");}}>
          {register?"Sign in":"Create an account"}
        </button>
      </div>
      <div className="auth-security"><ShieldCheck size={15}/> Student accounts are self-registered. Admin access is provisioned separately.</div>
    </div>
  </div>;
}
