import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import Link from "next/link";

const Path = (props) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }) => (
  <button
    onClick={toggle}
    className={`fixed top-2 w-12 h-12 rounded-full  p-3 focus:outline-none z-50 transition-all duration-1000 ${
      isOpen ? "right-[16rem]" : "right-4"
    }`}
  >
    <svg width="23" height="18" viewBox="0 0 23 18">
      <Path
        d="M 2 2.5 L 20 2.5"
        className="top-path text-teal-50"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle-path text-teal-50" />
      <Path
        d="M 2 16.346 L 20 16.346"
        className="bottom-path text-teal-50"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const Menu = ({ closeMenu }) => (
  <nav className="fixed top-0 right-0 bottom-0 w-80 bg-accent pt-24 transform translate-x-full will-change-transform transition-transform duration-300 z-40 bg-teal-600">
    <ul className="flex flex-col gap-2.5 p-4">
      <Link href="#plain">
        <li
          onClick={() => closeMenu()}
          className="text-background block font-bold text-4xl p-10 transform will-change-transform opacity-0 scale-50 blur-md
          hover:scale-75 
          "
        >
          Planos
        </li>
      </Link>
      <Link href="#faq">
        <li
          onClick={() => closeMenu()}
          className="text-background block font-bold text-4xl p-10 transform will-change-transform opacity-0 scale-50 blur-md"
        >
          FAQ
        </li>
      </Link>
      <Link href="/dashboard">
        <li
          onClick={() => closeMenu()}
          className="text-background block font-bold text-4xl p-10 transform will-change-transform opacity-0 scale-50 blur-md"
        >
          Login
        </li>
      </Link>
    </ul>
  </nav>
);

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0%)" },
            { ease: [0.10, 0.65, 0.53, 1], duration: 0.5 }, // Ajuste a duração aqui
          ],
          [
            ".text-background",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            ".text-background",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(100%)" }, { at: "-0.1" }],
        ];

    animate([
      [
        ".top-path",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      [".middle-path", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        ".bottom-path",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      ...menuAnimations,
    ]);
  }, [isOpen]);

  return scope;
}

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div ref={scope}>
      <Menu closeMenu={() => setIsOpen(false)} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen && (
        <div
          className="fixed bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
