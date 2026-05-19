import React, { useState } from 'react';

const ReduxToolkitDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki 'incrementByAmount' action'ı dispatch edildiğinde reducer'a giden 'action' nesnesi (object) tam olarak nasıl görünür?\n\n// Slice içinde:\nincrementByAmount: (state, action) => {\n  state.value += action.payload;\n}\n\n// Bileşen içinde çağrımı:\ndispatch(incrementByAmount(5));",
      options: [
        "5",
        "{ type: 'counter/incrementByAmount', payload: 5 }",
        "{ action: 'incrementByAmount', data: 5 }",
        "Sadece state.value değerini 5 yapar, ortada bir nesne yoktur."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Redux Toolkit'te 'createSlice' kullanırken state'i doğrudan güncelliyormuşuz gibi (mutate) kod yazabilmemizin (örn: state.value = 5) sebebi hangi kütüphanenin arka planda çalışmasıdır?",
      options: [
        "Axios",
        "React Router",
        "Immer",
        "Babel"
      ],
      correct: 2
    },
    {
      id: 3,
      question: "Redux Store'daki bir veriyi (state) okumak ve değiştiğinde bileşeni yeniden çizdirmek (re-render) için hangi Hook'u KESİNLİKLE kullanmalıyız?\n\nconst kullaniciAdi = _____((state) => state.kullanici.ad);",
      options: [
        "useState",
        "useReducer",
        "useDispatch",
        "useSelector"
      ],
      correct: 3
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
      {/* Başlık */}
      <div className="mb-4">
        <h2 className="text-primary fw-bold">⚛️ Redux Toolkit (RTK)</h2>
        <p className="lead text-muted">
          Modern ve güçlü global state yönetimi ile "Prop Drilling" (veri taşıma) karmaşasına son verin.
        </p>
      </div>

      {/* 1. Bölüm: Neden RTK? */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Neden Redux Toolkit?</h4>
          <p>
            Eski (geleneksel) Redux'ta basit bir sayaç için bile Action Types, Action Creators ve Switch-Case tabanlı karmaşık Reducer'lar yazmak gerekiyordu. <strong>Redux Toolkit (RTK)</strong>, Redux'ın resmi yaratıcıları tarafından yazılan ve tüm bu hamallığı bitiren kütüphanedir.
          </p>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold">Slice Mantığı</h6>
                <p className="small mb-0">State, Reducer ve Action'ları tek bir dosyada (Slice) birleştirerek kodu 3'te 1 oranında azaltır.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-success">
                <h6 className="fw-bold">Immer.js Desteği</h6>
                <p className="small mb-0">Eski Redux'ta state'i kopyalamak zorundaydık (<code>...state</code>). RTK'de <code>state.deger = 5</code> diyerek doğrudan (mutate) güncelleyebilirsiniz.</p>
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-dark rounded border-start border-4 border-info">
            <h6 className="fw-bold text-info mb-2">Kurulum</h6>
            <code className="text-warning">npm install @reduxjs/toolkit react-redux</code>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Slice Oluşturma */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Bir "Slice" Oluşturma</h4>
          <p>Redux'ta her konunun kendi "Slice"ı (Dilimi) olur. (Örn: Sepet Slice, Kullanıcı Slice).</p>
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Slice Oluşturuluyor
const sayacSlice = createSlice({
  name: 'sayac', // Slice'ın benzersiz adı
  initialState: { deger: 0 }, // Başlangıç durumu
  
  // 2. Reducer'lar (Durumu değiştiren fonksiyonlar)
  reducers: {
    artir: (state) => { 
      state.deger += 1; // Immer sayesinde doğrudan güncelliyoruz!
    },
    ozelArtir: (state, action: PayloadAction<number>) => {
      state.deger += action.payload; // Dışarıdan gelen veriyi ekle
    }
  }
});

// Action'ları bileşenlerde kullanmak için dışa aktar
export const { artir, ozelArtir } = sayacSlice.actions;

// Reducer'ı Store'a bağlamak için dışa aktar
export default sayacSlice.reducer;`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="cart">🛒</span> Modül Ödevi: Redux Alışveriş Sepeti</h4>
        <p className="mb-3">
          Redux Store'u kurup, bir Slice bağlayıp bileşenden okuyacağız. Kurulum (<code>npm install @reduxjs/toolkit react-redux</code>) yaptıktan sonra adımları izleyin:
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Store'u Oluşturun (store.ts)</h6>
        <p className="small mb-1"><code>src/store.ts</code> dosyası açın. (Daha önce yazdığınız <code>sepetSlice</code> kodunu kullandığımızı varsayıyoruz):</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import { configureStore } from '@reduxjs/toolkit';
import sepetReducer from './sepetSlice';

export const store = configureStore({
  reducer: {
    sepet: sepetReducer // Slice'ımızı ana depoya bağladık
  }
});

// TypeScript için gerekli tipler
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Uygulamayı Store ile Sarmalayın (main.tsx)</h6>
        <p className="small mb-1">Redux'ın tüm uygulamada geçerli olması için <code>src/main.tsx</code> dosyasında <code>Provider</code> kullanın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 3: Bileşende Kullanın (App.tsx)</h6>
        <p className="small mb-1">Veriyi okumak için <code>useSelector</code>, değiştirmek için <code>useDispatch</code> kancalarını kullanın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { urunEkle } from './sepetSlice'; // Slice'tan gelen action

function App() {
  // Store'daki sepet sayısını OKU
  const sepetSayisi = useSelector((state: RootState) => state.sepet.sayi);
  // Store'a emir GÖNDERMEK için dispatch aracı
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Sepetinizde {sepetSayisi} ürün var.</h2>
      <button onClick={() => dispatch(urunEkle())}>Sepete Ekle</button>
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
            <p className="text-muted mb-4 fs-5">Redux Toolkit'in mimarisini, Store bağlantılarını ve Hook kullanımlarını başarıyla kavradın.</p>
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

export default ReduxToolkitDers;