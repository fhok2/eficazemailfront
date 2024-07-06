'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import EficazMailFeatures from "@/components/Features";
import AnimatedBackground from "@/components/AnimatedBackground";
import FAQ from "@/components/Faq";


const sections = [
  { component: HeroSection, key: "hero" },
  { component: EficazMailFeatures, key: "features" },
  { component: PricingSection, key: "pricing" },
  { component: FAQ, key: "faq" },
];

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Section = ({ section }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      key={section.key}
      id={section.key}
      className="min-h-screen flex items-center justify-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {React.createElement(section.component, { isActive: isInView })}
    </motion.div>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ target: containerRef });
  const { height: windowHeight = 0 } = useWindowSize();

  return (
    <div ref={containerRef} className="relative min-h-screen pt-16">
      <AnimatedBackground />
      <div className="space-y-0 z-10 relative"> {/* Ensure content is above the background */}
        {sections.map((section) => (
          <Section key={section.key} section={section} />
        ))}
      </div>
      
    </div>
  );
};

export default Home;
