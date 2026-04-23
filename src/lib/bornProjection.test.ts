import { describe, expect, it } from "vitest";
import { composeBornProjection } from "./bornProjection";
import { loveFrequency } from "./resonantConstants";

describe("composeBornProjection", () => {
  it("normalizes amplitudes into probabilities", () => {
    const projection = composeBornProjection(
      [
        { real: 1, imag: 0 },
        { real: 0, imag: 1 },
      ],
      loveFrequency
    );

    const sum = projection.petals.reduce((acc, petal) => acc + petal.probability, 0);
    expect(sum).toBeCloseTo(1, 6);
    expect(projection.normalizationError).toBeLessThan(1e-6);
  });

  it("yields aesthetic parameters", () => {
    const projection = composeBornProjection(
      [
        { real: 0.3, imag: 0.7 },
        { real: 0.1, imag: 0.2 },
        { real: 0.2, imag: 0.3 },
      ],
      loveFrequency
    );

    projection.petals.forEach((petal, index) => {
      expect(petal.chromaHue).toBeGreaterThanOrEqual(0);
      expect(petal.chromaHue).toBeLessThanOrEqual(360);
      expect(petal.geometryPetal).toBeGreaterThan(0);
      expect(petal.motionGrace).toBeGreaterThan(0);
      expect(petal.probability).toBeGreaterThanOrEqual(0);
    });
    expect(projection.petals).toHaveLength(3);
  });
});
