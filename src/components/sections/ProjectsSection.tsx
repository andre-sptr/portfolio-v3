import { projects } from "@/data/projects";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function ProjectsSection() {
  return <section id="projects" className="projects-section section container" tabIndex={-1}><SectionHeading index="03" label="SELECTED WORK" title={interfaceCopy.projects.title} description={interfaceCopy.projects.description}><span className="project-count mono">{interfaceCopy.projects.count}</span></SectionHeading><div className="projects-grid">{projects.map((project,index)=><article key={project.id} className={`project-card project-${project.kind}`} data-reveal data-tilt><ProjectVisual kind={project.kind}/><div className="project-card-body"><div className="project-meta"><span className="project-category">{project.category}</span><span className="mono">{project.period}</span></div><div className="project-title-row"><div><h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p></div><span className="project-index mono">0{index+1}</span></div><p className="project-description">{project.description}</p><div className="project-card-bottom"><span>{project.organization}</span><ProjectDialog project={project}/></div></div></article>)}</div><p className="projects-note"><span className="note-cross">+</span>Interface illustrations are conceptual representations of each project.</p></section>;
}
