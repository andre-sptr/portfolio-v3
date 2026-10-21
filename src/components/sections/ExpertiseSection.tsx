import { Code2, Cpu, Network, Workflow } from "lucide-react";
import { expertise } from "@/data/skills";
import { interfaceCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
const icons = { network: Network, workflow: Workflow, cpu: Cpu, code: Code2 };

export function ExpertiseSection() {
  return <section id="expertise" className="expertise-section section" tabIndex={-1}><div className="container"><SectionHeading index="02" label="CONNECTED CAPABILITIES" title={interfaceCopy.expertise.title} description={interfaceCopy.expertise.description}/><div className="expertise-grid">{expertise.map((item,index)=>{const Icon=icons[item.icon];return <article className="expertise-card" key={item.id} data-reveal data-tilt><div className="expertise-card-top"><span className="expertise-icon"><Icon size={25} strokeWidth={1.4}/></span><span className="mono card-number">0{index+1}</span></div><h3>{item.title}</h3><p>{item.description}</p><ul className="skill-list">{item.skills.map(s=><li key={s}>{s}</li>)}</ul><div className="card-network-corner" aria-hidden="true"><i/><i/><i/></div></article>;})}</div></div></section>;
}
