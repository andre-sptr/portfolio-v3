export type VectorState = { x: number; y: number; z: number };

/** Semi-implicit Euler spring. Mutates ref-owned vectors without allocating per frame. */
export function stepDampedSpring(
  position: VectorState,
  velocity: VectorState,
  targetX: number,
  targetY: number,
  targetZ: number,
  delta: number,
  stiffness = 30,
  damping = 10,
): void {
  const dt = Math.max(0, Math.min(delta, 1 / 30));
  velocity.x += ((targetX - position.x) * stiffness - velocity.x * damping) * dt;
  velocity.y += ((targetY - position.y) * stiffness - velocity.y * damping) * dt;
  velocity.z += ((targetZ - position.z) * stiffness - velocity.z * damping) * dt;
  position.x += velocity.x * dt;
  position.y += velocity.y * dt;
  position.z += velocity.z * dt;
}
