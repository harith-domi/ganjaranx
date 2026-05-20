"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  scale?: boolean;
}

export default function AnimatedSection({ children, className = "", scale = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${scale ? "reveal-scale" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}

/* Staggered grid wrapper — each direct child gets a stagger delay */
export function StaggerGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const staggerClasses = ["stagger-1","stagger-2","stagger-3","stagger-4","stagger-5","stagger-6"];
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).classList.add("reveal", staggerClasses[Math.min(i, 5)]);
            setTimeout(() => (child as HTMLElement).classList.add("in-view"), 10);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
