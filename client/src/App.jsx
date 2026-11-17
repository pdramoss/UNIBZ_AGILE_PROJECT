
import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  LogIn,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { request } from "./api";
import { sections } from "./constants/navigation";

import Home from "./pages/Home";
import University from "./pages/University";
import Guide from "./pages/Guide";
import Housing from "./pages/Housing";
import Profile from "./pages/Profile";

import AuthModal from "./components/auth/AuthModal";
import SignInPrompt from "./components/auth/SignInPrompt";

// Official university website
const official = "https://www.unibz.it/en/";

export default function App() {
  const validPages = ["home", "university", "guide", "housing", "profile"];
  const pageFromHash = () => {
    const key = window.location.hash.replace(/^#\/?/, "") || "home";
    return validPages.includes(key) ? key : "not-found";
  };
  const [page, setPage] = useState(pageFromHash);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState(null);
  const [university, setUniversity] = useState(null);
  const [housing, setHousing] = useState([]);

  // Keep the visible page in sync with browser navigation and direct links.
  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) window.history.replaceState(null, "", "#/home");
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Load application data and authenticate existing user
  useEffect(() => {
    request("/universities")
      .then(setUniversity)
      .catch((error) => console.error("University loading error:", error));

    request("/accommodation")
      .then(setHousing)
      .catch((error) => console.error("Housing loading error:", error));

    const token = localStorage.getItem("oh_token");

    if (token) {
      request("/auth/me")
        .then((data) => setUser(data.user))
        .catch(() => {
          localStorage.removeItem("oh_token");
        });
    }
  }, []);

  // Display notification
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };

  // Navigate between pages
  const navigate = (next) => {
    if (!validPages.includes(next)) next = "not-found";
    setPage(next);
    if (window.location.hash !== `#/${next}`) window.location.hash = `/${next}`;
    setMobileOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Sign out
  const logout = () => {
    localStorage.removeItem("oh_token");
    setUser(null);
    setProfile(null);
    navigate("home");
    notify("You have been signed out.");
  };

  return (
    <div className="app-shell">

      {/* Navigation */}
      <header className="topbar">
        <div className="nav-wrap">

          <button
            className="brand"
            onClick={() => navigate("home")}
            aria-label="OuterHeaven home"
          >
            <img
              src="/assets/outerheaven-logo.jpeg"
              alt="OuterHeaven Consulting Services"
            />
          </button>

          <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
            {sections.map(([label, key]) => (
              <button
                key={key}
                className={
                  page === key
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => navigate(key)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <button
                  className="user-chip"
                  onClick={() => navigate("profile")}
                  aria-label="Open your profile"
                >
                  <span className="avatar">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                  <span>{user.name.split(" ")[0]}</span>
                </button>

                <button
                  className="btn btn-outline btn-small"
                  onClick={logout}
                  aria-label="Sign out of your account"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-small"
                onClick={() => {
                  setAuthMode("login");
                  setAuthOpen(true);
                }}
              >
                <LogIn size={15} />
                Sign in
              </button>
            )}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

        </div>
      </header>

      {/* Main pages */}
      <main>
        {page !== "home" && page !== "not-found" && (
          <div className="breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => navigate("home")}>Home</button>
            <span aria-hidden="true">/</span>
            <strong>{({university:"The University",guide:"Student Guide",housing:"Accommodation",profile:"My Profile"})[page]}</strong>
          </div>
        )}
        {page === "not-found" && (
          <section className="not-found">
            <span className="section-kicker">ERROR 404</span>
            <h1>Page not found.</h1>
            <p>The page you are looking for may have moved or the address may be incorrect.</p>
            <button className="btn btn-primary" onClick={() => navigate("home")}>Return to overview</button>
          </section>
        )}
        {page === "home" && (
          <Home
            navigate={navigate}
            openAuth={() => {
              setAuthMode("register");
              setAuthOpen(true);
            }}
          />
        )}

        {page === "university" && (
          <University data={university} />
        )}

        {page === "guide" && <Guide />}

        {page === "housing" && (
          <Housing items={housing} />
        )}

        {page === "profile" && (
          user ? (
            <Profile
              user={user}
              onSaved={(updatedUser) => {
                setUser(updatedUser);
                notify("Profile saved successfully.");
              }}
            />
          ) : (
            <SignInPrompt
              open={() => {
                setAuthMode("login");
                setAuthOpen(true);
              }}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-brand">
            <img
              src="/assets/outerheaven-logo.jpeg"
              alt="OuterHeaven logo"
            />
            <p>
              A clearer first step towards student life in South Tyrol.
            </p>
          </div>

          <div className="footer-links">
            <span>Explore</span>

            <button onClick={() => navigate("university")}>
              The University
            </button>

            <button onClick={() => navigate("guide")}>
              Student Guide
            </button>

            <button onClick={() => navigate("housing")}>
              Accommodation
            </button>
          </div>

          <div className="footer-links">
            <span>Official source</span>

            <a
              href={official}
              target="_blank"
              rel="noreferrer"
            >
              unibz website <ExternalLink size={13} />
            </a>

            <a
              href="https://www.unibz.it/en/applicants/international/"
              target="_blank"
              rel="noreferrer"
            >
              International applicants <ExternalLink size={13} />
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} OuterHeaven Consulting Services
          </span>

          <span>
            Independent student-support project · Not an official unibz website
          </span>
        </div>
      </footer>

      {/* Authentication modal */}
      {authOpen && (
        <AuthModal
          mode={authMode}
          close={() => setAuthOpen(false)}
          onAuth={(authenticatedUser) => {
            setUser(authenticatedUser);
            setAuthOpen(false);
            navigate("profile");

            notify(
              `Welcome, ${authenticatedUser.name.split(" ")[0]}!`
            );
          }}
          switchMode={setAuthMode}
        />
      )}

      {/* Notifications */}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}

    </div>
  );
}
