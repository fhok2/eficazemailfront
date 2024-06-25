"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReusableHeading from "./component/ReusableComponents/ReusableHeading";
import ReusableParagraph from "./component/ReusableComponents/ReusableParagraph";

const TypingEffect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const sequence = [
    "Proteja-se contra spam e vazamento de dados.",
    "Gerencie facilmente seus e-mails no dashboard.",
    "Crie múltiplos e-mails de redirecionamento.",
    "Identifique a origem de cada e-mail com marcações personalizadas.",
  ];
  const fullText = sequence[currentIndex];
  const [text, setText] = useState("");

  useEffect(() => {
    let interval;

    const startDeletion = () => {
      setIsDeleting(true);
      setShowCursor(false);
    };

    if (!isDeleting) {
      interval = setInterval(() => {
        setText((prev) =>
          prev.length === fullText.length ? prev : prev + fullText[prev.length]
        );
        if (text.length === fullText.length) {
          setTimeout(startDeletion, 4000); // Atraso de 4 segundos antes de iniciar a remoção
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        setText((prev) => prev.slice(0, prev.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) =>
            prevIndex === sequence.length - 1 ? 0 : prevIndex + 1
          );
          setShowCursor(true);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isDeleting, fullText, text, sequence.length]);

  return (
    <div className="my-4 h-16 text-center text-sm text-white sm:mt-10 sm:text-left sm:text-sm md:my-8 md:h-auto lg:my-12">
      <p style={{ fontSize: "14px", lineHeight: "20px" }}>
        <span className="text-white  md:text-sm text-xs">{text}</span>
        {showCursor && (
          <span className="blinking-cursor" style={{ height: "14px" }}>
            |
          </span>
        )}
      </p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div
      className="relative mt-16 flex w-full max-w-5xl flex-col items-center px-4 py-10 mx-auto xl:max-w-6xl 2xl:justify-center"
      aria-label="section-container-standard"
    >
      <div className=" flex flex-col items-center justify-center pb-2 2xl:mb-24 2xl:h-fit">
        <div>
          <div className="translate-x-1/5 absolute left-1/2 top-[15%] -z-1 hidden opacity-[20%] blur-3xl xl:block">
            <svg
              width="389"
              height="337"
              viewBox="0 0 389 337"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M146.401 335.921C57.648 327.067 -7.12309 247.94 1.73118 159.187C10.5855 70.4334 89.7121 5.66237 178.466 14.5166C267.219 23.3709 396.534 -40.803 387.68 47.9504C378.826 136.704 235.155 344.775 146.401 335.921Z"
                fill="#6A9FCB"
              ></path>
            </svg>
          </div>
          <div className="-translate-x-1/5 absolute left-[30%] top-1/4 -z-1 hidden opacity-[40%] blur-3xl sm:block">
            <svg
              width="354"
              height="374"
              viewBox="0 0 354 374"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M353.664 212.472C353.664 301.666 281.358 373.972 192.164 373.972C102.97 373.972 30.6639 301.666 30.6639 212.472C30.6639 123.278 -46.0301 0.971924 43.1638 0.971924C132.358 0.971924 353.664 123.278 353.664 212.472Z"
                fill="#09B6A2"
                fillOpacity="0.45"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mb-5  flex w-full flex-col items-center  justify-center sm:mb-10 sm:w-4/5">
          <ReusableHeading>EficazMail</ReusableHeading>

       

          <p className="text-lg text-gray-300  leading-relaxed text-center">
          Proteja sua privacidade online com redirecionamento inteligente de
          e-mails.
            Crie e-mails personalizados que redirecionam para sua caixa de
            entrada principal. Mantenha o controle total sobre sua comunicação
            digital.
          </p>

          <div className="flex h-20 ">
            <TypingEffect />
          </div>
        </div>

        <div className="mb-16 flex min-w-[4rem] flex-col items-center justify-center gap-3 md:mb-24 md:flex-row z-10 ">
          <Link href="#testefree" legacyBehavior>
            <a className="transition-all duration-150">
              <button
                className="group flex h-14 items-center justify-center rounded-lg lg:text-lg md:text-lg text-sm font-semibold text-white transition-all duration-100 glow-sm hover:glow-md lg:w-56 md:w-56 sm:w-44 w-44 "
                style={{
                  border: "none",
                  backgroundSize: "300% 100%",
                  transition: "all 0.3s ease 0s",
                  backgroundImage:
                    "linear-gradient(-60deg, rgb(9, 182, 162), rgb(107, 248, 231), rgb(9, 182, 162))",
                  backgroundPosition: "100% 0px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundPosition = "0% 0px";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundPosition = "100% 0px";
                }}
              >
                Experimente Grátis
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-6 w-6 transition-all duration-150 group-hover:translate-x-2"
                >
                  <path d="M10.061 19.061L17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
                </svg>
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
