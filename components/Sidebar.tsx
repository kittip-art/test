
import React from 'react';

interface SidebarProps {
  currentView: 'dashboard' | 'nurses' | 'schedule' | 'requests' | 'settings' | 'reports';
  onViewChange: (view: 'dashboard' | 'nurses' | 'schedule' | 'requests' | 'settings' | 'reports') => void;
  requestCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, requestCount }) => {
  return (
    <aside className="w-72 bg-white border-r border-border-color hidden lg:flex flex-col h-full flex-shrink-0 z-20">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => onViewChange('dashboard')}>
          <div className="bg-primary/10 rounded-xl p-2 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">local_hospital</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-text-main text-lg font-bold leading-tight">TPST Hospital</h1>
            <p className="text-text-sub text-xs font-medium">ระบบจัดเวรพยาบาล</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem 
            active={currentView === 'dashboard'} 
            icon="dashboard" 
            label="แดชบอร์ด" 
            onClick={() => onViewChange('dashboard')} 
          />
          <NavItem 
            active={currentView === 'schedule'}
            icon="calendar_month" 
            label="ตารางเวร" 
            onClick={() => onViewChange('schedule')}
          />
          <NavItem 
            active={currentView === 'nurses'} 
            icon="groups" 
            label="บุคลากร" 
            onClick={() => onViewChange('nurses')}
          />
          <NavItem 
            active={currentView === 'requests'}
            icon="assignment_turned_in" 
            label="คำขอและอนุมัติ" 
            badge={requestCount}
            onClick={() => onViewChange('requests')}
          />
          <NavItem 
            active={currentView === 'reports'}
            icon="bar_chart" 
            label="รายงาน" 
            onClick={() => onViewChange('reports')}
          />
          <NavItem 
            active={currentView === 'settings'}
            icon="settings" 
            label="การตั้งค่า" 
            onClick={() => onViewChange('settings')}
          />
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border-color">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_v_QF4ZcRMJ5zovtXTK7aMtfGEld9fJLUwxAh3dOggZD7WwYBUPPeR8UYaUYzl0yd5ulLYw1lYKA8qMVhEU5P1wm2NqIq8aJinv5TbQwYvhY2l6PtYt5KVwbvR5kPBsXZaLZJ7gSPC_7iCUKMK9KucDQV9VIBfie3raDFh3iz7mVBrSM2VTrLGjL8OSLSPk-4fnMBu1Y5RDoaumFjd4md6zpmLrgGJuIWkk5FEmFkc13c-KTI8GiBNBOQj3FAgw7gd0B4yg6KVbA")' }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-text-main text-sm font-semibold truncate">หน. สมศรี ใจดี</p>
            <p className="text-text-sub text-xs truncate">หัวหน้าพยาบาล</p>
          </div>
          <button className="ml-auto text-text-sub hover:text-primary">
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      active ? 'bg-primary/10 text-primary' : 'text-text-sub hover:bg-background-light hover:text-text-main'
    }`}
  >
    <span className={`material-symbols-outlined ${active ? 'icon-fill' : ''}`}>{icon}</span>
    <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);

export default Sidebar;
