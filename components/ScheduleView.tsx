
import React, { useState } from 'react';
import { Nurse, DailySchedule, ShiftType } from '../types';

interface ScheduleViewProps {
  nurses: Nurse[];
  schedules: DailySchedule[];
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ nurses, schedules }) => {
  const [selectedDept, setSelectedDept] = useState('ER (ฉุกเฉิน)');
  const [selectedMonth, setSelectedMonth] = useState('ตุลาคม 2566');

  // Filter schedules to only show assignments for nurses in the selected department
  const getDeptAssignments = (daySchedule: DailySchedule) => {
    return daySchedule.assignments.filter(as => {
      const nurse = nurses.find(n => n.id === as.nurseId);
      return nurse?.department === selectedDept;
    });
  };

  const getShiftNurses = (day: DailySchedule, type: ShiftType) => {
    const assignments = getDeptAssignments(day).filter(as => as.shift === type);
    return assignments.map(as => nurses.find(n => n.id === as.nurseId)).filter(Boolean) as Nurse[];
  };

  const DAYS_TH = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  
  // Helper to get day of week for a date in Oct 2023 (Oct 1st was Sunday = 0)
  const getDayOfWeek = (date: number) => {
    return (date - 1) % 7;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-main">ตารางเวรรายเดือน</h2>
          <p className="text-text-sub mt-1 text-sm">ตรวจสอบและจัดการการเข้าเวรของแต่ละแผนก</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex-1 md:flex-none px-3 py-2 bg-white border border-border-color rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary outline-none shadow-sm"
          >
            <option>ตุลาคม 2566</option>
            <option>พฤศจิกายน 2566</option>
          </select>
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="flex-1 md:flex-none px-3 py-2 bg-white border border-border-color rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary outline-none shadow-sm"
          >
            <option>ER (ฉุกเฉิน)</option>
            <option>ICU (วิกฤต)</option>
            <option>IPD (ผู้ป่วยใน)</option>
            <option>OPD (ผู้ป่วยนอก)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-background-light/50 border-b border-border-color text-text-sub">
                <th className="px-6 py-4 text-left font-semibold w-32">วันที่</th>
                <th className="px-6 py-4 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-400 text-lg">wb_sunny</span>
                    เวรเช้า (08:00 - 16:00)
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">wb_twilight</span>
                    เวรบ่าย (16:00 - 00:00)
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-400 text-lg">bedtime</span>
                    เวรดึก (00:00 - 08:00)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {schedules.map((day) => {
                const dayIdx = getDayOfWeek(day.date);
                const isWeekend = dayIdx === 0 || dayIdx === 6;
                
                return (
                  <tr key={day.date} className={`${isWeekend ? 'bg-gray-50/50' : 'hover:bg-background-light/30'} transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-text-main">{day.date}</span>
                        <span className={`text-xs font-semibold ${dayIdx === 0 ? 'text-red-500' : 'text-text-sub'}`}>
                          {DAYS_TH[dayIdx]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <NurseAvatars nurses={getShiftNurses(day, ShiftType.MORNING)} />
                    </td>
                    <td className="px-6 py-4">
                      <NurseAvatars nurses={getShiftNurses(day, ShiftType.AFTERNOON)} />
                    </td>
                    <td className="px-6 py-4">
                      <NurseAvatars nurses={getShiftNurses(day, ShiftType.NIGHT)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NurseAvatars: React.FC<{ nurses: Nurse[] }> = ({ nurses }) => {
  if (nurses.length === 0) return <span className="text-xs text-text-sub italic">ยังไม่มีการจัดเวร</span>;
  
  return (
    <div className="flex flex-wrap gap-2">
      {nurses.map(nurse => (
        <div key={nurse.id} className="flex items-center gap-2 bg-white border border-border-color rounded-full pr-3 py-1 pl-1 shadow-sm hover:border-primary transition-colors cursor-pointer group">
          <img src={nurse.avatar} className="size-6 rounded-full object-cover" alt={nurse.name} />
          <span className="text-xs font-medium text-text-main group-hover:text-primary transition-colors">{nurse.name.split(' ')[1]}</span>
        </div>
      ))}
      <button className="size-6 rounded-full border border-dashed border-border-color flex items-center justify-center text-text-sub hover:border-primary hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-sm">add</span>
      </button>
    </div>
  );
};

export default ScheduleView;
