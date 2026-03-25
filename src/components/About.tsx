import { Section } from './ui/Section';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <Section id="about">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/3"
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">
            不止于 <br/><span className="text-secondary/80 italic">编写代码</span>.
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-2/3 text-slate-300 text-lg md:text-xl font-light leading-relaxed space-y-6"
        >
          <p>
            你好，我是一名 <strong className="font-medium text-white">软件工程本科生</strong>，热衷于构建并部署全栈解决方案。我的核心关注点不仅是实现功能，更是设计 <strong className="font-medium text-white">高可用、高扩展、易维护</strong> 的系统架构。
          </p>
          <p>
            凭借在 <strong className="font-medium text-primary">Java 后端架构</strong> 和 <span className="font-medium text-accent">现代前端工程</span> 的扎实基础，我致力于在复杂的系统逻辑与直观的用户体验之间建立完美的桥梁。
          </p>
          <p className="text-slate-400 text-base">
            我相信优秀的工程实现源自对软件全生命周期的深刻理解——从基础设施搭建、持续集成部署，到数据库优化与大规模 AI 协作开发。
          </p>
        </motion.div>
      </div>
    </Section>
  );
};
