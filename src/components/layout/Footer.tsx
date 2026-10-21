import { ArrowUpRight, ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
export function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><div><a className="footer-name" href="#top">Andre Saputra<span className="blue-dot"/></a><p>{profile.footer}</p></div><div className="footer-links"><a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a><a href="#top">Back to top <ArrowUp size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Andre Saputra</span><span>Engineering with purpose. Building with care.</span></div></footer>;
}
