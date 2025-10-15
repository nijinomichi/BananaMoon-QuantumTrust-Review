import { describe, expect, it } from "vitest";
import { composeBornProjection } from "./bornProjection";
import { harmonizeRadicanTrust, peekTrustSignal } from "./radicanTrust";
import { loveFrequency } from "./resonantConstants";
import { WaWaWaConsentLattice } from "./waWaWaProtocol";

describe("RadicanTrust resonance", () => {
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
