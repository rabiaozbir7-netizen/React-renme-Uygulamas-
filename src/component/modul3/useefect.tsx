import React, { useState } from 'react';

const UseEffectDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kod parçasının çalışma (tetiklenme) davranışı nasıldır?\n\nuseEffect(() => {\n  console.log('Veri çekiliyor...');\n  fetchData();\n}, []); // Boş diziye dikkat!",
      options: [
        "Bileşen içindeki herhangi bir state her değiştiğinde tekrar tekrar çalışır.",
        "Hiç çalışmaz çünkü bağımlılık dizisi boştur.",
        "Sadece bileşen ekrana ilk çizildiğinde (mount) 1 kere çalışır.",
        "Tarayıcı her yenilendiğinde sonsuz döngüye girer."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki 'return' fonksiyonunun (Cleanup) amacı nedir?\n\nuseEffect(() => {\n  const timer = setInterval(() => console.log('Tık'), 1000);\n  \n  return () => {\n    clearInterval(timer);\n  };\n}, []);",
      options: [
        "Timer'ı iki kat daha hızlı çalıştırmak.",
        "Bileşen ekrandan kaldırıldığında (unmount) arka planda çalışmaya devam eden interval'i durdurarak bellek sızıntısını (memory leak) önlemek.",
        "Ekrana 'Tık' yazısını bastırmak.",
        "Uygulamayı duraklatmak."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Aşağıdaki useEffect ne zaman çalışır?\n\nuseEffect(() => {\n  document.title = `Sayac: ${sayac}`;\n}, [sayac]);",
      options: [
        "Sadece bileşen ilk yüklendiğinde çalışır, sonra bir daha çalışmaz.",
        "Sadece 'sayac' değişkeni GÜNCELLENDİĞİNDE çalışır.",
        "Bileşen ilk yüklendiğinde VE 'sayac' değişkeni her değiştiğinde çalışır.",
        "Uygulamadaki herhangi bir değişken değiştiğinde çalışır."
      ],
      correct: 2
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
        <h2 className="text-primary fw-bold">⚡ useEffect ve Yan Etkiler (Side Effects)</h2>
        <p className="lead text-muted">
          React bileşenlerini dış dünyayla (API'ler, Timer'lar, DOM) senkronize etmenin en güçlü yolu.
        </p>
      </div>

      {/* 1. Bölüm: Nedir? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. useEffect Nedir ve Neden Kullanılır?</h4>
          <p>
            React bileşenlerinin ana görevi arayüzü (UI) çizmektir. Ancak bazen bileşen ekrana çizildikten <strong>sonra</strong> bazı işlemler yapmamız gerekir. Bu işlemlere <strong>Yan Etki (Side Effect)</strong> denir.
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-warning mb-3">
            <h6 className="fw-bold">Neler Yan Etkidir?</h6>
            <ul className="small mb-0">
              <li>🌐 Bir API'den veri çekmek (Fetch / Axios).</li>
              <li>⏱️ Zamanlayıcı kurmak (setTimeout, setInterval).</li>
              <li>🖱️ Tarayıcı olaylarını dinlemek (Window resize, scroll dinleyicileri).</li>
              <li>📄 Tarayıcı sekme başlığını (document.title) değiştirmek.</li>
            </ul>
          </div>
          <p className="small text-muted mb-0">
            <em>Kural: useEffect içindeki kodlar, React bileşeni ekrana çizildikten (render edildikten) hemen sonra çalışır.</em>
          </p>
        </div>
      </div>

      {/* 2. Bölüm: Bağımlılık Dizisi (Dependency Array) */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. En Önemli Kısım: Bağımlılık Dizisi [ ]</h4>
          <p>
            <code>useEffect</code>'in ne zaman ve kaç kere çalışacağını ikinci parametre olan <strong>bağımlılık dizisi (dependency array)</strong> belirler. Burası en çok hata yapılan yerdir, dikkatle inceleyelim!
          </p>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 bg-dark text-white rounded-3 h-100">
                <h6 className="fw-bold text-danger">Dizi Yoksa</h6>
                <code className="text-light">useEffect(() =&gt; &#123; ... &#125;)</code>
                <p className="small mt-2 mb-0 opacity-75">Bileşen <strong>HER</strong> render edildiğinde (herhangi bir state değiştiğinde) tekrar tekrar çalışır. (Genelde istenmez)</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-dark text-white rounded-3 h-100 border-primary border-start border-4">
                <h6 className="fw-bold text-success">Boş Dizi [ ]</h6>
                <code className="text-light">useEffect(() =&gt; &#123; ... &#125;, [])</code>
                <p className="small mt-2 mb-0 opacity-75">Bileşen ekrana <strong>SADECE İLK KEZ</strong> yüklendiğinde (mount) 1 kere çalışır. (API'den ilk veriyi çekerken çok kullanılır)</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-dark text-white rounded-3 h-100">
                <h6 className="fw-bold text-info">Dolu Dizi [state]</h6>
                <code className="text-light">useEffect(() =&gt; &#123; ... &#125;, [isim])</code>
                <p className="small mt-2 mb-0 opacity-75">Sadece dizi içindeki değişken (örn: <code>isim</code>) değiştiğinde tekrar çalışır.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bölüm: Cleanup Fonksiyonu */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Temizlik (Cleanup) Fonksiyonu</h4>
          <p>
            Eğer <code>useEffect</code> içinde sürekli çalışan bir işlem başlattıysanız (örneğin bir sayaç veya event listener), bileşen ekrandan kalktığında (unmount) bu işlemi durdurmanız gerekir. Yoksa <strong>Hafıza Sızıntısı (Memory Leak)</strong> oluşur.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useState, useEffect } from 'react';

const DijitalSaat = () => {
  const [zaman, setZaman] = useState(new Date());

  useEffect(() => {
    // 1. İşlemi Başlat (Her saniye zamanı güncelle)
    const intervalId = setInterval(() => {
      setZaman(new Date());
    }, 1000);

    // 2. TEMİZLİK (Cleanup) FONKSİYONU
    // Bileşen ekrandan silindiğinde interval'i durdur!
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Boş dizi: Sadece ilk açılışta başlat

  return <h2>Saat: {zaman.toLocaleTimeString()}</h2>;
};`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="clock">⏰</span> Modül Ödevi: Hafıza Sızıntısı (Memory Leak) Avı</h4>
        <p className="mb-3">
          Bir bileşeni ekrandan kaldırdığımızda arka plandaki işlemlerinin durduğunu (Cleanup) kendi gözlerimizle göreceğiz.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Sayac Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>Sayac.tsx</code> açın ve Timer kurun:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useState, useEffect } from 'react';

const Sayac: React.FC = () => {
  const [saniye, setSaniye] = useState(0);

  useEffect(() => {
    console.log("Sayac Başladı!");
    
    const intervalId = setInterval(() => {
      setSaniye((prev) => prev + 1);
      console.log("Arka planda çalışıyor...");
    }, 1000);

    // Temizlik (Cleanup) Fonksiyonu: Bileşen ekrandan silinince çalışır
    return () => {
      console.log("Sayac Durduruldu ve Temizlendi!");
      clearInterval(intervalId);
    };
  }, []);

  return <h3>Geçen Süre: {saniye} sn</h3>;
};

export default Sayac;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada (App.tsx) Göster/Gizle Butonu Yapın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> içinde bu bileşeni bir state ile yönetin. Konsolu (F12) açın, butona basıp bileşeni gizlediğinizde interval'in durduğuna emin olun!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React, { useState } from 'react';
import Sayac from './components/Sayac';

function App() {
  const [goster, setGoster] = useState(true);

  return (
    <div>
      <button onClick={() => setGoster(!goster)}>
        Sayacı {goster ? 'Gizle' : 'Göster'}
      </button>
      
      {/* goster 'true' ise Sayac ekrana çizilir, 'false' ise silinir (Unmount) */}
      {goster && <Sayac />}
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
            <p className="text-muted mb-4 fs-5">useEffect mantığını, bağımlılık dizilerini ve Cleanup kavramını harika kavradın.</p>
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

export default UseEffectDers;