import { Section } from './ui/Section';
import { motion } from 'framer-motion';

const skills = [
  { category: 'Backend', items: ['Java', 'Spring Boot', 'MySQL', 'Redis'] },
  { category: 'Frontend', items: ['React', 'Vue', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Infrastructure', items: ['Docker', 'Linux', 'OSS', 'NGINX'] },
  { category: 'Tools & DevOps', items: ['Git', 'GitHub Actions', 'Vite', 'AI Workflows'] },
];

export const TechStack = () => {
  return (
    <Section id="stack" delay={0.2}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">技能与技术栈</h2>
        <p className="text-slate-400">构建可扩展系统所使用的核心技术。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((skillGroup, idx) => (
          <motion.div 
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-medium text-white/90 mb-6 uppercase tracking-wider text-sm">{skillGroup.category}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {skillGroup.items.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-colors shadow-sm cursor-default"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
