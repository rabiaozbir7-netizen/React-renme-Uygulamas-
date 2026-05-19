import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext';

const Modul2Test: React.FC = () => {
  const navigate = useNavigate();
  const { finishModule } = useProgress();

  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
const questions = [
    {
      id: 1,
      question: "React'te 'Props' (Properties) kavramının temel amacı nedir?",
      options: [
        "Bileşenlere (component) CSS stilleri eklemek.",
        "Üst bileşenden (Parent) alt bileşene (Child) veri aktarmak.",
        "Uygulamanın durumunu (state) global olarak yönetmek.",
        "Veritabanına doğrudan veri kaydetmek."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst Bilesen = ({ isim }) => <h1>{isim}</h1>;\nreturn <Bilesen isim='Ali' />;",
      options: [
        "<h1>{isim}</h1>",
        "Derleme hatası verir.",
        "<h1>Ali</h1>",
        "Boş bir h1 etiketi oluşur."
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Aşağıdaki kod nasıl bir soruna veya hataya yol açar?\n\nconst Profil = (props) => {\n  props.yas = 30; // Yaşı zorla 30 yapıyoruz\n  return <p>{props.yas}</p>;\n};",
      options: [
        "Hiçbir sorun olmaz, ekranda 30 yazar.",
        "Props'lar 'Salt-Okunur' (Read-Only) olduğu için React bu doğrudan değiştirmeye (mutate) izin vermez ve hata fırlatır.",
        "Sonsuz döngüye girer.",
        "Sadece TypeScript kullanılıyorsa hata verir."
      ],
      correct: 1
    },
    {
      id: 4,
      question: "Aşağıdaki kullanımda neden React derleme hatası fırlatır?\n\n<Kullanici yas=25 />",
      options: [
        "Bileşen adı küçük harfle başlamalıdır.",
        "Props olarak sayı (number), boolean veya nesne gönderilirken tırnak işareti değil, süslü parantez (yas={25}) kullanılmalıdır.",
        "yas prop'u önceden tanımlanmamıştır.",
        "Kapanış etiketi yanlıştır."
      ],
      correct: 1
    },
    {
      id: 5,
      question: "Aşağıdaki koşullu render (conditional rendering) kodunun çıktısı ne olur?\n\nconst mesajVar = true;\nreturn <div>{mesajVar && <span>Yeni Mesaj!</span>}</div>;",
      options: [
        "true",
        "Boş div render edilir.",
        "Derleme hatası verir.",
        "Yeni Mesaj!"
      ],
      correct: 3
    },
    {
      id: 6,
      question: "Koşullu render işleminde 'if-else' blokları JSX içinde doğrudan kullanılamaz. 'Doğruysa A'yı, Yanlışsa B'yi göster' mantığı için hangisi kullanılır?",
      options: [
        "Ternary (Üçlü) Operatör (? :)",
        "Sadece switch-case kullanılır.",
        "for döngüleri",
        "&& operatörü"
      ],
      correct: 0
    },
    {
      id: 7,
      question: "DİKKAT! Aşağıdaki kodun çıktısı nedir?\n\nconst sayi = 0;\nreturn <div>{sayi && <p>Sonuç</p>}</div>;",
      options: [
        "Sonuç",
        "Boş div görünür.",
        "0 rakamını ekrana yazar. (Çünkü JavaScript'te 0 falsy'dir, && operatörü ilk falsy değeri ekrana basar).",
        "Hata fırlatır."
      ],
      correct: 2
    },
    {
      id: 8,
      question: "Bir dizi (array) içindeki verileri React'te alt alta listeleyip ekrana basmak için genellikle hangi JavaScript fonksiyonu kullanılır?",
      options: ["filter()", "reduce()", "forEach()", "map()"],
      correct: 3
    },
    {
      id: 9,
      question: "Aşağıdaki listeleme kodunda konsolda 'Warning' (Uyarı) çıkmasına sebep olan KÖTÜ KULLANIM nedir?\n\n{veri.map(eleman => <li>{eleman.ad}</li>)}",
      options: [
        "map() içinde süslü parantez eksik.",
        "li elemanına benzersiz bir 'key' prop'u verilmemiştir.",
        "eleman.ad string olduğu için ekrana basılamaz.",
        "Dizi elemanları li ile gösterilemez."
      ],
      correct: 1
    },
    {
      id: 10,
      question: "Listelerde 'key' değeri olarak dizinin o anki indeksini (index) kullanmak neden TEHLİKELİDİR?",
      options: [
        "Kodun çalışmasını tamamen durdurur.",
        "İndeksler metin (string) olmadığı için.",
        "Eğer liste sıralanır, filtrelenir veya araya eleman eklenirse indeksler değişeceği için React'in performansını ve DOM takibini bozar.",
        "Hata vermez, React resmi olarak bunu önerir."
      ],
      correct: 2
    },
    {
      id: 11,
      question: "TypeScript'in React projelerinde kullanılmasının en büyük faydası nedir?",
      options: [
        "Projenin boyutunu (bundle size) küçültmesi.",
        "Değişken ve Props tiplerini önceden belirleyerek hataları (bugs) tarayıcıda değil, daha kod yazarken (compile-time) yakalaması.",
        "CSS yazmayı ortadan kaldırması.",
        "Uygulamanın internet olmadan çalışmasını sağlaması."
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Aşağıdaki TypeScript arayüzüne (interface) göre hangi bileşen çağrımı DOĞRUDUR?\n\ninterface Props { isim: string; yas?: number; }",
      options: [
        "<Bilesen isim={25} />",
        "<Bilesen yas={30} />",
        "<Bilesen isim='Can' /> (yas opsiyonel olduğu için gönderilmese de hata vermez).",
        "<Bilesen />"
      ],
      correct: 2
    },
    {
      id: 13,
      question: "Aşağıdaki TypeScript hatasının ana sebebi nedir?\n\ninterface UrunProps { fiyat: number }\n<Urun fiyat='50' />",
      options: [
        "Kitap kelimesi tırnak içinde olduğu için.",
        "Interface kullanımı yasak olduğu için.",
        "'fiyat' prop'una number (sayı) beklenirken, '50' şeklinde string (metin) gönderildiği için.",
        "Bileşen kapatılmadığı için."
      ],
      correct: 2
    },
    {
      id: 14,
      question: "Aşağıdaki Union Type tanımında 'durum' prop'u neleri kabul eder?\n\ndurum: 'aktif' | 'pasif' | 'beklemede';",
      options: [
        "Herhangi bir metin (string) değeri alabilir.",
        "Sadece sayılar alabilir.",
        "Aynı anda hem 'aktif' hem 'pasif' olmak zorundadır.",
        "Sadece bu üç spesifik metinden birini kabul eder, başka kelime yazılırsa kod hata verir."
      ],
      correct: 3
    },
    {
      id: 15,
      question: "Bir bileşene hem veri hem de bir fonksiyon prop olarak gönderilebilir mi?",
      options: [
        "Hayır, sadece değişkenler gönderilebilir.",
        "Evet, örneğin bir butona tıklandığında üst bileşeni (Parent) haberdar etmek için onClick gibi fonksiyonlar gönderilebilir.",
        "Sadece Redux kullanılıyorsa mümkündür.",
        "Fonksiyonlar sadece Class bileşenlerinde gönderilir."
      ],
      correct: 1
    },
    {
      id: 16,
      question: "TypeScript'te bir fonksiyonun HİÇBİR ŞEY DÖNDÜRMEDİĞİNİ (örneğin sadece bir state'i güncellediğini) belirtmek için hangi dönüş tipi kullanılır?",
      options: ["null", "undefined", "void", "any"],
      correct: 2
    },
    {
      id: 17,
      question: "Aşağıdaki kodun çıktısı ne olur?\n\nconst Buton = ({ renk = 'mavi' }) => <button>{renk}</button>;\nreturn <Buton />;",
      options: [
        "Ekranda boş bir buton çıkar.",
        "Hata fırlatır, renk prop'u zorunludur.",
        "Butonun içinde 'mavi' yazar (Çünkü prop gönderilmese bile varsayılan değer atanmıştır).",
        "Derleme hatası verir."
      ],
      correct: 2
    },
    {
      id: 18,
      question: "Aşağıdaki kullanımda <Kutu> etiketleri arasına yazılan 'İçerik' metnine, Kutu bileşeni içinden HANGİ özel prop ismiyle erişilir?\n\n<Kutu>\n  <p>İçerik</p>\n</Kutu>",
      options: ["props.content", "props.children", "props.inner", "props.data"],
      correct: 1
    },
    {
      id: 19,
      question: "React Fonksiyonel Bileşenlerini (Functional Components) TypeScript ile tanımlarken, props'lara interface bağlamak için kullanılan standart tip hangisidir?",
      options: ["React.FC (veya React.FunctionComponent)", "React.Component", "React.App", "React.Node"],
      correct: 0
    },
    {
      id: 20,
      question: "React ekosisteminde çok duyacağınız 'Prop Drilling' (Props Sondajı) terimi ne anlama gelir?",
      options: [
        "Props'ların güvenlik açığı oluşturmasıdır.",
        "TypeScript'in props'ları derinlemesine taramasıdır.",
        "Bir veriyi en üstteki bileşenden en alttaki bileşene iletmek için, aradaki hiç kullanmayacak olan bileşenlerden bile tek tek geçirilmesi eziyetidir.",
        "Props'ları veritabanına kaydetmektir."
      ],
      correct: 2
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
      
      // KRİTİK NOKTA: Modül 2 bittiği için 'modul2' parametresini gönderiyoruz ('E' harfi yanacak)
      if (newScore >= 75) {
        finishModule('modul2');
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
        <h2 className="text-primary fw-bold m-0">🏆 Modül 2 Testi</h2>
      </div>

      <div className="card shadow-lg border-0 overflow-hidden rounded-4 w-100">
        {isFinished ? (
          <div className="card-body text-center py-5 bg-white">
            <div className="display-1 mb-3">{score >= 75 ? "🏅" : "⚠️"}</div>
            {score >= 75 ? (
              <>
                <h2 className="fw-bold text-success mb-3">Tebrikler! Geçtin.</h2>
                <h4 className="mb-4">Puanın: <span className="text-primary">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">"E" harfini kazandın! Modül 3'te Hooks yapısına geçmeye hazırsın.</p>
                <div className="d-flex justify-content-center gap-3">
                  <button onClick={resetTest} className="btn btn-outline-secondary px-4 py-2 rounded-pill">Testi Tekrarla</button>
                  {/* MODÜL 3'E YÖNLENDİRME (İlk dersi useState) */}
                  <button onClick={() => navigate('/dersler/modul3/usestate')} className="btn btn-success px-5 py-2 rounded-pill shadow">Modül 3'e Geç ⮕</button>
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

export default Modul2Test;