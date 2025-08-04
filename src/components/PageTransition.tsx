import { useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
