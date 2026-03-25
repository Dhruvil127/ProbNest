'use client';

import { AnimatePresence, motion } from 'framer-motion';
import FounderInsights, { type FounderInsightsData } from '@/components/FounderInsights';
import { useFounderMode } from '@/context/FounderModeContext';

export default function FounderInsightsGate({ data }: { data: FounderInsightsData }) {
  const { founderMode } = useFounderMode();

  return (
    <AnimatePresence initial={false}>
      {founderMode ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <FounderInsights data={data} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
