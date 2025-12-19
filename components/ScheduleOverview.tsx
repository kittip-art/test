
import React from 'react';
import { DepartmentSchedule } from '../types';

interface ScheduleOverviewProps {
  data: DepartmentSchedule[];
}

const ScheduleOverview: React.FC<ScheduleOverviewProps> = ({ data }) => {
  return (
    <section className="bg-white rounded-2xl border border-border-color p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-main">ตารางเวรล่วงหน้า (3 วัน)</h3>
        <a className="text-sm text-primary font-medium hover:underline flex items-center gap-1" href="#">
          ดูทั้งหมด <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
      
      <div className="overflow-x-auto -mx-6 px-6 no-scrollbar">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="text-text-sub bg-background-light/50 border-b border-border-color">
            <tr>
              <th className="px-4 py-3 font-medium rounded-tl-lg">แผนก/วอร์ด</th>
              <th className="px-4 py-3 font-medium">วันนี้ (24 ต.ค.)</th>
              <th className="px-4 py-3 font-medium">พรุ่งนี้ (25 ต.ค.)</th>
              <th className="px-4 py-3 font-medium rounded-tr-lg">มะรืน (26 ต.ค.)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {data.map((dept, idx) => (
              <tr key={idx} className="hover:bg-background-light transition-colors">
                <td className="px-4 py-3 font-medium text-text-main">{dept.department}</td>
                <td className="px-4 py-3">
                  <ShiftBadges stats={dept.today} />
                </td>
                <td className="px-4 py-3">
                  <ShiftBadges stats={dept.tomorrow} />
                </td>
                <td className="px-4 py-3">
                  <ShiftBadges stats={dept.dayAfter} isLast />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const ShiftBadges: React.FC<{ stats: { morning: number; afternoon: number; night: number }, isLast?: boolean }> = ({ stats, isLast }) => {
  // If all shifts are good, show "Complete"
  const isComplete = stats.morning >= 5 && stats.afternoon >= 5 && stats.night >= 4;
  const isMissing = stats.night < 4 || stats.afternoon < 4 || stats.morning < 4;

  if (isComplete && !isLast) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">ครบ</span>
    );
  }

  if (isMissing && isLast) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600">ขาด 1</span>
    );
  }

  return (
    <div className="flex gap-1">
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">ช: {stats.morning}</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">บ: {stats.afternoon}</span>
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700">ด: {stats.night}</span>
    </div>
  );
};

export default ScheduleOverview;
