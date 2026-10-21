import type { ReactNode } from "react";
export function SectionHeading({ index, label, title, description, children }: { index: string; label: string; title: string; description?: string; children?: ReactNode }) {
  return <div className="section-heading" data-reveal><div className="eyebrow"><span className="section-index">{index}</span>{label}</div><div className="section-heading-row"><div><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>{children}</div></div>;
}
