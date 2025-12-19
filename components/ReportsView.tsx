
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';

const densityData = [
  { day: '1', value: 180 },
  { day: '5', value: 210 },
  { day: '10', value: 150 },
  { day: '15', value: 230 },
  { day: '20', value: 120 },
  { day: '25', value: 280 },
  { day: '30', value: 200 },
];

const hoursData = [
  { name: 'สมศรี', hours: 140 },
  { name: 'มานะ', hours: 190 },
  { name: 'ชูใจ', hours: 120 },
  { name: 'กานดา', hours: 80 },
  { name: 'วิไล', hours: 90 },
];

const ReportsView: React.FC = () => {
  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text-main">รายงานและสถิติ</h2>
          <p className="text-text-sub mt-1 text-sm font-medium">ภาพรวมการจัดเวรและประสิทธิภาพการทำงานของบุคลากรประจำเดือน</p>
        </div>
        <button 
          onClick={() => alert('กำลังส่งออกรายงาน...')}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">download</span>
          ส่งออกรายงาน
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <FilterDropdown label="เดือนนี้" />
        <FilterDropdown label="ไตรมาสที่ 1" />
        <FilterDropdown label="แผนกฉุกเฉิน (ER)" />
        <FilterDropdown label="พยาบาลวิชาชีพ" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          icon="schedule" 
          title="ชั่วโมงทำงานรวม" 
          value="1,240 ชม." 
          trend="+5% จากเดือนก่อน" 
          trendUp={true} 
          iconColor="text-primary"
          iconBg="bg-primary-light"
        />
        <KPICard 
          icon="sick" 
          title="การลาหยุด (ครั้ง)" 
          value="12" 
          trend="-2% (ดีขึ้น)" 
          trendUp={true} 
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <KPICard 
          icon="bedtime" 
          title="อัตราเวรดึก" 
          value="25%" 
          trend="-1.5% เป้าหมาย" 
          trendUp={false} 
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <KPICard 
          icon="groups" 
          title="ความหนาแน่นเฉลี่ย" 
          value="8 คน/เวร" 
          trend="— คงที่" 
          trendUp={null} 
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Density Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-border-color shadow-sm relative">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-text-main">ความหนาแน่นของเวรรายวัน</h3>
            <div className="text-right">
              <p className="text-2xl font-bold text-text-main">240 เวร</p>
              <p className="text-xs font-bold text-green-600">+12%</p>
            </div>
          </div>
          <p className="text-xs text-text-sub font-medium mb-8">Daily Shift Density (พฤศจิกายน)</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#137fec" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#137fec' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Individual Hours Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-border-color shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-text-main">ชั่วโมงทำงานรายบุคคล (Top 5)</h3>
            <p className="text-lg font-bold text-text-main">สูงสุด 210 ชม.</p>
          </div>
          <p className="text-xs text-text-sub font-medium mb-8">ประจำเดือนนี้</p>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData} margin={{ top: 20 }}>
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {hoursData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? '#137fec' : '#3b82f6cc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Summary */}
      <div className="bg-white rounded-[32px] border border-border-color shadow-sm overflow-hidden">
        <div className="px-8 py-6 flex justify-between items-center border-b border-border-color">
          <h3 className="text-lg font-bold text-text-main font-display">ตารางสรุปการปฏิบัติงาน</h3>
          <button className="text-sm font-bold text-primary hover:underline">ดูทั้งหมด</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-light/30 border-b border-border-color text-text-sub">
              <tr>
                <th className="px-8 py-4 font-semibold">ชื่อ-นามสกุล</th>
                <th className="px-8 py-4 font-semibold">แผนก</th>
                <th className="px-8 py-4 font-semibold">จำนวนเวร</th>
                <th className="px-8 py-4 font-semibold">เวรดึก (ครั้ง)</th>
                <th className="px-8 py-4 font-semibold">ชั่วโมงรวม</th>
                <th className="px-8 py-4 font-semibold">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              <TableRow 
                name="สมศรี รักงาน" 
                dept="ฉุกเฉิน (ER)" 
                shifts={22} 
                nightShifts={8} 
                hours={210} 
                status="ปกติ"
                avatar="https://picsum.photos/seed/s1/100/100"
              />
              <TableRow 
                name="กานดา มั่นคง" 
                dept="ผู้ป่วยใน (IPD)" 
                shifts={20} 
                nightShifts={5} 
                hours={180} 
                status="ปกติ"
                avatar="https://picsum.photos/seed/s2/100/100"
              />
              <TableRow 
                name="มานะ อดทน" 
                dept="ศัลยกรรม" 
                shifts={18} 
                nightShifts={2} 
                hours={150} 
                status="ลาพักร้อน"
                avatar="https://picsum.photos/seed/s3/100/100"
              />
              <TableRow 
                name="ชูใจ ใจดี" 
                dept="ฉุกเฉิน (ER)" 
                shifts={15} 
                nightShifts={10} 
                hours={120} 
                status="ลาป่วย"
                avatar="https://picsum.photos/seed/s4/100/100"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ 
  icon: string, 
  title: string, 
  value: string, 
  trend: string, 
  trendUp: boolean | null,
  iconColor: string,
  iconBg: string
}> = ({ icon, title, value, trend, trendUp, iconColor, iconBg }) => (
  <div className="bg-white p-8 rounded-[32px] border border-border-color shadow-sm flex flex-col gap-3 group hover:border-primary transition-all">
    <div className={`${iconBg} ${iconColor} size-12 rounded-2xl flex items-center justify-center`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="space-y-1">
      <p className="text-xs font-bold text-text-sub uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-text-main">{value}</p>
    </div>
    <p className={`text-xs font-bold ${trendUp === true ? 'text-green-600' : trendUp === false ? 'text-red-500' : 'text-text-sub'}`}>
      {trendUp === true ? '↗ ' : trendUp === false ? '↘ ' : ''}{trend}
    </p>
  </div>
);

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
  <button className="px-4 py-2 bg-white border border-border-color rounded-xl text-sm font-semibold text-text-main flex items-center gap-2 hover:bg-gray-50 transition-all">
    {label}
    <span className="material-symbols-outlined text-lg">expand_more</span>
  </button>
);

const TableRow: React.FC<{ 
  name: string, 
  dept: string, 
  shifts: number, 
  nightShifts: number, 
  hours: number, 
  status: string,
  avatar: string
}> = ({ name, dept, shifts, nightShifts, hours, status, avatar }) => (
  <tr className="hover:bg-background-light/30 transition-colors">
    <td className="px-8 py-5">
      <div className="flex items-center gap-3">
        <img src={avatar} className="size-10 rounded-full border border-border-color" alt="" />
        <span className="font-bold text-text-main">{name}</span>
      </div>
    </td>
    <td className="px-8 py-5 text-text-sub font-medium">{dept}</td>
    <td className="px-8 py-5 font-bold text-text-main">{shifts}</td>
    <td className="px-8 py-5 font-bold text-text-main">{nightShifts}</td>
    <td className="px-8 py-5 font-bold text-primary">{hours}</td>
    <td className="px-8 py-5">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
        status === 'ปกติ' ? 'bg-green-50 text-green-600' : 
        status === 'ลาพักร้อน' ? 'bg-orange-50 text-orange-600' : 
        'bg-red-50 text-red-600'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

export default ReportsView;
