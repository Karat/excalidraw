import { isPointOnSymmetricArc } from "./arc";
<<<<<<< HEAD
import { point } from "./point";
=======
import { pointFrom } from "./point";
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db

describe("point on arc", () => {
  it("should detect point on simple arc", () => {
    expect(
      isPointOnSymmetricArc(
        {
          radius: 1,
          startAngle: -Math.PI / 4,
          endAngle: Math.PI / 4,
        },
<<<<<<< HEAD
        point(0.92291667, 0.385),
=======
        pointFrom(0.92291667, 0.385),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      ),
    ).toBe(true);
  });
  it("should not detect point outside of a simple arc", () => {
    expect(
      isPointOnSymmetricArc(
        {
          radius: 1,
          startAngle: -Math.PI / 4,
          endAngle: Math.PI / 4,
        },
<<<<<<< HEAD
        point(-0.92291667, 0.385),
=======
        pointFrom(-0.92291667, 0.385),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      ),
    ).toBe(false);
  });
  it("should not detect point with good angle but incorrect radius", () => {
    expect(
      isPointOnSymmetricArc(
        {
          radius: 1,
          startAngle: -Math.PI / 4,
          endAngle: Math.PI / 4,
        },
<<<<<<< HEAD
        point(-0.5, 0.5),
=======
        pointFrom(-0.5, 0.5),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      ),
    ).toBe(false);
  });
});
