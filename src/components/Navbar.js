import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSpring, animated, config } from "react-spring";
import NavMenu from "./menu/NavMenu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: "Planos", href: "/#plain" },
    { label: "FAQ", href: "/#faq" },
    { label: "Login", href: "/dashboard" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: isScrolled ? 0.9 : 1 },
    config: config.slow,
  });

  const linkSpring = useSpring({
    from: { y: 0, opacity: 1 },
    to: { y: isScrolled ? 0 : 0, opacity: isScrolled ? 1 : 1 },
    config: config.wobbly,
  });

  const logoSpring = useSpring({
    from: { scale: 1 },
    to: { scale: isScrolled ? 0.95 : 1 },
    config: config.gentle,
  });

  return (
    <animated.nav
      style={{
        ...navSpring,
        backgroundColor: navSpring.opacity.to(
          (o) => `rgba(17, 24, 39, ${o * 0.9})`
        ),
        boxShadow: navSpring.opacity.to(
          (o) =>
            `0 4px 6px -1px rgba(0, 0, 0, ${o * 0.1}), 0 2px 4px -1px rgba(0, 0, 0, ${o * 0.06})`
        ),
      }}
      className="fixed w-full z-50 h-16 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <animated.div
            style={{
              transform: logoSpring.scale.to((s) => `scale(${s})`),
            }}
            className="flex justify-start lg:w-0 lg:flex-1"
          >
            <Link href="/">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
                EficazMail
              </span>
            </Link>
          </animated.div>

          {!isMobile && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {menuItems.map((item, index) => (
                <animated.div
                  key={index}
                  style={{
                    ...linkSpring,
                    transform: linkSpring.y.to((y) => `translateY(${y}px)`),
                  }}
                >
                  <Link
                    href={item.href}
                    className={`ml-8 whitespace-nowrap text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 ${
                      item.label === "Login"
                        ? "bg-gradient-to-r from-teal-400 to-brand-light hover:from-teal-500 hover:to-brand-dark text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </animated.div>
              ))}
            </div>
          )}

          {isMobile && (
            <div className="md:hidden">
              <NavMenu />
            </div>
          )}
        </div>
      </div>
    </animated.nav>
  );
};

export default Navbar;
