import React, { useState } from 'react';

const TypeScriptDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kod yazıldığında TypeScript nasıl bir tepki verir?\n\ninterface KullaniciProps { yas: number; }\nconst Kullanici: React.FC<KullaniciProps> = ({ yas }) => <p>{yas}</p>;\n\n{/* Kullanım: */}\n<Kullanici yas='yirmibes' />",
      options: [
        "Hata vermez, ekrana 'yirmibes' yazar.",
        "Derleme (Compile) aşamasında 'string türü number türüne atanamaz' hatası fırlatır ve projeyi başlatmaz.",
        "Tarayıcıda uygulama çöker ve beyaz ekran verir.",
        "Metni otomatik olarak sayıya (NaN) çevirir."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Aşağıdaki bileşen çağrımında 'meslek' prop'u eksik gönderilmiştir. Sonucu ne olur?\n\ninterface Props { isim: string; meslek?: string; }\nconst Kisi: React.FC<Props> = ({ isim, meslek }) => <p>{isim} - {meslek}</p>;\n\n{/* Kullanım: */}\n<Kisi isim='Ali' />",
      options: [
        "TypeScript 'meslek prop'u eksik' diyerek hata fırlatır.",
        "Uygulama çöker.",
        "Ekranda 'Ali - ' yazar (meslek tanımsız kalır), TypeScript hata VERMEZ çünkü meslek opsiyoneldir (?).",
        "Otomatik olarak 'Ali - İşsiz' yazar."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Aşağıdaki kullanımda TypeScript'in vereceği tepki nedir?\n\ninterface ButonProps { renk: 'primary' | 'danger'; }\nconst Buton: React.FC<ButonProps> = ({ renk }) => <button className={renk}>Tıkla</button>;\n\n{/* Kullanım: */}\n<Buton renk='success' />",
      options: [
        "Sorunsuz çalışır, buton yeşil olur.",
        "TypeScript hata verir: 'success' türü 'primary' | 'danger' türüne atanamaz.",
        "Uygulama çöker.",
        "Renk otomatik olarak 'primary' (varsayılan) yapılır."
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
      }, 1000); // Doğru cevabı görmesi için bekleme süresi
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
        <h2 className="text-primary fw-bold">🛡️ TypeScript ile Tip Güvenliği</h2>
        <p className="lead text-muted">
          React uygulamalarında "Kervan yolda düzülür" mantığını bırakıp, hataları daha kod yazarken (Compile Time) nasıl yakalayacağımızı öğreniyoruz.
        </p>
      </div>

      {/* 1. Bölüm: Neden TypeScript? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden TypeScript Kullanmalıyız?</h4>
          <p>
            Normal JavaScript'te bir değişkene önce metin (string), sonra sayı (number) atayabilirsiniz veya bir fonksiyona eksik parametre gönderebilirsiniz. JavaScript bu hataları ancak <strong>kullanıcı o butona tıkladığında veya o sayfaya girdiğinde (Runtime - Çalışma Zamanı)</strong> fark eder ve uygulama çöker.
          </p>
          <div className="bg-danger bg-opacity-10 p-3 rounded-3 border-start border-4 border-danger mb-3">
            <h6 className="fw-bold text-danger">JavaScript (Güvensiz)</h6>
            <code>{`<KullaniciKarti yas="Yirmi Beş" /> // Yaş prop'una sayı yerine metin gönderdik. JS buna sessiz kalır, ekranda veya hesaplamada hata patlar!`}</code>
          </div>
          <div className="bg-success bg-opacity-10 p-3 rounded-3 border-start border-4 border-success">
            <h6 className="fw-bold text-success">TypeScript (Güvenli)</h6>
            <p className="small mb-1">TypeScript bu durumu anında kırmızı çizgiyle çizer ve projeyi başlatmana bile izin vermez. <em>"yas özelliği bir sayı (number) olmalıdır, metin (string) gönderemezsin!"</em> diye seni uyarır.</p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Interface ve Props */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Interface ile Props Tanımlama</h4>
          <p>
            React bileşenlerine hangi özelliklerin (Props) geleceğini ve bunların tiplerini <strong><code>interface</code></strong> veya <strong><code>type</code></strong> kullanarak belirtiriz.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React from 'react';

// 1. Bileşenin alacağı veri tiplerinin şemasını (Interface) çıkarıyoruz
interface KullaniciProps {
  isim: string;
  yas: number;
  isAdmin: boolean;
}

// 2. React.FC<InterfaceAdı> şeklinde bileşene bu şemayı bağlıyoruz
const Kullanici: React.FC<KullaniciProps> = ({ isim, yas, isAdmin }) => {
  return (
    <div>
      <h3>{isim} ({yas})</h3>
      {isAdmin && <span className="badge bg-danger">Yönetici</span>}
    </div>
  );
};

export default Kullanici;`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Opsiyonel Props ve Union Types */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Gelişmiş Tipler (Opsiyonel ve Union)</h4>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-warning">
                <h6 className="fw-bold">Opsiyonel Props (?)</h6>
                <p className="small mb-2">Eğer bir prop'un gönderilmesi zorunlu değilse, isminin sonuna <strong><code>?</code></strong> koyarız.</p>
                <code className="d-block bg-dark text-white p-2 rounded">
                  interface KartProps {'{\n'}
                  {'  baslik: string;\n'}
                  {'  altBaslik?: string; // Gönderilmese de hata vermez\n'}
                  {'}'}
                </code>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold">Union Types (|)</h6>
                <p className="small mb-2">Eğer bir prop sadece belirli değerleri alabilecekse (örn: buton renkleri), aralarına <strong><code>|</code></strong> (veya) koyarak sınırlandırırız.</p>
                <code className="d-block bg-dark text-white p-2 rounded">
                  interface ButonProps {'{\n'}
                  {'  renk: "primary" | "danger" | "success";\n'}
                  {'}'}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="shield">🛡️</span> Modül Ödevi: Kurşun Geçirmez Buton</h4>
        <p className="mb-3">
          TypeScript'in bizi nasıl koruduğunu görmek için tip güvenli bir buton bileşeni tasarlayıp App.tsx'te çağıracağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>GuvenliButon.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';

// Sadece 'solid' veya 'outline' kabul eden union type ve opsiyonel disabled
interface ButonProps {
  metin: string;
  varyant: 'solid' | 'outline';
  disabled?: boolean;
}

const GuvenliButon: React.FC<ButonProps> = ({ metin, varyant, disabled = false }) => {
  const butonStili = varyant === 'solid' ? 'btn-primary' : 'btn-outline-primary';

  return (
    <button className={\`btn \${butonStili}\`} disabled={disabled}>
      {metin}
    </button>
  );
};

export default GuvenliButon;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın ve Hata Yaptırın!</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın. Bilerek yanlış bir "varyant" girin ve editörünüzün altını nasıl kırmızı çizdiğini gözlemleyin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import GuvenliButon from './components/GuvenliButon';

function App() {
  return (
    <div>
      {/* Doğru Kullanımlar */}
      <GuvenliButon metin="Gönder" varyant="solid" />
      <GuvenliButon metin="İptal" varyant="outline" disabled={true} />

      {/* HATALI KULLANIM: TypeScript buna izin vermez! Altını kırmızı çizer. */}
      {/* <GuvenliButon metin="Sil" varyant="hayalet" /> */}
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
            <p className="text-muted mb-4 fs-5">TypeScript ile arayüzleri (Interface) ve tipleri bağlamayı harika kavradın.</p>
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

export default TypeScriptDers;