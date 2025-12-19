
import React, { useState } from 'react';
import { Nurse } from '../types';

interface NurseListProps {
  nurses: Nurse[];
  onAddNurse: (nurse: Nurse) => void;
}

const DAYS_OF_WEEK = [
  { label: 'อา.', value: 0, color: 'text-red-500' },
  { label: 'จ.', value: 1, color: 'text-yellow-600' },
  { label: 'อ.', value: 2, color: 'text-pink-500' },
  { label: 'พ.', value: 3, color: 'text-green-600' },
  { label: 'พฤ.', value: 4, color: 'text-orange-500' },
  { label: 'ศ.', value: 5, color: 'text-blue-500' },
  { label: 'ส.', value: 6, color: 'text-purple-500' },
];

const NurseList: React.FC<NurseListProps> = ({ nurses, onAddNurse }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNurse, setNewNurse] = useState<Partial<Nurse>>({
    name: '',
    department: 'ER (ฉุกเฉิน)',
    phone: '',
    role: 'Staff Nurse',
    avatar: 'https://picsum.photos/seed/' + Math.random() + '/150/150',
    unavailableDays: [],
    availableDates: [],
  });

  const toggleDay = (day: number) => {
    setNewNurse(prev => ({
      ...prev,
      unavailableDays: prev.unavailableDays?.includes(day)
        ? prev.unavailableDays.filter(d => d !== day)
        : [...(prev.unavailableDays || []), day]
    }));
  };

  const toggleDate = (date: number) => {
    setNewNurse(prev => ({
      ...prev,
      availableDates: prev.availableDates?.includes(date)
        ? prev.availableDates.filter(d => d !== date)
        : [...(prev.availableDates || []), date]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNurse.name || !newNurse.phone) return;
    
    const nurseToAdd: Nurse = {
      id: 'n' + (nurses.length + 1),
      name: newNurse.name || '',
      role: newNurse.role || 'Staff Nurse',
      department: newNurse.department || '',
      phone: newNurse.phone || '',
      avatar: newNurse.avatar || `https://picsum.photos/seed/${Date.now()}/150/150`,
      unavailableDays: newNurse.unavailableDays || [],
      availableDates: newNurse.availableDates || [],
    };
    
    onAddNurse(nurseToAdd);
    setIsAdding(false);
    setNewNurse({
      name: '',
      department: 'ER (ฉุกเฉิน)',
      phone: '',
      role: 'Staff Nurse',
      avatar: 'https://picsum.photos/seed/' + Math.random() + '/150/150',
      unavailableDays: [],
      availableDates: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-main">รายชื่อพยาบาล</h2>
          <p className="text-text-sub mt-1 text-sm">จัดการข้อมูลและตารางความสะดวกของบุคลากร</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-4 py-2 ${isAdding ? 'bg-gray-500' : 'bg-primary'} text-white text-sm font-medium rounded-lg shadow-sm hover:opacity-90 transition-colors flex items-center gap-2`}
        >
          <span className="material-symbols-outlined text-lg">{isAdding ? 'close' : 'person_add'}</span>
          {isAdding ? 'ยกเลิก' : 'เพิ่มพยาบาลใหม่'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-primary/20 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1">ชื่อ-นามสกุล</label>
                  <input 
                    required
                    type="text" 
                    value={newNurse.name}
                    onChange={e => setNewNurse({...newNurse, name: e.target.value})}
                    placeholder="ระบุชื่อจริง-นามสกุล"
                    className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-1 focus:ring-primary outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1">เบอร์โทรศัพท์</label>
                  <input 
                    required
                    type="tel" 
                    value={newNurse.phone}
                    onChange={e => setNewNurse({...newNurse, phone: e.target.value})}
                    placeholder="0xx-xxx-xxxx"
                    className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-1 focus:ring-primary outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-main mb-1">แผนก</label>
                  <select 
                    value={newNurse.department}
                    onChange={e => setNewNurse({...newNurse, department: e.target.value})}
                    className="w-full px-3 py-2 border border-border-color rounded-lg focus:ring-1 focus:ring-primary outline-none transition"
                  >
                    <option>ER (ฉุกเฉิน)</option>
                    <option>ICU (วิกฤต)</option>
                    <option>IPD (ผู้ป่วยใน)</option>
                    <option>OPD (ผู้ป่วยนอก)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-3">วันในสัปดาห์ที่ไม่สะดวก (Unavailable)</label>
                <div className="grid grid-cols-4 gap-2">
                  {DAYS_OF_WEEK.map(day => (
                    <label key={day.value} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={newNurse.unavailableDays?.includes(day.value)}
                        onChange={() => toggleDay(day.value)}
                        className="rounded border-border-color text-primary focus:ring-primary"
                      />
                      <span className={`text-xs font-bold ${day.color}`}>{day.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-3">วันที่ในเดือนที่สะดวก (Available Dates)</label>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => toggleDate(date)}
                      className={`size-7 rounded-md text-[10px] font-bold border transition-all ${
                        newNurse.availableDates?.includes(date)
                          ? 'bg-green-500 border-green-600 text-white shadow-sm'
                          : 'bg-white border-border-color text-text-sub hover:bg-gray-50'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border-color">
              <button 
                type="submit"
                className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-light/50 border-b border-border-color text-text-sub">
              <tr>
                <th className="px-6 py-4 font-semibold">พยาบาล</th>
                <th className="px-6 py-4 font-semibold">แผนก</th>
                <th className="px-6 py-4 font-semibold">เบอร์โทร</th>
                <th className="px-6 py-4 font-semibold">วันไม่ว่าง</th>
                <th className="px-6 py-4 font-semibold">วันที่สะดวก</th>
                <th className="px-6 py-4 font-semibold text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {nurses.map((nurse) => (
                <tr key={nurse.id} className="hover:bg-background-light/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={nurse.avatar} 
                        className="size-10 rounded-full object-cover border-2 border-white shadow-sm"
                        alt={nurse.name}
                      />
                      <div>
                        <p className="font-bold text-text-main">{nurse.name}</p>
                        <p className="text-xs text-text-sub">{nurse.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary-light text-primary text-xs font-bold rounded-md">
                      {nurse.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-sub font-medium">{nurse.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {nurse.unavailableDays.length > 0 ? (
                        nurse.unavailableDays.map(d => (
                          <span key={d} className={`text-[10px] font-bold ${DAYS_OF_WEEK.find(dw => dw.value === d)?.color}`}>
                            {DAYS_OF_WEEK.find(dw => dw.value === d)?.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-text-sub italic">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] text-text-sub max-w-[150px] line-clamp-2">
                      {nurse.availableDates.sort((a,b) => a-b).join(', ') || '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-text-sub hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="text-text-sub hover:text-red-500 transition-colors ml-3">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NurseList;
