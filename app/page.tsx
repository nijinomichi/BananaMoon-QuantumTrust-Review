"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { composeBornProjection, type QuantumAmplitude } from "@/lib/bornProjection";
import { harmonizeRadicanTrust, useRadicanTrustStream } from "@/lib/radicanTrust";
import { WaWaWaConsentLattice } from "@/lib/waWaWaProtocol";
import { loveFrequency } from "@/lib/resonantConstants";

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
  const trustStream = useRadicanTrustStream();

  const projection = useMemo(
    () => composeBornProjection(canonicalAmplitudes, loveFrequency),
    []
  );

  useEffect(() => {
    consentWeave.recordTransparentConsent("public-demo", {
      audience: "interstellar",
      purpose: "aesthetic-harmonics",
    });
    harmonizeRadicanTrust({
      trustStream,
      projection,
      consentSignal: consentWeave,
    });
  }, [consentWeave, projection, trustStream]);

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
      </section>
      <QuantumCanvas projection={projection} />
    </main>
  );
}
