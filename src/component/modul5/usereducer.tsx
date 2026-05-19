import React, { useState } from 'react';

const UseReducerDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
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
      id: 2,
      question: "useReducer kullanırken 'dispatch' fonksiyonuna gönderilen nesnenin içindeki 'payload' ne işe yarar?\n\ndispatch({ type: 'KAYIT_EKLE', payload: { isim: 'Ali' } })",
      options: [
        "React'in zorunlu kıldığı bir anahtar kelimedir, yazılmazsa uygulama çöker.",
        "İşlemin ne kadar süreceğini (gecikmesini) belirler.",
        "Sadece Redux'ta kullanılır, useReducer'da yeri yoktur.",
        "Yapılacak eylem (action) için gereken ekstra veriyi (yükü) taşır."
      ],
      correct: 3
    },
    {
      id: 3,
      question: "Aşağıdaki kancadan (hook) dönen değerleri kullanarak 'yas' değerini 21 yapmak için hangi kodu çalıştırmalıyız?\n\nconst [state, dispatch] = useReducer(reducer, { yas: 20 });",
      options: [
        "state.yas = 21;",
        "setYas(21);",
        "dispatch({ type: 'YAS_GUNCELLE', payload: 21 });",
        "reducer('YAS_GUNCELLE', 21);"
      ],
      correct: 2
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
        <h2 className="text-primary fw-bold">⚙️ useReducer ve Karmaşık Durum Yönetimi</h2>
        <p className="lead text-muted">
          Birbirine bağlı çoklu state'leri ve karmaşık mantıkları (logic) tek bir merkezden, Redux mantığıyla yönetin.
        </p>
      </div>

      {/* 1. Bölüm: Neden useReducer? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden useState Yerine useReducer?</h4>
          <p>
            <code>useState</code> basit değerler (bir yazı, bir sayı veya boolean) için mükemmeldir. Ancak bir alışveriş sepeti veya form sihirbazı yapıyorsanız, state'ler birbirine girmeye başlar. 
          </p>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-danger bg-opacity-10 rounded-3 h-100 border-start border-4 border-danger text-dark">
                <h6 className="fw-bold">useState (Kötü Senaryo)</h6>
                <code className="d-block small text-dark mb-2">
                  const [yukleniyor, setYukleniyor] = useState(false);<br/>
                  const [hata, setHata] = useState("");<br/>
                  const [veri, setVeri] = useState([]);
                </code>
                <p className="small mb-0">API'den veri çekerken bu 3 state'i aynı anda tek tek güncellemek kodu kalabalıklaştırır ve hata yapma riskini artırır.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-success bg-opacity-10 rounded-3 h-100 border-start border-4 border-success text-dark">
                <h6 className="fw-bold">useReducer (İyi Senaryo)</h6>
                <p className="small mb-0">
                  Tüm bu ilişkili değerleri tek bir <strong>Durum Nesnesinde (State Object)</strong> toplarsınız. Güncelleme kurallarını ise bileşenin dışında yazarak bileşeninizin içini tertemiz tutarsınız.
                </p>
              </div>
            </div>
          </div>
          <div className="alert alert-secondary border-0 mb-0 py-2">
            💡 <strong>Not:</strong> <code>useReducer</code> React'in çekirdeğinde yer alır, bu yüzden kullanmak için dışarıdan npm ile herhangi bir paket (kütüphane) kurmanıza gerek yoktur.
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel Kavramlar */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. useReducer'ın Temel Kavramları</h4>
          <p>Tıpkı Redux gibi, <code>useReducer</code> da üç ana oyuncu ile çalışır:</p>
          <ul className="list-group list-group-flush mb-0">
            <li className="list-group-item bg-transparent px-0 border-0">
              <strong>1. State (Durum):</strong> Verilerinizin tutulduğu mevcut nesnedir.
            </li>
            <li className="list-group-item bg-transparent px-0 border-0">
              <strong>2. Action (Eylem):</strong> Ne yapılmasını istediğinizi anlatan mesajdır. Genellikle <code>{`{ type: 'VERI_CEK', payload: veri }`}</code> şeklinde bir JavaScript nesnesidir.
            </li>
            <li className="list-group-item bg-transparent px-0 border-0">
              <strong>3. Reducer (İndirgeyici) Fonksiyon:</strong> Mevcut <code>state</code>'i ve gelen <code>action</code>'ı alır, kurallara bakarak (switch-case) geriye <strong>YEPYENİ</strong> bir state kopyası döndürür.
            </li>
          </ul>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="clipboard">📋</span> Modül Ödevi: Gelişmiş Todo (Yapılacaklar) Uygulaması</h4>
        <p className="mb-3">
          Sıfırdan bir Reducer yazıp bir bileşene bağlayarak Yapılacaklar Listesi oluşturacağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Bileşeni ve Reducer'ı Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> içine <code>TodoUygulamasi.tsx</code> açın ve kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useReducer, useState } from 'react';

// 1. Başlangıç State'i
const baslangicState = [{ id: 1, metin: "React Öğren", tamamlandi: false }];

// 2. Reducer Fonksiyonu (Bileşen dışında tanımlanır)
const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'EKLE':
      return [...state, { id: Date.now(), metin: action.payload, tamamlandi: false }];
    case 'SİL':
      return state.filter((todo: any) => todo.id !== action.payload);
    case 'GÜNCELLE':
      return state.map((todo: any) => 
        todo.id === action.payload ? { ...todo, tamamlandi: !todo.tamamlandi } : todo
      );
    default:
      return state;
  }
};

const TodoUygulamasi: React.FC = () => {
  // 3. Kancayı bağla
  const [todos, dispatch] = useReducer(todoReducer, baslangicState);
  const [yeniGorev, setYeniGorev] = useState("");

  const gorevEkle = () => {
    if (yeniGorev.trim() === "") return;
    dispatch({ type: 'EKLE', payload: yeniGorev }); // Action gönder
    setYeniGorev("");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc' }}>
      <h3>Görevlerim</h3>
      <input value={yeniGorev} onChange={(e) => setYeniGorev(e.target.value)} />
      <button onClick={gorevEkle}>Ekle</button>

      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} style={{ textDecoration: todo.tamamlandi ? 'line-through' : 'none' }}>
            {todo.metin}
            <button onClick={() => dispatch({ type: 'GÜNCELLE', payload: todo.id })}>✓</button>
            <button onClick={() => dispatch({ type: 'SİL', payload: todo.id })}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoUygulamasi;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import TodoUygulamasi from './components/TodoUygulamasi';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>useReducer Testi</h1>
      <TodoUygulamasi />
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
            <p className="text-muted mb-4 fs-5">useReducer kancasının arkasında yatan saf fonksiyon (pure function) mantığını, action yapısını ve referans yenilemeyi çok iyi kavradın.</p>
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

export default UseReducerDers;