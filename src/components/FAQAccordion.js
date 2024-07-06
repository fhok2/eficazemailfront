'use client';
import { useState } from "react";

const FAQItem = ({ question, answer, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-6" data-headlessui-state="">
      <dt>
        <button
          className="group flex w-full items-start justify-between text-left"
          id={`headlessui-disclosure-button-${id}`}
          type="button"
          aria-expanded={isOpen}
          data-headlessui-state=""
          onClick={toggleOpen}
        >
          <span className="text-base font-semibold leading-7">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M18 12H6" : "M12 6v12m6-6H6"}
              />
            </svg>
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-2">
          <p className="text-base leading-7 text-gray-500">
            {answer}
          </p>
        </dd>
      )}
    </div>
  );
};

const FAQAccordion = ({ items }) => {
  return (
    <dl className="mt-2 space-y-6 divide-y divide-gray-200/30">
      {items.map((item, index) => (
        <FAQItem key={index} id={index} question={item.question} answer={item.answer} />
      ))}
    </dl>
  );
};

export default FAQAccordion;