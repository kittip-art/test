
export enum ShiftType {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  NIGHT = 'Night'
}

export interface Nurse {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  avatar: string;
  unavailableDays: number[]; // 0 for Sunday, 1 for Monday, etc.
  availableDates: number[]; // 1 to 31
}

export interface ShiftAssignment {
  nurseId: string;
  shift: ShiftType;
}

export interface DailySchedule {
  date: number; // Day of month
  assignments: ShiftAssignment[];
}

export interface Request {
  id: string;
  nurse: Nurse;
  type: 'Swap' | 'Leave';
  date: string;
  shift?: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface DepartmentSchedule {
  department: string;
  today: { morning: number; afternoon: number; night: number };
  tomorrow: { morning: number; afternoon: number; night: number };
  dayAfter: { morning: number; afternoon: number; night: number };
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  level: 'critical' | 'warning' | 'info';
}
