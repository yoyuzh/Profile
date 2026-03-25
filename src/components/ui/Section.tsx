import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({ id, className, children, delay = 0 }) => {
  return (
    <section
      id={id}
      className={cn("py-24 md:py-32 relative w-full flex flex-col items-center", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className="w-full max-w-6xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
};
