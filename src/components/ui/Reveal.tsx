import { motion, type HTMLMotionProps } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
}

/** Revela su contenido al entrar en el viewport (una sola vez). */
export function Reveal({ delay = 0, y = 20, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Variantes para listas con stagger. */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}
