import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext';

const Modul4Test: React.FC = () => {
  const navigate = useNavigate();
  const { finishModule } = useProgress();

  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

const questions = [
    {
      id: 1,
      question: "useState ile useRef arasındaki EN TEMEL fark nedir?",
      options: [
        "useRef sadece sayılarla çalışır, useState her tür veriyle.",
        "useState ile tutulan değer güncellendiğinde bileşen yeniden çizilir (re-render), useRef ile tutulan değer güncellendiğinde ise bileşen YENİDEN ÇİZİLMEZ.",
        "Aralarında hiçbir fark yoktur, aynı işi yaparlar.",
        "useRef sadece sınıf (class) bileşenlerinde kullanılır."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Aşağıdaki hatalı kodda input alanına odaklanmak (focus) için hangi düzeltme yapılmalıdır?\n\nconst inputRef = useRef(null);\ninputRef.value.focus();",
      options: [
        "focus() fonksiyonu React'te kullanılamaz.",
        "inputRef.value yerine inputRef.current yazılmalıdır. (useRef her zaman 'current' adında bir özellik döndürür).",
        "useRef(null) yerine useRef('') yazılmalıdır.",
        "Kodda hata yoktur, çalışır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Oluşturduğumuz bir referansı JSX içindeki bir HTML elemanına bağlamak için hangi özelliği (prop) kullanırız?",
      options: [
        "<input bind={inputRef} />",
        "<input id={inputRef} />",
        "<input ref={inputRef} />",
        "<input use={inputRef} />"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Aşağıdaki kodun çıktısı (davranışı) ne olur?\n\nconst sayac = useRef(0);\nconst artir = () => { sayac.current += 1; };\nreturn <button onClick={artir}>Değer: {sayac.current}</button>;",
      options: [
        "Butona tıklandığında ekrandaki değer artar.",
        "Uygulama çöker.",
        "Değer arka planda artar ancak bileşen yeniden render edilmediği için ekrandaki yazı hep 'Değer: 0' olarak kalır.",
        "Konsola hata yazdırır."
      ],
      correct: 2
    },
    {
      id: 5,
      question: "Context API (useContext) hangi React sorununu çözmek için tasarlanmıştır?",
      options: [
        "API'den yavaş veri çekme sorunu.",
        "Prop Drilling (Bir veriyi en üstteki bileşenden en alttaki bileşene iletmek için aradaki tüm bileşenlerden tek tek geçirme eziyeti).",
        "Uygulamanın SEO performansını artırma.",
        "Görsel titreme (flickering) sorunları."
      ],
      correct: 1
    },
    {
      id: 6,
      question: "Aşağıdaki kullanımda AltBilesen'in içindeki 'tema' değişkeninin değeri ne olur?\n\nconst TemaContext = createContext('light');\n// Provider KULLANILMADI:\nconst App = () => <AltBilesen />;\n// AltBilesen içinde:\nconst tema = useContext(TemaContext);",
      options: [
        "undefined",
        "Hata fırlatır.",
        "'light' (Çünkü Provider ile sarılmadığında createContext içine yazılan varsayılan değer alınır).",
        "null"
      ],
      correct: 2
    },
    {
      id: 7,
      question: "Oluşturulan bir Context verisini alt bileşenlere ulaştırmak için sarmalayıcı (Provider) bileşeninde hangi zorunlu prop kullanılır?",
      options: [
        "<AuthContext.Provider state={kullanici}>",
        "<AuthContext.Provider data={kullanici}>",
        "<AuthContext.Provider value={kullanici}>",
        "<AuthContext.Provider props={kullanici}>"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "Performans açısından kritik soru: Bir Context Provider'ın 'value' değeri değiştiğinde hangi bileşenler YENİDEN ÇİZİLİR (re-render)?",
      options: [
        "Sadece o Context'i useContext kancasıyla tüketen (okuyan) bileşenler.",
        "Uygulamadaki bütün bileşenler.",
        "Sadece Provider'ın kendisi.",
        "Hiçbir bileşen çizilmez."
      ],
      correct: 0
    },
    {
      id: 9,
      question: "React Hook Form kütüphanesinin geleneksel React formlarına göre en büyük performans avantajı nedir?",
      options: [
        "Veritabanına doğrudan bağlanması.",
        "Kontrolsüz Bileşen (Uncontrolled Components) mantığıyla çalışarak klavyeye her basışta sayfanın yeniden render olmasını engellemesi.",
        "Sadece CSS dosyalarını küçültmesi.",
        "Otomatik olarak sayfayı yenilemesi."
      ],
      correct: 1
    },
    {
      id: 10,
      question: "Aşağıdaki kodda input alanını React Hook Form sistemine nasıl DOĞRU bağlarız?\n\nconst { register } = useForm();",
      options: [
        "<input {...register('email')} />",
        "<input bind='email' />",
        "<input ref={register} name='email' />",
        "<input useForm='email' />"
      ],
      correct: 0
    },
    {
      id: 11,
      question: "<form onSubmit={handleSubmit(gonder)}> kodundaki 'handleSubmit' fonksiyonunun amacı nedir?",
      options: [
        "Sadece formu sıfırlamak.",
        "Sayfanın yenilenmesini (preventDefault) engellemek, formdaki hataları kontrol etmek ve hata yoksa verileri 'gonder' fonksiyonuna iletmek.",
        "Formun sadece enter tuşuyla çalışmasını sağlamak.",
        "Veritabanına API isteği atmak."
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Yup kütüphanesi React ekosisteminde temel olarak ne amaçla kullanılır?",
      options: [
        "Sayfa yönlendirmeleri (Routing) yapmak.",
        "Animasyon oluşturmak.",
        "Form verilerinin doğruluğunu test etmek için kırılmaz ve okunaklı Şema kuralları (Validation Schema) yazmak.",
        "Zaman hesaplamaları yapmak."
      ],
      correct: 2
    },
    {
      id: 13,
      question: "Yup kullanarak 'Şifre' ve 'Şifre Tekrar' alanlarının birbiriyle AYNI olup olmadığını kodda nasıl kontrol ederiz?",
      options: [
        "yup.string().equals('sifre')",
        "yup.string().match('sifre')",
        "yup.string().sameAs('sifre')",
        "yup.string().oneOf([yup.ref('sifre')], 'Eşleşmiyor')"
      ],
      correct: 3
    },
    {
      id: 14,
      question: "Yazdığınız Yup şemasını (schema), React Hook Form'a bağlamak için hangi aracı (resolver) kullanmalısınız?",
      options: [
        "useForm({ resolver: yupResolver(sema) })",
        "useForm({ schema: sema })",
        "useForm({ validate: sema })",
        "useForm({ bind: yup(sema) })"
      ],
      correct: 0
    },
    {
      id: 15,
      question: "Redux Toolkit'te yer alan 'createSlice' fonksiyonunun sağladığı EN BÜYÜK kolaylık nedir?",
      options: [
        "Local storage kullanımını zorunlu yapması.",
        "State, Reducer ve Action'ları tek bir dosyada (dilimde) birleştirerek geleneksel Redux'taki şablon kod (boilerplate) kalabalığını bitirmesi.",
        "Uygulamadaki tüm CSS'i yönetmesi.",
        "API isteklerini yasaklaması."
      ],
      correct: 1
    },
    {
      id: 16,
      question: "DİKKAT: Redux Toolkit kullanırken reducer içinde 'state.sayac += 1' yazarak state'i DOĞRUDAN güncelleyebilmemizin (mutate) sebebi arka planda çalışan hangi kütüphanedir?",
      options: [
        "Axios",
        "Babel",
        "Immer (Değişiklikleri algılayıp güvenli, yepyeni bir kopya state oluşturur).",
        "Lodash"
      ],
      correct: 2
    },
    {
      id: 17,
      question: "Redux Store'daki bir veriyi (state) okumak ve bu veri değiştiğinde bileşeni yeniden çizdirmek (re-render) için hangi Hook kullanılır?",
      options: [
        "useStore()",
        "useSelector()",
        "useDispatch()",
        "useReducer()"
      ],
      correct: 1
    },
    {
      id: 18,
      question: "Redux'ta yazılan bir eylemi (action) tetiklemek ve state'i değiştirmek için bileşen içinden nasıl bir çağrım yapılır?",
      options: [
        "store.update(artir())",
        "setStore(artir())",
        "dispatch(artir())",
        "useAction(artir())"
      ],
      correct: 2
    },
    {
      id: 19,
      question: "Aşağıdaki Yup kuralının çıktısı ne olur? \n\nyup.number().typeError('Geçersiz').min(18)\n\nKullanıcı input'a 'onsekiz' yazarsa:",
      options: [
        "Metni otomatik olarak 18'e çevirir ve form onaylanır.",
        "Harf girildiği için number'a dönüşemez ve ekranda 'Geçersiz' hatası gösterilir.",
        "Form hata vermeden gönderilir.",
        "Uygulama beyaz ekrana düşer."
      ],
      correct: 1
    },
    {
      id: 20,
      question: "Aşağıdaki 'incrementByAmount' action'ı dispatch edildiğinde reducer'a giden 'action' nesnesinin yapısı nasıldır?\n\ndispatch(incrementByAmount(5));",
      options: [
        "Sadece 5 sayısı gider.",
        "{ action: 'incrementByAmount', data: 5 }",
        "{ type: 'counter/incrementByAmount', payload: 5 } (Değer, payload adlı özellikte taşınır).",
        "Hiçbir nesne gitmez, state doğrudan 5 olur."
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
      
      // KRİTİK NOKTA: Modül 4 bittiği için 'modul4' gönderiyoruz ('C' harfi yanacak)
      if (newScore >= 75) {
        finishModule('modul4');
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
        <h2 className="text-primary fw-bold m-0">🏆 Modül 4 Testi</h2>
      </div>

      <div className="card shadow-lg border-0 overflow-hidden rounded-4 w-100">
        {isFinished ? (
          <div className="card-body text-center py-5 bg-white">
            <div className="display-1 mb-3">{score >= 75 ? "🏅" : "⚠️"}</div>
            {score >= 75 ? (
              <>
                <h2 className="fw-bold text-success mb-3">Tebrikler! Geçtin.</h2>
                <h4 className="mb-4">Puanın: <span className="text-primary">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">"C" harfini kazandın! Son durak olan Modül 5'e (İleri Seviye Hooks) geçmeye hazırsın.</p>
                <div className="d-flex justify-content-center gap-3">
                  <button onClick={resetTest} className="btn btn-outline-secondary px-4 py-2 rounded-pill">Testi Tekrarla</button>
                  {/* MODÜL 5'E YÖNLENDİRME (İlk dersi usereducer) */}
                  <button onClick={() => navigate('/dersler/modul5/usereducer')} className="btn btn-success px-5 py-2 rounded-pill shadow">Modül 5'e Geç ⮕</button>
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

export default Modul4Test;