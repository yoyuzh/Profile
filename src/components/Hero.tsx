import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      style={{ contain: 'layout' }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-[0.08]" />

      {/* 合并三个 orb 为单个合成层 — 避免多个大面积 blur 的 GPU 压力 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 900px 500px at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse 600px 600px at 100% 25%, rgba(139,92,246,0.09) 0%, transparent 70%)',
            'radial-gradient(ellipse 500px 500px at 0% 100%, rgba(6,182,212,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse at center, transparent 40%, rgba(3,7,18,0.7) 100%)',
          ].join(', '),
          willChange: 'auto',
          contain: 'paint',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status badge — glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              glass-premium glass-refract text-xs font-semibold tracking-wide"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
            <span className="text-slate-200">正在寻找暑期实习机会</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="scroll-m-20 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1] text-glow"
          >
            构建 <br className="hidden md:block" />
            <span className="text-shimmer">稳健架构</span> 与 <br className="hidden md:block" />
            <span className="text-shimmer">极简交互</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground leading-7 max-w-2xl mb-10"
          >
            <span className="text-foreground font-medium">软件工程本科生</span> • 全栈开发 • Java 后端 • Web 架构设计 • AI 协作开发
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              查看项目
            </Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              联系我
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-white/30 text-xs mb-2 font-medium tracking-widest uppercase">向下滚动</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};
