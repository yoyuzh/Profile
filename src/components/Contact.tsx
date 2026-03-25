import { Section } from './ui/Section';
import { Mail, Link } from 'lucide-react';
import { Button } from './ui/Button';

export const Contact = () => {
  return (
    <Section id="contact" className="py-24 md:py-40 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
          开始构建 <br/><span className="text-gradient">伟大产品.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          我目前正在寻求新的暑期实习机会与极具挑战性的软件工程岗位。无论您有任何技术探讨或合作意向，都欢迎随时与我联系！
        </p>
        
        <Button size="lg" className="mb-16">
          <Mail className="mr-2" size={20} />
          Hello@example.com
        </Button>

        <div className="flex gap-6 items-center flex-wrap justify-center bottom-0 border-t border-white/10 w-full pt-10">
          <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
            <Link size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
            <Link size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors duration-300">
            <Link size={24} />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
        
        <p className="text-slate-600 font-mono text-xs mt-10">
          &copy; {new Date().getFullYear()} 软件开发工程主页. 由 React 与 Tailwind 强力驱动.
        </p>
      </div>
    </Section>
  );
};
