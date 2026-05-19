    import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnaSayfa: React.FC = () => {
  const navigate = useNavigate();

  return (
    // 'position-fixed w-100' ekleyerek beyaz boşluğu ve kaymayı engelliyoruz
    <div className="bg-dark text-white position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1000 }}>
      <div className="text-center p-5 rounded-4 shadow-lg border border-secondary" 
           style={{ background: 'linear-gradient(145deg, #1e1e2f, #2a2a40)', maxWidth: '900px' }}>
        
        <h1 className="display-2 fw-bold mb-3" style={{ color: '#61DAFB' }}>
          React Dünyasına Hoş Geldin! 🚀
        </h1>
        
        <p className="lead fs-4 mb-4 text-secondary">
          Modern web geliştirmenin temellerini ve 
          güçlü TypeScript desteğini keşfetmeye hazır mısın?
        </p>

        <button 
          className="btn btn-info btn-lg px-5 py-3 fw-bold shadow-sm"
          onClick={() => navigate('/dersler/modul1/reactnedir')} 
        >
          Eğitimi Keşfet & Başla →
        </button>
      </div>
    </div>
  );
};

export default AnaSayfa;