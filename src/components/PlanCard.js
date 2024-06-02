import React from "react";

const PlanCard = ({
  title,
  seats,
  price,
  buttonText,
  buttonLink,
  features,
  textConditions,
}) => {
  return (
    <aside className="relative border gradient-border-mask mx-auto flex  sm:min-h-[580px] md:min-h-[580px] lg:min-h-[580px]  flex-col rounded-xl px-8 text-white  xl:min-h-[580px] w-[354px] py-4 bg-black">
      <div className="relative flex flex-col h-full w-full rounded-xl bg-gradient-to-br ">
        <span className="mt-4 flex flex-row items-center justify-center gap-4">
          <h2
            className={`bg-gradient-to-br text-center text-4xl ${
              title === "Grátis"
                ? "text-white"
                : "from-primary to-blue-300 bg-clip-text text-transparent"
            }`}
          >
            {title}
          </h2>
        </span>
        <div className="mt-6 text-center">{seats}</div>
        <div className="mx-auto mt-6 flex text-3xl md:w-48 md:text-4xl text-center">
          {price}
        </div>
        <div className="mx-auto mt-6 flex justify-center">
          <a className="transition-all duration-150" href={buttonLink}>
            <button className="font-semibold items-center justify-center rounded transition duration-100 ease-in-out focus:outline-none focus:ring-4 border border-white text-white hover:border-gray-100 hover:text-gray-100 disabled:border-gray-100 focus:ring-gray-600 px-4 py-2 flex h-[40px]  text-center text-lg w-[200px]">
              <span>{buttonText}</span>
            </button>
          </a>
        </div>
        <div className="mt-6 flex flex-row items-center justify-center">
          <div className="h-[1px] w-[30px] bg-gradient-to-br from-primary to-blue-300"></div>
          <span className="mx-2">O que está incluso</span>
          <div className="h-[1px] w-[30px] bg-gradient-to-br from-primary to-blue-300"></div>
        </div>
        <div className="mt-6 flex flex-col justify-start gap-1">
          {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-start gap-1 font-sans text-[10px]">
        <p>{textConditions}</p>
      </div>
    </aside>
  );
};

const FeatureItem = ({ text }) => {
  return (
    <div className="flex flex-row items-center text-left">
      <div className="mr-1 h-6 w-6 shrink-0">
        <svg viewBox="0 0 24 24" className="h-full w-full fill-primary">
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
        </svg>
      </div>
      {text}
    </div>
  );
};

export default PlanCard;
