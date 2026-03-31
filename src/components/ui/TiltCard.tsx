import React, { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '../../utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  tiltMax?: number;
}

// 检测用户是否偏好减少动画（无障碍 + 性能双重考虑）
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ className, children, glow = false, tiltMax = 14, style, ...props }, _ref) => {
    const cardRef    = useRef<HTMLDivElement>(null);
    const frameRef   = useRef<number>(0);
    const inViewRef  = useRef(false);
    const reducedMotion = usePrefersReducedMotion();

    const [tilt,   setTilt]   = useState({ rotX: 0, rotY: 0, scale: 1 });
    const [glare,  setGlare]  = useState({ x: 50, y: 50, opacity: 0 });
    const [border, setBorder] = useState({ x: 0.5, y: 0.5, opacity: 0 });

    // IntersectionObserver: 只对在视口内的卡片处理鼠标事件状态
    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
      const io = new IntersectionObserver(
        ([entry]) => { inViewRef.current = entry.isIntersecting; },
        { threshold: 0.1 }
      );
      io.observe(card);
      return () => io.disconnect();
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      // 不在视口或用户偏好减少动画时跳过
      if (!inViewRef.current || reducedMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setTilt({
          rotX: -(ny - 0.5) * tiltMax * 2,
          rotY: (nx - 0.5) * tiltMax * 2,
          scale: 1.03,
        });
        setGlare({ x: nx * 100, y: ny * 100, opacity: 0.2 });
        setBorder({ x: nx, y: ny, opacity: 1 });
      });
    }, [tiltMax, reducedMotion]);

    const handleMouseLeave = useCallback(() => {
      cancelAnimationFrame(frameRef.current);
      setTilt({ rotX: 0, rotY: 0, scale: 1 });
      setGlare(g => ({ ...g, opacity: 0 }));
      setBorder(b => ({ ...b, opacity: 0 }));
    }, []);

    // 清理 RAF on unmount
    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

    const isResting = tilt.rotX === 0 && tilt.rotY === 0;
    const borderAngle = Math.atan2(border.y - 0.5, border.x - 0.5) * (180 / Math.PI) + 90;

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          transform: reducedMotion
            ? 'none'
            : `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${tilt.scale},${tilt.scale},${tilt.scale})`,
          transition: isResting
            ? 'transform 0.55s cubic-bezier(.03,.98,.52,.99), box-shadow 0.55s ease'
            : 'transform 0.08s linear',
          // will-change 仅在活跃交互时提示 GPU 层
          willChange: isResting ? 'auto' : 'transform',
          transformStyle: 'preserve-3d',
          boxShadow: border.opacity
            ? `0 0 40px -8px hsla(${220 + border.x * 40},80%,60%,0.35), 0 20px 80px -20px hsla(260,80%,50%,0.2)`
            : '0 0 0 0 transparent',
        }}
        className={cn('relative rounded-3xl overflow-hidden group', className)}
        {...props}
      >
        {/* Animated neon border — 仅在非 reduced-motion 时渲染 */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: border.opacity * 0.9,
              padding: '1px',
              background: `conic-gradient(
                from ${borderAngle}deg at ${border.x * 100}% ${border.y * 100}%,
                hsla(220,90%,65%,0) 0deg,
                hsla(220,90%,65%,0.9) 60deg,
                hsla(270,90%,70%,0.6) 120deg,
                hsla(190,90%,65%,0.8) 180deg,
                hsla(220,90%,65%,0) 240deg
              )`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}

        {/* Card body */}
        <div className={cn(
          'absolute inset-[1px] rounded-3xl',
          'bg-surface/50 backdrop-blur-lg border border-white/5 group-hover:border-white/10 transition-colors duration-300',
          glow && 'glow-effect',
        )} />

        {/* Glare highlight */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            }}
          />
        )}

        {/* Laser shimmer：仅在 hover 时才触发 CSS animation，静止状态不消耗 GPU */}
        {!reducedMotion && (
          <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
                animation: 'shimmer-sweep 2s ease-in-out infinite',
                // 告诉浏览器只在 hover 时分配合成层
                contain: 'paint',
              }}
            />
          </div>
        )}

        {/* Content */}
        <div
          className="relative p-6 md:p-8"
          style={reducedMotion ? {} : { transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
