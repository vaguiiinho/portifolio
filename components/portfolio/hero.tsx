"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <Container className="py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for new projects
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                Full Stack Developer building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                  scalable
                </span>{" "}
                and modern applications
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed">
                I transform complex problems into elegant, user-centric solutions. 
                Specializing in React, Next.js, and cloud architecture to build 
                products that scale.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full group">
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Delivered" },
                { value: "30+", label: "Happy Clients" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-3xl blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-4 text-xs text-muted-foreground font-mono">app.tsx</span>
                </div>

                {/* Code */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="space-y-1">
                    <div>
                      <span className="text-accent">const</span>{" "}
                      <span className="text-blue-400">developer</span>{" "}
                      <span className="text-foreground">=</span>{" "}
                      <span className="text-foreground">{"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-green-400">name</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-orange-300">{'"Alex Chen"'}</span>
                      <span className="text-foreground">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-green-400">role</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-orange-300">{'"Full Stack Developer"'}</span>
                      <span className="text-foreground">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-green-400">skills</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-foreground">[</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-orange-300">{'"React"'}</span>
                      <span className="text-foreground">,</span>{" "}
                      <span className="text-orange-300">{'"Next.js"'}</span>
                      <span className="text-foreground">,</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-orange-300">{'"TypeScript"'}</span>
                      <span className="text-foreground">,</span>{" "}
                      <span className="text-orange-300">{'"Node.js"'}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-foreground">],</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-green-400">passion</span>
                      <span className="text-foreground">:</span>{" "}
                      <span className="text-orange-300">{'"Building amazing products"'}</span>
                    </div>
                    <div>
                      <span className="text-foreground">{"};"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3"
            >
              <div className="p-2 bg-secondary rounded-lg">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">500+ Contributions</div>
                <div className="text-xs text-muted-foreground">This year on GitHub</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
