import { MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  return <section id="experience" className="experience-section section" tabIndex={-1}><div className="container"><SectionHeading index="04" label="THE JOURNEY" title={interfaceCopy.experience.title} description={interfaceCopy.experience.description}/><div className="timeline"><div className="timeline-track" aria-hidden="true"><span className="timeline-progress"/></div>{experience.map(job=><article key={job.organization} className={`experience-row ${job.current?"current-experience":""}`} data-reveal><div className="experience-period mono"><span className="timeline-dot"/>{job.period}{job.current&&<span className="current-badge">CURRENT ROLE</span>}</div><div className="experience-job"><h3>{job.role}</h3><p>{job.organization}{"context" in job && <small>{job.context}</small>}</p><span className="experience-location"><MapPin size={12}/>{job.location}</span></div><ul className="experience-points">{job.points.map(point=><li key={point}>{point}</li>)}</ul></article>)}</div></div></section>;
}
