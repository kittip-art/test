
import { DepartmentSchedule, Request, Alert, Nurse, ShiftType, DailySchedule } from './types';

export const INITIAL_NURSES: Nurse[] = [
  {
    id: 'n1',
    name: 'พยาบาลวิภา ใจกล้า',
    role: 'Staff Nurse',
    department: 'ER (ฉุกเฉิน)',
    phone: '081-234-5678',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZjFzpjf2DSzGVGo9sgA7Tl-zhZaCDOc5T-Okxoi8gEF7g7tSTLWCv37v9JRYiw64iOxA8h_q1XRW7a_PeRXNgHlFfoPCdTJw9X3Or9DE4xlMPuHka5-_1_J20Nq2C1_DPzjx1913FitzgOaWA2kBLKzLeIHtWybe-uLjhbQ4mAJupnD46Y1B3KV-OmIp7er2eOfS7jH0APJ9DZWfzABiijQB7oSuVQHxfiWq2xKMGO51ACOyImd2LFCgK7e5jUr7KhE_rJPMXqkU',
    unavailableDays: [0, 6],
    availableDates: [1, 5, 10, 15, 20, 25]
  },
  {
    id: 'n2',
    name: 'พยาบาลกานดา สดใส',
    role: 'Staff Nurse',
    department: 'ICU (วิกฤต)',
    phone: '082-999-8888',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5hHTsIYsEtKbVZyI8jloQ2bd36SxAZhCYKeGrmsD2cQFd1TYtAi8a5Ejdznh5hoKOe_V7JA7YnP15JvAPcuuYLuUT5eZJG-tnWuHXOLSrRUGiDPUJ23C_EdZIk6ujkn7ThC8qKQqXiOW_CeOXNZX85RqR0W9y36U4FNjywrUNPrUXOK2B8Aq5etztoMtZd8H1_neGnbPgAm_zfmgvyKF7A8ErJbUjGGZJbPhj3GG6GWD_PjpXlgaS9RRRo6VkSE5kwujSegdQXyM',
    unavailableDays: [1, 2],
    availableDates: [2, 4, 6, 8, 12, 14, 16]
  },
  {
    id: 'n3',
    name: 'พยาบาลสมชาย รักดี',
    role: 'Staff Nurse',
    department: 'ER (ฉุกเฉิน)',
    phone: '083-111-2222',
    avatar: 'https://picsum.photos/seed/n3/150/150',
    unavailableDays: [3],
    availableDates: [2, 7, 12, 17, 22, 27]
  },
  {
    id: 'n4',
    name: 'พยาบาลนารี ขยันงาน',
    role: 'Head Nurse',
    department: 'ER (ฉุกเฉิน)',
    phone: '084-333-4444',
    avatar: 'https://picsum.photos/seed/n4/150/150',
    unavailableDays: [0, 6],
    availableDates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
];

export const MOCK_REQUESTS: Request[] = [
  {
    id: '1',
    nurse: INITIAL_NURSES[0],
    type: 'Swap',
    date: '25 ต.ค.',
    shift: 'บ่าย',
    reason: 'ติดธุระด่วนที่บ้านครับ อยากขอแลกกับเวรเช้าวันที่ 27',
    status: 'Pending'
  },
  {
    id: '2',
    nurse: INITIAL_NURSES[1],
    type: 'Leave',
    date: '28 ต.ค.',
    reason: 'ขอลากิจไปทำธุระสำคัญ',
    status: 'Pending'
  },
  {
    id: '3',
    nurse: INITIAL_NURSES[2],
    type: 'Swap',
    date: '26 ต.ค.',
    shift: 'ดึก',
    reason: 'แลกเวรกับพยาบาลวิภา เนื่องจากต้องไปร่วมงานแต่งงานพี่ชาย',
    status: 'Pending'
  },
  {
    id: '4',
    nurse: INITIAL_NURSES[3],
    type: 'Leave',
    date: '30 ต.ค.',
    reason: 'ลาพักผ่อนประจำปี',
    status: 'Approved'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    title: 'ขาดพยาบาลเวรดึก (ICU)',
    description: 'วันที่ 26 ต.ค. ขาด 1 อัตรา กรุณาจัดหาคนแทนด่วน',
    level: 'critical'
  },
  {
    id: 'a2',
    title: 'กำหนดส่งตารางเดือน พ.ย.',
    description: 'เหลือเวลาอีก 2 วันในการปิดตาราง',
    level: 'warning'
  }
];

export const DEPARTMENT_DATA: DepartmentSchedule[] = [
  {
    department: 'ER (ฉุกเฉิน)',
    today: { morning: 8, afternoon: 8, night: 6 },
    tomorrow: { morning: 8, afternoon: 8, night: 6 },
    dayAfter: { morning: 8, afternoon: 7, night: 6 }
  },
  {
    department: 'ICU (วิกฤต)',
    today: { morning: 5, afternoon: 5, night: 4 },
    tomorrow: { morning: 5, afternoon: 5, night: 4 },
    dayAfter: { morning: 5, afternoon: 5, night: 3 }
  },
  {
    department: 'IPD (ผู้ป่วยใน)',
    today: { morning: 12, afternoon: 12, night: 10 },
    tomorrow: { morning: 12, afternoon: 12, night: 10 },
    dayAfter: { morning: 12, afternoon: 12, night: 10 }
  }
];

export const MOCK_SCHEDULE: DailySchedule[] = Array.from({ length: 31 }, (_, i) => ({
  date: i + 1,
  assignments: [
    { nurseId: 'n1', shift: i % 3 === 0 ? ShiftType.MORNING : (i % 3 === 1 ? ShiftType.AFTERNOON : ShiftType.NIGHT) },
    { nurseId: 'n3', shift: i % 3 === 1 ? ShiftType.MORNING : (i % 3 === 2 ? ShiftType.AFTERNOON : ShiftType.NIGHT) },
    { nurseId: 'n4', shift: i % 3 === 2 ? ShiftType.MORNING : (i % 3 === 0 ? ShiftType.AFTERNOON : ShiftType.NIGHT) },
  ]
}));
