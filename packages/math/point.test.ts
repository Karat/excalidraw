<<<<<<< HEAD
import { point, pointRotateRads } from "./point";
=======
import { pointFrom, pointRotateRads } from "./point";
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
import type { Radians } from "./types";

describe("rotate", () => {
  it("should rotate over (x2, y2) and return the rotated coordinates for (x1, y1)", () => {
    const x1 = 10;
    const y1 = 20;
    const x2 = 20;
    const y2 = 30;
    const angle = (Math.PI / 2) as Radians;
    const [rotatedX, rotatedY] = pointRotateRads(
<<<<<<< HEAD
      point(x1, y1),
      point(x2, y2),
=======
      pointFrom(x1, y1),
      pointFrom(x2, y2),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      angle,
    );
    expect([rotatedX, rotatedY]).toEqual([30, 20]);
    const res2 = pointRotateRads(
<<<<<<< HEAD
      point(rotatedX, rotatedY),
      point(x2, y2),
=======
      pointFrom(rotatedX, rotatedY),
      pointFrom(x2, y2),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      -angle as Radians,
    );
    expect(res2).toEqual([x1, x2]);
  });
});
