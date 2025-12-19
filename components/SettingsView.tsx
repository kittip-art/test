
import React, { useState } from 'react';

interface SettingsViewProps {
  adminPassword: string;
  onUpdatePassword: (newPassword: string) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ adminPassword, onUpdatePassword }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phase, setPhase] = useState<'login' | 'change'>('login');
  
  // Login States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Change Password States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === adminPassword) {
      setIsAuthenticated(true);
      setPhase('change');
      setLoginError('');
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setChangeError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangeError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    
    onUpdatePassword(newPassword);
    setSuccessMessage('เปลี่ยนรหัสผ่านสำเร็จแล้ว!');
    setChangeError('');
    setNewPassword('');
    setConfirmPassword('');
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setPhase('login');
      setIsAuthenticated(false);
      setUsername('');
      setPassword('');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-border-color shadow-xl overflow-hidden">
        <div className="bg-primary p-8 text-center">
          <div className="size-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <span className="material-symbols-outlined text-white text-3xl">settings_applications</span>
          </div>
          <h2 className="text-xl font-bold text-white">ตั้งค่าระบบ</h2>
          <p className="text-primary-light/80 text-sm">การจัดการรหัสผ่านผู้ดูแลระบบ</p>
        </div>

        <div className="p-8">
          {phase === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <p className="text-text-sub text-sm text-center mb-6">กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
              
              <div>
                <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-1.5 ml-1">Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-lg">person</span>
                  <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-light border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    placeholder="ระบุชื่อผู้ใช้ (admin)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-lg">lock</span>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-light border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    placeholder="ระบุรหัสผ่าน"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {loginError}
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-5">
              <p className="text-text-sub text-sm text-center mb-6">ระบุรหัสผ่านใหม่ที่คุณต้องการใช้งาน</p>
              
              <div>
                <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-1.5 ml-1">รหัสผ่านใหม่</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-lg">key</span>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-light border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัว)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-sub uppercase tracking-wider mb-1.5 ml-1">ยืนยันรหัสผ่านใหม่</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub text-lg">verified_user</span>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background-light border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                    required
                  />
                </div>
              </div>

              {changeError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  {changeError}
                </div>
              )}

              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2 text-green-600 text-xs font-bold animate-bounce">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {successMessage}
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                บันทึกรหัสผ่านใหม่
              </button>
              
              <button 
                type="button"
                onClick={() => { setPhase('login'); setIsAuthenticated(false); }}
                className="w-full py-2 text-text-sub text-xs font-medium hover:text-primary transition-colors"
              >
                ยกเลิกและกลับหน้าล็อกอิน
              </button>
            </form>
          )}
        </div>
      </div>
      
      <p className="mt-8 text-center text-text-sub text-[10px] leading-relaxed">
        ความปลอดภัยของระบบเป็นสิ่งสำคัญ <br />
        กรุณาเก็บรักษารหัสผ่านเป็นความลับและเปลี่ยนเป็นประจำ
      </p>
    </div>
  );
};

export default SettingsView;
