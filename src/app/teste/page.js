'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImmersiveSection = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const sections = sectionRefs.current;

    // Animação inicial de zoom
    gsap.from('body', {
      duration: 2,
      scale: 0.8,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animações de rolagem para cada seção
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Efeito parallax no título
      gsap.to(section.querySelector('h2'), {
        y: -50,
        opacity: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Limpeza
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const sections = [
    { title: 'Features', content: 'Discover our cutting-edge features designed to elevate your experience.' },
    { title: 'About', content: 'Learn about our mission to revolutionize the industry with innovative solutions.' },
    { title: 'Services', content: 'Explore our comprehensive range of services tailored to meet your unique needs.' }
  ];

  return (
    <div className="bg-teal-900 text-white min-h-screen">
      {sections.map((section, index) => (
        <div
          key={index}
          ref={el => (sectionRefs.current[index] = el)}
          className="min-h-screen flex flex-col justify-center items-center p-8"
        >
          <h2 className="text-6xl font-bold mb-8 text-teal-300">{section.title}</h2>
          <p className="text-2xl max-w-2xl text-center">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ImmersiveSection;