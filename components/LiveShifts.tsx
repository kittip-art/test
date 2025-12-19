
import React from 'react';

const LiveShifts: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl border border-border-color p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          สถานะเวรปัจจุบัน (Live)
        </h3>
        <span className="text-sm text-text-sub font-medium">14:35 น.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Morning Shift */}
        <div className="border border-border-color rounded-xl p-4 bg-background-light/50 opacity-60">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-orange-400">wb_sunny</span>
            <span className="text-sm font-bold text-text-main">เวรเช้า</span>
            <span className="text-xs text-text-sub ml-auto">08:00 - 16:00</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div className="bg-text-sub h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-xs text-text-sub text-right">ส่งเวรแล้ว</p>
        </div>

        {/* Afternoon Shift (Current) */}
        <div className="border border-primary rounded-xl p-4 bg-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary icon-fill">wb_twilight</span>
            <span className="text-sm font-bold text-primary">เวรบ่าย (ปัจจุบัน)</span>
            <span className="text-xs text-text-sub ml-auto">16:00 - 00:00</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-text-main">15<span className="text-sm text-text-sub font-normal">/15 คน</span></span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">ครบตามจำนวน</span>
          </div>
          <div className="flex -space-x-2 overflow-hidden py-1">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/seed/n1/100/100" alt="Nurse" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/seed/n2/100/100" alt="Nurse" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/seed/n3/100/100" alt="Nurse" />
            <div className="h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs text-text-sub font-medium">+12</div>
          </div>
        </div>

        {/* Night Shift (Next) */}
        <div className="border border-border-color rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-indigo-400">bedtime</span>
            <span className="text-sm font-bold text-text-main">เวรดึก</span>
            <span className="text-xs text-text-sub ml-auto">00:00 - 08:00</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-text-main">10<span className="text-sm text-text-sub font-normal">/12 คน</span></span>
            <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-md font-medium">ขาด 2 คน</span>
          </div>
          <button className="w-full mt-1 text-xs text-primary font-medium hover:underline text-left">
            + จัดการกำลังพล
          </button>
        </div>
      </div>
    </section>
  );
};

export default LiveShifts;
