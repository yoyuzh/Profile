import { Section } from './ui/Section';
import { Server, Layout, Minimize2, Cpu, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    icon: <Server className="text-primary" size={24} />,
    title: '后端架构与开发',
    description: '精通高并发 Java/Spring Boot 核心应用开发，擅长 MySQL/Redis 数据库性能调优及安全可靠的 RESTful API 规范设计。'
  },
  {
    icon: <Layout className="text-accent" size={24} />,
    title: '现代前端工程',
    description: '使用 React、Vue 及 Tailwind CSS 构建像素级完美响应式界面，注重复杂状态管理与极简高级动效实现。'
  },
  {
    icon: <Minimize2 className="text-emerald-400" size={24} />,
    title: '系统架构设计',
    description: '主导应对高并发流量的分布式系统架构设计，灵活运用微服务理念、多级缓存机制与海量分布式存储方案。'
  },
  {
    icon: <Cpu className="text-secondary" size={24} />,
    title: '自动化部署与运维',
    description: '丰富的真实环境部署经验，熟练配置 Linux 服务器、Docker 容器化、NGINX 反向代理及自动化 CI/CD 流水线。'
  },
  {
    icon: <Users className="text-orange-400" size={24} />,
    title: '工程协作与极客精神',
    description: '深入掌握 Git 高阶协同流、严格的 Code Review 机制与敏捷实践，并极具前瞻性地将 AI 即时工具链深度融入全栈开发日常。'
  }
];

export const Capabilities = () => {
  return (
    <Section id="capabilities" className="bg-white/[0.02] border-y border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">核心能力</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">超越单纯的函数编写——从零开始构建、部署并持续运营真实的业务系统。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {capabilities.map((cap, idx) => (
          <motion.div 
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`p-6 rounded-2xl bg-surface/40 border border-white/10 hover:bg-surface/60 transition-colors ${idx === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner">
              {cap.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">{cap.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{cap.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
