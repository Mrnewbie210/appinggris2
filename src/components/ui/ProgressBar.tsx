import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="w-full bg-warm-white h-6 rounded-xl overflow-hidden relative border border-[#F0F0F0]">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="h-full soft-gradient rounded-xl"
    />
  </div>
);

export default ProgressBar;
