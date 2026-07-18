"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { BornProjection } from "./bornProjection";
import { trustAmplitude } from "./resonantConstants";

export type AgentResonance = {
  agent: string;
  resonance: number;
  trustVector: number;
};

type Listener = () => void;
const listeners = new Set<Listener>();

export type TrustSignal = {
  currentTrust: number;
  lastPoeticSignal: string;
};

const trustState: TrustSignal = {
  currentTrust: trustAmplitude,
  lastPoeticSignal: "awaiting observation",
};
let trustSnapshot: TrustSignal = { ...trustState };

function emitUpdate() {
  listeners.forEach((listener) => listener());
}

function snapshot(): TrustSignal {
  return trustSnapshot;
}

export function useRadicanTrustStream() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot,
    snapshot
  );
}

export function harmonizeRadicanTrust({
  projection,
  consentSignal,
  agentResonances = [],
}: {
  projection: BornProjection;
  consentSignal: { describeConsent: () => string };
  agentResonances?: AgentResonance[];
}) {
  const radialSum = projection.petals.reduce(
    (acc, petal) => acc + petal.motionGrace * petal.geometryPetal,
    0
  );
  const agentEnergy =
    agentResonances.length === 0
      ? trustAmplitude
      : agentResonances.reduce(
          (acc, agent) => acc + agent.resonance * agent.trustVector,
          0
        ) / agentResonances.length;

  const normalized = Math.min(
    0.99,
    Math.max(0.87, 0.45 + radialSum / 12 + agentEnergy * 0.4)
  );

  const poeticAgents =
    agentResonances.length === 0
      ? "solitary observer"
      : agentResonances
          .map((agent) => `${agent.agent}@${agent.resonance.toFixed(2)}`)
          .join(" ↔ ");
  const nextSignal: TrustSignal = {
    currentTrust: normalized,
    lastPoeticSignal: `consent lattice sings: ${consentSignal.describeConsent()} // agents: ${poeticAgents}`,
  };

  if (
    nextSignal.currentTrust === trustState.currentTrust &&
    nextSignal.lastPoeticSignal === trustState.lastPoeticSignal
  ) {
    return;
  }

  trustState.currentTrust = nextSignal.currentTrust;
  trustState.lastPoeticSignal = nextSignal.lastPoeticSignal;
  trustSnapshot = { ...trustState };
  emitUpdate();
}

export function useRadicanTrustHeartbeat(effect: (signal: TrustSignal) => void) {
  useEffect(() => {
    const listener = () => effect(snapshot());
    listeners.add(listener);
    listener();
    return () => listeners.delete(listener);
  }, [effect]);
}

export function peekTrustSignal(): TrustSignal {
  return snapshot();
}
