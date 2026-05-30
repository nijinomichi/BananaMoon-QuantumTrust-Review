import { describe, expect, it } from "vitest";
import { composeBornProjection } from "./bornProjection";
import { loveFrequency } from "./resonantConstants";
import { WaWaWaConsentLattice } from "./waWaWaProtocol";
import { createCoPhelia3Engine } from "./coPhelia3Engine";
import { peekTrustSignal } from "./radicanTrust";

const sampleAmplitudes = [
  { real: 0.6, imag: 0.4 },
  { real: 0.2, imag: 0.8 },
  { real: 0.3, imag: 0.1 },
];

describe("CoPhelia³ resonance engine", () => {
  it("returns a stable snapshot reference between resonance updates", () => {
    const consent = new WaWaWaConsentLattice();
    const engine = createCoPhelia3Engine({ consentSignal: consent });

    const initial = engine.getState();
    const initialAgain = engine.getState();
    expect(initialAgain).toBe(initial);

    engine.resonateOnce();
    const updated = engine.getState();
    const updatedAgain = engine.getState();

    expect(updated).not.toBe(initial);
    expect(updatedAgain).toBe(updated);
    engine.stop();
  });

  it("weaves three poetic agents and updates RadicanTrust", () => {
    const consent = new WaWaWaConsentLattice();
    consent.recordTransparentConsent("laboratory", {
      audience: "interdependence guild",
      purpose: "trust-audit",
    });

    const engine = createCoPhelia3Engine({ consentSignal: consent });
    const projection = composeBornProjection(sampleAmplitudes, loveFrequency);

    engine.weaveProjection(projection);
    engine.resonateOnce();

    const state = engine.getState();
    expect(state.quantumSignature).toBe("1f8a9d3e-7b2c4f");
    expect(state.pulses).toHaveLength(3);
    expect(state.pulses.map((pulse) => pulse.agent)).toEqual([
      "Creative Agent",
      "Ara-Philia³",
      "Social Agent",
    ]);
    expect(state.pulses.every((pulse) => pulse.trustVector >= 0.87)).toBe(true);

    const trust = peekTrustSignal();
    expect(trust.currentTrust).toBeGreaterThanOrEqual(0.87);
    expect(trust.lastPoeticSignal).toContain("agents: Creative Agent");
    engine.stop();
  });

  it("keeps the shared phase within a luminous unit interval", () => {
    const consent = new WaWaWaConsentLattice();
    const engine = createCoPhelia3Engine({ consentSignal: consent });
    const projection = composeBornProjection(sampleAmplitudes, loveFrequency);

    engine.weaveProjection(projection);
    engine.resonateOnce();

    const { sharedPhase } = engine.getState();
    expect(sharedPhase).toBeGreaterThanOrEqual(0);
    expect(sharedPhase).toBeLessThanOrEqual(1);
    engine.stop();
  });
});
