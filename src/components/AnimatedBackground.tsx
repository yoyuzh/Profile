import { useMemo } from 'react';
import LiquidEther from './ui/LiquidEther';

/**
 * 根据设备能力选择合适的渲染质量
 * - 低端/移动设备：降低分辨率 + 关闭 BFECC + 减少迭代次数
 * - 高端桌面：完整质量
 */
function useDeviceQuality() {
  return useMemo(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isMedium = window.matchMedia('(max-width: 1280px)').matches;
    // 检测 GPU 能力（通过 hardwareConcurrency 粗略判断）
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
      return {
        resolution: 0.2,
        iterationsPoisson: 8,
        iterationsViscous: 8,
        BFECC: false,
        mouseForce: 15,
        cursorSize: 80,
      };
    }
    if (isMedium) {
      return {
        resolution: 0.35,
        iterationsPoisson: 16,
        iterationsViscous: 16,
        BFECC: true,
        mouseForce: 20,
        cursorSize: 100,
      };
    }
    // 高端桌面：全质量
    return {
      resolution: 0.5,
      iterationsPoisson: 32,
      iterationsViscous: 32,
      BFECC: true,
      mouseForce: 25,
      cursorSize: 120,
    };
  }, []);
}

export function AnimatedBackground() {
  const quality = useDeviceQuality();

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 bg-[#030712]"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <LiquidEther
        colors={['#3b82f6', '#8b5cf6', '#06b6d4', '#1e1b4b']}
        autoDemo={true}
        autoSpeed={0.4}
        autoIntensity={2.5}
        autoResumeDelay={2000}
        className="w-full h-full"
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        {...quality}
      />
    </div>
  );
}
