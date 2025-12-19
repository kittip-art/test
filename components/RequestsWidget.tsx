
import React from 'react';
import { Request } from '../types';

interface RequestsWidgetProps {
  requests: Request[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const RequestsWidget: React.FC<RequestsWidgetProps> = ({ requests, onApprove, onReject }) => {
  return (
    <section className="bg-white rounded-2xl border border-border-color p-6 shadow-sm">
      <h3 className="text-lg font-bold text-text-main mb-4">คำขอล่าสุด</h3>
      
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-sm text-text-sub italic py-4">ไม่มีคำขอที่ค้างอยู่</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="flex flex-col gap-3 pb-4 border-b border-border-color last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div 
                  className="size-10 rounded-full bg-cover bg-center" 
                  style={{ backgroundImage: `url("${req.nurse.avatar}")` }}
                ></div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-text-main">{req.nurse.name}</p>
                  <p className="text-xs text-text-sub">
                    {req.type === 'Swap' ? `ขอแลกเวร: ${req.date} (${req.shift})` : `ขอลากิจ: ${req.date}`}
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-2 rounded-lg text-xs text-text-sub italic">
                "{req.reason}"
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => onApprove(req.id)}
                  className="flex-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition shadow-sm"
                >
                  อนุมัติ
                </button>
                <button 
                  onClick={() => onReject(req.id)}
                  className="flex-1 px-3 py-1.5 bg-transparent border border-border-color text-text-main text-xs font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  ปฏิเสธ
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-text-sub hover:text-primary transition-colors border border-dashed border-border-color rounded-lg">
        ดูคำขอทั้งหมด ({requests.length})
      </button>
    </section>
  );
};

export default RequestsWidget;
