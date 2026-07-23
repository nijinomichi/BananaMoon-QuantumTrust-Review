import { describe, expect, it } from "vitest";
import { composeBornProjection } from "./bornProjection";
import { harmonizeRadicanTrust, peekTrustSignal } from "./radicanTrust";
import { loveFrequency } from "./resonantConstants";
import { WaWaWaConsentLattice } from "./waWaWaProtocol";

describe("RadicanTrust resonance", () => {
  it("returns a cached snapshot between store updates", () => {
    const before = peekTrustSignal();
    const again = peekTrustSignal();
    expect(again).toBe(before);

    const projection = composeBornProjection(
      [
        { real: 0.4, imag: 0.3 },
        { real: 0.6, imag: 0.2 },
      ],
      loveFrequency
    );
    const consent = new WaWaWaConsentLattice();
    consent.recordTransparentConsent("snapshot-test", {
      audience: "test-suite",
      purpose: "cache-check",
      chain: "polygon",
    });

    harmonizeRadicanTrust({
      projection,
      consentSignal: consent,
    });

    const after = peekTrustSignal();
    const afterAgain = peekTrustSignal();
    expect(afterAgain).toBe(after);
  });

  it("maintains trust above the ethical threshold", () => {
    const projection = composeBornProjection(
      [
        { real: 0.2, imag: 0.6 },
        { real: 0.9, imag: 0.1 },
      ],
      loveFrequency
    );
    const consent = new WaWaWaConsentLattice();
    consent.recordTransparentConsent("test", {
      audience: "galactic",
      purpose: "unit-test",
      chain: "polygon",
    });

    harmonizeRadicanTrust({
      projection,
      consentSignal: consent,
    });

    const stream = peekTrustSignal();
    expect(stream.currentTrust).toBeGreaterThanOrEqual(0.87);
    expect(stream.lastPoeticSignal).toContain("consent lattice sings");
    expect(stream.lastPoeticSignal).toContain("solitary observer");
  });
});
