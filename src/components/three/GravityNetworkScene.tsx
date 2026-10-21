"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { GravityNetworkCore } from "./GravityNetworkCore";

type Props = { running: boolean; compact: boolean; reduced: boolean; nodeCount: number; particleCount: number; dpr: [number,number]; onReady: () => void; onFailure: () => void };

function ContextEvents({ onReady, onFailure }: Pick<Props,"onReady"|"onFailure">) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const fail = (event: Event) => { event.preventDefault(); onFailure(); };
    const frame = requestAnimationFrame(() => { invalidate(); onReady(); });
    canvas.addEventListener("webglcontextlost", fail);
    return () => { cancelAnimationFrame(frame); canvas.removeEventListener("webglcontextlost", fail); };
  }, [gl, invalidate, onReady, onFailure]);
  return null;
}

export default function GravityNetworkScene(props: Props) {
  const pointer = useRef({ x: 0, y: 0 });
  return <div className="webgl-host" onPointerMove={event => { if (event.pointerType !== "mouse" || !props.running) return; const box = event.currentTarget.getBoundingClientRect(); pointer.current.x=(event.clientX-box.left)/box.width*2-1; pointer.current.y=-((event.clientY-box.top)/box.height*2-1); }} onPointerLeave={()=>{pointer.current.x=0;pointer.current.y=0;}}>
    <Canvas camera={{ position: [0, 0, 7.3], fov: 43, near: 0.1, far: 30 }} dpr={props.dpr} frameloop={props.running?"always":"demand"} gl={{ alpha: true, antialias: !props.compact, powerPreference: "low-power" }} fallback={<span/>} onCreated={({ gl }) => { gl.setClearColor(0x000000,0); }}>
      <ambientLight intensity={0.85}/><directionalLight position={[3, 5, 4]} color="#FFFFFF" intensity={2.2}/><pointLight position={[-3, -1, 2]} color="#4EA4FF" intensity={12} distance={10}/>
      <Suspense fallback={null}><Environment resolution={128} frames={1}><Lightformer form="rect" intensity={3} position={[0, 4, 3]} rotation={[Math.PI/2, 0, 0]} scale={[8, 3, 1]}/><Lightformer form="rect" intensity={2} position={[-4, 0, 2]} rotation={[0, Math.PI/2, 0]} scale={[2, 6, 1]}/><Lightformer form="ring" color="#78BEFF" intensity={3} position={[2, -1, -3]} scale={4}/></Environment><GravityNetworkCore {...props} pointer={pointer}/><ContextEvents onReady={props.onReady} onFailure={props.onFailure}/></Suspense>
    </Canvas>
  </div>;
}
