import { toolkit } from "@/data/skills";
import { interfaceCopy } from "@/data/profile";
export function ToolkitSection() {
  return <section className="toolkit-section section container" id="toolkit" tabIndex={-1}><div className="toolkit-intro" data-reveal><div className="eyebrow"><span className="section-index">06</span>TOOLS OF THE TRADE</div><h2>{interfaceCopy.toolkit.title}</h2><p>{interfaceCopy.toolkit.description}</p></div><div className="toolkit-list" data-reveal>{toolkit.map(group=><div className="toolkit-row" key={group.category}><h3>{group.category}</h3><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>;
}
