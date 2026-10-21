import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactSection() {
  return <section id="contact" className="contact-section" tabIndex={-1}><div className="contact-orbit orbit-one" aria-hidden="true"/><div className="contact-orbit orbit-two" aria-hidden="true"/><div className="contact-orbit orbit-three" aria-hidden="true"/><div className="container contact-content" data-reveal><div className="eyebrow"><span className="contact-dot"/>LET&apos;S MAKE THE CONNECTION</div><h2>Have a project or an<br/>engineering <span>challenge?</span></h2><p>{profile.contact.description}</p><div className="contact-actions"><a className="button button-white" href={`mailto:${profile.email}`}><Mail size={18}/>Email Me<ArrowUpRight size={18}/></a><a className="button button-contact-secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17}/>Connect on LinkedIn<ArrowUpRight size={17}/></a></div><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a><div className="contact-location"><MapPin size={13}/>{profile.location}</div></div></section>;
}
