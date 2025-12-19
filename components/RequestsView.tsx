
import React, { useState } from 'react';
import { Request } from '../types';

interface RequestsViewProps {
  requests: Request[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RequestsView: React.FC<RequestsViewProps> = ({ requests, onApprove, onReject }) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100">รอดำเนินการ</span>;
      case 'Approved':
        return <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">อนุมัติแล้ว</span>;
      case 'Rejected':
        return <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">ปฏิเสธ</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-main">คำขอและอนุมัติ</h2>
          <p className="text-text-sub mt-1 text-sm">จัดการคำขอแลกเวรและลางานจากบุคลากร</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-xl border border-border-color shadow-sm">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                filter === f 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-text-sub hover:bg-background-light'
              }`}
            >
              {f === 'All' ? 'ทั้งหมด' : f === 'Pending' ? 'รอดำเนินการ' : f === 'Approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธ'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-light/50 border-b border-border-color text-text-sub">
              <tr>
                <th className="px-6 py-4 font-semibold">พยาบาล</th>
                <th className="px-6 py-4 font-semibold">ประเภทคำขอ</th>
                <th className="px-6 py-4 font-semibold">รายละเอียดเวร/วันที่</th>
                <th className="px-6 py-4 font-semibold">เหตุผล</th>
                <th className="px-6 py-4 font-semibold">สถานะ</th>
                <th className="px-6 py-4 font-semibold text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-sub italic">
                    ไม่พบรายการคำขอในขณะนี้
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-background-light/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={req.nurse.avatar} 
                          className="size-9 rounded-full object-cover border-2 border-white shadow-sm"
                          alt={req.nurse.name}
                        />
                        <div>
                          <p className="font-bold text-text-main">{req.nurse.name}</p>
                          <p className="text-[10px] text-text-sub uppercase tracking-wider">{req.nurse.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-lg ${req.type === 'Swap' ? 'text-blue-500' : 'text-pink-500'}`}>
                          {req.type === 'Swap' ? 'swap_horiz' : 'event_busy'}
                        </span>
                        <span className="font-medium text-text-main">
                          {req.type === 'Swap' ? 'ขอแลกเวร' : 'ขอลางาน'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-text-main">{req.date}</p>
                      {req.shift && <p className="text-xs text-text-sub">เวร{req.shift}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-sub text-xs line-clamp-2 italic">"{req.reason}"</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => onApprove(req.id)}
                            className="p-1.5 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-90 flex items-center justify-center"
                            title="อนุมัติ"
                          >
                            <span className="material-symbols-outlined text-lg">check</span>
                          </button>
                          <button 
                            onClick={() => onReject(req.id)}
                            className="p-1.5 bg-white border border-border-color text-red-500 rounded-lg shadow-sm hover:bg-red-50 transition-all active:scale-90 flex items-center justify-center"
                            title="ปฏิเสธ"
                          >
                            <span className="material-symbols-outlined text-lg">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <button className="text-text-sub hover:text-primary transition-colors">
                             <span className="material-symbols-outlined text-lg">more_vert</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestsView;
