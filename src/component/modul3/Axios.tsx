import React, { useState } from 'react';

const AxiosDers: React.FC = () => {
  // Dinamik Test State'leri
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Kod Okuryazarlığı Odaklı Sorular
  const questions = [
    {
      id: 1,
      question: "Aşağıdaki kod çalıştığında sunucu 404 (Bulunamadı) hatası verirse konsolda ne görürüz?\n\ntry {\n  const res = await axios.get('/olmayan-sayfa');\n  console.log('Başarılı:', res.data);\n} catch (error) {\n  console.log('Hata:', error.response.status);\n}",
      options: [
        "Uygulama çöker ve beyaz ekran verir.",
        "Konsola 'Başarılı: undefined' yazar çünkü Axios hataları kendi yutar.",
        "Konsola 'Hata: 404' yazar çünkü Axios 400 ve 500'lü hataları otomatik olarak catch bloğuna düşürür.",
        "Sonsuz döngüye girer."
      ],
      correct: 2
    },
    {
      id: 2,
      question: "Geleneksel fetch() yerine Axios kullandığımız aşağıdaki kodda 'res.data'nın türü nedir?\n\nconst res = await axios.get('https://api.ornek.com/kullanicilar');\nconsole.log(res.data);",
      options: [
        "Henüz çözülmemiş bir Promise nesnesidir.",
        "Otomatik olarak parse edilmiş (çevrilmiş) JSON formatındaki veridir.",
        "Saf metin (String) formatıdır, JSON.parse() yapılması gerekir.",
        "Sadece HTTP durum kodunu (200, 404 vb.) içeren bir sayıdır."
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Aşağıdaki Interceptor (Araya Girici) kodunun uygulamadaki görevi nedir?\n\naxios.interceptors.request.use((config) => {\n  config.headers.Authorization = 'Bearer token123';\n  return config;\n});",
      options: [
        "Uygulamanın atacağı HER isteğin (request) başlığına (header) otomatik olarak yetkilendirme token'ı ekler.",
        "Sadece gelen yanıtları (response) kontrol eder ve hata varsa yakalar.",
        "Sayfa her yenilendiğinde kullanıcıyı çıkış (logout) yaptırır.",
        "Bütün GET isteklerini POST isteğine çevirir."
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
        <h2 className="text-primary fw-bold">🌐 Axios ile API İstekleri ve Yönetimi</h2>
        <p className="lead text-muted">
          Modern web uygulamalarında sunucu ile haberleşmek, veri çekmek ve göndermek için en güçlü HTTP istemcisi.
        </p>
      </div>

      {/* 1. Bölüm: Nedir ve Kurulum */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">1. Axios Nedir ve Neden Kullanmalıyız?</h4>
          <p>
            Axios, tarayıcı ve Node.js için <strong>Promise tabanlı</strong> bir HTTP istemcisidir. Geleneksel <code>fetch()</code> API'sine göre çok daha yetenekli ve kullanımı kolaydır. Kod karmaşasını azaltır ve arka planda pek çok işlemi otomatik yapar.
          </p>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-success">
                <h6 className="fw-bold">Axios'un Avantajları</h6>
                <ul className="small mb-0 ps-3">
                  <li>Gelen veriyi otomatik olarak <strong>JSON</strong> formatına çevirir.</li>
                  <li>İstekleri ve yanıtları kesip araya girebilirsiniz (<strong>Interceptors</strong>).</li>
                  <li>Hata yönetimi (HTTP 400-500 hatalarını otomatik yakalar) çok kolaydır.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100 border-start border-4 border-info">
                <h6 className="fw-bold">Kurulum</h6>
                <p className="small mb-2">Projeye dahil etmek için terminale yazın:</p>
                <code className="d-block bg-dark text-info p-2 rounded">npm install axios</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bölüm: Temel İstekler (CRUD) */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">2. Temel HTTP İstekleri (GET & POST)</h4>
          <p>Axios ile veri çekerken (GET) veya veri gönderirken (POST), sadece URL'i ve gerekiyorsa veriyi vermeniz yeterlidir. Gerisini kütüphane halleder.</p>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-dark text-white rounded-3 h-100 border-start border-4 border-primary">
                <h6 className="fw-bold text-primary">Veri Çekme (GET)</h6>
                <pre className="text-light mb-0" style={{ fontSize: '0.85rem' }}>
{`// Kullanıcıları getir
try {
  const res = await axios.get('/api/users');
  console.log(res.data); 
} catch (hata) {
  console.log(hata);
}`}
                </pre>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-dark text-white rounded-3 h-100 border-start border-4 border-warning">
                <h6 className="fw-bold text-warning">Veri Gönderme (POST)</h6>
                <pre className="text-light mb-0" style={{ fontSize: '0.85rem' }}>
{`// Yeni kullanıcı ekle
try {
  const yeniVeri = { isim: 'Ali' };
  const res = await axios.post('/api/users', yeniVeri);
  console.log('Eklendi!'); 
} catch (hata) {
  console.log(hata);
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bölüm: Interceptors */}
      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">3. Axios Interceptors (Araya Giriciler)</h4>
          <p>
            Uygulamanızdaki <strong>TÜM</strong> isteklere otomatik olarak bir şey eklemek (örneğin kullanıcı giriş yaptıysa Token eklemek) veya tüm hataları tek bir yerde yakalamak için <code>Interceptors</code> kullanılır.
          </p>
          <pre className="bg-dark text-info p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
{`// İstek gitmeden HEMEN ÖNCE araya gir ve Token ekle
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = \`Bearer \${token}\`;
  }
  return config;
});`}
          </pre>
        </div>
      </div>

      {/* GELİŞTİRİLMİŞ ADIM ADIM ÖDEV BÖLÜMÜ */}
      <div className="alert alert-info rounded-4 p-4 mb-4 shadow-sm border-0">
        <h4 className="fw-bold"><span role="img" aria-label="code">💻</span> Modül Ödevi: Blog Yazılarını Çekmek</h4>
        <p className="mb-3">
          Sıfırdan bir bileşen oluşturup, sahte bir API'den Axios ile veri çekerek ekrana basacağız.
        </p>

        <h6 className="fw-bold mt-2">Adım 1: Bileşeni Oluşturun</h6>
        <p className="small mb-1"><code>src/components/</code> klasörü içine <code>BlogListesi.tsx</code> adında bir dosya açın ve şu kodları yazın:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small">
{`import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post { id: number; title: string; }

const BlogListesi: React.FC = () => {
  const [yazilar, setYazilar] = useState<Post[]>([]);

  useEffect(() => {
    // Axios ile veriyi çekiyoruz
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        // Sadece ilk 5 yazıyı alıp state'e atıyoruz
        setYazilar(res.data.slice(0, 5));
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []); // Sadece ilk render'da çalışır

  return (
    <div>
      <h2>Son Yazılar</h2>
      <ul>
        {yazilar.map(yazi => <li key={yazi.id}>{yazi.title}</li>)}
      </ul>
    </div>
  );
};

export default BlogListesi;`}
        </pre>

        <h6 className="fw-bold mt-3">Adım 2: Ana Sayfada Çağırın</h6>
        <p className="small mb-1">Şimdi <code>src/App.tsx</code> dosyasını açın ve oluşturduğunuz bileşeni ekranda gösterin:</p>
        <pre className="bg-dark text-light p-3 rounded-3 small mb-0">
{`import React from 'react';
import BlogListesi from './components/BlogListesi';

function App() {
  return (
    <div>
      <h1>Hoş Geldiniz</h1>
      <BlogListesi />
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
            <p className="text-muted mb-4 fs-5">Axios ile veri çekme ve kod analizi konularını harika kavradın.</p>
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

export default AxiosDers;