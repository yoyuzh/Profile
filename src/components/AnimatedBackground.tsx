import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface WaveBlob {
  x: number;
  y: number;
  radius: number;
  hue: number;
  speed: number;
  angle: number;
}

// 极简、优雅、现代的颜色搭配 (更暗、更有质感)
const SECTION_THEMES = [
  { hues: [220, 240, 210] }, // Hero: 经典的深蓝/紫罗兰
  { hues: [250, 270, 230] }, // About: 偏神秘的深紫
  { hues: [200, 210, 220] }, // Capabilities: 清透的深墨蓝
  { hues: [190, 200, 180] }, // TechStack: 深邃的青绿/蓝松石
  { hues: [230, 250, 210] }, // Projects: 靛蓝与深紫交织
  { hues: [220, 230, 240] }, // Contact: 回归深海蓝
];

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('scroll', () => { scrollRef.current = window.scrollY; }, { passive: true });

    // 光斑 (Auroras) - 更大、更缓慢
    const BLOB_COUNT = 5;
    const blobs: WaveBlob[] = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      x: (W / BLOB_COUNT) * i + W / (BLOB_COUNT * 2),
      y: Math.random() * H * 0.8 + H * 0.1,
      radius: Math.random() * 300 + 200, // 更大的光斑
      hue: SECTION_THEMES[0].hues[i % 3],
      speed: Math.random() * 0.0003 + 0.0001, // 移动极度缓慢
      angle: Math.random() * Math.PI * 2,
    }));

    // 环境粒子 (萤火虫/星光) - 减少数量，更精细
    const PARTICLE_COUNT = 80;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15, // 速度极慢
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: 220,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.01 + 0.003,
    }));

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let currentHues = [...SECTION_THEMES[0].hues, ...SECTION_THEMES[0].hues];
    let t = 0;
    
    // 平滑滚动的插值
    let smoothScrollTarget = 0;
    let animationId: number;

    const draw = () => {
      t += 0.004; // 极其缓慢的时间流逝
      
      // 增加滑动阻尼感，让颜色渐变极其丝滑，不会因为快速滑动而突兀
      smoothScrollTarget = lerp(smoothScrollTarget, scrollRef.current, 0.02);

      const pageH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollFrac = smoothScrollTarget / pageH; // 取值 0~1
      const rawIdx = Math.max(0, Math.min(scrollFrac * (SECTION_THEMES.length - 1), SECTION_THEMES.length - 1));
      const sectionA = Math.floor(rawIdx);
      const sectionB = Math.min(sectionA + 1, SECTION_THEMES.length - 1);
      const blend = rawIdx - sectionA;

      for (let i = 0; i < BLOB_COUNT; i++) {
        const hA = SECTION_THEMES[sectionA].hues[i % 3];
        const hB = SECTION_THEMES[sectionB].hues[i % 3];
        currentHues[i] = lerp(currentHues[i], lerp(hA, hB, blend), 0.015);
      }
      
      const domHue = lerp(SECTION_THEMES[sectionA].hues[0], SECTION_THEMES[sectionB].hues[0], blend);

      // 深邃底色
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, W, H);

      // ── 绘制环境极光光斑 (Auroras) ──
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];
        blob.angle += blob.speed;
        
        // 光斑的微小位移
        const dx = Math.cos(blob.angle * 0.7) * 40;
        const dy = Math.sin(blob.angle) * 30;

        // 鼠标对光斑产生微弱吸引，增加沉浸感
        const mx = mouseRef.current.x - blob.x;
        const my = mouseRef.current.y - blob.y;
        const dist = Math.sqrt(mx * mx + my * my);
        if (dist < 600) { 
            blob.x += mx * 0.00003; 
            blob.y += my * 0.00003; 
        }

        blob.hue = lerp(blob.hue, currentHues[i], 0.03);

        const cx = blob.x + dx;
        const cy = blob.y + dy;
        const r = blob.radius + Math.sin(blob.angle * 2) * 20;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        // 使用非常非常低的透明度，打造"高级的高斯模糊"感觉
        const alpha = 0.04 + Math.sin(t + blob.angle) * 0.01;
        grad.addColorStop(0, `hsla(${blob.hue}, 70%, 50%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${blob.hue + 15}, 60%, 45%, ${alpha * 0.5})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        // 压扁椭圆形更像极光
        ctx.ellipse(cx, cy, r * 1.5, r * 0.8, blob.angle * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── 绘制细微星光粒子 (Particles) ──
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        
        // 边界循环
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // 鼠标排斥极其微弱
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mdx = p.x - mx, mdy = p.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150 && mdist > 0) {
          const force = (150 - mdist) / 150;
          p.vx += (mdx / mdist) * force * 0.01;
          p.vy += (mdy / mdist) * force * 0.01;
        }
        
        // 阻尼，让其缓慢恢复原速
        p.vx *= 0.99; p.vy *= 0.99;
        
        // 粒子受环境主色调影响
        p.hue = lerp(p.hue, domHue + Math.sin(p.pulse * 0.5) * 15, 0.02);

        const po = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        const ps = p.size;

        // 星光耀斑
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ps * 3);
        glow.addColorStop(0, `hsla(${p.hue}, 80%, 75%, ${po * 0.8})`);
        glow.addColorStop(1, `hsla(${p.hue}, 80%, 75%, 0)`);
        
        ctx.beginPath(); ctx.arc(p.x, p.y, ps * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();

        // 核心实心点
        ctx.beginPath(); ctx.arc(p.x, p.y, ps * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 85%, ${po})`;
        ctx.fill();
      }

      // ── 鼠标氛围聚光灯 ──
      if (mouseRef.current.x > -900) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 350);
        spotlight.addColorStop(0, `hsla(${domHue}, 60%, 60%, 0.025)`);
        spotlight.addColorStop(0.5, `hsla(${domHue}, 60%, 50%, 0.01)`);
        spotlight.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(mx, my, 350, 0, Math.PI * 2);
        ctx.fillStyle = spotlight;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
