import React, { useState } from 'react';

const UseCallbackDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "AltBilesen 'React.memo' ile sarmalanmış olmasına rağmen, AnaBilesen'deki bir input'a yazı yazıldığında AltBilesen neden gereksiz yere YENİDEN ÇİZİLİR (re-render)?\n\nconst AnaBilesen = () => {\n  const [metin, setMetin] = useState('');\n  \n  // Hata burada gizli:\n  const handleTikla = () => console.log('Tıklandı');\n\n  return <AltBilesen onTikla={handleTikla} />\n};",
      options: [
        "AltBilesen'in içine prop olarak string değil, fonksiyon gönderildiği için.",
        "React.memo sadece sayılarla çalışır, fonksiyonları algılayamaz.",
        "AnaBilesen her güncellendiğinde 'handleTikla' bellekte yepyeni bir referansla (farklı bir adresle) tekrar yaratılır. AltBilesen prop'un değiştiğini zannederek kendini yeniden çizer.",
        "useState asenkron olduğu için."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "DİKKAT (Stale Closure Hatası): Aşağıdaki kodda butona basıp 'sayi'yi 5 yapsak bile, 'goster' fonksiyonunu çağırdığımızda konsola hep 0 yazdırır. Bunun sebebi nedir?\n\nconst [sayi, setSayi] = useState(0);\n\nconst goster = useCallback(() => {\n  console.log(sayi);\n}, []); // <-- Sorun burada",
      options: [
        "console.log asenkron çalıştığı için.",
        "Bağımlılık dizisi boş [] bırakıldığı için fonksiyon ilk render'daki 'sayi' değeriyle (0) belleğe mühürlenmiştir. Güncel değeri görmesi için diziye [sayi] yazılmalıdır.",
        "useCallback geriye bir değer döndürmediği için.",
        "useState yerine useRef kullanılması gerektiği için."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Aşağıdaki kullanımda useCallback kullanılmasına rağmen AltBilesen boş yere render olmaya devam eder. Hangi kritik adımı unuttuk?\n\nconst islem = useCallback(() => alert('Selam'), []);\n\nreturn <AltBilesen calistir={islem} />",
      options: [
        "AltBilesen'in (Child Component) React.memo() ile sarmalanmamış olması.",
        "useCallback içine return yazılmamış olması.",
        "islem fonksiyonunun async yapılmaması.",
        "Bağımlılık dizisine [islem] eklenmemiş olması."
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
        <h2 className="text-primary fw-bold">⚡ useCallback ile Performans Optimizasyonu</h2>
        <p className="lead text-muted">
          Fonksiyonlarınızı bellekte saklayın (cache) ve alt bileşenlerin gereksiz yere yeniden çizilmesini (re-render) engelleyin.
        </p>
      </div>

      {/* 1. Bölüm: Neden İhtiyacımız Var? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden useCallback Kullanmalıyız? (Referans Eşitliği)</h4>
          <p>
            JavaScript'te iki nesne veya fonksiyon, içerikleri aynı olsa bile birbirine eşit değildir. Çünkü bellekte (RAM) farklı yerlerde tutulurlar.
          </p>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-danger mb-3">
            <h6 className="fw-bold text-danger">Sorun: Gereksiz Fonksiyon Üretimi</h6>
            <p className="small mb-0 text-dark">
              React'te bir state değiştiğinde bileşen baştan sona yeniden okunur. Bu sırada içerideki <code>const handleTikla = () =&gt; &#123; ... &#125;</code> gibi fonksiyonlar <strong>yeniden yaratılır</strong>. Eğer bu fonksiyonu bir alt bileşene gönderiyorsanız, alt bileşen "Bana yeni bir veri geldi" sanarak gereksiz yere kendini tekrar çizer.
            </p>
          </div>
          <div className="bg-light p-3 rounded-3 border-start border-4 border-success">
            <h6 className="fw-bold text-success">Çözüm: useCallback</h6>
            <p className="small mb-0 text-dark">
              <code>useCallback</code>, yazdığınız fonksiyonu bellekte saklar. Bileşen yeniden render edilse bile, bağımlılıkları değişmediği sürece <strong>aynı fonksiyonu (aynı referansı)</strong> geri döndürür.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Kullanım ve React.memo */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Nasıl Kullanılır? (React.memo ile Birlikte)</h4>
          <p>
            <code>useCallback</code> tek başına hiçbir işe yaramaz. Gerçek bir performans artışı sağlamak için, fonksiyonu gönderdiğiniz alt bileşeni <strong><code>React.memo()</code></strong> ile sarmalamanız gerekir.
          </p>
          
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import React, { useState, useCallback, memo } from 'react';

// 1. Alt Bileşeni React.memo ile sarmalıyoruz (Sadece proplar değişirse render olur)
const AltBilesen = memo(({ onButonTikla }: { onButonTikla: () => void }) => {
  console.log("Alt bileşen render edildi!");
  return <button onClick={onButonTikla}>Bana Tıkla</button>;
});

const AnaBilesen = () => {
  const [sayac, setSayac] = useState(0);
  const [metin, setMetin] = useState("");

  // 2. Fonksiyonu useCallback ile önbelleğe alıyoruz.
  // Boş dizi [] olduğu için bu fonksiyon sadece İLK açılışta yaratılır ve hep aynı kalır.
  const handleTikla = useCallback(() => {
    console.log("Butona tıklandı!");
  }, []); 

  return (
    <div>
      <input value={metin} onChange={(e) => setMetin(e.target.value)} />
      <p>Yazılan: {metin}</p>
      
      {/* input'a yazı yazdıkça AnaBilesen render olur, AMA AltBilesen render OLMAZ! */}
      {/* Çünkü handleTikla'nın referansı useCallback sayesinde hiç değişmiyor. */}
      <AltBilesen onButonTikla={handleTikla} />
    </div>
  );
};`}
          </pre>
        </div>
      </div>

      {/* 3. Bölüm: Ne Zaman KULLANMAMALIYIZ? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Her Yerde useCallback Kullanmalı Mıyım?</h4>
          <div className="alert alert-warning border-0 mb-0">
            <h6 className="fw-bold">HAYIR! 🛑</h6>
            <p className="small mb-0">
              <code>useCallback</code> işleminin kendisi de bir maliyettir (Bellek tüketir ve bağımlılık dizisini kontrol etmek için işlemciyi yorar). Eğer fonksiyonu gönderdiğiniz alt bileşen çok basit bir bileşense (örneğin standart bir <code>&lt;button&gt;</code> veya ufak bir metin kutusu), onu önbelleğe almak performansı <strong>düşürebilir</strong>. <br/><br/>
              <strong>Sadece şu durumlarda kullanın:</strong> <br/>
              1) Alt bileşen <code>React.memo</code> ile korunuyorsa ve render edilmesi çok ağır bir bileşense (örn: devasa bir tablo veya grafik). <br/>
              2) Fonksiyonu <code>useEffect</code> içinde bir bağımlılık (dependency) olarak kullanıyorsanız.
            </p>
          </div>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="muscle">💪</span> Modül Ödevi: Ağır Liste Optimizasyonu</h4>
        <p className="mb-3">
          React.memo ve useCallback ikilisini kullanarak gereksiz re-render'ların önüne nasıl geçtiğimizi kendi gözlerimizle görelim.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Alt Bileşeni (Child) Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>UrunKarti.tsx</code> açın. Bileşeni <code>React.memo</code> ile korumaya alın!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { memo } from 'react';

interface UrunProps {
  isim: string;
  onSepeteEkle: () => void;
}

// Bileşeni memo() ile sarmalıyoruz!
const UrunKarti: React.FC<UrunProps> = memo(({ isim, onSepeteEkle }) => {
  console.log(\`\${isim} isimli ürün render edildi!\`);

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '5px' }}>
      <h4>{isim}</h4>
      <button onClick={onSepeteEkle}>Sepete Ekle</button>
    </div>
  );
});

export default UrunKarti;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Bileşende (Parent) Çağırın</h6>
        <p className="small mb-1"><code>src/App.tsx</code> içinde fonksiyonumuzu <code>useCallback</code> ile önbelleğe alalım. Tema değiştir butonuna bastığınızda ürünlerin konsola tekrar "render edildi" yazmadığını göreceksiniz!</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React, { useState, useCallback } from 'react';
import UrunKarti from './components/UrunKarti';

function App() {
  const [tema, setTema] = useState('light');

  // Fonksiyonu belleğe (cache) hapsediyoruz
  const sepeteEkle = useCallback(() => {
    alert("Sepete eklendi!");
  }, []); // Boş dizi: Hiçbir zaman yeni referans oluşturma

  return (
    <div style={{ background: tema === 'light' ? '#fff' : '#ccc', padding: '20px' }}>
      <button onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}>
        Temayı Değiştir
      </button>

      {/* Tema değiştiğinde App render olur AMA UrunKarti render olmaz! */}
      <UrunKarti isim="Oyuncu Bilgisayarı" onSepeteEkle={sepeteEkle} />
      <UrunKarti isim="Mekanik Klavye" onSepeteEkle={sepeteEkle} />
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
            <p className="text-muted mb-4 fs-5">React.memo ile useCallback arasındaki o mükemmel ilişkiyi ve referans eşitliği mantığını başarıyla kavradın.</p>
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

export default UseCallbackDers;