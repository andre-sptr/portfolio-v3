"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useResponsiveScene } from "@/hooks/useResponsiveScene";
import { SceneFallback } from "./SceneFallback";

const Scene = dynamic(() => import("./GravityNetworkScene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function GravitySceneLoader() {
  const slot = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [inView, setInView] = useState(true);
  const [passedHero, setPassedHero] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotionPreference();
  const quality = useResponsiveScene();
  const docked = quality.wide && passedHero;
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const element = slot.current;
    if (!element) return;
    const visibility = () => setVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setInView(entry.isIntersecting);
      setPassedHero(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    }, { threshold: 0 });
    const loader = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const lowPowerMobile = window.matchMedia("(max-width: 767px)").matches && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
      if (!connection?.saveData && !lowPowerMobile) setLoad(true);
      loader.disconnect();
    }, { rootMargin: "200px" });
    observer.observe(element); loader.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); loader.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const running = !paused && !reduced && visible && (inView || docked);
  return <div ref={slot} className="scene-slot"><div className={`gravity-stage ${docked ? "is-docked" : ""} ${ready && !failed ? "scene-ready" : ""}`}>
    <SceneFallback/>
    {load && !failed && <div className="scene-canvas" aria-hidden="true"><SceneBoundary onFailure={onFailure}><Scene running={running} compact={quality.compact} reduced={reduced} nodeCount={quality.nodeCount} particleCount={quality.particleCount} dpr={quality.dpr} onReady={onReady} onFailure={onFailure}/></SceneBoundary></div>}
    <div className="scene-control">{ready && !failed ? reduced ? <span className="scene-status"><span className="blue-dot"/>REDUCED MOTION</span> : <><span className="scene-status"><span className="blue-dot"/>{quality.compact ? "A NETWORK IN MOTION" : "MOVE YOUR CURSOR. FEEL THE PULL."}</span><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? "Play network animation" : "Pause network animation"} aria-pressed={paused}>{paused ? <Play size={12}/> : <Pause size={12}/>}<span>{paused ? "Play" : "Pause"}</span></button></> : <span className="scene-status"><span className="blue-dot"/>NETWORKS IN BALANCE</span>}</div>
  </div></div>;
}
