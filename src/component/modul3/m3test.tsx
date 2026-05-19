import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext';

const Modul3Test: React.FC = () => {
  const navigate = useNavigate();
  const { finishModule } = useProgress();

  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

const questions = [
    {
      id: 1,
      question: "Aşağıdaki kodun çıktısı (konsol yazısı) ne olur?\n\nconst durum = useState('React');\nconsole.log(durum[0]);",
      options: [
        "undefined",
        "Durumu güncelleyecek olan set fonksiyonunu yazdırır.",
        "'React' yazdırır (Çünkü useState geriye dizi döner ve 0. indekste mevcut değer vardır).",
        "Hata fırlatır."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Aşağıdaki butona BİR KERE tıklandığında ekrandaki sayı kaç olur?\n\nconst [sayi, setSayi] = useState(0);\nconst ciftArtir = () => {\n  setSayi(sayi + 1);\n  setSayi(sayi + 1);\n};\n\n<button onClick={ciftArtir}>Artır</button>",
      options: [
        "2 olur.",
        "1 olur. (Çünkü state güncellemeleri asenkrondur/toplu yapılır ve ikisi de eski 'sayi' değerini -sıfırı- referans alır).",
        "0 olarak kalır.",
        "Hata fırlatır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Eğer bir state'i nesne (object) olarak tutuyorsak, sadece yaşını güncelleyip diğer verileri KORUMAK için hangi kullanım doğrudur?\n\nconst [kullanici, setKullanici] = useState({ ad: 'Ali', yas: 20 });",
      options: [
        "setKullanici({ yas: 25 });",
        "kullanici.yas = 25;",
        "setKullanici({ ...kullanici, yas: 25 });",
        "setKullanici(kullanici.yas + 5);"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Aşağıdaki useEffect'in çalışma (tetiklenme) davranışı nasıldır?\n\nuseEffect(() => {\n  console.log('Çalıştı');\n}, []); // Boş dizi!",
      options: [
        "State her değiştiğinde çalışır.",
        "Sadece bileşen ekrana İLK KEZ yüklendiğinde (mount) bir kez çalışır.",
        "Hiç çalışmaz.",
        "Sayfa kapatılırken çalışır."
      ],
      correct: 1
    },
    {
      id: 5,
      question: "DİKKAT! Aşağıdaki kodun tehlikesi nedir?\n\nconst [sayi, setSayi] = useState(0);\nuseEffect(() => {\n  setSayi(sayi + 1);\n}); // Dizi tamamen unutulmuş!",
      options: [
        "Kod sorunsuz çalışır, sayıyı 1 artırır.",
        "Bileşen sadece 1 kere render olur.",
        "Bağımlılık dizisi olmadığı için her render'da useEffect çalışır, useEffect sayıyı artırıp tekrar render'ı tetikler ve SONSUZ DÖNGÜYE girer.",
        "useState içinde kullanılmadığı için hata verir."
      ],
      correct: 2
    },
    {
      id: 6,
      question: "Aşağıdaki 'return' fonksiyonunun (Cleanup) amacı nedir?\n\nuseEffect(() => {\n  const timer = setInterval(() => console.log('Tık'), 1000);\n  return () => clearInterval(timer);\n}, []);",
      options: [
        "Timer'ı hemen durdurmak.",
        "Bileşen ekrandan kaldırıldığında (unmount) arka planda çalışmaya devam eden interval'i temizleyerek bellek sızıntısını (memory leak) önlemek.",
        "Sonsuz döngü yaratmak.",
        "Ekranı yenilemek."
      ],
      correct: 1
    },
    {
      id: 7,
      question: "React Router'da klasik <a href='/hakkimizda'> yerine neden <Link to='/hakkimizda'> kullanırız?",
      options: [
        "<a> etiketi React'te syntax hatası verir.",
        "<a> etiketi sayfayı tamamen YENİLER (reload) ve React state'leri sıfırlanır. <Link> ise sayfa yenilenmeden çok hızlı geçiş yapar (SPA mantığı).",
        "<Link> etiketinin otomatik olarak kırmızı renkte olması.",
        "Aralarında hiçbir fark yoktur."
      ],
      correct: 1
    },
    {
      id: 8,
      question: "Kullanıcı giriş yaptıktan sonra formu JavaScript (kod) üzerinden yönlendirmek için hangi kanca (Hook) kullanılır?",
      options: [
        "useNavigate()",
        "useHistory()",
        "useRedirect()",
        "useLocation()"
      ],
      correct: 0
    },
    {
      id: 9,
      question: "Aşağıdaki rotalama kodunda tarayıcı URL'i '/urun/5' olduğunda ekrana ne yazar?\n\n<Route path='/urun/:id' element={<UrunDetay />} />\n\n// UrunDetay içinde:\nconst { id } = useParams();\nreturn <h1>Ürün {id}</h1>;",
      options: [
        "Ürün id",
        "Ürün :id",
        "Ürün 5",
        "Hata verir."
      ],
      correct: 2
    },
    {
      id: 10,
      question: "React Router'da tanımlanmayan, yanlış veya geçersiz tüm adresleri yakalayıp 404 Hata sayfasına yönlendirmek için rotanın path özelliğine ne yazılır?",
      options: [
        "path='404'",
        "path='error'",
        "path='/*'",
        "path='*'"
      ],
      correct: 3
    },
    {
      id: 11,
      question: "Bir değişkenin değerini standart 'let' veya 'const' ile değiştirmek yerine neden 'useState' kullanmalıyız?",
      options: [
        "Çünkü let kullanımı React'te yasaktır.",
        "Standart değişkenler değiştiğinde React bunu fark edip arayüzü YENİDEN ÇİZMEZ (re-render atmaz). useState arayüzü otomatik günceller.",
        "useState daha az bellek harcar.",
        "let sadece sayıları tutar."
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Aşağıdaki yönlendirme kodunda 'replace' özelliğinin (prop) temel işlevi nedir?\n\n<Navigate to='/giris' replace />",
      options: [
        "Yönlendirilen sayfanın tüm renklerini varsayılana çevirir.",
        "Kullanıcının tarayıcı geçmişinde 'Geri' tuşuna bastığında yönlendirme yapan bu sayfaya tekrar düşmesini engelleyerek, geçmiş kaydını üzerine yazar.",
        "Mevcut state'i tamamen sıfırlar.",
        "Sayfayı zorla yeniler (hard refresh)."
      ],
      correct: 1
    },
    {
      id: 13,
      question: "İç içe rotalarda (Nested Routes), ana bir 'Layout' bileşeni içinde ALT SAYFALARIN (child routes) nerede gösterileceğini belirten Router bileşeni hangisidir?",
      options: [
        "<Children />",
        "<Content />",
        "<Outlet />",
        "<View />"
      ],
      correct: 2
    },
    {
      id: 14,
      question: "Aşağıdaki kullanımda butona tıklandığında ne olur?\n\nconst nav = useNavigate();\n<button onClick={() => nav(-1)}>Tıkla</button>",
      options: [
        "'-1' adlı URL'ye yönlendirir.",
        "Tarayıcı geçmişinde BİR ÖNCEKİ sayfaya (Geri) gider.",
        "Uygulamayı kapatır.",
        "Sayfanın sonuna kaydırır."
      ],
      correct: 1
    },
    {
      id: 15,
      question: "React bileşenlerinin dış dünyayla (API'ler, Timer'lar, DOM işlemleri) senkronize olmasını sağlayan ve Yan Etkileri (Side Effects) yöneten kanca (hook) hangisidir?",
      options: [
        "useContext",
        "useState",
        "useRef",
        "useEffect"
      ],
      correct: 3
    },
    {
      id: 16,
      question: "Aşağıdaki kodda butona basıldığında 'Yükleniyor...' yazısı ne zaman kaybolur?\n\nconst [yukleniyor, setYukleniyor] = useState(true);\nconst bitir = () => setYukleniyor(!yukleniyor);\n\nreturn <div>{yukleniyor && 'Yükleniyor...'} <button onClick={bitir}>Tıkla</button></div>;",
      options: [
        "Asla kaybolmaz.",
        "Butona ilk tıklandığında state 'false' olacağı için yazı DOM'dan anında kaldırılır (kaybolur).",
        "Sayfa yenilendiğinde kaybolur.",
        "Yazı yanıp söner."
      ],
      correct: 1
    },
    {
      id: 17,
      question: "useLocation Hook'unun temel görevi nedir?",
      options: [
        "Kullanıcının GPS konumunu almak.",
        "O anki URL (pathname, search, hash vb.) hakkında bilgi içeren bir nesne döndürmek.",
        "Sayfayı yenilemek.",
        "Yeni bir URL oluşturmak."
      ],
      correct: 1
    },
    {
      id: 18,
      question: "useEffect kullanırken, içindeki kodun sadece 'aramaMetni' değiştiğinde çalışmasını sağlamak için ne yapmalıyız?",
      options: [
        "İkinci parametreyi boş bırakmalıyız: useEffect(() => {...})",
        "Boş dizi vermeliyiz: useEffect(() => {...}, [])",
        "Dizinin içine state'i eklemeliyiz: useEffect(() => {...}, [aramaMetni])",
        "useEffect içinde if bloğu yazmalıyız."
      ],
      correct: 2
    },
    {
      id: 19,
      question: "React Router uygulamasını başlatmak için uygulamanın en dışını (genelde App veya main.tsx) sarmalayan sağlayıcı (Provider) aşağıdakilerden hangisidir?",
      options: [
        "<AppRouter>",
        "<BrowserRouter>",
        "<RouterStore>",
        "<RouteProvider>"
      ],
      correct: 1
    },
    {
      id: 20,
      question: "Bir state güncellemesinin hemen ardından yeni değeri console.log() ile GARANTİLİ olarak yazdırmak istiyorsak bunu nerede yapmalıyız?",
      options: [
        "set fonksiyonunun hemen bir alt satırında (örn: setSayi(1); console.log(sayi);)",
        "Bileşen dışında global bir alanda.",
        "useState'in içinde.",
        "useEffect hook'unun içinde, bağımlılık dizisine o state'i ekleyerek."
      ],
      correct: 3
    }
  ];

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentStep - 1].correct;
    const newScore = score + (isCorrect ? 5 : 0);

    if (currentStep < questions.length) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setIsFinished(true);
      
      // KRİTİK NOKTA: Modül 3 bittiği için 'modul3' gönderiyoruz ('A' harfi yanacak)
      if (newScore >= 75) {
        finishModule('modul3');
      }
    }
  };

  const resetTest = () => {
    setCurrentStep(1);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold m-0">🏆 Modül 3 Testi</h2>
      </div>

      <div className="card shadow-lg border-0 overflow-hidden rounded-4 w-100">
        {isFinished ? (
          <div className="card-body text-center py-5 bg-white">
            <div className="display-1 mb-3">{score >= 75 ? "🏅" : "⚠️"}</div>
            {score >= 75 ? (
              <>
                <h2 className="fw-bold text-success mb-3">Tebrikler! Geçtin.</h2>
                <h4 className="mb-4">Puanın: <span className="text-primary">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">"A" harfini kazandın! Modül 4'te Context, useRef ve Form yönetimine geçmeye hazırsın.</p>
                <div className="d-flex justify-content-center gap-3">
                  <button onClick={resetTest} className="btn btn-outline-secondary px-4 py-2 rounded-pill">Testi Tekrarla</button>
                  {/* MODÜL 4'E YÖNLENDİRME (İlk dersi useref) */}
                  <button onClick={() => navigate('/dersler/modul4/useref')} className="btn btn-success px-5 py-2 rounded-pill shadow">Modül 4'e Geç ⮕</button>
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
            
            <div className="bg-dark p-5 text-white text-center">
              <span className="badge bg-secondary mb-3 fs-6">Soru {currentStep} / {questions.length}</span>
              <h3 className="fw-light">{questions[currentStep - 1].question}</h3>
            </div>
            
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
                      <span className="bg-secondary bg-opacity-10 text-dark rounded-circle d-flex align-items-center justify-content-center me-4 fw-bold border" style={{ minWidth: '40px', height: '40px' }}>
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

export default Modul3Test;