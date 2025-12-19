
import React from 'react';
import { Alert } from '../types';

interface AlertsWidgetProps {
  alerts: Alert[];
}

const AlertsWidget: React.FC<AlertsWidgetProps> = ({ alerts }) => {
  return (
    <section className="bg-red-50 rounded-2xl border border-red-100 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-red-600">warning</span> 
        แจ้งเตือนสำคัญ
      </h3>
      
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex gap-3 items-start group">
            <div className={`size-2 mt-1.5 rounded-full flex-shrink-0 ${
              alert.level === 'critical' ? 'bg-red-500' : 'bg-orange-400'
            }`}></div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-text-main group-hover:text-red-700 transition-colors">
                {alert.title}
              </p>
              <p className="text-xs text-text-sub leading-relaxed">
                {alert.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AlertsWidget;
