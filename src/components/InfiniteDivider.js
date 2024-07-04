import React from 'react';

const InfiniteDivider = () => {
  const elements = [
    { type: 'dot', color: 'bg-teal-400' },
    { type: 'line', color: 'bg-brand-light' },
    { type: 'dot', color: 'bg-purple-500' },
    { type: 'line', color: 'bg-yellow-400' },
    { type: 'dot', color: 'bg-pink-500' },
  ];

  return (
    <div className="w-full py-8 overflow-hidden bg-gray-900">
      <div className="flex animate-infinite-scroll">
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {elements.map((element, index) => (
              <React.Fragment key={`${setIndex}-${index}`}>
                {element.type === 'dot' ? (
                  <div className={`flex-shrink-0 w-4 h-4 ${element.color} rounded-full mx-4`}></div>
                ) : (
                  <div className={`flex-shrink-0 w-16 h-1 ${element.color} mx-4`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteDivider;