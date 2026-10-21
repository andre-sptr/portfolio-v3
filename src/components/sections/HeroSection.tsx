import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { GravitySceneLoader } from "@/components/three/GravitySceneLoader";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="blue-dot"/>{profile.hero.eyebrow}</div>
          <h1 id="hero-title">{profile.hero.lines.map((line, i) => <span key={line} className={i === 1 ? "text-blue" : ""}>{line}</span>)}</h1>
          <p className="hero-description">{profile.hero.description}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">Explore Projects <ArrowUpRight size={18}/></a>
            <a href={profile.cv.href} download={profile.cv.filename} className="button button-text">Download CV <Download size={17}/></a>
          </div>
          <div className="hero-person">
            <Image src={profile.portrait.src} alt="" width={48} height={48} priority className="hero-avatar"/>
            <span><strong>{profile.name}</strong><small>Engineer · {profile.location}</small></span>
          </div>
        </div>
        <div className="hero-art">
          <GravitySceneLoader/>
          <div className="scene-annotation annotation-top"><span className="annotation-line"/>A CONNECTED PERSPECTIVE</div>
          <div className="scene-annotation annotation-bottom"><span className="crosshair">+</span><span>GRAVITY NETWORK CORE<span className="annotation-sub">Networks. Systems. Possibilities.</span></span></div>
        </div>
      </div>
      <div className="hero-bottom container">
        <a href="#about" className="scroll-link"><span className="scroll-icon"><ArrowDown size={14}/></span>SCROLL TO EXPLORE</a>
        <span className="hero-note">Physical infrastructure. Digital possibilities.<ArrowDownRight size={15}/></span>
      </div>
    </section>
  );
}
