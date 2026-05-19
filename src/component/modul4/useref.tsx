import React, { useState } from 'react';

const UseRefDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodda butona tıklandığında ekrandaki sayı ve konsoldaki değer nasıl değişir?\n\nconst [sayac, setSayac] = useState(0);\nconst refSayac = useRef(0);\n\nconst artir = () => {\n  refSayac.current += 1;\n  console.log('Konsol:', refSayac.current);\n};\n\nreturn <button onClick={artir}>Ekranda: {sayac}</button>;",
      options: [
        "Hem ekrandaki sayı hem de konsoldaki sayı aynı anda artar.",
        "Ekrandaki sayı değişmez (0 kalır), ancak konsolda sayı her tıklamada artar. (Çünkü useRef değiştiğinde bileşen YENİDEN ÇİZİLMEZ).",
        "Ekrandaki sayı artar, konsolda hiçbir şey yazmaz.",
        "Hata verir çünkü useRef sadece HTML elemanları ile kullanılabilir, sayılarla kullanılamaz."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Aşağıdaki kodun hatası nedir?\n\nconst inputRef = useRef(null);\n\nconst odaklan = () => {\n  // Hatalı Kullanım:\n  inputRef.value.focus();\n};",
      options: [
        "Hata yoktur, mükemmel çalışır.",
        "focus() metodu React'te kullanılamaz.",
        "useRef her zaman 'current' adında bir özellik barındıran nesne döner. Değere 'inputRef.current' üzerinden ulaşılmalıdır, 'inputRef.value' yanlıştır.",
        "useRef(null) yerine useRef('') yazılmalıdır."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "HTML elementlerine doğrudan erişmek (örneğin bir input'u seçmek) için oluşturduğumuz ref, JSX elemanına hangi özellikle bağlanır?",
      options: [
        "<input use={inputRef} />",
        "<input id={inputRef} />",
        "<input bind={inputRef} />",
        "<input ref={inputRef} />"
      ],
      correct: 3
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
        <h2 className="text-primary fw-bold">🎯 useRef ve DOM Referansları</h2>
        <p className="lead text-muted">
          Bileşenleri yeniden render (çizim) etmeden değer saklamanın ve HTML elemanlarına doğrudan müdahale etmenin en iyi yolu.
        </p>
      </div>

      {/* 1. Bölüm: useState vs useRef */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden useRef Kullanmalıyız? (useState ile Farkı)</h4>
          <p>
            <code>useState</code> kullandığınızda, değer her değiştiğinde React tüm bileşeni baştan aşağı yeniden çalıştırır (re-render). Ancak <code>useRef</code> ile sakladığınız bir değer değiştiğinde <strong>bileşen yeniden çizilmez</strong>.
          </p>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-info">
                <h6 className="fw-bold text-info">useState (Gürültülü)</h6>
                <p className="small mb-0">
                  Değer değiştiğinde React'e bağırır: "Ben değiştim, ekranı yeniden çiz!" (Kullanıcının göreceği veriler için kullanılır).
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-warning">
                <h6 className="fw-bold text-warning">useRef (Sessiz)</h6>
                <p className="small mb-0">
                  Değeri arka planda sessizce değiştirir. Ekran yeniden çizilmez. (Zamanlayıcı ID'leri veya arka plan hesaplamaları için kullanılır).
                </p>
              </div>
            </div>
          </div>
          <div className="alert alert-secondary border-0 mb-0">
            <strong>Kritik Kural:</strong> <code>useRef</code> her zaman <code>{`{ current: başlangıçDeğeri }`}</code> şeklinde bir nesne (object) döndürür. Değere ulaşmak için her zaman <strong><code>ref.current</code></strong> yazmalıyız.
          </div>
        </div>
      </div>

      {/* 2. Bölüm: DOM Elemanlarına Erişim */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. HTML Elemanlarına Doğrudan Erişim (Focus)</h4>
          <p>
            Geleneksel JavaScript'te bir input'a odaklanmak için <code>document.getElementById('id').focus()</code> yazardık. React'te DOM'a doğrudan müdahale etmek iyi bir pratik değildir; bunun yerine <code>useRef</code> kullanırız.
          </p>
          
          <pre className="bg-dark text-white p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useRef } from 'react';

const OdaklanmaOrnegi = () => {
  // 1. Ref oluşturuyoruz (başlangıç değeri null)
  // TypeScript kullanıyorsak element tipini belirtmeliyiz: <HTMLInputElement>
  const inputReferansi = useRef<HTMLInputElement>(null);

  const butonaTiklandi = () => {
    // 3. inputReferansi.current artık input HTML etiketini temsil ediyor!
    if (inputReferansi.current) {
      inputReferansi.current.focus(); // Input'u seçili hale getir
      inputReferansi.current.style.backgroundColor = "yellow"; // Rengini değiştir
    }
  };

  return (
    <div>
      {/* 2. ref prop'u ile oluşturduğumuz referansı input'a bağlıyoruz */}
      <input ref={inputReferansi} type="text" placeholder="Buraya yazın..." />
      <button onClick={butonaTiklandi}>İmleci Input'a Odakla</button>
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Renderlar Arası Değer Saklama (Timer) */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Render'dan Etkilenmeyen Değişkenler Saklamak</h4>
          <p>
            Diyelim ki bir kronometre yapıyorsunuz. <code>setInterval</code> başlattığınızda size bir ID verir. Bu ID'yi daha sonra durdurmak (clearInterval) için saklamanız gerekir. Bunu <code>useState</code> ile saklarsanız, her saniye gereksiz yere ekran güncellenir. <code>useRef</code> tam bu iş içindir!
          </p>
          
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useState, useRef } from 'react';

const Kronometre = () => {
  const [saniye, setSaniye] = useState(0);
  // Timer ID'sini saklamak için useRef kullanıyoruz (Ekranı yeniden ÇİZDİRMEZ!)
  const timerRef = useRef<number | null>(null);

  const baslat = () => {
    if (timerRef.current !== null) return; // Zaten çalışıyorsa dur
    timerRef.current = setInterval(() => setSaniye((s) => s + 1), 1000);
  };

  const durdur = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null; // Sıfırla
  };

  return (
    <div>
      <p>Geçen Süre: {saniye} saniye</p>
      <button onClick={baslat}>Başlat</button>
      <button onClick={durdur}>Durdur</button>
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="camera">📸</span> Modül Ödevi: Otomatik Seçilen Input</h4>
        <p className="mb-3">
          Kullanıcı sayfaya girdiği anda fareyle tıklamasına gerek kalmadan otomatik olarak imleci arama kutusuna odaklayan (focus) bir bileşen tasarlayacağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Arama Kutusu Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>AramaKutusu.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useRef, useEffect } from 'react';

const AramaKutusu: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Bileşen ekrana çizildiği (mount) an çalışır
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // İmleci otomatik buraya taşı
    }
  }, []);

  const degeriOku = () => {
    // useState kullanmadan input'un içindeki değeri okuyabiliriz!
    alert("Aranan Kelime: " + inputRef.current?.value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Ürün Ara</h3>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Aramak istediğiniz ürünü yazın..." 
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={degeriOku} className="btn btn-primary btn-sm">Ara</button>
    </div>
  );
};

export default AramaKutusu;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin. Sayfayı yenilediğinizde imlecin direkt input'ta yanıp söndüğünü göreceksiniz!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import AramaKutusu from './components/AramaKutusu';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Mağaza Paneli</h1>
      <AramaKutusu />
    </div>
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
            <p className="text-muted mb-4 fs-5">useRef'in yeniden render tetiklemeyen doğasını ve DOM'a nasıl müdahale edildiğini başarıyla kavradın.</p>
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

export default UseRefDers;