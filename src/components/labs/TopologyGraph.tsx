import React from 'react';
import { VirtualNetworkNode } from '../../types/network';
import { Laptop, HardDrive, Router, Server } from 'lucide-react';

export interface TopologyGraphProps {
  nodes: VirtualNetworkNode[];
  activeNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
}

export const TopologyGraph: React.FC<TopologyGraphProps> = ({
  nodes,
  activeNodeId,
  onSelectNode,
}) => {
  return (
    <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 flex items-center justify-between">
        <span>نقشه توپولوژی مجازی سناریو (Network Topology Map)</span>
        <span className="text-[11px] font-normal">برای مشاهده وضعیت هر گره، روی آن کلیک کنید</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {nodes.map((node) => {
          const iface = node.interfaces[0];
          const isSelected = node.id === activeNodeId;
          const isUp = iface?.status === 'up';

          let icon = <Laptop size={22} />;
          if (node.type === 'switch') icon = <HardDrive size={22} />;
          if (node.type === 'router') icon = <Router size={22} />;
          if (node.type === 'server') icon = <Server size={22} />;

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode && onSelectNode(node.id)}
              className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-net-blue ring-2 ring-sky-200 dark:ring-sky-900 shadow-sm'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              <div className="flex justify-center mb-2">
                <div className={`p-2.5 rounded-xl ${
                  isUp ? 'bg-sky-50 text-net-blue dark:bg-sky-950/60' : 'bg-rose-50 text-rose-600'
                }`}>
                  {icon}
                </div>
              </div>

              <div className="font-bold text-xs text-ink-primary dark:text-ink-light mb-0.5 truncate">
                {node.name}
              </div>

              {iface && (
                <div className="space-y-0.5 font-mono text-[10px] text-slate-500">
                  <div className="ltr-text text-net-blue font-bold">{iface.ipAddress}</div>
                  <div className="ltr-text truncate">{iface.macAddress}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
