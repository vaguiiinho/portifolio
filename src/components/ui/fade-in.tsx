"use client"

import { motion } from "framer-motion"

const ANIMATION_VARIANTS = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 }
} as const

interface FadeInProps {
  children: React.ReactNode
  direction?: keyof typeof ANIMATION_VARIANTS
  delay?: number
  className?: string
  useReducedMotion?: boolean
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className,
  useReducedMotion = true
}: FadeInProps) {
  // Respeitar preferência de usuário
  const prefersReducedMotion = useReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const initialAnimation = prefersReducedMotion ? {} : { opacity: 0, ...ANIMATION_VARIANTS[direction] }
  const whileInViewAnimation = prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      initial={initialAnimation}
      whileInView={whileInViewAnimation}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      layout={false} // ← Previne reflows
      className={className}
    >
      {children}
    </motion.div>
  )
}
