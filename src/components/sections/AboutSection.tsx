import Image from "next/image";
import { ArrowUpRight, Download, FileText, RadioTower } from "lucide-react";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="about-section section container" tabIndex={-1}>
      <div className="about-grid">
        <div data-reveal>
          <div className="eyebrow"><span className="section-index">01</span>THE PERSON BEHIND THE SYSTEMS</div>
          <h2>Technology,<br/><span className="text-blue">Connected.</span></h2>
          <figure className="about-portrait">
            <div className="portrait-frame">
              <Image src={profile.portrait.src} alt="Portrait of Andre Saputra" width={profile.portrait.width} height={profile.portrait.height} sizes="(max-width: 599px) 108px, 128px"/>
            </div>
            <figcaption>
              <span className="mini-label">THE ENGINEER</span>
              <span className="portrait-name">{profile.name}</span>
              <span className="portrait-discipline">Electronics &amp;<br/>Telecommunication</span>
              <span className="portrait-location">{profile.location}</span>
            </figcaption>
          </figure>
        </div>
        <div className="about-content" data-reveal>
          <p className="about-lead">{profile.about.introduction}</p>
          <p>{profile.about.description}</p>
          <div className="current-role"><span className="current-icon"><RadioTower size={22}/></span><div><span className="mini-label">CURRENTLY</span><strong>Engineer <span>at PT Nexcom Indonesia</span></strong></div><ArrowUpRight size={18}/></div>
          <div className="resume-card">
            <a className="resume-preview" href={profile.cv.href} target="_blank" rel="noopener noreferrer" aria-label="View Andre Saputra's CV (PDF, opens in a new tab)">
              <span className="resume-icon"><FileText size={21}/></span>
              <span className="resume-info"><strong>Curriculum vitae</strong><small>{profile.cv.details}</small></span>
              <ArrowUpRight size={17}/>
            </a>
            <a className="resume-download" href={profile.cv.href} download={profile.cv.filename}><Download size={15}/>Download CV</a>
          </div>
        </div>
      </div>
      <div className="connection-strip" data-reveal><span className="connection-caption">{profile.about.note}</span><div className="connection-track"><span><i/>Network</span><span className="track-line"/><span><i/>Data</span><span className="track-line"/><span><i/>Application</span></div></div>
    </section>
  );
}
