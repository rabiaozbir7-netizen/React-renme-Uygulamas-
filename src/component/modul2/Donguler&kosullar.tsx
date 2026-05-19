import React, { useState } from 'react';

const DongulerKosullarDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "DİKKAT (React Tuzağı): Aşağıdaki kodun ekrandaki çıktısı ne olur?\n\nconst bildirimSayisi = 0;\nreturn <div>{bildirimSayisi && <p>Yeni Bildiriminiz Var!</p>}</div>;",
      options: [
        "Ekranda boş bir div görünür.",
        "Ekranda 'Yeni Bildiriminiz Var!' yazar.",
        "Ekranda '0' rakamı görünür. (Çünkü JavaScript'te 0 falsy bir değerdir ve && operatörü ilk falsy değeri yakalayıp ekrana basar).",
        "Derleme hatası verir."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki liste render etme (map) işleminde konsolda bir 'Warning' (Uyarı) çıkar. Bu uyarının sebebi nedir?\n\nconst kisiler = ['Ali', 'Ayşe', 'Veli'];\nreturn (\n  <ul>\n    {kisiler.map(kisi => <li>{kisi}</li>)}\n  </ul>\n);",
      options: [
        "Diziler ekrana doğrudan basılamaz.",
        "map() içindeki <li> etiketine benzersiz bir 'key' özelliği (prop) verilmemiştir.",
        "map() fonksiyonu return etmeden kullanılmıştır.",
        "String ifadeler <li> içinde kullanılamaz."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Aşağıdaki Ternary (? :) operatörü kullanımının sonucu nedir?\n\nconst isAdmin = false;\nreturn <div>{isAdmin ? <YonetimPaneli /> : <KullaniciGirisi />}</div>;",
      options: [
        "İki bileşen de aynı anda ekrana çizilir.",
        "Sadece YonetimPaneli bileşeni ekrana çizilir.",
        "Uygulama hata fırlatır.",
        "isAdmin değeri 'false' olduğu için sadece KullaniciGirisi bileşeni ekrana çizilir."
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
        <h2 className="text-primary fw-bold">🔄 Döngüler ve Koşullu Render</h2>
        <p className="lead text-muted">
          React'te dizileri (Array) ekrana listelemek ve duruma göre (if-else) farklı arayüzler göstermek.
        </p>
      </div>

      {/* 1. Bölüm: Koşullu Render */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Koşullu Render (Conditional Rendering)</h4>
          <p>
            React'te (JSX içinde) standart <code>if-else</code> bloklarını doğrudan kullanamayız. Bunun yerine JavaScript'in kısa if-else yazımları olan <strong>Ternary Operatörü (? :)</strong> ve <strong>Mantıksal VE (&&)</strong> operatörünü kullanırız.
          </p>
          
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-success">
                <h6 className="fw-bold text-success">Ternary Operatörü (? :)</h6>
                <p className="small mb-2">Eğer bir koşul doğruysa A'yı, yanlışsa B'yi gösterir.</p>
                <code className="d-block bg-dark text-light p-2 rounded">
                  {`{isLoggedIn ? <Profil /> : <GirisYap />}`}
                </code>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-info">
                <h6 className="fw-bold text-info">Mantıksal VE (&&) Operatörü</h6>
                <p className="small mb-2">Eğer koşul doğruysa göster, yanlışsa <strong>hiçbir şey yapma</strong>.</p>
                <code className="d-block bg-dark text-light p-2 rounded">
                  {`{mesajVarMi && <YeniMesajIkonu />}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Döngüler (Lists) */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Döngüler ve Listeleme (map metodu)</h4>
          <p>
            Geleneksel JavaScript'teki <code>for</code> döngüsü yerine React'te dizileri ekrana yazdırmak için her zaman <strong><code>Array.map()</code></strong> metodunu kullanırız.
          </p>
          
          <h6 className="fw-bold text-primary mt-3">Örnek: Kullanıcı Listesi Basmak</h6>
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';

const KullaniciListesi = () => {
  const kullanicilar = [
    { id: 1, isim: "Ahmet" },
    { id: 2, isim: "Ayşe" },
    { id: 3, isim: "Mehmet" }
  ];

  return (
    <ul>
      {kullanicilar.map((kisi) => (
        // KRİTİK KURAL: map içinde her elemanın benzersiz bir 'key' prop'u olmalıdır!
        <li key={kisi.id}>
          {kisi.isim}
        </li>
      ))}
    </ul>
  );
};

export default KullaniciListesi;`}
          </pre>
          <div className="alert alert-danger py-2 mt-3 mb-0 border-0">
            <strong>⚠️ Önemli:</strong> <code>key</code> prop'u verilmezse React konsolda hata fırlatır. React, performans optimizasyonu ve hangi elemanın silinip/değiştiğini anlamak için bu benzersiz kimliğe ihtiyaç duyar.
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="laptop">💻</span> Modül Ödevi: Ürün Vitrini</h4>
        <p className="mb-3">
          Bir dizi (array) içindeki ürünleri ekrana basacağız. Stok durumuna göre listelemenin nasıl değiştiğini izleyeceğiz.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Ürün Listesi Bileşenini Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>UrunListesi.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';

const UrunListesi: React.FC = () => {
  // Örnek Ürün Dizisi
  const urunler = [
    { id: 1, ad: "Laptop", fiyat: 15000, stoktaVarMi: true },
    { id: 2, ad: "Mekanik Klavye", fiyat: 1200, stoktaVarMi: false },
    { id: 3, ad: "Oyuncu Mouse", fiyat: 800, stoktaVarMi: true }
  ];

  return (
    <div>
      <h3>Mağaza Vitrini</h3>
      <div style={{ display: 'flex', gap: '15px' }}>
        {urunler.map((urun) => (
          <div key={urun.id} style={{ border: '1px solid gray', padding: '15px', borderRadius: '8px' }}>
            <h4>{urun.ad}</h4>
            <p>Fiyat: {urun.fiyat} TL</p>
            
            {/* Koşullu Render Bölümü */}
            {urun.stoktaVarMi ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Stokta Var</span>
            ) : (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Tükendi</span>
            )}
            
            {/* Mantıksal VE Kullanımı */}
            {!urun.stoktaVarMi && <button disabled style={{ display: 'block', marginTop: '10px' }}>Alınamaz</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrunListesi;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import UrunListesi from './components/UrunListesi';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Döngü Testi</h1>
      <UrunListesi />
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
            <p className="text-muted mb-4 fs-5">React'te dizi manipülasyonlarını (map), anahtar (key) kurallarını ve koşullu render operatörlerini başarıyla kavradın.</p>
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

export default DongulerKosullarDers;