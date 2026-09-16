import { CourseModule } from '../../types/course';
import { module1Foundations } from './module-1-foundations';
import { module2PhysicalMedia } from './module-2-physical-media';
import { module3DatalinkSwitching } from './module-3-datalink-switching';
import { module4Ipv4Subnetting } from './module-4-ipv4-subnetting';
import { module5ResolutionDiagnostics } from './module-5-resolution-diagnostics';
import { module6TransportPorts } from './module-6-transport-ports';
import { module7NetworkServices } from './module-7-network-services';
import { module8SecurityNat } from './module-8-security-nat';

export const allModules: CourseModule[] = [
  module1Foundations,
  module2PhysicalMedia,
  module3DatalinkSwitching,
  module4Ipv4Subnetting,
  module5ResolutionDiagnostics,
  module6TransportPorts,
  module7NetworkServices,
  module8SecurityNat,
];

export function getModuleById(id: string): CourseModule | undefined {
  return allModules.find((m) => m.id === id);
}

export function getLessonById(moduleId: string, lessonId: string) {
  const mod = getModuleById(moduleId);
  if (!mod) return undefined;
  const lesson = mod.lessons.find((l) => l.id === lessonId);
  return lesson ? { module: mod, lesson } : undefined;
}
