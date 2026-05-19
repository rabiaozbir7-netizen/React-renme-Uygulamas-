import React, { useState } from 'react';

const JsxBilesenDers: React.FC = () => {
  // Test için gerekli State'ler
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Mini Test Soruları
  const questions = [
    {
      id: 1,
      question: "JSX kurallarına göre, bir bileşen geriye dönerken (return) en fazla kaç tane 'kök' (root) etiket döndürebilir?",
      options: [
        "İstediğimiz kadar etiket döndürebiliriz.",
        "Sadece 1 tane (Gerekirse React Fragment <></> ile sarmalanmalı).",
        "En fazla 2 tane döndürebilir.",
        "Sıfır etiket döndürür."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "HTML'deki 'class' özelliği JSX içinde nasıl yazılmalıdır?",
      options: ["class", "className", "cssClass", "styleClass"],
      correct: 1
    },
    {
      id: 3,
      question: "Oluşturduğumuz bir bileşeni başka bir dosyada kullanabilmek (import edebilmek) için dosyanın sonunda ne yazmalıyız?",
      options: ["send default BilesenAdi;", "return BilesenAdi;", "export default BilesenAdi;", "import BilesenAdi;"],
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
      }, 800); 
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
        <h2 className="text-primary fw-bold">🧩 JSX & Bileşen (Component) Yapısı</h2>
        <p className="lead text-muted">
          React'in temel yapı taşlarını öğrenin: HTML ile JavaScript'in mükemmel uyumu JSX ve tekrar kullanılabilir bileşenler!
        </p>
      </div>

      {/* 1. Bölüm: JSX Nedir? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. JSX (JavaScript XML) Nedir?</h4>
          <p>
            JSX, JavaScript kodlarının içine doğrudan HTML benzeri etiketler yazmamızı sağlayan özel bir sözdizimidir (syntax). 
            Aslında tarayıcılar JSX'i doğrudan okuyamaz; arka planda Vite (veya Babel) bu kodları normal JavaScript'e derler.
          </p>
          
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold">JSX'in Altın Kuralları</h6>
                <ul className="small mb-0 ps-3 text-dark">
                  <li><strong>Tek Bir Kök (Root) Eleman:</strong> Bir JSX bloğu (return içi) her zaman TEK BİR kapsayıcı eleman döndürmelidir (örn: bir <code>&lt;div&gt;</code> veya <code>&lt;&gt; ... &lt;/&gt;</code>).</li>
                  <li><strong>camelCase İsimlendirme:</strong> HTML'deki nitelikler bitişik yazılmaz. Örneğin <code>class</code> yerine <strong><code>className</code></strong>, <code>onclick</code> yerine <strong><code>onClick</code></strong> kullanılır.</li>
                  <li><strong>Etiketleri Kapatma:</strong> HTML'de kapanmayan etiketler (img, br, input) JSX'te mutlaka kapatılmalıdır: <code>&lt;img src="..." /&gt;</code>.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-dark rounded-3 h-100 border-start border-4 border-warning text-white">
                <h6 className="fw-bold text-warning">Dinamik Veri Yazdırma {'{ }'}</h6>
                <p className="small mb-2">JSX içine anlık olarak bir JavaScript değişkeni veya işlemi yazmak isterseniz <strong>süslü parantez</strong> kullanırsınız:</p>
                <code className="d-block bg-secondary bg-opacity-25 text-light p-2 rounded">
                  const isim = "Ahmet";<br/>
                  return &lt;h1&gt;Merhaba, {'{isim}'}!&lt;/h1&gt;;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Bileşen Yapısı */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Bileşen (Component) Mantığı</h4>
          <p>
            Bileşenler, kullanıcı arayüzünü (UI) birbirinden bağımsız ve tekrar kullanılabilir küçük parçalara bölmemizi sağlar. 
            React'te bileşen isimleri <strong>her zaman Büyük Harfle (PascalCase)</strong> başlamalıdır.
          </p>
          
          <h6 className="fw-bold text-primary mt-3">Örnek Bir Fonksiyonel Bileşen (Functional Component)</h6>
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';

// 1. Bileşenimizi tanımlıyoruz (Büyük harfle başlar!)
const KullaniciKarti = () => {
  const yas = 25;
  const meslek = "Yazılım Geliştirici";

  // 2. JSX döndürüyoruz (Tek bir ana div veya fragment <></> içinde olmalı)
  return (
    <div className="kullanici-karti">
      <h2>İsim: React Uzmanı</h2>
      <p>Yaş: {yas}</p>
      <p>Meslek: {meslek.toUpperCase()}</p>
    </div>
  );
};

// 3. Bileşeni başka dosyalarda kullanabilmek için dışa aktarıyoruz
export default KullaniciKarti;`}
          </pre>
          <p className="mt-3 small text-muted">
            <em>Not: Bu bileşeni başka bir dosyada kullanmak için <code>import KullaniciKarti from './KullaniciKarti';</code> yazıp, JSX içinde <code>&lt;KullaniciKarti /&gt;</code> olarak çağırırız.</em>
          </p>
        </div>
      </div>

      {/* Ödev Bölümü */}
      <div className="alert alert-success rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="palette">🎨</span> Modül Ödevi: Kendi Bileşenini Tasarla</h4>
        <p className="mb-0">
          <strong>Görev:</strong> <code>ProfilKarti.tsx</code> adında yeni bir bileşen oluşturun. 
          İçerisinde bir başlık (h1), bir paragraf (p) ve bir buton (button) olsun. 
          Butona inline bir CSS (örn: <code>style={`{{ backgroundColor: 'blue', color: 'white' }}`}</code>) verin. 
          Bu bileşeni App.tsx (veya ana sayfa) içinde en az 2 defa alt alta kullanarak "Tekrar Kullanılabilirlik (Reusability)" gücünü test edin!
        </p>
      </div>

      {/* DİNAMİK BİLGİ TESTİ BÖLÜMÜ */}
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
        <div className="bg-dark p-4 text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0 fw-bold">🎯 Mini Bilgi Testi</h4>
          {!isFinished && <span className="badge bg-secondary fs-6">Soru {currentStep} / {questions.length}</span>}
        </div>
        
        {isFinished ? (
          <div className="card-body text-center py-5 bg-light">
            <div className="display-4 mb-3">✅</div>
            <h3 className="fw-bold text-success mb-3">Tebrikler, Dersi Tamamladın!</h3>
            <p className="text-muted mb-4 fs-5">JSX ve Bileşen mantığını harika kavradın.</p>
            <button onClick={resetTest} className="btn btn-outline-primary px-4 py-2 rounded-pill shadow-sm">
              Testi Tekrar Çöz
            </button>
          </div>
        ) : (
          <div className="card-body bg-light p-4">
            <h5 className="mb-4 fw-light" style={{ lineHeight: '1.5' }}>
              {questions[currentStep - 1].question}
            </h5>
            
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
                  style={{ fontSize: '1.05rem', fontWeight: '500' }}
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
              {status === 'success' && <span className="text-success fw-bold fs-5">✨ Doğru Cevap!</span>}
              {status === 'error' && <span className="text-danger fw-bold fs-5">❌ Yanlış Cevap, tekrar dene.</span>}
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

export default JsxBilesenDers;