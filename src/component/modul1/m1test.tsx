import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext'; 

const Modul1Test: React.FC = () => {
  const navigate = useNavigate();
  const { finishModule } = useProgress();
  
  // Gereksiz "status" (doğru/yanlış anlık gösterimi) state'ini kaldırdık.
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

 const questions = [
    { 
      id: 1, 
      question: "React nedir ve temel amacı hangisidir?", 
      options: ["Bir veritabanı yönetim sistemidir.", "Kullanıcı arayüzü (UI) oluşturmak için kullanılan bir JavaScript kütüphanesidir.", "Sadece mobil uygulama yazmaya yarayan bir dildir.", "Bir CSS framework'üdür."], 
      correct: 1 
    },
    { 
      id: 2, 
      question: "Aşağıdaki JSX kodunun çıktısı ne olur?\n\nreturn (\n  <h1>Merhaba</h1>\n  <h2>Dünya</h2>\n);", 
      options: ["Merhaba ve Dünya alt alta yazılır.", "Sadece Merhaba yazılır.", "Derleme hatası verir (Birden fazla kök/root eleman döndürülemez).", "Sadece Dünya yazılır."], 
      correct: 2 
    },
    { 
      id: 3, 
      question: "Sanal DOM'un (Virtual DOM) React'e sağladığı temel avantaj nedir?", 
      options: ["Uygulamanın internet bağlantısı olmadan çalışmasını sağlar.", "Sadece değişen kısımları tespit edip gerçek DOM'a yansıtarak performansı ve hızı artırır.", "Güvenlik açıklarını kapatır.", "Yazılan kod miktarını azaltır."], 
      correct: 1 
    },
    { 
      id: 4, 
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst isim = 'React';\nreturn <div>{isim.toUpperCase()}</div>;", 
      options: ["{isim.toUpperCase()}", "React", "REACT", "Hata verir, JSX içinde metod kullanılamaz."], 
      correct: 2 
    },
    { 
      id: 5, 
      question: "Aşağıdaki HTML etiketlerinden hangisi JSX içinde yazılırken derleme hatasına (syntax error) yol açar?", 
      options: ["<div className='kutu'></div>", "<img src='logo.png' />", "<input type='text'>", "<span>Test</span>"], 
      correct: 2 // JSX'te img, input, br gibi etiketler mutlaka /> ile kapatılmalıdır.
    },
    { 
      id: 6, 
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst dizi = [1, 2, 3];\nreturn <div>Sayilar: {dizi}</div>;", 
      options: ["Sayilar: 123", "Sayilar: [1, 2, 3]", "Sayilar: 1, 2, 3", "Hata verir, diziler ekrana basılamaz."], 
      correct: 0 // React, dizileri yan yana birleştirerek (join) ekrana basar.
    },
    { 
      id: 7, 
      question: "Modern React projelerini (Vite vb.) başlatırken proje içindeki ana giriş dosyası hangisidir?", 
      options: ["App.tsx", "index.html", "main.tsx", "vite.config.ts"], 
      correct: 2 
    },
    { 
      id: 8, 
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst aktifMi = true;\nreturn <p>Durum: {aktifMi}</p>;", 
      options: ["Durum: true", "Durum: false", "Durum: 1", "Durum: "], 
      correct: 3 // React'te boolean değerler (true/false) ekrana basılmaz, görünmezler.
    },
    { 
      id: 9, 
      question: "React bileşenleri (Components) isimlendirilirken hangi kurala uyulması ZORUNLUDUR?", 
      options: ["Küçük harfle başlamalıdır.", "Büyük harfle (PascalCase) başlamalıdır.", "Sonunda .jsx veya .tsx uzantısı olmamalıdır.", "İçinde rakam bulunmamalıdır."], 
      correct: 1 
    },
    { 
      id: 10, 
      question: "Aşağıdaki satır içi (inline) stil kullanımının sonucu ne olur?\n\nreturn <h1 style='color: red;'>Uyarı</h1>;", 
      options: ["Kırmızı renkli Uyarı yazısı çıkar.", "Yazı siyah kalır ama hata vermez.", "Konsolda 'style prop expects a mapping' hatası fırlatır.", "Uygulama tamamen çöker."], 
      correct: 2 // React'te style={ { color: 'red' } } şeklinde nesne (object) olarak verilmelidir.
    },
    { 
      id: 11, 
      question: "Fazladan <div> etiketi oluşturmadan birden fazla elemanı sarmalamak (wrap) için hangisi kullanılır?", 
      options: ["<empty></empty>", "<null></null>", "React Fragment (<></>)", "<wrap></wrap>"], 
      correct: 2 
    },
    { 
      id: 12, 
      question: "Aşağıdaki kullanımın konsolda oluşturacağı uyarı (warning) nedir?\n\nreturn <div class='kutu'>İçerik</div>;", 
      options: ["Warning: Invalid DOM property `class`. Did you mean `className`?", "Warning: Missing closing tag.", "Warning: JSX elements must be wrapped.", "Hata vermez, mükemmel çalışır."], 
      correct: 0 
    },
    { 
      id: 13, 
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst obj = { ad: 'Ali' };\nreturn <div>{obj}</div>;", 
      options: ["Ali", "{ad: 'Ali'}", "[object Object]", "Uygulama çöker (Objects are not valid as a React child)."], 
      correct: 3 // React'te JS nesneleri (objects) doğrudan ekrana basılamaz.
    },
    { 
      id: 14, 
      question: "Bileşen tabanlı mimarinin (Component-based architecture) en büyük faydası nedir?", 
      options: ["Kodun tamamını tek bir dosyada toplaması.", "Arayüzü tekrar kullanılabilir küçük parçalara bölerek kod tekrarını önlemesi.", "CSS yazmayı gereksiz kılması.", "Veritabanı sorgularını hızlandırması."], 
      correct: 1 
    },
    { 
      id: 15, 
      question: "Aşağıdaki koşullu render kodunun çıktısı ne olur?\n\nconst yas = 15;\nreturn <div>{yas >= 18 ? 'Giriş Başarılı' : 'Giriş Yasak'}</div>;", 
      options: ["15", "Giriş Başarılı", "Giriş Yasak", "Hata verir."], 
      correct: 2 
    },
    { 
      id: 16, 
      question: "Aşağıdaki onClick olayında (event) ne gibi bir MANTIKSAL HATA vardır?\n\n<button onClick={alert('Tıklandı!')}>Bana Tıkla</button>", 
      options: ["alert yerine console.log kullanılmalıdır.", "Bileşen ekrana çizildiği (render edildiği) an fonksiyon tetiklenir, butona tıklanmasını beklemez.", "Derleme hatası verir.", "Hiçbir hata yoktur, tıklanınca çalışır."], 
      correct: 1 // Fonksiyon referansı vermek yerine doğrudan çalıştırıldığı için render anında tetiklenir.
    },
    { 
      id: 17, 
      question: "JSX tarayıcılar (Chrome, Safari vb.) tarafından doğrudan anlaşılabilir mi?", 
      options: ["Evet, tarayıcılar JSX'i yerleşik olarak destekler.", "Sadece Google Chrome destekler.", "Hayır, tarayıcının okuyabilmesi için Vite/Babel gibi araçlarla normal JavaScript'e derlenmesi gerekir.", "Sadece HTML5 modunda anlaşılır."], 
      correct: 2 
    },
    { 
      id: 18, 
      question: "Aşağıdaki kod parçasının ekrandaki çıktısı ne olur?\n\nconst goster = false;\nreturn <p>{goster && 'Gizli Mesaj'}</p>;", 
      options: ["Gizli Mesaj", "false", "Boş paragraf (<p></p>) render edilir.", "Hata verir."], 
      correct: 2 // Sol taraf false olduğu için && sonrasına geçmez ve false ekrana basılmaz.
    },
    { 
      id: 19, 
      question: "Aşağıdaki bileşen çağrımının HATASI nedir?\n\nconst BenimButonum = () => <button>Tıkla</button>;\n\nreturn <benimButonum />;", 
      options: ["Kapanış etiketi eksiktir.", "React, küçük harfle başlayan etiketleri HTML etiketi sanır, bileşeni bulamaz.", "Fonksiyonel bileşenler bu şekilde çağrılamaz.", "Hata yoktur."], 
      correct: 1 // Bileşen adları mutlaka Büyük Harfle (PascalCase) çağrılmalıdır.
    },
    { 
      id: 20, 
      question: "Oluşturduğumuz bir bileşeni başka dosyalarda import edebilmek (içe aktarabilmek) için dosya sonunda hangi komutu kullanırız?", 
      options: ["export default BilesenAdi;", "import BilesenAdi from 'react';", "return BilesenAdi;", "send BilesenAdi;"], 
      correct: 0 
    }
  ];

  const handleAnswer = (index: number) => {
    // Doğruysa 5 puan, yanlışsa 0 puan ekliyoruz.
    const isCorrect = index === questions[currentStep - 1].correct;
    const newScore = score + (isCorrect ? 5 : 0);

    // Eğer son soruda değilsek, puanı kaydet ve anında bir sonraki soruya geç
    if (currentStep < questions.length) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } 
    // Son sorudaysak sınavı bitir ve puanı kontrol et
    else {
      setScore(newScore);
      setIsFinished(true);
      
      // Eğer 75 veya üstüyse R harfini boya
      if (newScore >= 75) {
        finishModule('modul1');
      }
    }
  };

  const resetTest = () => {
    setCurrentStep(1);
    setIsFinished(false);
    setScore(0);
  };

  return (
    // container yerine w-100 kullanarak alanı tam kaplamasını sağladık
    <div className="w-100 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold m-0">🏆 Modül 1 Testi</h2>
        {/* Anlık puan göstergesini kaldırdık ki gerçek sınav gibi olsun */}
      </div>

      <div className="card shadow-lg border-0 overflow-hidden rounded-4 w-100">
        {isFinished ? (
          <div className="card-body text-center py-5 bg-white">
            <div className="display-1 mb-3">{score >= 75 ? "🏅" : "⚠️"}</div>
            {score >= 75 ? (
              <>
                <h2 className="fw-bold text-success mb-3">Tebrikler! Geçtin.</h2>
                <h4 className="mb-4">Puanın: <span className="text-primary">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">"R" harfini kazandın!</p>
                <div className="d-flex justify-content-center gap-3">
                  <button onClick={resetTest} className="btn btn-outline-secondary px-4 py-2 rounded-pill">Testi Tekrarla</button>
                  <button onClick={() => navigate('/dersler/modul2/props')} className="btn btn-success px-5 py-2 rounded-pill shadow">Modül 2'ye Geç ⮕</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="fw-bold text-danger mb-3">Başarısız Oldun.</h2>
                <h4 className="mb-4">Puanın: <span className="text-danger">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">Geçmek ve harfi yakmak için en az 75 puan almalısın.</p>
                <button onClick={resetTest} className="btn btn-danger px-5 py-2 rounded-pill shadow">Testi Tekrarla ↻</button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="progress rounded-0" style={{ height: '8px' }}>
              <div className="progress-bar bg-info" style={{ width: `${(currentStep / questions.length) * 100}%` }}></div>
            </div>
            
            {/* Soru alanı padding'ini (p-5) artırarak daha ferah yaptık */}
            <div className="bg-dark p-5 text-white text-center">
              <span className="badge bg-secondary mb-3 fs-6">Soru {currentStep} / {questions.length}</span>
              <h3 className="fw-light">{questions[currentStep - 1].question}</h3>
            </div>
            
            {/* Şık ve geniş buton tasarımı */}
            <div className="card-body bg-light p-5">
              <div className="list-group gap-3">
                {questions[currentStep - 1].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="list-group-item list-group-item-action p-4 rounded-3 border border-secondary border-opacity-25 fs-5 text-start"
                    style={{ transition: 'all 0.2s ease-in-out' }}
                    onMouseOver={(e) => e.currentTarget.classList.add('bg-white', 'shadow-sm')}
                    onMouseOut={(e) => e.currentTarget.classList.remove('bg-white', 'shadow-sm')}
                  >
                    <div className="d-flex align-items-center">
                      <span className="bg-secondary bg-opacity-10 text-dark rounded-circle d-flex align-items-center justify-content-center me-4 fw-bold border" style={{ width: '40px', height: '40px' }}>
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      {opt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modul1Test;