import { ArrowUpRight, RadioTower } from "lucide-react";
import { profile } from "@/data/profile";

export function AboutSection() {
  return <section id="about" className="about-section section container" tabIndex={-1}><div className="about-grid"><div data-reveal><div className="eyebrow"><span className="section-index">01</span>THE PERSON BEHIND THE SYSTEMS</div><h2>Technology,<br/><span className="text-blue">Connected.</span></h2><div className="about-signature">Andre Saputra <span>↗</span></div></div><div className="about-content" data-reveal><p className="about-lead">{profile.about.introduction}</p><p>{profile.about.description}</p><div className="current-role"><span className="current-icon"><RadioTower size={22}/></span><div><span className="mini-label">CURRENTLY</span><strong>Engineer <span>at PT Nexcom Indonesia</span></strong></div><ArrowUpRight size={18}/></div></div></div><div className="connection-strip" data-reveal><span className="connection-caption">{profile.about.note}</span><div className="connection-track"><span><i/>Network</span><span className="track-line"/><span><i/>Data</span><span className="track-line"/><span><i/>Application</span></div></div></section>;
}
