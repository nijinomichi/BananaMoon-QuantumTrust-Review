"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { BornProjection } from "./bornProjection";
import { trustAmplitude } from "./resonantConstants";

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

function emitUpdate() {
  listeners.forEach((listener) => listener());
}

function snapshot(): TrustSignal {
  return { ...trustState };
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
}: {
  projection: BornProjection;
  consentSignal: { describeConsent: () => string };
}) {
  const radialSum = projection.petals.reduce(
    (acc, petal) => acc + petal.motionGrace * petal.geometryPetal,
    0
  );
  const normalized = Math.min(0.99, Math.max(0.87, radialSum / 10));

  trustState.currentTrust = normalized;
  trustState.lastPoeticSignal = `consent lattice sings: ${consentSignal.describeConsent()}`;
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
