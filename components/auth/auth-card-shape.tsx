import React from "react";

const AuthCardShape = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-65px)] p-4 sm:p-6 md:p-8 font-inter">
      <div className="relative w-full py-6 max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card   rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 md:p-10">
        {/* shape 1 */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-400 dark:from-blue-400/30 dark:to-blue-600/30 to-blue-600 rounded-bl-full rounded-tr-full opacity-10 transform rotate-12 z-0"></div>

        {/*  shape 2 */}
        <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-gradient-to-tl from-purple-400 dark:from-purple-400/30 dark:to-purple-600/30 to-purple-600 rounded-tl-full rounded-br-full opacity-10 transform -rotate-24 z-0"></div>

        <div className="relative z-10 space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthCardShape;
