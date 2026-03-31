import { Section } from './ui/Section';
import { TiltCard } from './ui/TiltCard';
import { ExternalLink, Code } from 'lucide-react';
import { Button } from './ui/Button';


const projects = [
  {
    title: '分布式云存储系统',
    description: '支持分片上传、极速检索与深层数据库查询优化的分布式高可用云存储解决方案。',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'OSS'],
    highlights: ['大文件分片上传', 'Redis 多级缓存', '高并发性能优化'],
    github: '#',
    preview: '#'
  },
  {
    title: 'AI 协作开发工作台',
    description: '集成多智能体实时协作的 AI 辅助代码生成与审查全链路工作流平台。',
    tech: ['React', 'TypeScript', 'Node.js', 'LLM Agents'],
    highlights: ['WebSocket 实时同步', '上下文感知代码建议', '高阶 Prompt 工程'],
    github: '#',
    preview: '#'
  },
  {
    title: '个人作品集主页',
    description: '兼顾极致性能与高级视觉动效的开发者个人主页项目（即本站）。',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    highlights: ['高级毛玻璃拟态 UI', '丝滑滚动揭示动效', '全端响应式设计'],
    github: '#',
    preview: '#'
  },
  {
    title: '全栈企业级数据中台',
    description: '前后端完全分离架构、配备细粒度 RBAC 动态权限控制的企业级后台管理界面。',
    tech: ['Vue', 'Spring Boot', 'Spring Security', 'Docker'],
    highlights: ['RBAC 动态权限控制', 'Docker 容器化部署', '企业级 RESTful API 设计'],
    github: '#',
    preview: '#'
  }
];

export const Projects = () => {
  return (
    <Section id="projects">
      <div className="text-center mb-16">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-foreground mb-4">精选项目</h2>
        <p className="text-lg text-muted-foreground">展现后端架构设计与前端工程实现能力的核心代表作。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {projects.map((project) => (
          <TiltCard key={project.title} glow className="flex flex-col h-full p-6 glass-premium glass-refract glass-shine spotlight rounded-xl">
            <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">项目亮点</h4>
              <ul className="space-y-2">
                {project.highlights.map(h => (
                  <li key={h} className="text-sm text-foreground flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 mt-4">
              {project.tech.map(t => (
                <span key={t} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-auto">
              <Button variant="secondary" size="sm" className="w-full gap-2">
                <ExternalLink size={16} /> 在线预览
              </Button>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Code size={16} /> 查看源码
              </Button>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};
