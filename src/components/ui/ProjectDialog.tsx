"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

function DetailContent({ project }: { project: Project }) {
  return <><dl className="project-facts"><div><dt>Period</dt><dd>{project.period}</dd></div><div><dt>Context</dt><dd>{project.organization}</dd></div></dl><h3>The need</h3><p>{project.need}</p><h3>Built to</h3><ul className="function-list">{project.functions.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul><h3>Contribution</h3><p>{project.role}</p></>;
}
export function ProjectDialog({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const restore = () => trigger.current?.focus({ preventScroll: true });
    element.addEventListener("close", restore);
    return () => { element.removeEventListener("close", restore); };
  }, []);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const lock = new MutationObserver(() => {
      document.body.classList.toggle("dialog-open", element.open);
    });
    lock.observe(element, { attributes: true, attributeFilter: ["open"] });
    return () => { lock.disconnect(); document.body.classList.remove("dialog-open"); };
  }, []);
  return <>
    <a ref={trigger} className="project-detail-link" href={`#details-${project.id}`} aria-haspopup="dialog" onClick={event => { if (dialog.current?.showModal) { event.preventDefault(); if (!dialog.current.open) { dialog.current.showModal(); content.current?.scrollTo({ top: 0 }); } } }}>View Details <ArrowUpRight size={17}/></a>
    <dialog ref={dialog} className="project-dialog" aria-labelledby={`title-${project.id}`} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close(); } }}>
      <div className="dialog-header"><span className="eyebrow">PROJECT NOTES</span><button className="icon-button" onClick={() => dialog.current?.close()} aria-label="Close project details" autoFocus><X size={21}/></button></div>
      <div ref={content} className="dialog-content"><span className="project-category">{project.category}</span><h2 id={`title-${project.id}`}>{project.name}</h2><p className="dialog-subtitle">{project.subtitle}</p><ProjectVisual kind={project.kind}/><p className="dialog-description">{project.description}</p><DetailContent project={project}/></div>
      <div className="dialog-footer"><button className="text-button" onClick={() => dialog.current?.close()}>Back to projects <X size={15}/></button></div>
    </dialog>
    <noscript><details id={`details-${project.id}`} className="nojs-details"><summary>{project.name} — project details</summary><DetailContent project={project}/></details></noscript>
  </>;
}
