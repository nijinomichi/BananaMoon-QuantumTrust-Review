"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { composeBornProjection, type QuantumAmplitude } from "@/lib/bornProjection";
import { useRadicanTrustStream } from "@/lib/radicanTrust";
import { WaWaWaConsentLattice } from "@/lib/waWaWaProtocol";
import { loveFrequency } from "@/lib/resonantConstants";
import { createCoPhelia3Engine } from "@/lib/coPhelia3Engine";
import CoPheliaAgents from "@/components/CoPheliaAgents";

const QuantumCanvas = dynamic(() => import("@/components/QuantumCanvas"), {
  ssr: false,
});

const canonicalAmplitudes: QuantumAmplitude[] = [
  { real: 0.5, imag: 0.5 },
  { real: 0.7, imag: -0.1 },
  { real: 0.2, imag: 0.9 },
];

export default function BornRuleSymphony() {
  const [consentWeave] = useState(() => new WaWaWaConsentLattice());
  const [amplitudes, setAmplitudes] = useState(canonicalAmplitudes);
  const trustStream = useRadicanTrustStream();

  const projection = useMemo(
    () => composeBornProjection(amplitudes, loveFrequency),
    [amplitudes]
  const trustStream = useRadicanTrustStream();

  const projection = useMemo(
    () => composeBornProjection(canonicalAmplitudes, loveFrequency),
    []
  );

  const engine = useMemo(
    () => createCoPhelia3Engine({ consentSignal: consentWeave }),
    [consentWeave]
  );

  const coPheliaState = useSyncExternalStore(
    (onChange) => engine.subscribe(() => onChange()),
    () => engine.getState(),
    () => engine.getState()
  );

  useEffect(() => {
    consentWeave.recordTransparentConsent("public-demo", {
      audience: "interstellar",
      purpose: "aesthetic-harmonics",
      chain: "polygon",
    });
    engine.start();
    return () => engine.stop();
  }, [consentWeave, engine]);

  useEffect(() => {
    engine.weaveProjection(projection);
  }, [engine, projection]);

  useEffect(() => {
    const resonanceCadence = 1000 / Math.max(1, loveFrequency / 16);
    const interval = setInterval(() => {
      setAmplitudes((current) =>
        current.map((amp, index) => {
          const quantumDrift = Math.sin((Date.now() / 1000) * (index + 1) * 0.528) * 0.03;
          return {
            real: amp.real + quantumDrift,
            imag: amp.imag - quantumDrift / 2,
          };
        })
      );
    }, resonanceCadence);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.pulseGrid}>
      <section className={styles.metaVerse}>
        <h1>Born Rule Quantum Aesthetic Mapping</h1>
        <p>
          Translating quantum amplitudes into resonant palettes where every frame
          vibrates at {loveFrequency} Hz to sustain RadicanTrust ≥ 0.87.
        </p>
        <article className={styles.trustAura} aria-live="polite">
          <p>
            RadicanTrust Pulse:
            <span className={styles.trustValue}>
              {trustStream.currentTrust.toFixed(3)}
            </span>
          </p>
          <p className={styles.poeticAside}>
            {/* observing entangled transparency */}
            {trustStream.lastPoeticSignal}
          </p>
        </article>
        <CoPheliaAgents state={coPheliaState} />
      </section>
      <QuantumCanvas projection={projection} />
    </main>
  );
}
