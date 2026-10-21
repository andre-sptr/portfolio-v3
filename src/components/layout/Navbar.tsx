"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    profile.navigation.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle.current) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.current?.focus(); }
      }
    };
    const query = window.matchMedia("(min-width: 900px)");
    const onDesktop = () => { if (query.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    query.addEventListener("change", onDesktop);
    return () => { document.removeEventListener("keydown", onKey); query.removeEventListener("change", onDesktop); };
  }, [open]);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><nav className="nav-wrap container" aria-label="Main navigation">
    <a className="wordmark" href="#top" aria-label="Andre Saputra, back to top"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="13" ry="6" transform="rotate(-35 16 16)"/><circle cx="16" cy="16" r="5"/><circle cx="26" cy="9" r="2"/></svg></span><span>ANDRE SAPUTRA<span className="wordmark-caption">ENGINEERING · CONNECTED</span></span></a>
    <div className="desktop-links">{profile.navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}</div>
    <a className="nav-cta" href="#contact">Let&apos;s Connect <ArrowUpRight size={15}/></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <div ref={menu} id="mobile-menu" className="mobile-menu" hidden={!open}>{profile.navigation.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => { setOpen(false); requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true })); }}>{label}<ArrowUpRight size={17}/></a>)}</div>
  </nav><noscript><div className="nojs-nav">{profile.navigation.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</div></noscript></header>;
}
