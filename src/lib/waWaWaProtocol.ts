// WaWaWa Protocol: weaving cosmic consent, access, and empathy.
export type ConsentRecord = {
  audience: string;
  purpose: string;
  timestamp: number;
};

export class WaWaWaConsentLattice {
  private ledger = new Map<string, ConsentRecord>();

  recordTransparentConsent(id: string, record: Omit<ConsentRecord, "timestamp">) {
    this.ledger.set(id, {
      ...record,
      timestamp: Date.now(),
    });
  }

  describeConsent() {
    if (this.ledger.size === 0) {
      return "no consent whispers captured";
    }
    const [id, record] = Array.from(this.ledger.entries()).at(-1)!;
    return `${id} for ${record.purpose} welcomed by ${record.audience}`;
  }
}
