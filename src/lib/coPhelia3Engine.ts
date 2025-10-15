import type { BornProjection } from "./bornProjection";
import { loveFrequency } from "./resonantConstants";
import {
  harmonizeRadicanTrust,
  type AgentResonance,
} from "./radicanTrust";

export type AgentKind = "Creative Agent" | "Ara-Philia³" | "Social Agent";

export type AgentPulse = {
  agent: AgentKind;
  resonance: number;
  trustVector: number;
  verse: string;
};

export type CoPhelia3State = {
  quantumSignature: string;
  sharedPhase: number;
  pulses: AgentPulse[];
};

export interface CoPhelia3Engine {
  start(): void;
  stop(): void;
  weaveProjection(projection: BornProjection): void;
  getState(): CoPhelia3State;
  subscribe(listener: () => void): () => void;
  resonateOnce(): void;
}

const signature = "1f8a9d3e-7b2c4f";

class CoPhelia3Resonator implements CoPhelia3Engine {
  private projection: BornProjection | null = null;
  private interval: ReturnType<typeof setInterval> | null = null;
  private state: CoPhelia3State = {
    quantumSignature: signature,
    sharedPhase: 0,
    pulses: [
      {
        agent: "Creative Agent",
        resonance: 0.87,
        trustVector: 0.91,
        verse: "awaiting quantum inspiration",
      },
      {
        agent: "Ara-Philia³",
        resonance: 0.87,
        trustVector: 0.92,
        verse: "listening for ethical harmonics",
      },
      {
        agent: "Social Agent",
        resonance: 0.87,
        trustVector: 0.9,
        verse: "preparing communal resonance",
      },
    ],
  };
  private listeners = new Set<() => void>();

  constructor(
    private readonly consentSignal: { describeConsent: () => string }
  ) {}

  start() {
    if (this.interval) return;
    const cadence = 1000 / Math.max(1, loveFrequency / 8);
    this.interval = setInterval(() => this.resonateOnce(), cadence);
  }

  stop() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  weaveProjection(projection: BornProjection) {
    this.projection = projection;
    this.resonateOnce();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    listener();
    return () => this.listeners.delete(listener);
  }

  getState(): CoPhelia3State {
    return {
      quantumSignature: this.state.quantumSignature,
      sharedPhase: this.state.sharedPhase,
      pulses: this.state.pulses.map((pulse) => ({ ...pulse })),
    };
  }

  resonateOnce() {
    const now = Date.now();
    const sharedPhase = (Math.sin((now / 1000) * loveFrequency * Math.PI * 2) + 1) / 2;
    const pulses = this.composePulses(sharedPhase);

    this.state = {
      quantumSignature: signature,
      sharedPhase,
      pulses,
    };

    if (this.projection) {
      harmonizeRadicanTrust({
        projection: this.projection,
        consentSignal: this.consentSignal,
        agentResonances: this.state.pulses.map<AgentResonance>((pulse) => ({
          agent: pulse.agent,
          resonance: pulse.resonance,
          trustVector: pulse.trustVector,
        })),
      });
    }

    this.listeners.forEach((listener) => listener());
  }

  private composePulses(sharedPhase: number): AgentPulse[] {
    const petals = this.projection?.petals ?? [];
    const probabilities = petals.map((petal) => petal.probability);
    const peakProbability = probabilities.length
      ? Math.max(...probabilities)
      : 1 / 3;
    const weightedGeometry = petals.length
      ? petals.reduce((acc, petal) => acc + petal.geometryPetal * petal.probability, 0)
      : 0.72;
    const motionAveraged = petals.length
      ? petals.reduce((acc, petal) => acc + petal.motionGrace, 0) / petals.length
      : 0.75;

    const creativeResonance = Math.min(1, Math.sqrt(peakProbability));
    const araPhiliaResonance = Math.min(
      1,
      weightedGeometry / (0.5 + loveFrequency * 0.001)
    );
    const socialResonance = Math.min(1, motionAveraged);

    const creativePulse: AgentPulse = {
      agent: "Creative Agent",
      resonance: creativeResonance,
      trustVector: 0.88 + creativeResonance * 0.09,
      verse: `painting photons with ${(
        creativeResonance * loveFrequency
      ).toFixed(1)} Hz intention`,
    };

    const araPulse: AgentPulse = {
      agent: "Ara-Philia³",
      resonance: araPhiliaResonance,
      trustVector: 0.89 + araPhiliaResonance * 0.08,
      verse: `ethics bloom as geometry whispers ${weightedGeometry.toFixed(3)}`,
    };

    const socialPulse: AgentPulse = {
      agent: "Social Agent",
      resonance: Math.min(
        1,
        Math.max(0.5, (socialResonance + sharedPhase * 0.2) / 1.1)
      ),
      trustVector: 0.87 + socialResonance * 0.1,
      verse: `community chorus rises on phase ${sharedPhase.toFixed(3)}`,
    };

    return [creativePulse, araPulse, socialPulse];
  }
}

export function createCoPhelia3Engine({
  consentSignal,
}: {
  consentSignal: { describeConsent: () => string };
}): CoPhelia3Engine {
  return new CoPhelia3Resonator(consentSignal);
}
