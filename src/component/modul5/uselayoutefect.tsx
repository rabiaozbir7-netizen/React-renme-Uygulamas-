import React, { useState } from 'react';

const UseLayoutEffectDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kod çalıştığında kullanıcı ekranda görsel olarak ne tecrübe eder?\n\nconst [deger, setDeger] = useState(0);\n\nuseEffect(() => {\n  setDeger(100);\n}, []);\n\nreturn <div>{deger}</div>;",
      options: [
        "Kullanıcı anında sadece '100' değerini görür.",
        "Kullanıcı önce saliselik bir an için '0' görür, ardından aniden '100'e dönüşür (Titreme/Flicker oluşur).",
        "Sayfa hata verir ve beyaz ekrana düşer.",
        "Değer sonsuza kadar '0' kalır."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Bir önceki sorudaki titremeyi (flicker) engellemek ve kullanıcının SADECE '100' değerini görmesini sağlamak için kodu nasıl değiştirmeliyiz?",
      options: [
        "useEffect yerine useLayoutEffect kullanmalıyız.",
        "useState(100) olarak başlatıp useEffect'i tamamen silmeliyiz.",
        "İkisi de doğru bir yaklaşımdır (Ancak API'den gelen gecikmeli veriler hariç).",
        "useEffect içine setTimeout eklemeliyiz."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Aşağıdaki kodun kullanımında yatan BÜYÜK TEHLİKE nedir?\n\nuseLayoutEffect(() => {\n  let i = 0;\n  while(i < 9999999999) i++; // Çok ağır bir matematiksel işlem\n  setHazir(true);\n}, []);",
      options: [
        "Hiçbir tehlikesi yoktur, arka planda asenkron olarak sessizce çalışır.",
        "useLayoutEffect senkron (bloklayıcı) olduğu için, bu milyarlık döngü bitene kadar tarayıcı ekranı ÇİZEMEZ ve kullanıcı sitenin donduğunu zanneder.",
        "Döngü çok hızlı biter, sadece konsola hata yazar.",
        "Sadece mobil cihazlarda çalışmasını engeller."
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
        <h2 className="text-primary fw-bold">🎨 useLayoutEffect ve Görsel Optimizasyon</h2>
        <p className="lead text-muted">
          DOM elemanlarını ölçmek ve ekrandaki can sıkıcı görsel titremeleri (flickering) kullanıcı görmeden önce engellemek.
        </p>
      </div>

      {/* 1. Bölüm: useEffect vs useLayoutEffect */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. useEffect ve useLayoutEffect Arasındaki Kritik Fark</h4>
          <p>
            Her iki kanca da birebir aynı şekilde yazılır (aynı parametreleri alırlar). Aralarındaki tek ve en önemli fark <strong>çalışma zamanlamasıdır</strong>.
          </p>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-info">
                <h6 className="fw-bold text-info">useEffect (Asenkron - Gecikmeli)</h6>
                <ol className="small mb-0 ps-3">
                  <li>React, state'i günceller.</li>
                  <li>Tarayıcı DOM'u günceller ve <strong>ekranı boyar (paint)</strong>.</li>
                  <li><code>useEffect</code> çalışır.</li>
                </ol>
                <p className="small mt-2 mb-0 opacity-75"><em>Sonuç: Kullanıcı önce eski veya stil almamış hali görür, sonra aniden düzelir (Titreme/Flicker oluşur).</em></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-warning">
                <h6 className="fw-bold text-warning">useLayoutEffect (Senkron - Bloklayıcı)</h6>
                <ol className="small mb-0 ps-3">
                  <li>React, state'i günceller.</li>
                  <li>Tarayıcı DOM'u günceller.</li>
                  <li><strong>Ekran boyanmadan ÖNCE</strong> <code>useLayoutEffect</code> çalışır ve bitmesi beklenir.</li>
                  <li>Tarayıcı ekranı boyar.</li>
                </ol>
                <p className="small mt-2 mb-0 opacity-75"><em>Sonuç: Kullanıcı sadece en son ve mükemmel hali görür. Titreme olmaz.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Ne Zaman Kullanmalıyız? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Gerçek Hayatta Ne Zaman Kullanılır?</h4>
          <p>
            React resmi dokümanları, varsayılan olarak her zaman <code>useEffect</code> kullanmamızı önerir. <code>useLayoutEffect</code> sadece şu özel durumlarda kullanılmalıdır:
          </p>
          
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item bg-transparent border-0 px-0">📏 <strong>DOM Ölçümü Yaparken:</strong> Bir elementin <code>offsetWidth</code>, <code>offsetHeight</code> veya scroll pozisyonunu ölçüp buna göre bir işlem yapacaksanız.</li>
            <li className="list-group-item bg-transparent border-0 px-0">🛠️ <strong>Tooltip/Popover Pozisyonlaması:</strong> Bir menü açıldığında ekrandan taşıp taşmadığını ölçüp, taşıyorsa yönünü (aşağıdan yukarıya) değiştirmek için.</li>
          </ul>

          <div className="alert alert-danger border-0 mb-0 py-2">
            <strong>⚠️ Uyarı:</strong> <code>useLayoutEffect</code> senkron çalışır. Yani içindeki işlem bitene kadar tarayıcı ekranı çizemez. Eğer içine çok ağır bir matematiksel işlem koyarsanız, kullanıcı sitenizin donduğunu zanneder!
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="ruler">📐</span> Modül Ödevi: Kendini Ölçen Kutu</h4>
        <p className="mb-3">
          Tarayıcı ekranı boyamadan hemen önce DOM elemanının boyutunu <code>useLayoutEffect</code> ve <code>useRef</code> ile nasıl ölçtüğümüzü görelim.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Ölçüm Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>AkilliKutu.tsx</code> açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useState, useRef, useLayoutEffect } from 'react';

const AkilliKutu: React.FC = () => {
  const [genislik, setGenislik] = useState(0);
  const kutuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // DOM güncellendi, ama ekran BOYANMADAN hemen önce burası çalışır
    if (kutuRef.current) {
      // DOM'daki gerçek pixel genişliğini alıyoruz
      const olculenGenislik = kutuRef.current.getBoundingClientRect().width;
      setGenislik(Math.round(olculenGenislik));
    }
  }, []); // Sadece ilk yüklemede ölç

  return (
    <div>
      <div 
        ref={kutuRef} 
        style={{ display: "inline-block", padding: "30px", background: "#ff6b6b", color: "white", borderRadius: "8px" }}
      >
        İçeriği değiştikçe esneyen kutu
      </div>
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Kutunun hesaplanan genişliği: {genislik}px
      </p>
    </div>
  );
};

export default AkilliKutu;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import AkilliKutu from './components/AkilliKutu';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Layout Effect Testi</h1>
      <AkilliKutu />
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
            <p className="text-muted mb-4 fs-5">useLayoutEffect'in senkron yapısını, DOM boyanma anını ve tehlikelerini çok iyi kavradın.</p>
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

export default UseLayoutEffectDers;