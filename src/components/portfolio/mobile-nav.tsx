import { motion } from "framer-motion"
import { navLinks } from "@/data/navigation"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <motion.div
      id="mobile-nav-menu"
      role="navigation"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
    >
      <div className="py-4 space-y-2">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.div>
  )
}