import { SubnetDrill, SubnetDrillType, SubnetCalculation } from '../../types/subnet';
import { calculateSubnet } from './ipv4';

export function generateRandomSubnetDrill(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): SubnetDrill {
  let cidr: number;
  let baseIp: string;

  if (difficulty === 'easy') {
    cidr = Math.floor(Math.random() * 5) + 24; // 24 to 28
    const octet3 = Math.floor(Math.random() * 10) + 1;
    const octet4 = Math.floor(Math.random() * 240) + 1;
    baseIp = `192.168.${octet3}.${octet4}`;
  } else if (difficulty === 'medium') {
    cidr = Math.floor(Math.random() * 9) + 22; // 22 to 30
    const octet2 = Math.floor(Math.random() * 15) + 16;
    const octet3 = Math.floor(Math.random() * 250);
    const octet4 = Math.floor(Math.random() * 250) + 1;
    baseIp = `172.${octet2}.${octet3}.${octet4}`;
  } else {
    cidr = Math.floor(Math.random() * 15) + 12; // 12 to 26
    const octet2 = Math.floor(Math.random() * 250);
    const octet3 = Math.floor(Math.random() * 250);
    const octet4 = Math.floor(Math.random() * 250) + 1;
    baseIp = `10.${octet2}.${octet3}.${octet4}`;
  }

  const calc = calculateSubnet(baseIp, cidr);

  const types: SubnetDrillType[] = ['network_id', 'broadcast', 'usable_range', 'host_count', 'cidr_to_mask'];
  const drillType = types[Math.floor(Math.random() * types.length)];

  let promptFa = '';
  let expectedAnswer = '';
  const derivationStepsFa: string[] = [];

  const octetMask = parseInt(calc.subnetMask.split('.')[3] || '0', 10);
  const blockSize = 256 - octetMask;

  switch (drillType) {
    case 'network_id':
      promptFa = `آدرس شبکه (Network ID) برای آدرس ${baseIp}/${cidr} کدام است؟`;
      expectedAnswer = calc.networkAddress;
      derivationStepsFa.push(`۱. پیشوند /${cidr} معادل ساب‌نت ماسک ${calc.subnetMask} است.`);
      derivationStepsFa.push(`۲. ارزش گام پرش (Block Size) برابر با: ۲۵۶ منهای بخش انتهایی ماسک (${octetMask}) = ${blockSize} است.`);
      derivationStepsFa.push(`۳. بنابراین آدرس شبکه متناظر برابر با ${calc.networkAddress} محاسبه می‌شود.`);
      break;

    case 'broadcast':
      promptFa = `آدرس همگانی (Broadcast Address) برای زیرشبکه ${baseIp}/${cidr} کدام است؟`;
      expectedAnswer = calc.broadcastAddress;
      derivationStepsFa.push(`۱. آدرس شروع شبکه: ${calc.networkAddress} است.`);
      derivationStepsFa.push(`۲. با اضافه کردن گام پرش (${blockSize}) و کسر ۱ واحد، آخرین آدرس به عنوان برودکست به دست می‌آید: ${calc.broadcastAddress}.`);
      break;

    case 'host_count':
      promptFa = `در یک زیرشبکه با پیشوند /${cidr}، حداکثر چند هاست معتبر و قابل استفاده برای کلاینت‌ها وجود دارد؟`;
      expectedAnswer = String(calc.usableHosts);
      derivationStepsFa.push(`۱. تعداد کل بیت‌های هاست برابر است با: ۳۲ منهای ${cidr} = ${32 - cidr} بیت.`);
      derivationStepsFa.push(`۲. تعداد کل آدرس‌ها: ۲ به توان ${32 - cidr} = ${calc.totalHosts}.`);
      derivationStepsFa.push(`۳. دو آدرس شبکه و برودکست رزرو هستند؛ بنابراین هاست‌های قابل استفاده: ${calc.totalHosts} منهای ۲ = ${calc.usableHosts} است.`);
      break;

    case 'usable_range':
      promptFa = `اولین آدرس هاست قابل استفاده (First Usable Host) برای ${baseIp}/${cidr} کدام است؟`;
      expectedAnswer = calc.firstUsableIp;
      derivationStepsFa.push(`۱. آدرس شبکه: ${calc.networkAddress} است.`);
      derivationStepsFa.push(`۲. اولین هاست معتبر همیشه یک واحد بعد از آدرس شبکه است: ${calc.firstUsableIp}.`);
      break;

    case 'cidr_to_mask':
    default:
      promptFa = `ساب‌نت ماسک ده‌دهی متناظر با پیشوند /${cidr} کدام است؟`;
      expectedAnswer = calc.subnetMask;
      derivationStepsFa.push(`۱. پیشوند /${cidr} یعنی دقیقا ${cidr} بیت اول ماسک عدد یک هستند.`);
      derivationStepsFa.push(`۲. تبدیل باینری به ده‌دهی ماسک ${calc.subnetMask} را نتیجه می‌دهد.`);
      break;
  }

  const optionsFa = generatePlausibleOptions(drillType, expectedAnswer, calc);

  return {
    id: `drill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    type: drillType,
    promptFa,
    givenIp: baseIp,
    givenCidr: cidr,
    expectedAnswer,
    optionsFa,
    derivationStepsFa,
  };
}

function generatePlausibleOptions(
  type: SubnetDrillType,
  correct: string,
  calc: SubnetCalculation
): string[] {
  const wrongSet = new Set<string>();

  if (type === 'network_id') {
    wrongSet.add(calc.firstUsableIp);
    wrongSet.add(calc.broadcastAddress);
    wrongSet.add(calc.inputIp);
  } else if (type === 'broadcast') {
    wrongSet.add(calc.lastUsableIp);
    wrongSet.add(calc.networkAddress);
    wrongSet.add('255.255.255.255');
  } else if (type === 'host_count') {
    wrongSet.add(String(calc.totalHosts));
    wrongSet.add(String(Math.max(0, calc.usableHosts - 2)));
    wrongSet.add(String(calc.usableHosts + 2));
  } else if (type === 'usable_range') {
    wrongSet.add(calc.networkAddress);
    wrongSet.add(calc.lastUsableIp);
    wrongSet.add(calc.inputIp);
  } else {
    wrongSet.add('255.255.255.0');
    wrongSet.add('255.255.255.128');
    wrongSet.add('255.255.255.192');
  }

  wrongSet.delete(correct);
  const options = Array.from(wrongSet).slice(0, 3);
  options.push(correct);
  
  return options.sort(() => Math.random() - 0.5);
}
