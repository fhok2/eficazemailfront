import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from 'react-spring';
import { User, Calendar, Mail, Crown, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";

const UserInfoModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      const dashboardData = JSON.parse(localStorage.getItem('dashboardData') || '{}');
      setUserInfo({
        email: dashboardData.email || '',
        emailVerified: dashboardData.emailVerified || false,
        name: dashboardData.name || '',
        paymentDate: dashboardData.paymentDate || '',
        permissions: dashboardData.permissions || [],
        plan: dashboardData.plan || 'free',
        role: dashboardData.role || '',
        userId: dashboardData.userId || '',
      });
    }
  }, [isOpen]);

  const backdropSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  });

  const modalSpring = useSpring({
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-50px)',
    opacity: isVisible ? 1 : 0,
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    delay: 200,
    config: config.gentle,
  });

  const iconSpring = useSpring({
    from: { transform: 'scale(0) rotate(-180deg)' },
    to: { transform: 'scale(1) rotate(0deg)' },
    delay: 300,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  const handleModalClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isVisible || !userInfo) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80"
      onClick={handleModalClose}
    >
      <animated.div
        style={modalSpring}
        className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative overflow-y-auto flex-grow">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
          <animated.div
            style={iconSpring}
            className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-700 rounded-full mx-auto relative z-10"
          >
            <User className="h-8 w-8 text-brand-light" />
          </animated.div>
          <h4 className="text-2xl text-white font-bold mb-3 text-center relative z-10">
            Sua conta
          </h4>
          <animated.div style={contentSpring} className="space-y-4 relative z-10">
            <div className="flex items-center space-x-3 text-gray-300">
              <User className="h-5 w-5 text-brand-light" />
              <span className="font-semibold">Nome:</span>
              <span>{userInfo.name}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="h-5 w-5 text-brand-light" />
              <span className="font-semibold">Email:</span>
              <span>{userInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Crown className="h-5 w-5 text-brand-light" />
              <span className="font-semibold">Plano:</span>
              <span className={userInfo.plan === "pro" ? "text-yellow-400" : ""}>{userInfo.plan.charAt(0).toUpperCase() + userInfo.plan.slice(1)}</span>
            </div>
            {userInfo.plan === "pro" && (
              <div className="flex items-center space-x-3 text-gray-300">
                <Calendar className="h-5 w-5 text-brand-light" />
                <span className="font-semibold">Validade do Plano:</span>
                <span>{new Date(userInfo.paymentDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center space-x-3 text-gray-300">
              {userInfo.emailVerified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-semibold">Email Verificado:</span>
              <span>{userInfo.emailVerified ? "Sim" : "Não"}</span>
            </div>
            
          </animated.div>
        </div>
        <div className="px-6 py-4 bg-gray-700 flex justify-end relative z-10">
          <Button
            onClick={handleModalClose}
            className="bg-gradient-to-r from-brand-dark to-brand-light hover:shadow-lg hover:scale-105 text-white font-semibold transition-all duration-300"
          >
            Fechar
          </Button>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default UserInfoModal;