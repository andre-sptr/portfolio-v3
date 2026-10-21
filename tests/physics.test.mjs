import { test } from "node:test";
import assert from "node:assert/strict";
import { stepDampedSpring } from "../src/lib/physics.ts";

test("magnetic response converges and returns to equilibrium at 30, 60, and 144 Hz", () => {
  for (const fps of [30, 60, 144]) {
    const position = { x: 0, y: 0, z: 0 };
    const velocity = { x: 0, y: 0, z: 0 };
    for (let i = 0; i < fps * 6; i++) {
      stepDampedSpring(position, velocity, 0.16, -0.13, 0, 1 / fps);
      assert.ok(Math.abs(position.x) < 0.18);
      assert.ok(Math.abs(position.y) < 0.15);
    }
    assert.ok(Math.abs(position.x - 0.16) < 0.00001);
    for (let i = 0; i < fps * 6; i++) stepDampedSpring(position, velocity, 0, 0, 0, 1 / fps);
    assert.ok(Math.hypot(position.x, position.y, position.z) < 0.00001);
  }
});

test("a suspended tab's long frame cannot destabilize the node spring", () => {
  const position = { x: 2, y: 1, z: -1 };
  const velocity = { x: 0, y: 0, z: 0 };
  for (let i = 0; i < 600; i++) {
    stepDampedSpring(position, velocity, -2, 0, 1, i % 12 === 0 ? 60 : 1 / 60, 23, 9);
    assert.ok(Object.values(position).every(Number.isFinite));
    assert.ok(Math.abs(position.x) < 2.2);
    assert.ok(Math.abs(position.z) < 1.2);
  }
  assert.ok(Math.abs(position.x + 2) < 0.00001);
});

test("zero and negative time deltas leave the spring unchanged", () => {
  const position = { x: 1, y: 2, z: 3 };
  const velocity = { x: 0, y: 0, z: 0 };
  for (const delta of [0, -1]) stepDampedSpring(position, velocity, 0, 0, 0, delta);
  assert.deepEqual(position, { x: 1, y: 2, z: 3 });
  assert.deepEqual(velocity, { x: 0, y: 0, z: 0 });
});
