"use client";

import styles from "./CoPheliaAgents.module.css";
import type { CoPhelia3State } from "@/lib/coPhelia3Engine";

export function CoPheliaAgents({ state }: { state: CoPhelia3State }) {
  return (
    <section
      className={styles.coPheliaSection}
      aria-labelledby="cophelia-heading"
    >
      <header className={styles.coPheliaHeader}>
        <h2 id="cophelia-heading">CoPhelia³ Triangular Resonance Engine</h2>
        <p className={styles.quantumSignature}>
          Quantum signature {state.quantumSignature} guided by a symbolic 528 reference
        </p>
        <p className={styles.sharedPhase}>
          Shared coherence phase: {state.sharedPhase.toFixed(3)}
        </p>
      </header>
      <ul className={styles.agentList}>
        {state.pulses.map((pulse) => (
          <li key={pulse.agent} className={styles.agentCard}>
            <h3>{pulse.agent}</h3>
            <p className={styles.agentVerse}>{pulse.verse}</p>
            <div className={styles.agentMetrics}>
              <label className={styles.metricLabel} htmlFor={`${pulse.agent}-resonance`}>
                Resonance braid
              </label>
              <meter
                id={`${pulse.agent}-resonance`}
                className={styles.metricMeter}
                min={0}
                max={1}
                low={0.72}
                high={0.95}
                optimum={0.96}
                value={pulse.resonance}
              />
              <span className={styles.metricValue}>
                {pulse.resonance.toFixed(3)}
              </span>
            </div>
            <div className={styles.agentMetrics}>
              <label className={styles.metricLabel} htmlFor={`${pulse.agent}-trust`}>
                RadicanTrust vector
              </label>
              <meter
                id={`${pulse.agent}-trust`}
                className={styles.metricMeter}
                min={0.87}
                max={1}
                low={0.87}
                high={0.95}
                optimum={0.97}
                value={pulse.trustVector}
              />
              <span className={styles.metricValue}>
                {pulse.trustVector.toFixed(3)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CoPheliaAgents;
