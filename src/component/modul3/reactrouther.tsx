import React, { useState } from 'react';

const ReactRouterDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodda geleneksel HTML <a> etiketi kullanılmıştır. React projelerinde bunun yerine <Link> kullanılmasının temel sebebi nedir?\n\n{/* Hatalı Kullanım: */}\n<a href='/hakkimizda'>Hakkımızda</a>\n\n{/* Doğru Kullanım: */}\n<Link to='/hakkimizda'>Hakkımızda</Link>",
      options: [
        "<a> etiketi sayfayı tamamen yeniler (reload) ve tüm React state'lerini sıfırlar. <Link> ise sayfa yenilenmeden geçiş yapar.",
        "<a> etiketi React JSX sözdiziminde derleme hatası verir.",
        "<Link> etiketi tarayıcıda daha güzel ve otomatik stillendirilmiş görünür.",
        "İkisi de tamamen aynı işi yapar, sadece isimleri farklıdır."
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Aşağıdaki kod bloğunda butona tıklandığında tam olarak ne gerçekleşir?\n\nconst nav = useNavigate();\n\nconst git = () => {\n  nav('/profil', { state: { id: 5 } });\n};\n\n<button onClick={git}>Profile Git</button>",
      options: [
        "Sadece URL '/profil' olarak değişir ama sayfa değişmez.",
        "Sayfa yeni bir sekmede (tab) '/profil' olarak açılır.",
        "Kullanıcı '/profil' sayfasına yönlendirilir ve arka planda (URL'de görünmeden) { id: 5 } verisi de o sayfaya taşınır.",
        "Hata fırlatır, çünkü useNavigate ikinci bir parametre (nesne) alamaz."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Aşağıdaki Route tanımında yer alan '*' (yıldız) karakterinin ve bu rotanın en alta yazılmasının amacı nedir?\n\n<Routes>\n  <Route path='/' element={<AnaSayfa />} />\n  <Route path='/iletisim' element={<Iletisim />} />\n  {/* En Alt Rota: */}\n  <Route path='*' element={<HataSayfasi />} />\n</Routes>",
      options: [
        "Tüm sayfaların güvenliğini sağlamak ve şifrelemek içindir.",
        "Yukarıdaki hiçbir adresle (path) eşleşmeyen, hatalı veya var olmayan bir URL girildiğinde 404 (Hata) sayfasını göstermek içindir.",
        "Sitenin her sayfasında bu hata bileşeninin görünmesini sağlamak içindir.",
        "Bütün GET ve POST API isteklerini yakalamak içindir."
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
        <h2 className="text-primary fw-bold">🛣️ React Router DOM</h2>
        <p className="lead text-muted">
          Sayfa yenilenmeden (Single Page Application) hızlı, akıcı ve dinamik sayfa geçişleri yapmanın standart yolu.
        </p>
      </div>

      {/* 1. Bölüm: Nedir ve Kurulum */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. SPA Mantığı ve Kurulum</h4>
          <p>
            Geleneksel web sitelerinde bir linke tıkladığınızda tarayıcı beyaz ekrana düşer ve yeni sayfayı sunucudan indirir. React ile yapılan <strong>SPA (Single Page Application)</strong> projelerinde ise sayfa asla yenilenmez; sadece ekrandaki bileşenler (Component) değişir. Bu değişimi yöneten kütüphane <strong>React Router DOM</strong>'dur.
          </p>
          
          <div className="bg-light p-3 rounded-3 border-start border-4 border-info">
            <h6 className="fw-bold text-info">Kurulum</h6>
            <p className="small mb-2">Projeye dahil etmek için terminale şu komutu yazmalısınız:</p>
            <code className="d-block bg-dark text-white p-2 rounded">npm install react-router-dom</code>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel Kurulum */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Ana Kurulum ve Rotalar (Routes)</h4>
          <p>
            Uygulamanızın yönlendirme yapabilmesi için en dıştaki bileşeninizin (genelde <code>App.tsx</code> veya <code>main.tsx</code>) <strong><code>&lt;BrowserRouter&gt;</code></strong> ile sarmalanması gerekir. Ardından <strong><code>&lt;Routes&gt;</code></strong> ve <strong><code>&lt;Route&gt;</code></strong> ile sayfaları tanımlarız.
          </p>
          
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnaSayfa from './AnaSayfa';
import Hakkimizda from './Hakkimizda';
import NotFound from './NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        {/* Yanlış adres girilirse 404 sayfasına düşmesi için '*' kullanılır */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Link ve Programatik Yönlendirme */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Sayfa Geçişleri (Link ve useNavigate)</h4>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-success">
                <h6 className="fw-bold">Menüler İçin: &lt;Link&gt;</h6>
                <p className="small mb-2">Sayfa yenilenmesini engellemek için klasik <code>&lt;a href="..."&gt;</code> yerine <strong><code>&lt;Link to="..."&gt;</code></strong> kullanırız.</p>
                <code className="d-block bg-dark text-white p-2 rounded">
                  {`import { Link } from 'react-router-dom';\n\n<Link to="/hakkimizda">Hakkımızda</Link>`}
                </code>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold">Butonlar İçin: useNavigate()</h6>
                <p className="small mb-2">Kullanıcı giriş yaptıktan sonra veya bir fonksiyonun içinde sayfayı JavaScript ile değiştirmek için kullanılır.</p>
                <code className="d-block bg-dark text-white p-2 rounded">
                  {`const navigate = useNavigate();\n\n<button onClick={() => navigate('/profil')}>\n  Giriş Yap\n</button>`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="compass">🧭</span> Modül Ödevi: Kendi Navigasyonunu Kur</h4>
        <p className="mb-3">
          Sıfırdan bir üst menü (Navbar) yapıp, App.tsx içinde rotalarla birlikte ekranda göstereceğiz.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Navbar Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>Navbar.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const cikisYap = () => {
    // Burada token silme vs. işlemleri yapılabilir
    alert("Çıkış yapıldı!");
    navigate("/"); // Ana sayfaya fırlat
  };

  return (
    <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/hakkimizda">Hakkımızda</Link>
      <button onClick={cikisYap} className="btn btn-sm btn-danger">Çıkış Yap</button>
    </nav>
  );
};

export default Navbar;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: App.tsx'te Rotaları Kurun</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açıp Router yapısını sarmalayın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar her sayfada görünsün diye Routes'un DIŞINA ama Router'ın İÇİNE yazılır */}
      <Navbar />
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h2>Burası Ana Sayfa</h2>} />
          <Route path="/hakkimizda" element={<h2>Hakkımızda Sayfası</h2>} />
          <Route path="*" element={<h2>404 - Sayfa Bulunamadı!</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
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
            <p className="text-muted mb-4 fs-5">React Router DOM rotalarını ve yönlendirmeleri harika kavradın.</p>
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

export default ReactRouterDers;