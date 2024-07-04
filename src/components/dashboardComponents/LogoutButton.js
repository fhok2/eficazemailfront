import React from 'react';
import { useSpring, animated } from 'react-spring';
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LogoutButton = ({ onClick, isLoading, isCollapsed }) => {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    config: { tension: 300, friction: 10 },
  }));

  const handleMouseEnter = () => {
    api.start({ scale: 1.1, rotate: 5 });
  };

  const handleMouseLeave = () => {
    api.start({ scale: 1, rotate: 0 });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <animated.button
            className={`px-4 py-3 flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-4'
            } rounded-md text-red-400 hover:bg-gray-700 transition-colors duration-300 w-full`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={spring}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-400"></div>
            ) : (
              <LogOut className="h-5 w-5 flex-shrink-0" />
            )}
            {!isCollapsed && <span>Encerrar sessão</span>}
          </animated.button>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>Encerrar sessão</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogoutButton;