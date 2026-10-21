"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, Group, LineBasicMaterial, Mesh, MeshBasicMaterial, MeshStandardMaterial, SphereGeometry, Vector3 } from "three";
import { sceneMotion } from "@/lib/scene-state";
import { stepDampedSpring } from "@/lib/physics";

type Props = { running: boolean; reduced: boolean; compact: boolean; nodeCount: number; particleCount: number; pointer: React.RefObject<{ x: number; y: number }> };

export function GravityNetworkCore({ running, reduced, compact, nodeCount, particleCount, pointer }: Props) {
  const group = useRef<Group>(null);
  const core = useRef<Group>(null);
  const outerRing = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const kinematics = useRef({ velocity: new Vector3(), offset: new Vector3() });
  const rotation = useRef(0);
  const hover = useRef<number | null>(null);
  const nodes = useMemo(() => Array.from({ length: nodeCount }, (_, index) => {
    const y = 1 - (index / (nodeCount - 1)) * 2;
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const radius = Math.sqrt(1 - y * y);
    const base = new Vector3(Math.cos(angle) * radius * 2.24, y * 2.12, Math.sin(angle) * radius * 1.65);
    return { base, position: base.clone(), velocity: new Vector3(), phase: index * 0.9, size: index % 4 === 0 ? 0.12 : index % 3 === 0 ? 0.085 : 0.052 };
  }), [nodeCount]);
  const nodeMeshes = useRef<(Mesh | null)[]>([]);
  const signals = useRef<(Mesh | null)[]>([]);
  const edges = useMemo(() => nodes.map((_, index) => [index, (index + 3) % nodeCount] as const), [nodes, nodeCount]);
  const resources = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(nodeCount * 6), 3));
    return {
      geometry,
      sphere: new SphereGeometry(1, compact ? 16 : 24, compact ? 12 : 16),
      material: new MeshStandardMaterial({ color: "#2F70D5", metalness: 0.42, roughness: 0.2, emissive: "#0E4AB6", emissiveIntensity: 0.08 }),
      edge: new LineBasicMaterial({ color: "#5C92CD", transparent: true, opacity: 0.23 }),
      rings: [0,1,2].map(index => new LineBasicMaterial({ color: index === 0 ? "#4087DD" : "#91B4DA", transparent: true, opacity: index === 0 ? 0.6 : 0.33 })),
      signals: [new MeshBasicMaterial({ color: "#2563EB" }), new MeshBasicMaterial({ color: "#38BDF8" })],
    };
  }, [compact, nodeCount]);
  // Shared resources are explicitly disposed by their single owner.
  const orbitPoints = useMemo(() => Array.from({ length: 3 }, (_, orbit) => {
    const points = Array.from({ length: 129 }, (_, i) => { const angle = i / 128 * Math.PI * 2; return new Vector3(Math.cos(angle) * (2.4 - orbit * 0.13), Math.sin(angle) * (2.4 - orbit * 0.13), 0); });
    return new BufferGeometry().setFromPoints(points);
  }), []);
  useEffect(() => () => { resources.geometry.dispose(); resources.sphere.dispose(); resources.material.dispose(); resources.edge.dispose(); resources.rings.forEach(material => material.dispose()); resources.signals.forEach(material => material.dispose()); }, [resources]);
  useEffect(() => () => orbitPoints.forEach(geometry => geometry.dispose()), [orbitPoints]);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    if (running) elapsed.current += dt * sceneMotion.speed;
    const time = elapsed.current;
    const px = running && !compact ? pointer.current.x : 0;
    const py = running && !compact ? pointer.current.y : 0;
    const magnetic = running && !reduced;
    const { velocity, offset } = kinematics.current;
    if (magnetic) {
      stepDampedSpring(offset, velocity, px * 0.16, py * 0.13, 0, dt);
      rotation.current += (sceneMotion.rotation - rotation.current) * Math.min(1, dt * 2.5);
    }
    if (group.current) {
      group.current.rotation.y = time * 0.07 + rotation.current;
      group.current.rotation.z = -0.22 + Math.sin(time * 0.12) * 0.035;
      group.current.position.set(offset.x, offset.y, 0);
    }
    if (core.current && magnetic) {
      core.current.rotation.y = time * -0.09 + px * 0.08;
      core.current.rotation.x = py * 0.07;
    }
    if (outerRing.current && magnetic) outerRing.current.rotation.z = time * 0.12;
    const position = resources.geometry.getAttribute("position") as BufferAttribute;
    nodes.forEach((node, index) => {
      const orbit = magnetic ? time * 0.035 * (index % 2 === 0 ? 1 : -1) : 0;
      const spread = reduced ? 1 : sceneMotion.spread;
      const tx = (node.base.x * Math.cos(orbit) - node.base.z * Math.sin(orbit)) * spread + (magnetic ? Math.sin(time * 0.44 + node.phase) * 0.055 + px * 0.07 * (index % 3 - 1) : 0);
      const ty = node.base.y * spread + (magnetic ? Math.cos(time * 0.35 + node.phase) * 0.055 + py * 0.065 : 0);
      const tz = (node.base.x * Math.sin(orbit) + node.base.z * Math.cos(orbit)) * spread;
      if (magnetic) {
        stepDampedSpring(node.position, node.velocity, tx, ty, tz, dt, 23, 9);
      }
      const mesh = nodeMeshes.current[index];
      if (mesh) { mesh.position.copy(node.position); const size = node.size * (hover.current === index && magnetic ? 1.35 : 1); mesh.scale.lerp({ x: size, y: size, z: size }, magnetic ? Math.min(1, dt * 8) : 1); }
    });
    edges.forEach(([a, b], index) => { const p = nodes[a].position; const q = nodes[b].position; position.setXYZ(index * 2, p.x, p.y, p.z); position.setXYZ(index * 2 + 1, q.x, q.y, q.z); });
    position.needsUpdate = true;
    signals.current.forEach((signal, index) => {
      if (!signal) return;
      const [a,b] = edges[index % edges.length];
      const progress = (time * 0.115 + index * 0.137) % 1;
      signal.position.copy(nodes[a].position).lerp(nodes[b].position, progress);
      signal.scale.setScalar(0.021 + Math.sin(progress * Math.PI) * 0.008);
    });
    if (magnetic) {
      state.camera.position.x += (px * 0.17 + sceneMotion.cameraX - state.camera.position.x) * Math.min(1, dt * 2.5);
      state.camera.position.y += (py * 0.12 + sceneMotion.cameraY - state.camera.position.y) * Math.min(1, dt * 2.5);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <group ref={group} rotation={[0, 0, -0.22]}>
    <group ref={core}>
      <mesh><sphereGeometry args={[0.91, compact ? 40 : 64, compact ? 28 : 48]}/><meshPhysicalMaterial color="#C8E5FF" metalness={0.13} roughness={0.09} transmission={compact ? 0 : 0.7} transparent opacity={compact ? 0.8 : 1} thickness={1.1} ior={1.4} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.65}/></mesh>
      <mesh><icosahedronGeometry args={[0.27, 1]}/><meshStandardMaterial color="#2563EB" roughness={0.16} metalness={0.55} emissive="#2563EB" emissiveIntensity={0.18}/></mesh>
      <mesh rotation={[1.05, 0.3, 0.2]}><torusGeometry args={[0.916, 0.005, 6, 96]}/><meshBasicMaterial color="#5F9EE6" transparent opacity={0.45}/></mesh>
      <mesh rotation={[0.4, 0.8, 1.5]}><torusGeometry args={[0.922, 0.003, 6, 96]}/><meshBasicMaterial color="#FFFFFF" transparent opacity={0.7}/></mesh>
    </group>
    {orbitPoints.map((geometry,index)=><lineLoop key={index} geometry={geometry} material={resources.rings[index]} dispose={null} rotation={[[1.12,0.3,-0.4],[0.4,1.07,0.6],[0.8,-0.7,-0.3]][index] as [number,number,number]} scale={[1,index===2?0.93:0.82,1]}/>)}
    <mesh ref={outerRing} rotation={[0.85, 0.55, 0]}><torusGeometry args={[2.5, 0.008, 6, 128, 1.3]}/><meshStandardMaterial color="#2563EB" metalness={0.3} roughness={0.4}/></mesh>
    <lineSegments geometry={resources.geometry} material={resources.edge} dispose={null} frustumCulled={false}/>
    {nodes.map((node,index)=><mesh key={index} dispose={null} ref={element=>{nodeMeshes.current[index]=element;}} geometry={resources.sphere} material={resources.material} position={node.base} scale={node.size} onPointerOver={event=>{event.stopPropagation();hover.current=index;}} onPointerOut={()=>{hover.current=null;}}/>)}
    {Array.from({length:particleCount},(_,index)=><mesh key={index} dispose={null} ref={element=>{signals.current[index]=element;}} geometry={resources.sphere} material={resources.signals[index%2]} scale={0.025}/>)}
  </group>;
}
