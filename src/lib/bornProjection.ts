// Translating quantum superpositions into luminous parameters.
export type QuantumAmplitude = { real: number; imag: number };

export type ProbabilityPetal = {
  probability: number;
  chromaHue: number;
  geometryPetal: number;
  motionGrace: number;
};

export type BornProjection = {
  petals: ProbabilityPetal[];
  normalizationError: number;
};

const epsilon = 1e-6;

export function composeBornProjection(
  amplitudes: QuantumAmplitude[],
  resonantFrequency: number
): BornProjection {
  const probabilities = amplitudes.map((amp) =>
    Math.pow(Math.hypot(amp.real, amp.imag), 2)
  );
  const sum = probabilities.reduce((acc, value) => acc + value, 0);
  const normalized = probabilities.map((value) =>
    sum > epsilon ? value / sum : 1 / Math.max(amplitudes.length, 1)
  );
  const petals = normalized.map((probability, index) =>
    bloomAestheticPetal(probability, index, resonantFrequency)
  );
  const normalizedSum = normalized.reduce((acc, value) => acc + value, 0);

  return {
    petals,
    normalizationError: Math.abs(normalizedSum - 1),
  };
}

function bloomAestheticPetal(
  probability: number,
  index: number,
  resonantFrequency: number
): ProbabilityPetal {
  const chromaHue = (probability * 360 + index * 47) % 360;
  const geometryPetal = 0.5 + probability * resonantFrequency * 0.001;
  const motionGrace = 0.25 + Math.sqrt(Math.max(probability, 0)) * 0.75;

  return {
    probability,
    chromaHue,
    geometryPetal,
    motionGrace,
  };
}

export function translateProbabilitiesToPalette(projection: BornProjection) {
  return projection.petals.map((petal) => {
    const saturation = 60 + petal.probability * 40;
    const lightness = 30 + (1 - petal.probability) * 20;
    return {
      h: petal.chromaHue,
      s: saturation,
      l: lightness,
    };
  });
}
