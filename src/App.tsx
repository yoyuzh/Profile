import { lazy, Suspense } from 'react';
import { Hero } from './components/Hero';
import { AnimatedBackground } from './components/AnimatedBackground';

// 首屏以下的组件全部懒加载，减少初始 bundle 体积
const About       = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Capabilities = lazy(() => import('./components/Capabilities').then(m => ({ default: m.Capabilities })));
const TechStack   = lazy(() => import('./components/TechStack').then(m => ({ default: m.TechStack })));
const Projects    = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Contact     = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));

// 轻量占位：仅一条 div，不影响布局
const SectionSkeleton = () => (
  <div className="w-full py-32 flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-blue-500/60 animate-spin" />
  </div>
);

function App() {
  return (
    <div className="relative w-full min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10 w-full text-slate-100 min-h-screen font-sans selection:bg-primary/30 selection:text-white pb-10">
        {/* Hero 是关键路径，不懒加载 */}
        <Hero />

        {/* 以下组件等主线程空闲后再加载 */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Capabilities />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TechStack />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
