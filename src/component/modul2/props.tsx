import React, { useState } from 'react';

const PropsDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodun sonucu ne olur?\n\nconst Profil = ({ isim }) => {\n  isim = 'Mehmet'; // Prop'u değiştirmeye çalışıyoruz\n  return <p>{isim}</p>;\n};",
      options: [
        "Ekranda 'Mehmet' yazar ve sorunsuz çalışır.",
        "Props'lar salt-okunur (read-only) olduğu için bu kullanım React anti-pattern'idir, büyük hatalara ve bug'lara yol açar.",
        "Uygulama sonsuz döngüye girer.",
        "Derleyici (Vite/Webpack) bu kodu anında siler."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Aşağıdaki bileşen <Kutu baslik='Selam' /> şeklinde çağrılırsa ekranda ne görünür?\n\nconst Kutu = ({ baslik, renk = 'blue' }) => {\n  return <div style={{ color: renk }}>{baslik}</div>;\n};",
      options: [
        "Siyah renkli 'Selam' yazısı.",
        "Derleme hatası verir (renk prop'u eksik gönderildiği için).",
        "Mavi renkli 'Selam' yazısı (Çünkü renk prop'una varsayılan değer verilmiş).",
        "Ekranda hiçbir şey görünmez."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "TypeScript ile yazılmış aşağıdaki Interface'te 'aktifMi?' kısmındaki soru işareti (?) ne işe yarar?\n\ninterface ButonProps {\n  metin: string;\n  aktifMi?: boolean;\n}",
      options: [
        "Bu özelliğin zorunlu OLMADIĞINI (opsiyonel olduğunu) belirtir.",
        "Bu özelliğin değerinin kullanıcının girmesi gereken bir 'soru' olduğunu belirtir.",
        "Bu kod hata verir, TypeScript'te ? işareti Interface içinde kullanılamaz.",
        "Değerin sadece 'true' olabileceğini garanti eder."
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
      }, 1000); // Doğru cevabı görmesi için 1 saniye bekle
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 800); // Yanlışta titreme süresi
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
        <h2 className="text-primary fw-bold">🎁 Props (Bileşenler Arası Veri Aktarımı)</h2>
        <p className="lead text-muted">
          React bileşenlerini dinamik ve tekrar kullanılabilir hale getiren en önemli kavram: Özellikler (Properties).
        </p>
      </div>

      {/* 1. Bölüm: Props Nedir? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Props Nedir ve Kuralları Nelerdir?</h4>
          <p>
            <strong>Props</strong> (Properties'in kısaltması), bir üst bileşenden (Parent Component) alt bileşene (Child Component) veri aktarmak için kullanılan bir yapıdır. Tıpkı HTML etiketlerine <code>id</code> veya <code>src</code> gibi nitelikler verirken kullandığımız mantıkla çalışır.
          </p>
          
          <div className="alert alert-warning border-0 border-start border-4 border-warning bg-warning bg-opacity-10 text-dark">
            <h6 className="fw-bold mb-1">⚠️ En Önemli Kural: Salt-Okunur (Read-Only)</h6>
            <p className="small mb-0">
              Bir alt bileşen (Child), kendisine gelen <code>props</code> değerini <strong>ASLA doğrudan değiştiremez</strong>. Props'lar her zaman yukarıdan aşağıya (Parent &gt; Child) doğru tek yönlü (one-way) akar.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Props Kullanımı ve Destructuring */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Props Kullanımı ve Parçalama (Destructuring)</h4>
          <p>
            Bileşene gönderilen tüm özellikler, bileşenin fonksiyonuna tek bir nesne (object) olarak gelir. Kodun daha temiz olması için genellikle JavaScript'in <strong>Destructuring (Parçalama)</strong> yöntemi kullanılır.
          </p>
          
          <h6 className="fw-bold text-primary mt-3">Üst Bileşen (Parent) - Veriyi Gönderen</h6>
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import KullaniciKarti from './KullaniciKarti';

const App = () => {
  return (
    <div>
      {/* İki farklı veri ile aynı bileşeni kullanıyoruz */}
      <KullaniciKarti isim="Ahmet" yas={25} />
      <KullaniciKarti isim="Ayşe" yas={30} />
    </div>
  );
};`}
          </pre>

          <h6 className="fw-bold text-success mt-4">Alt Bileşen (Child) - Veriyi Alan</h6>
          <pre className="bg-dark text-white p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`// (props) yazıp props.isim demek yerine doğrudan ({ isim, yas }) yazıyoruz.
const KullaniciKarti = ({ isim, yas }) => {
  return (
    <div className="kart">
      <h3>İsim: {isim}</h3>
      <p>Yaş: {yas}</p>
    </div>
  );
};

export default KullaniciKarti;`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: TypeScript ile Props */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. TypeScript ile Güvenli Props Tanımlama</h4>
          <p>
            TypeScript kullanırken, bir bileşenin hangi Props'ları alacağını ve bu Props'ların veri tiplerini (string, number, boolean vb.) <strong>Interface</strong> veya <strong>Type</strong> kullanarak belirtmek zorundayız. Bu sayede yanlış veri gönderilmesinin önüne geçeriz.
          </p>
          
          <pre className="bg-dark text-warning p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';

// 1. Props tiplerini tanımlıyoruz
interface KullaniciKartiProps {
  isim: string;
  yas: number;
  aktifMi?: boolean; // Soru işareti (?), bu özelliğin zorunlu olmadığını belirtir
}

// 2. React.FC (Functional Component) içine bu tipi veriyoruz
const KullaniciKarti: React.FC<KullaniciKartiProps> = ({ isim, yas, aktifMi = true }) => {
  return (
    <div>
      <h3>{isim}</h3>
      <p>{yas} yaşında</p>
      {aktifMi ? <span>🟢 Çevrimiçi</span> : <span>🔴 Çevrimdışı</span>}
    </div>
  );
};

export default KullaniciKarti;`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="code">💻</span> Modül Ödevi: Ürün Kartı Uygulaması</h4>
        <p className="mb-3">
          Sıfırdan bir bileşen oluşturup ana sayfada (App.tsx) çağıracağız. Aşağıdaki adımları sırasıyla uygulayın:
        </p>
        
        <h6 className="fw-bold mt-2">Adım 1: Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>UrunKarti.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';

// TypeScript ile gelecek verilerin (props) kurallarını belirliyoruz
interface UrunProps {
  baslik: string;
  fiyat: number;
  indirimVarMi?: boolean; // Zorunlu değil
}

const UrunKarti: React.FC<UrunProps> = ({ baslik, fiyat, indirimVarMi }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2>{baslik}</h2>
      <p>Fiyat: {fiyat} TL</p>
      {indirimVarMi && <span style={{ color: 'red' }}>%20 İndirimli!</span>}
    </div>
  );
};

export default UrunKarti;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın, bileşeni import edin ve farklı verilerle (props) 2 defa kullanın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import UrunKarti from './components/UrunKarti';

function App() {
  return (
    <div>
      <h1>Mağazamıza Hoş Geldiniz</h1>
      {/* İndirimsiz Ürün */}
      <UrunKarti baslik="Mekanik Klavye" fiyat={1500} />
      
      {/* İndirimli Ürün */}
      <UrunKarti baslik="Oyuncu Mouse" fiyat={800} indirimVarMi={true} />
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
            <p className="text-muted mb-4 fs-5">Props mantığını ve kod çıktılarını başarıyla analiz ettin.</p>
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

export default PropsDers;