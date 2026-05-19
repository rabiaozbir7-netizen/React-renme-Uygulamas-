import React, { useState } from 'react';

const UseContextDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodda AltBilesen içinde 'tema' değişkeninin değeri ne olur?\n\nconst TemaContext = createContext('light');\n\nconst App = () => (\n  <TemaContext.Provider value='dark'>\n    <AltBilesen />\n  </TemaContext.Provider>\n);\n\n// AltBilesen içinde:\nconst tema = useContext(TemaContext);",
      options: [
        "'light' olur, çünkü createContext içine 'light' yazılmıştır.",
        "undefined olur.",
        "'dark' olur, çünkü Provider (Sağlayıcı) üzerinden güncel 'value' olarak 'dark' gönderilmiştir.",
        "Hata fırlatır."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki hatalı kodda nasıl bir sorun oluşur?\n\nconst AyarContext = createContext(null);\n\nconst App = () => (\n  {/* Hatalı Kullanım: */}\n  <AyarContext.Provider>\n    <Profil />\n  </AyarContext.Provider>\n);",
      options: [
        "Profil bileşeni ekrana 2 kere çizilir.",
        "Hiçbir sorun olmaz, null değeri gönderilir.",
        "Derleme hatası verir çünkü Provider bileşenine 'value' prop'u verilmesi ZORUNLUDUR.",
        "Profil bileşeni silinir."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Performansla ilgili kritik soru: Context Provider içindeki 'value' değeri değiştiğinde hangi bileşenler YENİDEN ÇİZİLİR (re-render)?",
      options: [
        "Uygulamadaki bütün bileşenler.",
        "Sadece içinde useContext kancasını kullanarak o Context'i tüketen (okuyan) bileşenler.",
        "Sadece Provider'ın kendisi çizilir, alt bileşenler etkilenmez.",
        "Hiçbiri çizilmez, sayfayı yenilemek gerekir."
      ],
      correct: 1
    }
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentStep - 1].correct) {
      setStatus('success');
      setScore(prev => prev + 10); 
      
      setTimeout(() => {
        if (currentStep < questions.length) {
          setCurrentStep(currentStep + 1);
          setStatus('idle');
        } else {
          setIsFinished(true);
        }
      }, 1000); 
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 800); 
    }
  };

  const resetTest = () => {
    setCurrentStep(1);
    setStatus('idle');
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      {/* Başlık Bölümü */}
      <div className="mb-4">
        <h2 className="text-primary fw-bold">🌍 useContext ve Global State</h2>
        <p className="lead text-muted">
          "Prop Drilling" (Prop Sondajı) eziyetine son verin! Verilerinizi uygulamanın her yerinden tek bir kancayla (Hook) kolayca çekin.
        </p>
      </div>

      {/* 1. Bölüm: Neden İhtiyacımız Var? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden useContext Kullanmalıyız?</h4>
          <p>
            React'te veriler her zaman yukarıdan aşağıya (Parent'tan Child'a) <code>props</code> aracılığıyla akar. Eğer 10 katman derindeki bir bileşene veri göndermek isterseniz, bu veriyi aradaki 9 bileşenden tek tek geçirmek zorunda kalırsınız. Bu duruma <strong>Prop Drilling</strong> denir.
          </p>
          <div className="bg-danger bg-opacity-10 p-3 rounded-3 border-start border-4 border-danger mb-3">
            <h6 className="fw-bold text-danger">Prop Drilling (Kötü Yol)</h6>
            <p className="small mb-0">
              App &gt; Navbar &gt; Menu &gt; UserProfile &gt; <strong>Avatar (Veri buraya lazım ama herkes taşımak zorunda!)</strong>
            </p>
          </div>
          <div className="bg-success bg-opacity-10 p-3 rounded-3 border-start border-4 border-success">
            <h6 className="fw-bold text-success">Context API (İyi Yol)</h6>
            <p className="small mb-0 text-dark">
              Veriyi uygulamanın en tepesinde bir "Bulut" (Context) içine koyarsınız. İhtiyacı olan bileşen (Örn: Avatar), aradaki kimseye sormadan doğrudan buluttan veriyi çeker!
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Context Oluşturma ve Sağlama */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Adım Adım Context Kullanımı</h4>
          <p>
            Context kullanmak 3 aşamalı bir işlemdir: <strong>Oluştur (Create)</strong>, <strong>Sağla (Provide)</strong> ve <strong>Tüket (Consume/Use)</strong>.
          </p>
          
          <h6 className="fw-bold text-primary mt-3">1. ve 2. Adım: Oluşturma ve Sağlama (Provider)</h6>
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { createContext, useState } from 'react';

// 1. Context'i oluşturuyoruz (Bulutu tanımlıyoruz)
export const TemaContext = createContext(null);

const App = () => {
  const [tema, setTema] = useState("dark");

  return (
    // 2. Tüm uygulamayı Provider ile sarmalıyoruz ve 'value' prop'u ile veriyi veriyoruz
    <TemaContext.Provider value={{ tema, setTema }}>
      <Navbar />
      <Icerik />
    </TemaContext.Provider>
  );
};

export default App;`}
          </pre>

          <h6 className="fw-bold text-success mt-4">3. Adım: Veriyi Çekme (useContext)</h6>
          <p className="small">Artık herhangi bir alt bileşende bu veriye doğrudan erişebiliriz:</p>
          <pre className="bg-dark text-white p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useContext } from 'react';
// Context'i import etmeyi unutmayın!
import { TemaContext } from './App'; 

const Icerik = () => {
  // 3. useContext kancası ile veriyi buluttan çekiyoruz
  const { tema, setTema } = useContext(TemaContext);

  return (
    <div className={tema === "dark" ? "bg-dark text-white" : "bg-light text-dark"}>
      <h2>Şu anki tema: {tema}</h2>
      <button onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
        Temayı Değiştir
      </button>
    </div>
  );
};

export default Icerik;`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="user">👤</span> Modül Ödevi: Kullanıcı Oturum Yönetimi</h4>
        <p className="mb-3">
          Tüm uygulamadan erişebileceğimiz bir kullanıcı oturum (Auth) yönetimi kuracağız. Sırasıyla şu adımları izleyin:
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Context Dosyasını Oluşturun</h6>
        <p className="small mb-1"><code>src/</code> içine <code>AuthContext.tsx</code> açın ve Provider yapısını kurun:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { createContext, useState, ReactNode } from 'react';

// Context'i dışarı aktarıyoruz
export const AuthContext = createContext<any>(null);

// Tüm uygulamayı sarmalayacak Provider Bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [kullanici, setKullanici] = useState<string | null>(null);

  const girisYap = (isim: string) => setKullanici(isim);
  const cikisYap = () => setKullanici(null);

  // Value içine state'i ve fonksiyonları koyduk
  return (
    <AuthContext.Provider value={{ kullanici, girisYap, cikisYap }}>
      {children}
    </AuthContext.Provider>
  );
};`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Uygulamayı Sarmalayın (App.tsx)</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> içinde uygulamanızı <code>AuthProvider</code> ile sarmalayın ve Context'i tüketen bir Navbar yapın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';

const Navbar = () => {
  // Context'ten verileri çekiyoruz
  const { kullanici, girisYap, cikisYap } = useContext(AuthContext);

  return (
    <nav style={{ padding: '10px', background: '#ddd' }}>
      {kullanici ? (
        <>
          <span style={{ marginRight: '10px' }}>Hoş geldin, {kullanici}!</span>
          <button onClick={cikisYap}>Çıkış Yap</button>
        </>
      ) : (
        <button onClick={() => girisYap("Ahmet")}>Giriş Yap</button>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div style={{ padding: '20px' }}>Sayfa İçeriği</div>
    </AuthProvider>
  );
}

export default App;`}
        </pre>
      </div>

      {/* DİNAMİK BİLGİ TESTİ BÖLÜMÜ */}
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
        <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold">🎯 Kod Okuryazarlığı Testi</h4>
          {!isFinished && <span className="badge bg-secondary fs-6">Soru {currentStep} / {questions.length}</span>}
        </div>
        
        {isFinished ? (
          <div className="card-body text-center py-5 bg-light">
            <div className="display-4 mb-3">🏅</div>
            <h3 className="fw-bold text-success mb-3">Tebrikler, Dersi Tamamladın!</h3>
            <p className="text-muted mb-4 fs-5">Context API mimarisini, Provider mantığını ve prop drilling sorununu başarıyla çözdün.</p>
            <button onClick={resetTest} className="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
              Testi Tekrar Çöz
            </button>
          </div>
        ) : (
          <div className="card-body bg-light p-4">
            <pre className="mb-4 fw-light bg-dark text-white p-3 rounded-3" style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', fontFamily: 'monospace' }}>
              {questions[currentStep - 1].question}
            </pre>
            
            <div className="list-group gap-2">
              {questions[currentStep - 1].options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={status === 'success'}
                  onClick={() => status === 'idle' && handleAnswer(idx)}
                  className={`list-group-item list-group-item-action p-3 rounded-3 border transition-all text-start
                    ${status === 'error' ? 'shake border-danger text-danger bg-danger bg-opacity-10' : 'border-secondary border-opacity-25'} 
                    ${status === 'success' && idx === questions[currentStep - 1].correct ? 'bg-success text-white border-success shadow' : ''}
                    ${status === 'idle' ? 'hover-bg-white' : ''}
                  `}
                  style={{ fontSize: '1rem', fontWeight: '500' }}
                >
                  <div className="d-flex align-items-center">
                    <span className="bg-secondary bg-opacity-25 text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style={{ minWidth: '30px', height: '30px', fontSize: '0.9rem' }}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    {opt}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 text-center" style={{ minHeight: '30px' }}>
              {status === 'success' && <span className="text-success fw-bold fs-5">✨ Harika, Doğru Bildin!</span>}
              {status === 'error' && <span className="text-danger fw-bold fs-5">❌ Yanlış Cevap, bir daha düşün.</span>}
            </div>
          </div>
        )}
      </div>

      {/* Animasyonlar İçin Stil Bloğu */}
      <style dangerouslySetInnerHTML={{ __html: `
        .shake { animation: shake 0.4s ease-in-out; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .transition-all { transition: all 0.2s ease-in-out; }
        .hover-bg-white:hover { background-color: white !important; transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      ` }} />
    </div>
  );
};

export default UseContextDers;