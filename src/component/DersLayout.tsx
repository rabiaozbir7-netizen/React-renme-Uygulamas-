import React, { useState, useEffect, useRef } from 'react'; // 1. useRef ve useEffect eklendi
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useProgress } from './ProgressContext'; 

const DersLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>('modul1');
  const location = useLocation();
  const { completedModules } = useProgress(); 
  
  // 2. Sağ taraftaki kaydırılabilir alanı temsil eden referans
  const mainContentRef = useRef<HTMLElement>(null);

  // 3. URL (location.pathname) her değiştiğinde bu blok çalışır
  useEffect(() => {
    if (mainContentRef.current) {
      // mainContentRef'e bağlı olan elemanın kaydırma çubuğunu en tepeye (0) çek
      mainContentRef.current.scrollTop = 0;
    }
  }, [location.pathname]); // Sadece sayfa yolu değiştiğinde çalışır

  const toggleModule = (moduleName: string) => {
    setActiveModule(activeModule === moduleName ? null : moduleName);
  };

  const reactLetters = [
    { char: 'R', key: 'modul1' },
    { char: 'E', key: 'modul2' },
    { char: 'A', key: 'modul3' },
    { char: 'C', key: 'modul4' },
    { char: 'T', key: 'modul5' },
  ];

  const getLinkStyle = (path: string) => ({
    color: location.pathname === path ? '#0dcaf0' : '#ffffff',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    textDecoration: 'none',
    fontSize: '0.9rem'
  });

  const moduleHeaderStyle = {
    cursor: 'pointer',
    backgroundColor: '#3d444b',
    border: '1px solid #555',
    transition: '0.3s'
  };

  return (
    <div className="d-flex w-100 vh-100 overflow-hidden bg-light">
      {/* SOL SIDEBAR: Bu alanın scroll yapısı ayrıdır */}
      <aside className="bg-dark p-3 shadow-lg" style={{ width: '350px', minWidth: '350px', overflowY: 'auto' }}>
        
        <div className="text-center border-bottom pb-3 mb-4">
          <h4 className="text-info fw-bold mb-3">React Eğitim Portalı</h4>
          
          <div className="d-flex justify-content-center gap-2">
            {reactLetters.map((item) => (
              <div
                key={item.key}
                style={{
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  backgroundColor: completedModules && completedModules[item.key] ? '#0dcaf0' : '#2c3034',
                  color: completedModules && completedModules[item.key] ? '#121212' : '#666',
                  boxShadow: completedModules && completedModules[item.key] ? '0 0 15px rgba(13, 202, 240, 0.6)' : 'none',
                  transition: 'all 0.5s ease',
                  border: completedModules && completedModules[item.key] ? 'none' : '1px solid #444'
                }}
              >
                {item.char}
              </div>
            ))}
          </div>
        </div>

        <div className="accordion border-0">
          {/* MODÜL 1 */}
          <div className="mb-2">
            <div className="p-2 d-flex justify-content-between align-items-center rounded-3" style={moduleHeaderStyle} onClick={() => toggleModule('modul1')}>
              <span className="small fw-bold text-white">Modül 1</span>
              <span style={{ color: 'white' }}>{activeModule === 'modul1' ? '▼' : '▶'}</span>
            </div>
            {activeModule === 'modul1' && (
              <nav className="nav flex-column ps-3 mt-2 border-start border-secondary border-opacity-50 ms-2">
                <Link to="/dersler/modul1/reactnedir" className="nav-link py-1" style={getLinkStyle('/dersler/modul1/reactnedir')}>• React Nedir? & Virtual DOM</Link>
                <Link to="/dersler/modul1/kurulum" className="nav-link py-1" style={getLinkStyle('/dersler/modul1/kurulum')}>• Kurulum (Vite)</Link>
                <Link to="/dersler/modul1/jsx" className="nav-link py-1" style={getLinkStyle('/dersler/modul1/jsx')}>• JSX & Bileşen Yapısı</Link>
                <Link to="/dersler/modul1/m1test" className="nav-link py-1 mt-2 fw-bold text-warning" style={getLinkStyle('/dersler/modul1/m1test')}>🎯 Modül 1 Testi</Link>
              </nav>
            )}
          </div>

          {/* MODÜL 2 */}
          <div className="mb-2">
            <div className="p-2 d-flex justify-content-between align-items-center rounded-3" style={moduleHeaderStyle} onClick={() => toggleModule('modul2')}>
              <span className="small fw-bold text-white">Modül 2</span>
              <span style={{ color: 'white' }}>{activeModule === 'modul2' ? '▼' : '▶'}</span>
            </div>
            {activeModule === 'modul2' && (
              <nav className="nav flex-column ps-3 mt-2 border-start border-secondary border-opacity-50 ms-2">
                <Link to="/dersler/modul2/props" className="nav-link py-1" style={getLinkStyle('/dersler/modul2/props')}>• Props Kullanımı</Link>
                <Link to="/dersler/modul2/donguler" className="nav-link py-1" style={getLinkStyle('/dersler/modul2/donguler')}>• Döngüler & Koşullar</Link>
                <Link to="/dersler/modul2/typescript" className="nav-link py-1" style={getLinkStyle('/dersler/modul2/typescript')}>• TypeScript ile Tip Güvenliği</Link>
                <Link to="/dersler/modul2/m2test" className="nav-link py-1 mt-2 fw-bold text-warning" style={getLinkStyle('/dersler/modul2/m2test')}>🎯 Modül 2 Testi</Link>
              </nav>
            )}
          </div>

          {/* MODÜL 3 */}
          <div className="mb-2">
            <div className="p-2 d-flex justify-content-between align-items-center rounded-3" style={moduleHeaderStyle} onClick={() => toggleModule('modul3')}>
              <span className="small fw-bold text-white">Modül 3</span>
              <span style={{ color: 'white' }}>{activeModule === 'modul3' ? '▼' : '▶'}</span>
            </div>
            {activeModule === 'modul3' && (
              <nav className="nav flex-column ps-3 mt-2 border-start border-secondary border-opacity-50 ms-2">
                <Link to="/dersler/modul3/usestate" className="nav-link py-1" style={getLinkStyle('/dersler/modul3/usestate')}>• useState</Link>
                <Link to="/dersler/modul3/useeffect" className="nav-link py-1" style={getLinkStyle('/dersler/modul3/useeffect')}>• useEffect</Link>
                <Link to="/dersler/modul3/router" className="nav-link py-1" style={getLinkStyle('/dersler/modul3/router')}>• React Router</Link>
                <Link to="/dersler/modul3/axios" className="nav-link py-1" style={getLinkStyle('/dersler/modul3/axios')}>• Axios</Link>
                <Link to="/dersler/modul3/m3test" className="nav-link py-1 mt-2 fw-bold text-warning" style={getLinkStyle('/dersler/modul3/m3test')}>🎯 Modül 3 Testi</Link>
              </nav>
            )}
          </div>

          {/* MODÜL 4 */}
          <div className="mb-2">
            <div className="p-2 d-flex justify-content-between align-items-center rounded-3" style={moduleHeaderStyle} onClick={() => toggleModule('modul4')}>
              <span className="small fw-bold text-white">Modül 4 </span>
              <span style={{ color: 'white' }}>{activeModule === 'modul4' ? '▼' : '▶'}</span>
            </div>
            {activeModule === 'modul4' && (
              <nav className="nav flex-column ps-3 mt-2 border-start border-secondary border-opacity-50 ms-2">
                <Link to="/dersler/modul4/useref" className="nav-link py-1" style={getLinkStyle('/dersler/modul4/useref')}>• useRef</Link>
                <Link to="/dersler/modul4/usecontext" className="nav-link py-1" style={getLinkStyle('/dersler/modul4/usecontext')}>• useContext</Link>
                <Link to="/dersler/modul4/hookform" className="nav-link py-1" style={getLinkStyle('/dersler/modul4/hookform')}>• React Hook Form</Link>
                <Link to="/dersler/modul4/yup" className="nav-link py-1" style={getLinkStyle('/dersler/modul4/yup')}>• Yup</Link>
                <Link to="/dersler/modul4/REDUXTOOLKIT" className="nav-link py-1" style={getLinkStyle('/dersler/modul4/REDUXTOOLKIT')}>• Redux Toolkit</Link>
                <Link to="/dersler/modul4/m4test" className="nav-link py-1 mt-2 fw-bold text-warning" style={getLinkStyle('/dersler/modul4/m4test')}>🎯 Modül 4 Testi</Link>
              </nav>
            )}
          </div>

          {/* MODÜL 5 */}
          <div className="mb-2">
            <div className="p-2 d-flex justify-content-between align-items-center rounded-3" style={moduleHeaderStyle} onClick={() => toggleModule('modul5')}>
              <span className="small fw-bold text-white">Modül 5 </span>
              <span style={{ color: 'white' }}>{activeModule === 'modul5' ? '▼' : '▶'}</span>
            </div>
            {activeModule === 'modul5' && (
              <nav className="nav flex-column ps-3 mt-2 border-start border-secondary border-opacity-50 ms-2">
                <Link to="/dersler/modul5/usereducer" className="nav-link py-1" style={getLinkStyle('/dersler/modul5/usereducer')}>• useReducer</Link>
                <Link to="/dersler/modul5/usememo" className="nav-link py-1" style={getLinkStyle('/dersler/modul5/usememo')}>• useMemo </Link>
                <Link to="/dersler/modul5/usecallback" className="nav-link py-1" style={getLinkStyle('/dersler/modul5/usecallback')}>• useCallback </Link>
                <Link to="/dersler/modul5/uselayouteffect" className="nav-link py-1" style={getLinkStyle('/dersler/modul5/uselayouteffect')}>• useLayoutEffect</Link>
                <Link to="/dersler/modul5/REACTQUERY" className="nav-link py-1" style={getLinkStyle('/dersler/modul5/REACTQUERY')}>• React Query</Link>
                <Link to="/dersler/modul5/m5test" className="nav-link py-1 mt-2 fw-bold text-warning" style={getLinkStyle('/dersler/modul5/m5test')}>🎯 Modül 5 Testi</Link>
              </nav>
            )}
          </div>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      {/* 4. ref={mainContentRef} özelliği buraya eklendi */}
      <main ref={mainContentRef} className="flex-grow-1 overflow-auto p-4 bg-light">
        <div className="container-fluid bg-white shadow-sm rounded-4 p-5 min-vh-100 border">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default DersLayout;