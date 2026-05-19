// WaWaWa Protocol: weaving cosmic consent, access, and empathy.
export type ResonanceChain = "ethereum" | "polygon";

export type ConsentRecord = {
  audience: string;
  purpose: string;
  timestamp: number;
  chain: ResonanceChain;
  txHash: string;
};

export class WaWaWaConsentLattice {
  private ledger = new Map<string, ConsentRecord>();

  recordTransparentConsent(
    id: string,
    record: Omit<ConsentRecord, "timestamp" | "txHash"> & { txHash?: string }
  ) {
    this.ledger.set(id, {
      ...record,
      timestamp: Date.now(),
      txHash: record.txHash ?? synthesizeQuantumReceipt(id, record),
    });
  }

  describeConsent() {
    if (this.ledger.size === 0) {
      return "no consent whispers captured";
    }
    const [id, record] = Array.from(this.ledger.entries()).at(-1)!;
    return `${id} for ${record.purpose} welcomed by ${record.audience} on ${record.chain} (${record.txHash.slice(0, 10)}…)`;
  }
}

function synthesizeQuantumReceipt(
  id: string,
  record: { audience: string; purpose: string; chain: ResonanceChain }
) {
  const quantumMessage = `${id}:${record.audience}:${record.purpose}:${record.chain}`;
  let seed = 0;
  for (let index = 0; index < quantumMessage.length; index += 1) {
    seed = (seed * 33 + quantumMessage.charCodeAt(index)) >>> 0;
  }
  return `0x${seed.toString(16).padStart(8, "0").repeat(8).slice(0, 64)}`;
}
