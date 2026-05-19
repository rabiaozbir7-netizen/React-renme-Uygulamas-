import React, { useState } from 'react';

const UseStateDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodun çıktısı (konsol yazısı) ne olur?\n\nconst durum = useState('Merhaba');\nconsole.log(durum[0]);",
      options: [
        "undefined",
        "Durumu güncelleyecek olan set fonksiyonunu yazdırır.",
        "'Merhaba' yazdırır (Çünkü useState iki elemanlı bir dizi döner ve 0. indekste mevcut değer vardır).",
        "Hata fırlatır, çünkü array destructuring (köşeli parantez) kullanılmamıştır."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "DİKKAT: React'in en çok yapılan hatası! Aşağıdaki butona BİR KERE tıklandığında ekrandaki sayı kaç olur?\n\nconst [sayi, setSayi] = useState(0);\n\nconst ciftArtir = () => {\n  setSayi(sayi + 1);\n  setSayi(sayi + 1);\n};\n\n<button onClick={ciftArtir}>Sayı: {sayi}</button>",
      options: [
        "2 olur. (Çünkü fonksiyon içinde iki kere 1 artırıldı).",
        "1 olur. (Çünkü React state güncellemelerini toplu yapar ve ikisi de eski 'sayi' olan 0 değerini referans alır).",
        "Hata fırlatır, aynı fonksiyon içinde iki kere setSayi çağrılamaz.",
        "0 olarak kalır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Bir önceki sorudaki hatayı çözmek ve sayıyı GERÇEKTEN 2 artırmak için 'setSayi' fonksiyonunu nasıl yazmalıyız?",
      options: [
        "setSayi(sayi + 2); şeklinde tek satırda yazarak veya fonksiyonel güncelleme olan setSayi(onceki => onceki + 1); kullanarak.",
        "Artırma işleminden önce setTimeout() kullanarak.",
        "let sayi = 0; kullanarak değişken tipini değiştirerek.",
        "useState yerine useRef kullanarak."
      ],
      correct: 0
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
        <h2 className="text-primary fw-bold">💾 useState ve Durum (State) Yönetimi</h2>
        <p className="lead text-muted">
          Değiştiğinde arayüzü (UI) otomatik olarak güncelleyen, React'in en temel ve en güçlü kancası (Hook).
        </p>
      </div>

      {/* 1. Bölüm: Neden useState? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden Normal Değişken Yerine useState?</h4>
          <p>
            Normal JavaScript'te bir değişkeni (<code>let sayac = 0;</code>) artırdığınızda değişkenin değeri arka planda artar, <strong>ancak ekrandaki yazı değişmez</strong>. Çünkü React, normal değişkenlerin değiştiğini takip etmez.
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-primary">
            <h6 className="fw-bold text-primary">State'in Büyüsü (Re-render)</h6>
            <p className="small mb-0 text-dark">
              <code>useState</code> ile oluşturduğunuz bir değişkeni güncellediğinizde, React o bileşeni baştan aşağı <strong>yeniden çizer (re-render)</strong>. Böylece yeni değer anında ekrana yansır.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel Kullanım */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Nasıl Kullanılır (Sözdizimi)</h4>
          <p>
            <code>useState</code> her zaman geriye <strong>iki elemanlı bir dizi</strong> döndürür. Bu yüzden JavaScript'in dizi parçalama (array destructuring) özelliğini kullanırız.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useState } from 'react';

const SayacBileseni = () => {
  // 1. Eleman: Mevcut değer (sayac)
  // 2. Eleman: Değeri güncelleyecek fonksiyon (setSayac)
  // Parantez içi: Başlangıç değeri (0)
  const [sayac, setSayac] = useState(0);

  return (
    <div>
      <h2>Mevcut Sayı: {sayac}</h2>
      {/* setSayac'ı çağırarak değeri güncelliyoruz */}
      <button onClick={() => setSayac(sayac + 1)}>
        Artır
      </button>
    </div>
  );
};

export default SayacBileseni;`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Önceki Duruma Göre Güncelleme */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Güvenli Güncelleme (Previous State)</h4>
          <p>
            Eğer bir state'i <strong>kendi eski değerine bakarak</strong> güncelliyorsanız (örneğin sayacı artırmak), doğrudan <code>setSayac(sayac + 1)</code> yazmak, hızlı tıklamalarda veya asenkron işlemlerde hatalara yol açabilir. Bunun yerine her zaman <strong>fonksiyonel güncellemeyi</strong> tercih etmelisiniz.
          </p>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-danger bg-opacity-10 text-dark rounded-3 h-100 border-danger border-start border-4">
                <h6 className="fw-bold text-danger">Riskli Kullanım ❌</h6>
                <code>{`setSayac(sayac + 1);`}</code>
                <p className="small mt-2 mb-0">Hızlıca iki kez çalışırsa React ikisini de eski <code>sayac</code> değeriyle hesaplayabilir.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-success bg-opacity-10 text-dark rounded-3 h-100 border-success border-start border-4">
                <h6 className="fw-bold text-success">Güvenli Kullanım ✅</h6>
                <code>{`setSayac((oncekiDeger) => oncekiDeger + 1);`}</code>
                <p className="small mt-2 mb-0">React bu yazımda her zaman <strong>en güncel</strong> state değerini garanti eder.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="keyboard">⌨️</span> Modül Ödevi: Canlı Karakter Sayacı</h4>
        <p className="mb-3">
          Kullanıcı yazı yazdıkça kaç karakter girdiğini canlı olarak hesaplayan bir bileşen tasarlayacağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>MetinKutusu.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useState } from 'react';

const MetinKutusu: React.FC = () => {
  // Başlangıç değeri boş string ("") olan bir state tanımlıyoruz
  const [metin, setMetin] = useState("");

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Mesajınızı Yazın:</h3>
      
      {/* Kutuya yazıldıkça 'metin' state'ini güncelliyoruz */}
      <textarea 
        rows={4} 
        style={{ width: '100%' }}
        value={metin} 
        onChange={(e) => setMetin(e.target.value)} 
        placeholder="Bir şeyler yazın..."
      />
      
      {/* State güncellendikçe bileşen yeniden çizilecek ve length (uzunluk) anında yansıyacak */}
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Karakter Sayısı: {metin.length}
      </p>
    </div>
  );
};

export default MetinKutusu;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import MetinKutusu from './components/MetinKutusu';

function App() {
  return (
    <div>
      <h1>State Uygulaması</h1>
      <MetinKutusu />
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
            <p className="text-muted mb-4 fs-5">React'in kalbi olan useState mantığını ve re-render olayını harika kavradın.</p>
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

export default UseStateDers;