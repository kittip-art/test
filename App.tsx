
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatGrid from './components/StatGrid';
import LiveShifts from './components/LiveShifts';
import ScheduleOverview from './components/ScheduleOverview';
import RequestsWidget from './components/RequestsWidget';
import AlertsWidget from './components/AlertsWidget';
import NurseList from './components/NurseList';
import ScheduleView from './components/ScheduleView';
import RequestsView from './components/RequestsView';
import SettingsView from './components/SettingsView';
import ReportsView from './components/ReportsView';
import { MOCK_REQUESTS, MOCK_ALERTS, DEPARTMENT_DATA, INITIAL_NURSES, MOCK_SCHEDULE } from './constants';
import { Nurse, Request } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'nurses' | 'schedule' | 'requests' | 'settings' | 'reports'>('dashboard');
  const [nurses, setNurses] = useState<Nurse[]>(INITIAL_NURSES);
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  
  // System Authentication State
  const [adminPassword, setAdminPassword] = useState('admin123');

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  const handleAddNurse = (newNurse: Nurse) => {
    setNurses(prev => [...prev, newNurse]);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-main">ภาพรวมแดชบอร์ด</h2>
                <p className="text-text-sub mt-1 text-sm">
                  วันอังคารที่ 24 ตุลาคม 2566 • <span className="text-primary font-medium">เข้าเวรปกติ</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('กำลังสร้างรายงาน PDF...')}
                  className="px-4 py-2 bg-white border border-border-color text-text-main text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  ส่งออกรายงาน
                </button>
                <button 
                  onClick={() => setCurrentView('schedule')}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  สร้างตารางเวร
                </button>
              </div>
            </div>

            <StatGrid />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <LiveShifts />
                <ScheduleOverview data={DEPARTMENT_DATA} />
              </div>

              <div className="space-y-6">
                <RequestsWidget 
                  requests={pendingRequests} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                />
                <AlertsWidget alerts={alerts} />
              </div>
            </div>
          </>
        );
      case 'nurses':
        return <NurseList nurses={nurses} onAddNurse={handleAddNurse} />;
      case 'schedule':
        return <ScheduleView nurses={nurses} schedules={MOCK_SCHEDULE} />;
      case 'requests':
        return <RequestsView requests={requests} onApprove={handleApprove} onReject={handleReject} />;
      case 'settings':
        return <SettingsView adminPassword={adminPassword} onUpdatePassword={setAdminPassword} />;
      case 'reports':
        return <ReportsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        requestCount={pendingRequests.length}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 pb-10">
            {renderContent()}

            <footer className="text-center text-xs text-text-sub py-8 border-t border-border-color/50">
              © 2023 โรงพยาบาลเทพสตรี (TPST Hospital). All rights reserved.
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
