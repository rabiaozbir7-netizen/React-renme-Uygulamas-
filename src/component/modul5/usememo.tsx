import React, { useState, useMemo } from 'react';

const UseMemoDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kullanımda 'b' değişkeni güncellenirse ne olur?\n\nconst sonuc = useMemo(() => {\n  return agirHesaplama(a, b);\n}, [a]); // Dikkat: b dizide yok!",
      options: [
        "agirHesaplama fonksiyonu 'b'nin yeni değeriyle tekrar çalışır.",
        "React otomatik olarak 'b'yi diziye ekler ve hatayı çözer.",
        "agirHesaplama fonksiyonu ÇALIŞMAZ. 'sonuc' değişkeni, 'b'nin eski (bayat) değeriyle hesaplanmış halini tutmaya devam eder (Stale Data hatası).",
        "Uygulama çöker."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki kod parçasının performans açısından değerlendirmesi nedir?\n\nconst selam = useMemo(() => 'Merhaba Dünya', []);\nreturn <div>{selam}</div>;",
      options: [
        "Mükemmel bir kullanımdır, uygulamayı hızlandırır.",
        "Kötü bir kullanımdır. Basit bir metni (string) bellekte tutmak için useMemo çağırmak, useMemo'nun kendi çalışma maliyetinden dolayı performansı artırmak yerine DÜŞÜRÜR.",
        "Derleme hatası verir, useMemo sadece sayılarla çalışır.",
        "Metni otomatik olarak kalın (bold) yapar."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "useMemo ve useCallback arasındaki farkı özetleyen en doğru eşleştirme aşağıdakilerden hangisidir?",
      options: [
        "useMemo fonksiyonu çalıştırır ve ÇIKTISINI (değerini) belleğe alır. useCallback ise fonksiyonun KENDİSİNİ belleğe alır.",
        "useMemo sadece API isteklerinde, useCallback sadece DOM işlemlerinde kullanılır.",
        "useMemo asenkron çalışır, useCallback senkron çalışır.",
        "Aralarında hiçbir fark yoktur, tamamen aynıdırlar."
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
        <h2 className="text-primary fw-bold">🧮 useMemo ile Değer Önbellekleme</h2>
        <p className="lead text-muted">
          İşlemciyi yoran maliyetli hesaplamaların (heavy computations) sonuçlarını hafızaya (cache) alarak uygulamanızı hızlandırın.
        </p>
      </div>

      {/* 1. Bölüm: Neden İhtiyacımız Var? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden useMemo Kullanmalıyız?</h4>
          <p>
            React bileşenleri, içlerindeki bir state değiştiğinde baştan aşağı yeniden okunur (re-render). Eğer bileşenin içinde uzun süren bir matematiksel işlem veya devasa bir diziyi filtreleme işlemi varsa, bu işlem <strong>her render'da boş yere tekrar çalışır</strong> ve uygulamayı yavaşlatır (Kullanıcı arayüzü donar).
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-success mb-3">
            <h6 className="fw-bold text-success">useMemo'nun Çözümü</h6>
            <p className="small mb-0 text-dark">
              <code>useMemo</code>, o ağır işlemin <strong>sonucunu</strong> belleğe yazar. Bileşen yeniden render edildiğinde, eğer bağımlılıkları değişmediyse o işlemi tekrar yapmak yerine doğrudan bellekteki (cache) hazır cevabı verir.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Nasıl Kullanılır? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Nasıl Kullanılır? (Kod Örneği)</h4>
          <p>
            <code>useMemo</code> içine bir geri çağırım fonksiyonu (callback) ve bir bağımlılık dizisi (dependency array) alır. İçerideki fonksiyonun <strong>mutlaka bir değer döndürmesi (return)</strong> gerekir.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useState, useMemo } from 'react';

const FiltreliListe = ({ devasaListe }) => {
  const [aramaMetni, setAramaMetni] = useState("");
  const [tema, setTema] = useState("light");

  // AĞIR İŞLEM: Eğer useMemo kullanmasaydık, "tema" bile değişse 
  // bu 10.000 elemanlı filtreleme işlemi baştan yapılacaktı!
  const filtrelenmisListe = useMemo(() => {
    console.log("Ağır filtreleme işlemi çalışıyor...");
    return devasaListe.filter(uye => uye.isim.includes(aramaMetni));
  }, [devasaListe, aramaMetni]); // Sadece bu ikisi değişirse tekrar hesapla

  return (
    <div className={tema === "dark" ? "bg-dark" : "bg-light"}>
      <button onClick={() => setTema(tema === "dark" ? "light" : "dark")}>
        Temayı Değiştir (Listeyi Yeniden Hesaplatmaz!)
      </button>
      
      <input 
        placeholder="Üye ara..." 
        value={aramaMetni} 
        onChange={(e) => setAramaMetni(e.target.value)} 
      />
      
      <ul>
        {filtrelenmisListe.map(uye => <li key={uye.id}>{uye.isim}</li>)}
      </ul>
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: useMemo vs useCallback */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. useMemo mu, useCallback mi?</h4>
          <p>Bu iki kanca (hook) sürekli karıştırılır. Aslında arkalarındaki mantık tamamen aynıdır, sadece döndürdükleri şeyler farklıdır:</p>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-warning">
                <h6 className="fw-bold text-warning">useMemo (Değer Döndürür)</h6>
                <code className="small d-block text-dark mb-2">
                  const sonuc = useMemo(() =&gt; hesapla(), []);
                </code>
                <p className="small mb-0">Fonksiyonu <strong>çalıştırır</strong> ve onun ürettiği <strong>çıktıyı (değeri)</strong> bellekte saklar. Genelde objeler, diziler veya matematiksel sonuçlar için kullanılır.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold text-primary">useCallback (Fonksiyon Döndürür)</h6>
                <code className="small d-block text-dark mb-2">
                  const islem = useCallback(() =&gt; hesapla(), []);
                </code>
                <p className="small mb-0">İçine yazılan fonksiyonu <strong>çalıştırmaz</strong>, fonksiyonun <strong>kendisini</strong> bellekte saklar. Alt bileşenlere gönderilecek olaylar (onClick vb.) için kullanılır.</p>
              </div>
            </div>
          </div>
          <div className="alert alert-danger mt-3 border-0 mb-0 py-2">
            <strong>⚠️ Önemli Kural:</strong> <code>useMemo</code>'yu sadece basit matematiksel işlemler veya sıradan değişkenler için KULLANMAYIN! Çünkü <code>useMemo</code>'nun bellekte yer ayırması ve arka planda o bağımlılıkları kontrol etmesi basit işlemlerden daha yavaştır. Sadece <strong>gerçekten ağır (maliyetli)</strong> işlemlerde veya "Referans Eşitliğini" korumak için kullanın.
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="abacus">🧮</span> Modül Ödevi: Faktöriyel Hesaplayıcı</h4>
        <p className="mb-3">
          Sadece sayıyı değiştirdiğimizde çalışan, alakasız bir state (örn: tema) değiştiğinde tekrar hesaplanmayan bir faktöriyel bileşeni yapacağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>Faktoriyel.tsx</code> açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useState, useMemo } from 'react';

const Faktoriyel: React.FC = () => {
  const [sayi, setSayi] = useState(5);
  const [tema, setTema] = useState('light');

  // Ağır bir hesaplama simülasyonu
  const faktoriyelHesapla = (n: number): number => {
    console.log("Faktöriyel hesaplanıyor...");
    if (n <= 0) return 1;
    return n * faktoriyelHesapla(n - 1);
  };

  // useMemo kullanımı: Sadece "sayi" değiştiğinde tekrar hesapla!
  const sonuc = useMemo(() => {
    return faktoriyelHesapla(sayi);
  }, [sayi]);

  return (
    <div style={{ padding: '20px', background: tema === 'light' ? '#fff' : '#333', color: tema === 'light' ? '#000' : '#fff' }}>
      <button onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}>
        Temayı Değiştir (Konsola Bak: Hesaplama Tekrar Çalışmaz!)
      </button>
      <br /><br />
      
      <input 
        type="number" 
        value={sayi} 
        onChange={(e) => setSayi(Number(e.target.value))} 
      />
      <h4>Sonuç: {sonuç}</h4>
    </div>
  );
};

export default Faktoriyel;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin. F12 ile konsolu açıp "Tema Değiştir" butonuna basarak <code>useMemo</code>'nun mucizesini izleyin!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import Faktoriyel from './components/Faktoriyel';

function App() {
  return (
    <div>
      <h1>useMemo Testi</h1>
      <Faktoriyel />
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
            <p className="text-muted mb-4 fs-5">useMemo'nun değer önbellekleme mantığını, bağımlılık dizisinin önemini ve ne zaman KULLANILMAMASI gerektiğini başarıyla kavradın.</p>
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

export default UseMemoDers;