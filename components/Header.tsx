
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-border-color flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-text-main p-2 hover:bg-gray-100 rounded-lg">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="text-lg font-bold text-primary">TPST</span>
      </div>

      <div className="hidden md:flex max-w-md w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-text-sub">search</span>
        </div>
        <input 
          className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-background-light text-text-main placeholder-text-sub focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
          placeholder="ค้นหาพยาบาล, ตารางเวร..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-background-light text-text-sub transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-background-light text-text-sub transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="size-8 rounded-full bg-primary/10 flex lg:hidden items-center justify-center text-primary overflow-hidden">
          <span className="material-symbols-outlined text-lg">person</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
