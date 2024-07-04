import React from "react";
import { Check, ArrowRight } from 'lucide-react';

const PlanCard = ({
  title,
  seats,
  price,
  buttonText,
  buttonLink,
  features,
  textConditions,
  isPopular = false
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl transition-all duration-300 hover:scale-105 ${isPopular ? 'border-2 border-teal-400' : 'border border-gray-700'}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-teal-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}
      <div className="p-8">
        <h2 className={`text-3xl font-bold mb-4 ${isPopular ? 'text-teal-400' : 'text-white'}`}>
          {title}
        </h2>
        <div className="text-gray-400 mb-4">{seats}</div>
        <div className="text-4xl font-bold mb-6">{price}</div>
        <a 
          href={buttonLink}
          className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
            isPopular 
              ? 'bg-teal-400 text-gray-900 hover:bg-teal-300' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {buttonText}
          <ArrowRight className="inline-block ml-2 h-5 w-5" />
        </a>
      </div>
      <div className="px-8 pb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px w-10 bg-gray-700"></div>
          <span className="px-1 text-xs text-gray-400">O que está incluso</span>
          <div className="h-px w-10 bg-gray-700"></div>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </ul>
        <div className="mt-6 text-xs text-gray-400">
          {textConditions}
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text }) => {
  return (
    <li className="flex items-center text-sm">
      <Check className="mr-2 h-5 w-5 text-teal-400" />
      <span>{text}</span>
    </li>
  );
};

export default PlanCard;