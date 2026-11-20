/**
 * newsletter.tsx  ──  <Newsletter id="contact">
 * ------------------------------------------------------------------
 * Newsletter signup + contact info. Two columns:
 *  LEFT  — "Plant a seed in your inbox" form (name + email → Subscribe).
 *  RIGHT — 4 contact tiles (Visit/Call/Email/Hours) + stylized map.
 *
 * NOTE: id="contact" so Enrol Now / Donate / Contact all land here.
 *
 * Animations:
 *  • Motion — Reveal; hover lift on contact tiles; animated SVG map pulse.
 *  • Submit → useToast (hooks/use-toast.ts) fires a success toast.
 *
 * Connects to: anchor target of Navbar Enrol Now, Donate, More Links Contact.
 * Data: contactInfo (lib/site-data.ts) · campus.png bg.
 * ------------------------------------------------------------------ */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { contactInfo } from "@/lib/site-data";
import { Reveal } from "./reveal";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Please enter a valid email",
        description: "We need a valid email to send you updates.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Welcome to the Garden Village family!",
      description: `${name || "Friend"}, you're subscribed. Watch your inbox for stories & events.`,
    });
    setEmail("");
    setName("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  const contactItems = [
    { icon: MapPin, label: "Visit", value: contactInfo.address },
    { icon: Phone, label: "Call", value: contactInfo.phone },
    { icon: Mail, label: "Email", value: contactInfo.email },
    { icon: Clock, label: "Hours", value: contactInfo.hours },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--gv-forest)] py-20 sm:py-28">
      <DevBadge meta={devMeta("contact")} />
      {/* campus image as faint bg */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <img
          src="/images/campus.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gv-forest)] via-[var(--gv-forest)]/80 to-[var(--gv-forest)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left: newsletter form */}
          <Reveal direction="up">
            <span id="newsletter" className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-lime)]/80">
              Stay Connected
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold leading-[1.05] text-[var(--gv-lime)]">
              Plant a seed in your{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                inbox
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[var(--gv-mint)]/80">
              Get our seasonal newsletter — school stories, event invites and
              tips for raising curious learners. No spam, just growth.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[var(--gv-lime)] focus:bg-white/12"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[var(--gv-lime)] focus:bg-white/12"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gv-lime)] px-6 py-3 font-[family-name:var(--font-jakarta)] text-sm font-bold text-[var(--gv-forest)] transition-colors hover:bg-[var(--gv-lime-soft)] sm:w-auto sm:px-8"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Subscribe
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-3 text-xs text-[var(--gv-mint)]/50">
              By subscribing you agree to receive emails from Garden Village
              Primary School.
            </p>
          </Reveal>

          {/* Right: contact info cards */}
          <Reveal direction="left" delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-[var(--gv-lime)]/40"
                >
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--gv-lime)]/15 text-[var(--gv-lime)]"
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.span>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--gv-lime)]/70">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[var(--gv-mint)]">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--gv-mid-green)]/60 to-[var(--gv-forest)] p-5">
              <div className="flex items-center gap-2 text-[var(--gv-lime)]">
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Find us on the map
                </span>
              </div>
              <div className="mt-3 h-32 overflow-hidden rounded-xl bg-[var(--gv-forest)]/60">
                {/* Stylized map */}
                <svg viewBox="0 0 400 130" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="130" fill="#0a2118" />
                  {[...Array(8)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 18} x2="400" y2={i * 18} stroke="#1a4d2e" strokeWidth="0.5" opacity="0.5" />
                  ))}
                  {[...Array(14)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="130" stroke="#1a4d2e" strokeWidth="0.5" opacity="0.5" />
                  ))}
                  <path d="M40 100 Q120 60 200 80 T360 50" stroke="#2e9e3e" strokeWidth="2" fill="none" opacity="0.6" />
                  <path d="M0 40 L400 90" stroke="#d6f75a" strokeWidth="1" opacity="0.3" />
                  <circle cx="200" cy="80" r="6" fill="#d6f75a">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="80" r="14" fill="none" stroke="#d6f75a" strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r" values="6;22;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
