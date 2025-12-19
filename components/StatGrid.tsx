
import React from 'react';

const StatGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="พยาบาลเข้าเวรวันนี้" 
        value="42" 
        trend="+2%" 
        trendLabel="จากเมื่อวาน"
        icon="ward"
        iconBg="bg-primary/10 text-primary"
      />
      <StatCard 
        title="คำขอแลกเวร" 
        value="5" 
        status="รอการอนุมัติ"
        icon="swap_horiz"
        iconBg="bg-orange-50 text-orange-600"
      />
      <StatCard 
        title="ลาป่วย/กิจ" 
        value="2" 
        icon="sick"
        iconBg="bg-pink-50 text-pink-600"
        avatars={[
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDKl9bLOvKIHmVVWUfeOHBJ0bNbjnMCog3r1deJzFE_BOx86cVY7QXXRHsSvGTHCkT8z1-pp2-FD5i4K8-Jrph2jtkd12g5aisw_YACfMu4khX4fqJSMEDgxkdhjEN9_-uFq4pYrFdlObXLHhuVDDBuH6b5zbYmQlqmHMvSvovEXoNiCaQY9oPd-STM-Chb0vmW8OAzJEWKzZr1bZDgW2j4uTuYBmn1_QXvOBueS8dNog0uhvShMG5d94UFO8Jl6qbnFdq0UbjjenE',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDrv6FOzG1taFCIVyUP2-JgE7plyUwxw19bZw489Znt9kiE3dxFgra79dE3KyL2l4kgxCFyeAec7CNYxFI14di-EuFt1rmdyoUi7dzlpfeNUan7Kj-kc-HgtjoYn7DbRDqnRuOBKYCSZ4jx0s9sGQ95FA1fscL6KtBdWvbnM88M0zPU4Vunc5DjfVV8zlT9K9YRM2sJpCCFqndK6RtHnWTOXswriYHStcKGI1l43tr2OMKbbPomYUrKzLpBWPwW439KP05M2UCg-Eo'
        ]}
      />
      <StatCard 
        title="เวรที่ยังว่าง" 
        value="3" 
        unit="กะ"
        status="ต้องการด่วน"
        statusColor="text-red-600"
        icon="warning"
        iconBg="bg-red-50 text-red-600"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  trendLabel?: string;
  status?: string;
  statusColor?: string;
  icon: string;
  iconBg: string;
  avatars?: string[];
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, trend, trendLabel, status, statusColor, icon, iconBg, avatars }) => (
  <div className="bg-white p-5 rounded-2xl border border-border-color shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className="absolute right-[-10px] top-[-10px] p-6 bg-primary/5 rounded-full group-hover:scale-110 transition-transform"></div>
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-text-sub text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-text-main">
          {value} {unit && <span className="text-lg font-normal text-text-sub">{unit}</span>}
        </h3>
      </div>
      <div className={`${iconBg} p-2 rounded-lg`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
    
    <div className="flex items-center gap-1 text-sm z-10 mt-auto">
      {trend && (
        <span className="text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <span className="material-symbols-outlined text-base">trending_up</span>
          {trend}
        </span>
      )}
      {trendLabel && <span className="text-text-sub text-xs ml-1">{trendLabel}</span>}
      {status && <span className={`${statusColor || 'text-orange-600'} text-xs font-medium`}>{status}</span>}
      {avatars && (
        <div className="flex -space-x-2 overflow-hidden pl-1">
          {avatars.map((url, i) => (
            <div 
              key={i} 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-cover bg-center"
              style={{ backgroundImage: `url("${url}")` }}
            ></div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default StatGrid;
