import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../ProgressContext';

const Modul5Test: React.FC = () => {
  const navigate = useNavigate();
  const { finishModule } = useProgress();

  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

 const questions = [
    {
      id: 1,
      question: "useReducer Hook'u hangi durumlarda useState yerine tercih edilmelidir?",
      options: [
        "Sadece basit bir sayacın değerini tutarken.",
        "Sadece API'den veri çekerken.",
        "Birbirine bağlı birden fazla state'in olduğu ve güncelleme mantığının (logic) karmaşıklaştığı durumlarda.",
        "DOM elemanlarına doğrudan erişmek gerektiğinde."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "DİKKAT: Aşağıdaki reducer fonksiyonunda büyük bir hata vardır. Butona basılsa bile ekrandaki sayaç NEDEN güncellenmez?\n\nconst reducer = (state, action) => {\n  if (action.type === 'ARTIR') {\n    state.sayac = state.sayac + 1; // Hata burada\n    return state;\n  }\n};",
      options: [
        "If bloğu yerine Switch-Case kullanılması zorunlu olduğu için.",
        "Mevcut state doğrudan değiştirilmiş (mutate edilmiş) ve aynı nesne referansı geri döndürülmüştür. React nesnenin referansı değişmediği için arayüzü yeniden çizmez (re-render atmaz).",
        "return state; yazılmaması gerektiği için.",
        "Kodda hiçbir hata yoktur, mükemmel çalışır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "useReducer kullanırken 'dispatch' fonksiyonuna gönderilen nesnenin içindeki 'payload' ne işe yarar?",
      options: [
        "Sadece Redux'ta kullanılır, useReducer'da yeri yoktur.",
        "İşlemin ne kadar süreceğini (gecikmesini) belirler.",
        "React'in zorunlu kıldığı bir anahtar kelimedir, yazılmazsa uygulama çöker.",
        "Yapılacak eylem (action) için gereken ekstra veriyi (yükü) taşır (Örn: Eklenecek yeni öğenin metni)."
      ],
      correct: 3
    },
    {
      id: 4,
      question: "Aşağıdaki kancadan (hook) dönen değerleri kullanarak state içindeki 'yas' değerini 21 yapmak için hangi kodu çalıştırmalıyız?\n\nconst [state, dispatch] = useReducer(reducer, { yas: 20 });",
      options: [
        "state.yas = 21;",
        "setYas(21);",
        "dispatch({ type: 'YAS_GUNCELLE', payload: 21 });",
        "reducer('YAS_GUNCELLE', 21);"
      ],
      correct: 2
    },
    {
      id: 5,
      question: "useMemo ve useCallback arasındaki EN TEMEL fark nedir?",
      options: [
        "useMemo bir fonksiyonun ÇIKTISINI (değerini) belleğe alır, useCallback ise fonksiyonun KENDİSİNİ belleğe alır.",
        "useMemo sadece API isteklerinde, useCallback sadece DOM işlemlerinde kullanılır.",
        "useMemo asenkron çalışır, useCallback senkron çalışır.",
        "Aralarında hiçbir fark yoktur."
      ],
      correct: 0
    },
    {
      id: 6,
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
      id: 7,
      question: "Aşağıdaki kod parçasının performans açısından değerlendirmesi nedir?\n\nconst selam = useMemo(() => 'Merhaba Dünya', []);\nreturn <div>{selam}</div>;",
      options: [
        "Mükemmel bir kullanımdır, uygulamayı hızlandırır.",
        "Kötü bir kullanımdır. Basit bir metni (string) bellekte tutmak için useMemo çağırmak, useMemo'nun kendi çalışma maliyetinden dolayı performansı artırmak yerine DÜŞÜRÜR.",
        "Derleme hatası verir.",
        "Metni otomatik olarak kalın (bold) yapar."
      ],
      correct: 1
    },
    {
      id: 8,
      question: "DİKKAT (Stale Closure Hatası): Aşağıdaki kodda butona basıp 'sayi'yi 5 yapsak bile, 'goster' fonksiyonunu çağırdığımızda konsola hep 0 yazdırır. Bunun sebebi nedir?\n\nconst [sayi, setSayi] = useState(0);\nconst goster = useCallback(() => {\n  console.log(sayi);\n}, []); // <-- Sorun burada",
      options: [
        "console.log asenkron çalıştığı için.",
        "Bağımlılık dizisi boş [] bırakıldığı için fonksiyon ilk render'daki 'sayi' değeriyle (0) belleğe mühürlenmiştir. Güncel değeri görmesi için diziye [sayi] yazılmalıdır.",
        "useCallback geriye değer döndürmediği için.",
        "useState yerine useRef kullanılması gerektiği için."
      ],
      correct: 1
    },
    {
      id: 9,
      question: "useCallback ile sarmaladığınız bir fonksiyonu Alt Bileşene (Child) gönderdiğinizde, Alt Bileşenin gereksiz yere render edilmesini engellemek için Alt Bileşeni hangi özellikle sarmalamalısınız?",
      options: [
        "React.Suspense",
        "React.Fragment",
        "useContext",
        "React.memo"
      ],
      correct: 3
    },
    {
      id: 10,
      question: "useEffect ve useLayoutEffect arasındaki KRİTİK zamanlama farkı nedir?",
      options: [
        "Fark yoktur, ikisi de aynı anda çalışır.",
        "useEffect tarayıcı ekranı BOYADIKTAN (paint) sonra asenkron çalışır; useLayoutEffect ise DOM güncellenip ekran BOYANDIKTAN HEMEN ÖNCE senkron olarak çalışır.",
        "useLayoutEffect sadece sayfa kapatılırken çalışır.",
        "useEffect senkron, useLayoutEffect asenkron çalışır."
      ],
      correct: 1
    },
    {
      id: 11,
      question: "Aşağıdaki kod çalıştığında kullanıcı ekranda görsel olarak ne tecrübe eder?\n\nconst [deger, setDeger] = useState(0);\nuseEffect(() => {\n  setDeger(100);\n}, []);\nreturn <div>{deger}</div>;",
      options: [
        "Kullanıcı anında sadece '100' değerini görür.",
        "Kullanıcı önce saliselik bir an için '0' görür, ardından aniden '100'e dönüşür (Titreme/Flicker oluşur).",
        "Sayfa hata verir ve beyaz ekrana düşer.",
        "Değer sonsuza kadar '0' kalır."
      ],
      correct: 1
    },
    {
      id: 12,
      question: "Bir önceki sorudaki titremeyi (flicker) engellemek ve kullanıcının sadece SONDURUMU (100) görmesini sağlamak için ne yapmalıyız?",
      options: [
        "useState(100) olarak başlatıp useEffect'i silmeliyiz VEYA illaki kanca kullanılacaksa useEffect yerine useLayoutEffect kullanmalıyız.",
        "useEffect içine setTimeout eklemeliyiz.",
        "useMemo kullanmalıyız.",
        "Sürekli ekranı yenilemeliyiz."
      ],
      correct: 0
    },
    {
      id: 13,
      question: "Aşağıdaki kodun kullanımında yatan BÜYÜK TEHLİKE nedir?\n\nuseLayoutEffect(() => {\n  let i = 0;\n  while(i < 9999999999) i++; // Çok ağır bir matematiksel işlem\n}, []);",
      options: [
        "Hiçbir tehlikesi yoktur, arka planda asenkron olarak sessizce çalışır.",
        "useLayoutEffect senkron (bloklayıcı) olduğu için, bu milyarlık döngü bitene kadar tarayıcı ekranı ÇİZEMEZ ve kullanıcı sitenin tamamen donduğunu zanneder.",
        "Sadece mobil cihazlarda çalışmasını engeller.",
        "Sonsuz döngü yaratır."
      ],
      correct: 1
    },
    {
      id: 14,
      question: "Modern React uygulamalarında 'React Query' (TanStack Query) kütüphanesinin TEMEL kullanım amacı nedir?",
      options: [
        "Sadece CSS stillerini yönetmek.",
        "Sayfa yönlendirmeleri (Routing) yapmak.",
        "Sunucu durumunu (Server State) yönetmek; yani API'den veri çekme, önbelleğe alma (caching), yüklenme (loading) ve hata durumlarını otomatikleştirmek.",
        "Kullanıcıdan form verisi almak."
      ],
      correct: 2
    },
    {
      id: 15,
      question: "Aşağıdaki TanStack Query kodunda yer alan 'queryKey' dizisinin temel görevi nedir?\n\nuseQuery({\n  queryKey: ['kullanici', id],\n  queryFn: () => fetchUser(id)\n});",
      options: [
        "Sadece kodun okunabilirliğini artırmak için yazılan bir etikettir.",
        "Gelen verinin bellekte (cache) benzersiz bir kimlikle saklanmasını sağlar. 'id' değiştiğinde bunu farklı bir veri olarak algılayıp yeni istek atar.",
        "API adresinin sonuna otomatik olarak '/kullanici/id' ekler.",
        "Sadece POST isteklerinde kullanılır."
      ],
      correct: 1
    },
    {
      id: 16,
      question: "React Query'de useMutation ile sunucuya yeni bir 'Todo' ekledik. Ekleme başarılı olduktan sonra ekrandaki listenin anında güncellenmesi (cache'in silinip verinin tekrar çekilmesi) için hangi kod çalıştırılmalıdır?",
      options: [
        "window.location.reload();",
        "setTodos([...todos, yeniTodo]);",
        "queryClient.invalidateQueries({ queryKey: ['todos'] });",
        "queryClient.clearCache();"
      ],
      correct: 2
    },
    {
      id: 17,
      question: "Aşağıdaki kodda 'staleTime: 5000' kullanılmıştır. Kullanıcı sayfayı açtıktan 2 saniye sonra başka bir sekmeye gidip tekrar bu sekmeye dönerse (Window Focus) ne olur?\n\nuseQuery({\n  queryKey: ['veriler'],\n  queryFn: fetchVeri,\n  staleTime: 5000\n});",
      options: [
        "Sayfa çöker.",
        "Arka planda API'ye tekrar istek atar (Çünkü sekme değişti).",
        "Veri henüz 5 saniyeyi doldurmadığı (hala 'fresh/taze' olduğu) için arka planda yeni bir istek ATILMAZ.",
        "Veriler ekrandan silinir."
      ],
      correct: 2
    },
    {
      id: 18,
      question: "React Query'de bir isteğin durumunu kontrol eden 'isLoading' ve 'isFetching' arasındaki fark nedir?",
      options: [
        "Fark yoktur, ikisi de aynıdır.",
        "'isLoading' sadece verinin HİÇ OLMADIĞI ilk yükleme anında true olur. 'isFetching' ise arka planda yapılan sessiz güncellemeler dahil HER veri çekiminde true olur.",
        "'isFetching' sadece hataları gösterir.",
        "'isLoading' sadece mutation (POST) işlemlerinde kullanılır."
      ],
      correct: 1
    },
    {
      id: 19,
      question: "Reducer fonksiyonları 'Pure Function' (Saf Fonksiyon) olmalıdır kuralı aşağıdakilerden hangisini KESİNLİKLE YASAKLAR?",
      options: [
        "Reducer'ın geriye yeni bir state nesnesi döndürmesini.",
        "Reducer içinde switch-case kullanılmasını.",
        "Reducer'ın içinde API'ye istek atmayı (fetch/axios) veya mevcut state'i (state.deger = 5 gibi) doğrudan değiştirmeyi.",
        "Action içinde payload gönderilmesini."
      ],
      correct: 2
    },
    {
      id: 20,
      question: "Tüm performans kancalarıyla (useMemo, useCallback) ilgili en büyük yanılgı nedir?",
      options: [
        "Sadece sınıf (class) bileşenlerde çalışmaları.",
        "Bu kancaların ücretsiz (maliyetsiz) olduğu yanılgısı. Kancaların kendisi de bellek harcadığı için her ufak değişkene eklendiklerinde performansı artırmak yerine düşürürler.",
        "Sadece büyük projelerde hata vermeleri.",
        "Uygulamanın CSS'ini bozmaları."
      ],
      correct: 1
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
      
      // KRİTİK NOKTA: Son modül bittiği için 'modul5' gönderiyoruz ('T' harfi yanacak)
      if (newScore >= 75) {
        finishModule('modul5');
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
        <h2 className="text-primary fw-bold m-0">🏆 Modül 5 Testi (Final)</h2>
      </div>

      <div className="card shadow-lg border-0 overflow-hidden rounded-4 w-100">
        {isFinished ? (
          <div className="card-body text-center py-5 bg-white">
            <div className="display-1 mb-3">{score >= 75 ? "🎓" : "⚠️"}</div>
            {score >= 75 ? (
              <>
                <h2 className="fw-bold text-success mb-3">Tebrikler, Uzman Seviyesine Ulaştın!</h2>
                <h4 className="mb-4">Puanın: <span className="text-primary">{score} / 100</span></h4>
                <div className="alert alert-success d-inline-block px-4 py-3 mb-4 rounded-4 shadow-sm">
                  <h4 className="fw-bold text-dark mb-0">"T" harfini kazandın ve REACT kelimesini tamamladın! 🎉</h4>
                </div>
                <p className="text-muted mb-4 fs-5 px-5">
                  İleri seviye performans ve optimizasyon konularını başarıyla tamamladın. Artık süper hızlı ve performanslı React uygulamaları geliştirebilirsin.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button onClick={resetTest} className="btn btn-outline-secondary px-4 py-2 rounded-pill">Testi Tekrarla</button>
                  {/* FİNAL: Ana Sayfaya veya Başarı sayfasına yönlendirme */}
                  <button onClick={() => navigate('/')} className="btn btn-primary px-5 py-2 rounded-pill shadow fw-bold">Ana Sayfaya Dön 🏠</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="fw-bold text-danger mb-3">Başarısız Oldun.</h2>
                <h4 className="mb-4">Puanın: <span className="text-danger">{score} / 100</span></h4>
                <p className="text-muted mb-4 fs-5">Son harfi yakmak ve eğitimi tamamlamak için en az 75 puan almalısın. Pes etme!</p>
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

export default Modul5Test;