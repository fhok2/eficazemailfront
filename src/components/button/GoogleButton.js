import React from 'react';
import { Loader } from 'lucide-react';

const GoogleButton = ({ onClick, loading, isRegistering }) => {
  return (
    <button
      type="button"
      className="w-full py-3 px-4 bg-white text-gray-700 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader className="h-6 w-6 animate-spin text-gray-700 mr-2" />
      ) : (
        <div className="mr-2">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M23.52 12.273c0-.852-.076-1.669-.219-2.455H12v4.642h6.458a5.52 5.52 0 01-2.394 3.622v3.012h3.878c2.269-2.09 3.578-5.167 3.578-8.821z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.956-1.075 7.941-2.907l-3.878-3.012c-1.075.72-2.45 1.147-4.063 1.147-3.125 0-5.77-2.112-6.715-4.948H1.276v3.109A11.995 11.995 0 0012 24z" fill="#34A853"/>
              <path d="M5.285 14.28A7.213 7.213 0 015.009 12c0-.79.136-1.56.276-2.28V6.611H1.276A11.994 11.994 0 000 12c0 1.936.464 3.77 1.276 5.389l4.009-3.109z" fill="#FBBC05"/>
              <path d="M12 4.773c1.762 0 3.344.605 4.587 1.793l3.443-3.443C17.951 1.187 15.235 0 12 0 7.31 0 3.25 2.69 1.276 6.611l4.009 3.109C6.23 6.883 8.875 4.773 12 4.773z" fill="#EA4335"/>
            </g>
          </svg>
        </div>
      )}
      <span>
        {loading
          ? "Processando..."
          : isRegistering
          ? "Registrar com Google"
          : "Entrar com Google"}
      </span>
    </button>
  );
};

export default GoogleButton;