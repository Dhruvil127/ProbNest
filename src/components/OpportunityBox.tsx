'use client';

import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

interface OpportunityBoxProps {
  content: string;
}

export default function OpportunityBox({ content }: OpportunityBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="open-rule mt-14 pt-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(214,163,93,0.24)] bg-[rgba(214,163,93,0.08)]">
          <Rocket className="h-5 w-5 text-[var(--accent-strong)]" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">Opportunity</p>
            <Sparkles className="h-4 w-4 text-[var(--brand)]" />
          </div>
          <p className="open-copy mt-4 text-xl leading-9 text-white/92">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}
