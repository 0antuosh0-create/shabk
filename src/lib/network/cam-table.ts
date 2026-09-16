import { CamTableEntry } from '../../types/network';

export interface SimulatedFrame {
  srcMac: string;
  dstMac: string;
  ingressPort: number;
}

export interface SwitchDispatchResult {
  action: 'forward' | 'flood';
  egressPorts: number[];
  learnedSrcMac: string;
  ingressPort: number;
  explanationFa: string;
}

export class SwitchSimulator {
  private camTable: Map<string, CamTableEntry> = new Map();
  private totalPorts: number = 4;

  constructor(totalPorts: number = 4) {
    this.totalPorts = totalPorts;
  }

  public getTableEntries(): CamTableEntry[] {
    return Array.from(this.camTable.values());
  }

  public clearTable(): void {
    this.camTable.clear();
  }

  public processFrame(frame: SimulatedFrame): SwitchDispatchResult {
    // 1. Learn Source MAC
    this.camTable.set(frame.srcMac, {
      macAddress: frame.srcMac,
      port: frame.ingressPort,
      timestamp: Date.now(),
    });

    // 2. Broadcast or Unknown Unicast -> Flood
    const isBroadcast = frame.dstMac.toUpperCase() === 'FF:FF:FF:FF:FF:FF';
    const knownDst = this.camTable.get(frame.dstMac);

    if (isBroadcast || !knownDst) {
      // Flood to all ports except ingress port
      const egressPorts = Array.from({ length: this.totalPorts }, (_, i) => i + 1).filter(
        (p) => p !== frame.ingressPort
      );

      return {
        action: 'flood',
        egressPorts,
        learnedSrcMac: frame.srcMac,
        ingressPort: frame.ingressPort,
        explanationFa: isBroadcast
          ? `فریم برودکست لایه ۲ دریافت شد. فریم روی تمام پورت‌های ${egressPorts.join('، ')} تکثیر شد.`
          : `مک‌آدرس مقصد (${frame.dstMac}) هنوز در جدول CAM ثبت نشده است. فریم به تمام پورت‌ها (Flood) ارسال شد.`,
      };
    }

    // 3. Known Unicast Forwarding
    return {
      action: 'forward',
      egressPorts: [Number(knownDst.port)],
      learnedSrcMac: frame.srcMac,
      ingressPort: frame.ingressPort,
      explanationFa: `مک‌آدرس مقصد در جدول CAM موجود بود. فریم مستقیماً فقط به پورت ${knownDst.port} هدایت شد.`,
    };
  }
}
