"use client"

import { motion, useReducedMotion as useReducedMotionHook } from "framer-motion"

const DIRECTION_OFFSETS = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: 30 }
} as const

interface FadeInProps {
  children: React.ReactNode
  direction?: keyof typeof DIRECTION_OFFSETS
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
  const prefersReducedMotion = useReducedMotionHook()
  const shouldReduceMotion = useReducedMotion && prefersReducedMotion

  const initialAnimation = shouldReduceMotion ? {} : { opacity: 0, ...DIRECTION_OFFSETS[direction] }
  const whileInViewAnimation = shouldReduceMotion ? {} : { opacity: 1, x: 0, y: 0 }

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
