import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface PacketPulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
}

export interface NetworkBackgroundCanvasProps {
  theme: 'light' | 'dark';
}

export const NetworkBackgroundCanvas: React.FC<NetworkBackgroundCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 640;
    const nodeCount = isMobile ? 18 : 42;
    const maxDistance = isMobile ? 90 : 135;
    const maxDistanceSq = maxDistance * maxDistance;
    const maxPacketDistSq = (maxDistance * 1.5) * (maxDistance * 1.5);

    const nodes: ParticleNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
        vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.45),
        radius: Math.random() * 2 + 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const packets: PacketPulse[] = [];
    const packetCount = isMobile ? 3 : 7;
    for (let i = 0; i < packetCount; i++) {
      const src = Math.floor(Math.random() * nodeCount);
      let tgt = Math.floor(Math.random() * nodeCount);
      while (tgt === src) tgt = Math.floor(Math.random() * nodeCount);
      packets.push({
        sourceIdx: src,
        targetIdx: tgt,
        progress: Math.random(),
        speed: Math.random() * 0.006 + 0.004,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isTabVisible = !document.hidden;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isDark = theme === 'dark';
    const nodeColor = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(2, 132, 199, 0.28)';
    const nodePulseColor = isDark ? 'rgba(14, 165, 233, 0.8)' : 'rgba(2, 132, 199, 0.55)';
    const packetColor = isDark ? '#38bdf8' : '#0284c7';

    const render = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse/Touch proximity gentle attraction
        const dxMouse = mouseX - node.x;
        const dyMouse = mouseY - node.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
        if (distMouseSq < 22500 && distMouseSq > 25) {
          const distMouse = Math.sqrt(distMouseSq);
          const force = (150 - distMouse) / 150;
          node.x += (dxMouse / distMouse) * force * 0.4;
          node.y += (dyMouse / distMouse) * force * 0.4;
        }

        // Draw node with subtle pulse glow
        node.pulsePhase += 0.025;
        const pulse = Math.sin(node.pulsePhase) * 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
        ctx.fillStyle = distMouseSq < 22500 ? nodePulseColor : nodeColor;
        ctx.fill();
      }

      // 2. Draw connecting mesh links (Optimized: skip Math.sqrt if distance squared >= maxDistanceSq)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 3. Draw traveling packet pulses (Optimized distance check)
      for (let p = 0; p < packets.length; p++) {
        const packet = packets[p];
        const srcNode = nodes[packet.sourceIdx];
        const tgtNode = nodes[packet.targetIdx];

        if (srcNode && tgtNode) {
          const dx = tgtNode.x - srcNode.x;
          const dy = tgtNode.y - srcNode.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxPacketDistSq) {
            packet.progress += packet.speed;
            if (packet.progress >= 1) {
              packet.progress = 0;
              packet.sourceIdx = packet.targetIdx;
              packet.targetIdx = Math.floor(Math.random() * nodeCount);
            }

            const curX = srcNode.x + dx * packet.progress;
            const curY = srcNode.y + dy * packet.progress;

            ctx.beginPath();
            ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = packetColor;
            ctx.fill();
          } else {
            packet.targetIdx = Math.floor(Math.random() * nodeCount);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};
