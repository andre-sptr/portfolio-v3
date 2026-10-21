"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneMotion } from "@/lib/scene-state";

export function ScrollExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-copy > *", { opacity: 0, y: 18, duration: 0.85, stagger: 0.08, ease: "power2.out", clearProps: "transform,opacity" });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
          gsap.from(element, { opacity: 0.3, y: 24, duration: 0.8, ease: "power2.out", clearProps: "opacity,transform", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
        });
        gsap.fromTo(".timeline-progress", { scaleY: 0.02 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 75%", scrub: 0.6 } });
        gsap.fromTo(".connection-track .track-line", { scaleX: 0.1 }, { scaleX: 1, stagger: 0.15, duration: 1, scrollTrigger: { trigger: ".connection-strip", start: "top 90%", once: true } });
        const phases = [
          { id: "top", spread: 1, rotation: 0, cameraX: 0, cameraY: 0, speed: 1 },
          { id: "about", spread: 0.87, rotation: 0.3, cameraX: 0.1, cameraY: 0.12, speed: 0.8 },
          { id: "expertise", spread: 1.16, rotation: 0.7, cameraX: -0.15, cameraY: 0, speed: 0.85 },
          { id: "projects", spread: 1.03, rotation: 1.15, cameraX: 0.35, cameraY: 0.08, speed: 0.7 },
          { id: "experience", spread: 0.95, rotation: 1.5, cameraX: 0.1, cameraY: 0, speed: 0.45 },
          { id: "education", spread: 0.88, rotation: 1.85, cameraX: 0, cameraY: 0.08, speed: 0.35 },
          { id: "contact", spread: 1, rotation: 2.2, cameraX: 0, cameraY: 0, speed: 0.2 },
        ];
        phases.forEach(({ id, ...values }) => {
          const apply = () => { gsap.to(sceneMotion, { ...values, duration: 1.35, overwrite: true, ease: "power2.out" }); };
          ScrollTrigger.create({ trigger: `#${id}`, start: "top 65%", onEnter: apply, onEnterBack: apply });
        });
      });
      media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: (() => void)[] = [];
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(element => {
          const move = (event: PointerEvent) => {
            const bounds = element.getBoundingClientRect();
            gsap.to(element, { rotateX: -(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 3, rotateY: (event.clientX - bounds.left - bounds.width / 2) / bounds.width * 3, transformPerspective: 1200, duration: 0.4, overwrite: "auto" });
          };
          const leave = () => { gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.6, overwrite: "auto" }); };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", leave);
          cleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); gsap.set(element, { clearProps: "transform" }); });
        });
        return () => cleanups.forEach(clean => clean());
      });
    });
    return () => { media.revert(); context.revert(); gsap.killTweensOf(sceneMotion); Object.assign(sceneMotion, { spread: 1, rotation: 0, cameraX: 0, cameraY: 0, speed: 1 }); };
  }, []);
  return null;
}
